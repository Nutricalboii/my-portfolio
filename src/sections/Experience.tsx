export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <div className="eyebrow section-eyebrow reveal">Experience</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
          Where I have worked<span style={{ color: 'var(--blue)' }}>.</span>
        </h2>

        <div className="experience-list" style={{ marginTop: '64px' }}>
          {/* Codec Technologies */}
          <div className="exp-item reveal" style={{ transitionDelay: '0.2s' }}>
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

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--line2)', margin: '0 0 8px' }} />

          {/* CSI DIT */}
          <div className="exp-item reveal" style={{ transitionDelay: '0.35s' }}>
            <div className="exp-meta">
              <div className="exp-year">2023 — Present</div>
              <div className="exp-badge">900+ member community</div>
            </div>
            <div className="exp-content">
              <div className="exp-content-title">Head of Public Relations</div>
              <div className="exp-company">CSI DIT University Chapter</div>
              <ul className="exp-bullets">
                <li>Lead communications and outreach for one of the university's largest technical bodies.</li>
                <li>Organized events, workshops, hackathons, and external partnerships for the chapter.</li>
                <li>Managed team coordination and community engagement for 900+ active members.</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--line2)', margin: '0 0 8px' }} />

          {/* Hackathons */}
          <div className="exp-item reveal" style={{ transitionDelay: '0.5s' }}>
            <div className="exp-meta">
              <div className="exp-year">2024</div>
              <div className="exp-badge">Winner</div>
            </div>
            <div className="exp-content">
              <div className="exp-content-title">Google GDSC TechSprint — 1st Place</div>
              <div className="exp-company">ScholarSync · Team Singularity</div>
              <ul className="exp-bullets">
                <li>Built an AI-powered multi-doc RAG platform in 24 hours using Next.js, FastAPI, ChromaDB, and Gemini 2.0 Flash.</li>
                <li>Won the hackathon. Platform is still live on Vercel.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
