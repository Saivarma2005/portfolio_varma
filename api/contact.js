/* global process */
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }

  try {
    const { name, email, message, botcheck } = req.body || {};

    // Honeypot spam protection: if bot filled hidden field, return fake success
    if (botcheck) {
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    // Input validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required.' });
    }
    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message content is required.' });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured in environment variables.');
      return res.status(500).json({
        success: false,
        error: 'Email service is not configured yet. Please contact directly at dalapathisaivarma@gmail.com.',
      });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['dalapathisaivarma@gmail.com'],
      replyTo: email.trim(),
      subject: `[Portfolio] New message from ${name.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; margin-bottom: 16px; border-bottom: 2px solid #38bdf8; padding-bottom: 8px;">New Portfolio Contact Message</h2>
          <p style="margin: 8px 0;"><strong>Sender Name:</strong> ${escapeHtml(name.trim())}</p>
          <p style="margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${escapeHtml(email.trim())}">${escapeHtml(email.trim())}</a></p>
          <p style="margin: 16px 0 8px 0;"><strong>Message:</strong></p>
          <div style="background-color: #f8fafc; padding: 14px 18px; border-left: 4px solid #38bdf8; border-radius: 4px; color: #334155; line-height: 1.6; white-space: pre-wrap;">
${escapeHtml(message.trim())}
          </div>
          <hr style="margin-top: 24px; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #94a3b8; margin-top: 12px;">Sent from your portfolio website at portfolio-varma-peach.vercel.app</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      id: data?.id,
    });
  } catch (err) {
    console.error('Unexpected server error:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while sending the message.',
    });
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
