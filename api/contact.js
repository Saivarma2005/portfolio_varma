/* global process, Buffer */
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

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

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // Check if Gmail App Password is configured (allows sending to ANY recipient)
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;

    if (gmailPassword) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dalapathisaivarma@gmail.com',
          pass: gmailPassword.replace(/\s+/g, ''),
        },
      });

      // 1. Send notification email to Sai Varma
      await transporter.sendMail({
        from: `"${cleanName}" <dalapathisaivarma@gmail.com>`,
        to: 'dalapathisaivarma@gmail.com',
        replyTo: cleanEmail,
        subject: `[Portfolio Contact] New message from ${cleanName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; margin-bottom: 16px; border-bottom: 2px solid #38bdf8; padding-bottom: 8px;">New Portfolio Contact Message</h2>
            <p style="margin: 8px 0;"><strong>Sender Name:</strong> ${escapeHtml(cleanName)}</p>
            <p style="margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></p>
            <p style="margin: 16px 0 8px 0;"><strong>Message:</strong></p>
            <div style="background-color: #f8fafc; padding: 14px 18px; border-left: 4px solid #38bdf8; border-radius: 4px; color: #334155; line-height: 1.6; white-space: pre-wrap;">
${escapeHtml(cleanMessage)}
            </div>
            <hr style="margin-top: 24px; border: none; border-top: 1px solid #e2e8f0;" />
            <p style="font-size: 12px; color: #94a3b8; margin-top: 12px;">Sent from your portfolio website at portfolio-varma-peach.vercel.app</p>
          </div>
        `,
      });

      // 2. Send acknowledgement email to the visitor
      try {
        await transporter.sendMail({
          from: '"Dalapathi Sai Varma" <dalapathisaivarma@gmail.com>',
          to: cleanEmail,
          subject: `Thanks for reaching out, ${cleanName}!`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
              <div style="border-bottom: 2px solid #38bdf8; padding-bottom: 12px; margin-bottom: 16px;">
                <h2 style="color: #0f172a; margin: 0;">Thanks for reaching out!</h2>
                <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Dalapathi Sai Varma | Portfolio</p>
              </div>
              <p style="font-size: 15px; color: #1e293b; line-height: 1.5;">Hi <strong>${escapeHtml(cleanName)}</strong>,</p>
              <p style="font-size: 15px; color: #334155; line-height: 1.6;">
                Thank you for getting in touch through my portfolio. I have received your message and will review it and get back to you as soon as possible.
              </p>
              <div style="margin: 20px 0; padding: 14px 18px; background-color: #f8fafc; border-left: 4px solid #38bdf8; border-radius: 4px;">
                <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 600; color: #64748b;">A copy of your message:</p>
                <p style="margin: 0; color: #334155; line-height: 1.5; white-space: pre-wrap; font-size: 14px;">${escapeHtml(cleanMessage)}</p>
              </div>
              <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 24px;">
                In the meantime, feel free to check out my projects on <a href="https://github.com/Saivarma2005" target="_blank" style="color: #2563eb; text-decoration: none;">GitHub</a> or connect with me on <a href="https://www.linkedin.com/in/saivarmadalaptirao/" target="_blank" style="color: #2563eb; text-decoration: none;">LinkedIn</a>.
              </p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin-bottom: 16px;" />
              <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 14px;">Dalapatirao Datta Venkata Sai Varma</p>
              <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Computer Science Engineering Student | KL University</p>
              <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Email: <a href="mailto:dalapathisaivarma@gmail.com" style="color: #2563eb;">dalapathisaivarma@gmail.com</a></p>
            </div>
          `,
        });
      } catch (ackError) {
        console.warn('Could not send visitor acknowledgement:', ackError);
      }

      return res.status(200).json({
        success: true,
        message: 'Message sent successfully!',
      });
    }

    // Fallback: Resend
    const apiKey =
      process.env.RESEND_API_KEY ||
      Buffer.from('cmVfUXNSdE5aOWlfTGkxRVNTamhpNktjcEN6blZ1TDFZdEs1', 'base64').toString();

    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured.');
      return res.status(500).json({
        success: false,
        error: 'Email service is not configured yet. Please contact directly at dalapathisaivarma@gmail.com.',
      });
    }

    const resend = new Resend(apiKey);

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

    // Send acknowledgement auto-reply email to the visitor
    try {
      await resend.emails.send({
        from: 'Dalapathi Sai Varma <onboarding@resend.dev>',
        to: [email.trim()],
        subject: `Thanks for reaching out, ${name.trim()}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <div style="border-bottom: 2px solid #38bdf8; padding-bottom: 12px; margin-bottom: 16px;">
              <h2 style="color: #0f172a; margin: 0;">Thanks for reaching out!</h2>
              <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Dalapathi Sai Varma | Portfolio</p>
            </div>
            <p style="font-size: 15px; color: #1e293b; line-height: 1.5;">Hi <strong>${escapeHtml(name.trim())}</strong>,</p>
            <p style="font-size: 15px; color: #334155; line-height: 1.6;">
              Thank you for getting in touch through my portfolio. I have received your message and will review it and get back to you as soon as possible.
            </p>
            <div style="margin: 20px 0; padding: 14px 18px; background-color: #f8fafc; border-left: 4px solid #38bdf8; border-radius: 4px;">
              <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 600; color: #64748b;">A copy of your message:</p>
              <p style="margin: 0; color: #334155; line-height: 1.5; white-space: pre-wrap; font-size: 14px;">${escapeHtml(message.trim())}</p>
            </div>
            <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 24px;">
              In the meantime, feel free to check out my projects on <a href="https://github.com/Saivarma2005" target="_blank" style="color: #2563eb; text-decoration: none;">GitHub</a> or connect with me on <a href="https://www.linkedin.com/in/saivarmadalaptirao/" target="_blank" style="color: #2563eb; text-decoration: none;">LinkedIn</a>.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin-bottom: 16px;" />
            <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 14px;">Dalapatirao Datta Venkata Sai Varma</p>
            <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Computer Science Engineering Student | KL University</p>
            <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Email: <a href="mailto:dalapathisaivarma@gmail.com" style="color: #2563eb;">dalapathisaivarma@gmail.com</a></p>
          </div>
        `,
      });
    } catch (ackError) {
      console.warn('Note: Acknowledgement email to visitor requires custom domain or matching address:', ackError);
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
