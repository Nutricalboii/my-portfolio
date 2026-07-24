export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          <div>
            <div className="eyebrow">About</div>
            <h2 className="section-title">
              A bit about me<span style={{ color: 'var(--blue)' }}>.</span>
            </h2>
          </div>

          <div>
            <p style={{ color: 'var(--dim)', lineHeight: 1.8, fontSize: '15px', marginBottom: '20px' }}>
              Third-year B.Tech CSE student at DIT University, graduating January 2027. I work across the full stack — web applications, backend APIs, and the systems layer underneath them.
            </p>
            <p style={{ color: 'var(--dim)', lineHeight: 1.8, fontSize: '15px', marginBottom: '20px' }}>
              Harvard CS50x graduate. Head of Public Relations at CSI DIT (900+ member technical chapter). I keep equity markets on the side, think about systems at 2am, and break things on purpose just to see what holds.
            </p>
            <p style={{ color: 'var(--dim)', lineHeight: 1.8, fontSize: '15px', marginBottom: '28px' }}>
              What keeps me going isn't any specific technology — it's the question of how things actually work underneath. Software is just the current way I explore that.
            </p>

            <blockquote
              style={{
                borderLeft: '3px solid var(--blue)',
                paddingLeft: '16px',
                fontStyle: 'italic',
                color: 'var(--text)',
                fontSize: '14px',
                lineHeight: 1.7,
              }}
            >
              "I experiment where theory meets hardware, build where failure is possible, and use AI as a tool — because systems that survive reality are never accidental."
            </blockquote>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '24px',
              }}
            >
              {['CS50x HarvardX', 'B.Tech CSE 2027', 'DIT University'].map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
