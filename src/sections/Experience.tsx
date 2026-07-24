export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <div className="eyebrow">Experience</div>
        <h2 className="section-title">
          Where I have worked<span style={{ color: 'var(--blue)' }}>.</span>
        </h2>

        <div className="experience-list" style={{ marginTop: '48px' }}>
          {/* Codec Technologies */}
          <div className="exp-item">
            <div className="exp-meta">
              <div className="exp-year">Dec 2025 — Jan 2026</div>
              <div className="exp-badge">AICTE & ICAC Approved</div>
            </div>
            <div className="exp-content">
              <div className="exp-content-title">Full-Stack Developer Intern</div>
              <div className="exp-company">Codec Technologies</div>
              <ul className="exp-bullets">
                <li>Worked on full-stack web development across frontend and backend systems.</li>
                <li>Contributed to production codebases under industry guidance.</li>
                <li>Shipped features in React, Node.js, and MongoDB in a professional team environment.</li>
              </ul>
            </div>
          </div>

          {/* CSI DIT */}
          <div className="exp-item">
            <div className="exp-meta">
              <div className="exp-year">2023 — Present</div>
              <div className="exp-badge">900+ member community</div>
            </div>
            <div className="exp-content">
              <div className="exp-content-title">Head of Public Relations</div>
              <div className="exp-company">CSI DIT Chapter</div>
              <ul className="exp-bullets">
                <li>Lead communications and outreach for one of the university's largest technical bodies.</li>
                <li>Organized events, workshops, hackathons, and external partnerships for the chapter.</li>
                <li>Managed team coordination and community engagement for 900+ active members.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
