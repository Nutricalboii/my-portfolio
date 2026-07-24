import { useEffect, useRef } from 'react';
import { SKILLS } from '../data';

export function Skills() {
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );
    groupRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <div className="eyebrow">Technical Stack</div>
        <h2 className="section-title">
          What I build with<span style={{ color: 'var(--blue)' }}>.</span>
        </h2>
        <p className="section-sub">
          Honest stack — what I've actually shipped with, not what looks good on a resume.
        </p>

        <div className="skills-grid" style={{ marginTop: '48px' }}>
          {SKILLS.map((group, gi) => (
            <div
              key={group.label}
              className="skill-group"
              ref={(el) => { groupRefs.current[gi] = el; }}
            >
              <div className="skill-group-label">{group.label}</div>
              <div className="skill-chips">
                {group.chips.map((chip) => (
                  <span key={chip} className="chip">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
