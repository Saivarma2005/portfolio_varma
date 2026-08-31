import './App.css'

const skills = [
  'Python',
  'Java',
  'SQL',
  'JavaScript',
  'React',
  'Spring Boot',
  'MySQL',
  'AWS',
  'Azure',
  'Git/GitHub',
  'Data Analytics',
  'ML',
]

const projects = [
  {
    title: 'Smart Library Management System',
    description:
      'A full-stack library application designed to simplify book issuance, member records, inventory tracking, and administrative workflows with a clean dashboard experience.',
    tags: ['Java', 'Spring Boot', 'MySQL'],
  },
  {
    title: 'Student Placement Management Portal',
    description:
      'A placement-focused platform for managing student profiles, company drives, placement data, and student progress in a streamlined system.',
    tags: ['React', 'Node.js', 'SQL'],
  },
  {
    title: 'Cloud-Based Expense Tracker',
    description:
      'A personal finance application for recording expenses, category analysis, and cloud-friendly data storage with an intuitive user interface.',
    tags: ['AWS', 'JavaScript', 'React'],
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'A modern portfolio website showcasing skills, certifications, projects, internship experience, and contact details for professional branding.',
    tags: ['React', 'CSS', 'Vite'],
  },
]

const certifications = [
  {
    name: 'Automation Anywhere Certified Essentials RPA Professional (Automation 360) – 2023',
    issuer: 'Automation Anywhere',
    date: 'Completed',
    link: 'https://certificates.automationanywhere.com/7ac5e64f-c573-40a6-bcd0-7deea4c3b492',
    status: 'Verified',
  },
  {
    name: 'Essentials Automation Certification – 2024',
    issuer: 'Automation Anywhere',
    date: 'Completed',
    link: 'https://certificates.automationanywhere.com/f17bf3f1-a5ad-49a8-b4cb-dd4a3ccbe956',
    status: 'Verified',
  },
  {
    name: 'Advanced Automation Professional',
    issuer: 'Automation Anywhere',
    date: 'June 13, 2026',
    id: 'AAADVC2024A360-185255990',
    expiry: 'Expires June 13, 2028',
    link: 'https://certificates.automationanywhere.com/7514afe8-c07d-467c-81e0-790ffaba63ca',
    status: 'Verified',
  },
  {
    name: 'Oracle Cloud Infrastructure 2024 Generative AI Certified Professional',
    issuer: 'Oracle',
    date: 'July 29, 2024',
    id: '1007538520CI2024GAIOCP',
    status: 'Certified – Expired',
    note: 'Valid until July 29, 2026',
    link: '#',
  },
  {
    name: 'Microsoft Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    date: 'Completed',
    link: 'https://learn.microsoft.com/api/credentials/share/en-us/DALAPIRAODATTAVENKATASAIVARMA-7694/E91B5EFF8EAFB3A3?sharingId=6655FA82E90B3A55',
    status: 'Verified',
  },
  {
    name: 'GitHub Foundations',
    issuer: 'GitHub',
    date: 'Completed',
    link: '#',
    status: 'Certificate PDF uploaded',
  },
  {
    name: 'Data Structures & Algorithms',
    issuer: 'Completed',
    date: 'Certificate available on request',
    link: '#',
    status: 'Completed',
  },
  {
    name: 'Java Programming',
    issuer: 'Completed',
    date: 'Certificate available on request',
    link: '#',
    status: 'Completed',
  },
  {
    name: 'Spring Boot Fundamentals',
    issuer: 'Completed',
    date: 'Certificate available on request',
    link: '#',
    status: 'Completed',
  },
  {
    name: 'Git & GitHub Version Control',
    issuer: 'Completed',
    date: 'Certificate available on request',
    link: '#',
    status: 'Completed',
  },
]

const experiences = [
  {
    role: 'Data Analytics Intern',
    company: 'Thiranex',
    period: 'August 23, 2026 – September 22, 2026',
    type: 'Remote / Project-Based',
    details: 'Completed a practical project under industry mentorship focused on data analytics, insights generation, and applied business problem solving.',
  },
  {
    role: 'Virtual Internship in Networking',
    company: 'Cisco Networking Academy',
    period: 'May–July 2024',
    type: 'Virtual Internship',
    details: 'Successfully completed the Networking virtual internship program and built foundational understanding of networking concepts and practical lab exposure.',
  },
]

const stats = [
  { label: 'CGPA', value: '9.55/10' },
  { label: 'Projects', value: '4+' },
  { label: 'Certifications', value: '10+' },
  { label: 'Internships', value: '2' },
]

function App() {
  return (
    <div className="portfolio-shell">
      <header className="topbar">
        <div className="brand">DSV</div>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#certifications">Certifications</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero section">
          <div className="hero-text">
            <p className="eyebrow">Computer Science Engineering Student</p>
            <h1>Dalapathi Sai Varma</h1>
            <h2>Data Analytics | AI/ML | Full-Stack Development</h2>
            <p>
              I am a CSE student with a strong interest in data-driven decision-making,
              machine learning, and modern web development. I enjoy solving real-world
              problems through technology and building impactful user-focused solutions.
            </p>
            <div className="cta-row">
              <a href="#contact" className="primary-btn">Hire Me</a>
              <a href="#projects" className="secondary-btn">View Projects</a>
            </div>
            <div className="social-row">
              <a
                href="https://github.com/Saivarma2005"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/saivarmadalaptirao/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a href="/Resume_Sai_Varma%20(1).pdf" aria-label="Resume">
                Resume
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="profile-card">
              <div className="avatar">DS</div>
              <div className="profile-info">
                <strong>Dalapathi Sai Varma</strong>
                <span>B.Tech CSE, KL University</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-heading">
            <p className="eyebrow">About Me</p>
            <h3>Driven by learning, building, and impact</h3>
          </div>
          <div className="about-grid">
            <div>
              <p>
                I am a Computer Science Engineering student at KL University with a passion for
                data analytics, AI/ML, and full-stack development. With a strong academic
                foundation and hands-on project experience, I enjoy transforming ideas into
                practical, scalable digital solutions.
              </p>
              <p>
                My work combines analytical thinking, modern software engineering practices,
                and a strong problem-solving mindset. I am always eager to learn new tools,
                explore emerging technologies, and contribute to meaningful real-world projects.
              </p>
            </div>
            <div className="edu-card">
              <h4>Education</h4>
              <p>B.Tech – Computer Science & Engineering</p>
              <p>KL University</p>
              <p className="cgpa">CGPA: 9.55/10</p>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h3>Technologies and tools I work with</h3>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <span key={skill} className="skill-pill">{skill}</span>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-heading">
            <p className="eyebrow">Projects</p>
            <h3>Featured work</h3>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h3>Internships and professional exposure</h3>
          </div>
          <div className="timeline">
            {experiences.map((item) => (
              <div key={item.company} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h4>{item.role}</h4>
                  <p className="company-line">{item.company}</p>
                  <p className="period-line">{item.period}</p>
                  <p className="type-line">{item.type}</p>
                  <p>{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications" className="section">
          <div className="section-heading">
            <p className="eyebrow">Certifications</p>
            <h3>Credentials and verified achievements</h3>
          </div>
          <div className="cert-grid">
            {certifications.map((cert) => (
              <article key={cert.name} className="cert-card">
                <div className="cert-header">
                  <h4>{cert.name}</h4>
                  <span className="status-badge">{cert.status}</span>
                </div>
                <p>{cert.issuer}</p>
                <p>{cert.date}</p>
                {cert.id && <p>Credential ID: {cert.id}</p>}
                {cert.expiry && <p>{cert.expiry}</p>}
                {cert.note && <p>{cert.note}</p>}
                <div className="cert-actions">
                  {cert.link && cert.link !== '#' ? (
                    <a href={cert.link} target="_blank" rel="noreferrer">View / Verify Certificate</a>
                  ) : (
                    <span className="disabled-link">Certificate link pending</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section stats-section">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-box">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="github" className="section github-section">
          <div className="section-heading">
            <p className="eyebrow">GitHub</p>
            <h3>Open-source activity and project contributions</h3>
          </div>
          <div className="github-panel">
            <div>
              <h4>GitHub Profile</h4>
              <p>Exploring practical software engineering, project building, and continuous learning through hands-on work.</p>
            </div>
            <div className="github-actions">
              <a href="https://github.com/Saivarma2005" target="_blank" rel="noreferrer">View GitHub Profile</a>
              <a href="https://github.com/Saivarma2005?tab=repositories" target="_blank" rel="noreferrer">Repositories</a>
              <a href="https://github.com/Saivarma2005" target="_blank" rel="noreferrer">Contribution Activity</a>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h3>Let’s connect</h3>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <p>Email: saivarma.dalapathi@gmail.com</p>
              <p>
                LinkedIn:{' '}
                <a
                  href="https://www.linkedin.com/in/saivarmadalaptirao/"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.linkedin.com/in/saivarmadalaptirao/
                </a>
              </p>
              <p>
                GitHub:{' '}
                <a href="https://github.com/Saivarma2005" target="_blank" rel="noreferrer">
                  https://github.com/Saivarma2005
                </a>
              </p>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea rows="4" placeholder="Your message" />
              <button type="submit">Send Message</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
