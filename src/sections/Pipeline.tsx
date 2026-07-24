import { useEffect, useRef } from 'react';

const STAGES = [
  {
    key: 'plan',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
      </svg>
    ),
    name: 'PLAN',
    sub: 'Architecture & data flow',
  },
  {
    key: 'build',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    name: 'BUILD',
    sub: 'Frontend + Backend',
  },
  {
    key: 'harden',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    name: 'HARDEN',
    sub: 'Security + performance',
  },
  {
    key: 'integrate',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M13 6h3a2 2 0 0 1 2 2v7" />
        <line x1="6" y1="9" x2="6" y2="21" />
      </svg>
    ),
    name: 'INTEGRATE',
    sub: 'APIs + systems layer',
  },
  {
    key: 'ship',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    name: 'SHIP',
    sub: 'Deploy + maintain',
  },
];

export function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Stagger nodes in
        nodeRefs.current.forEach((el, i) => {
          if (!el) return;
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, i * 120);
        });
        // Draw lines after first node
        lineRefs.current.forEach((el, i) => {
          if (!el) return;
          setTimeout(() => {
            el.style.transform = 'scaleX(1)';
            el.style.opacity = '1';
          }, 120 + i * 120);
        });
        obs.disconnect();
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="pipeline" className="pipeline-section" ref={sectionRef}>
      <div className="wrap">
        <div className="pipeline-comment reveal">// How I build</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
          From source to system<span style={{ color: 'var(--blue)' }}>.</span>
        </h2>
        <p className="section-sub reveal" style={{ transitionDelay: '0.2s' }}>
          Every project follows the same loop — plan, build, harden, integrate, ship, iterate. This is the pipeline behind everything on this site.
        </p>

        {/* Pipeline visualization */}
        <div className="pipeline-nodes">
          {STAGES.map((stage, i) => (
            <div key={stage.key} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              {/* Node */}
              <div
                className="pipeline-node"
                ref={(el) => { nodeRefs.current[i] = el; }}
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  flex: '0 0 auto',
                }}
              >
                <div className="pipeline-hex">
                  <span className="pipeline-hex-icon">{stage.icon}</span>
                </div>
                <div className="pipeline-node-name">{stage.name}</div>
                <div className="pipeline-node-sub">{stage.sub}</div>
              </div>

              {/* Connector (not after last) */}
              {i < STAGES.length - 1 && (
                <div
                  className="pipeline-connector"
                  ref={(el) => { lineRefs.current[i] = el; }}
                  style={{
                    opacity: 0,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    flex: 1,
                    minWidth: '40px',
                    height: '40px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div className="pipeline-line" />
                  <span className="pipeline-chevron" style={{ animationDelay: '0s' }}>›</span>
                  <span className="pipeline-chevron" style={{ animationDelay: '0.7s' }}>›</span>
                  <span className="pipeline-chevron" style={{ animationDelay: '1.4s' }}>›</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bash-style footer line */}
        <div className="pipeline-bash reveal" style={{ transitionDelay: '0.6s' }}>
          {STAGES.map((s, i) => (
            <span key={s.key}>
              <span style={{ color: 'var(--dim)' }}>{s.name}</span>
              {i < STAGES.length - 1 && (
                <span className="pipe-char"> | </span>
              )}
            </span>
          ))}
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '8px',
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            color: 'var(--faint)',
            letterSpacing: '.1em',
          }}
        >
          <span style={{ color: 'var(--blue)' }}>$</span> pipeline: running
        </div>
      </div>
    </section>
  );
}
