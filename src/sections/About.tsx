export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          <div>
            <div className="eyebrow section-eyebrow reveal">About</div>
            <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
              A bit about me<span style={{ color: 'var(--blue)' }}>.</span>
            </h2>
          </div>

          <div style={{ paddingTop: '20px' }}>
            <p className="reveal" style={{ color: 'var(--dim)', lineHeight: 1.85, fontSize: '15px', marginBottom: '20px', transitionDelay: '0.15s' }}>
              Third-year B.Tech CSE student at DIT University Dehradun, graduating January 2027. I work across the full stack — web applications, backend APIs, and the systems layer underneath them.
            </p>
            <p className="reveal" style={{ color: 'var(--dim)', lineHeight: 1.85, fontSize: '15px', marginBottom: '20px', transitionDelay: '0.25s' }}>
              Harvard CS50x graduate. Head of Public Relations at CSI DIT (900+ member technical chapter). I keep equity markets on the side, think about systems at 2am, and break things on purpose just to see what holds.
            </p>
            <p className="reveal" style={{ color: 'var(--dim)', lineHeight: 1.85, fontSize: '15px', marginBottom: '32px', transitionDelay: '0.35s' }}>
              What keeps me going isn't any specific technology — it's the question of how things actually work underneath. Software is just the current way I explore that.
            </p>

            {/* Quote */}
            <blockquote
              className="reveal"
              style={{
                transitionDelay: '0.45s',
                borderLeft: '2px solid var(--blue)',
                paddingLeft: '20px',
                fontStyle: 'italic',
                color: 'var(--text)',
                fontSize: '14px',
                lineHeight: 1.8,
              }}
            >
              "I experiment where theory meets hardware, build where failure is possible, and use AI as a tool — because systems that survive reality are never accidental."
            </blockquote>

            {/* Credentials row */}
            <div
              className="reveal"
              style={{
                transitionDelay: '0.55s',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginTop: '32px',
              }}
            >
              {['CS50x HarvardX', 'B.Tech CSE 2027', 'DIT University', 'Dehradun, IN'].map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .wrap > div { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
