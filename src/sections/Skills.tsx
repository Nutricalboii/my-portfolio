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
        <div className="eyebrow section-eyebrow reveal">Technical Stack</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
          What I build with<span style={{ color: 'var(--blue)' }}>.</span>
        </h2>
        <p className="section-sub reveal" style={{ transitionDelay: '0.2s' }}>
          Honest stack — what I've actually shipped with, not what looks good on a resume.
        </p>

        <div className="skills-grid" style={{ marginTop: '48px' }}>
          {SKILLS.map((group, gi) => (
            <div
              key={group.label}
              className="skill-group reveal"
              ref={(el) => { groupRefs.current[gi] = el; }}
              style={{ transitionDelay: `${gi * 0.1}s` }}
            >
              <div className="skill-group-label">{group.label}</div>
              <div className="skill-chips">
                {group.chips.map((chip, ci) => (
                  <span
                    key={chip}
                    className="chip"
                    style={{ position: 'relative' }}
                    title={`${ci + 1}/${group.chips.length}`}
                  >
                    {chip}
                    <span className="chip-counter">{String(ci + 1).padStart(2, '0')}/{group.chips.length}</span>
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
