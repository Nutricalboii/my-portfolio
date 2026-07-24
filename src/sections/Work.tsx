import { ExternalLink } from 'lucide-react';
import { TiltCard } from '../components/ui/TiltCard';
import { PROJECTS_WEB, PROJECTS_SYSTEMS } from '../data';
import { useState } from 'react';

const GithubSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

type Project = typeof PROJECTS_WEB[number] | typeof PROJECTS_SYSTEMS[number];

function WorkCard({ p, idx }: { p: Project; idx: number }) {
  const status = 'status' in p ? p.status : null;

  return (
    <TiltCard className="card work-card reveal" data-delay={idx * 0.08}>
      {p.id === 'scholarsync' && (
        <div className="work-card-badge">🏆 Hackathon Winner</div>
      )}
      {status && (
        <div
          className="work-card-badge"
          style={{
            color: status === 'production' ? '#22c55e' : status === 'blocked' ? '#ef4444' : '#f59e0b',
            background: status === 'production' ? 'rgba(34,197,94,.1)' : status === 'blocked' ? 'rgba(239,68,68,.1)' : 'rgba(245,158,11,.1)',
            borderColor: status === 'production' ? 'rgba(34,197,94,.25)' : status === 'blocked' ? 'rgba(239,68,68,.25)' : 'rgba(245,158,11,.25)',
          }}
        >
          {status === 'production' ? '● live' : status === 'blocked' ? '● blocked' : '● in development'}
        </div>
      )}

      <div className="work-card-name">{p.name}</div>
      <div className="work-card-desc">{p.desc}</div>

      <div className="work-card-tags">
        {p.tags.map((t: string, ti: number) => (
          <span key={t} className="chip" style={{ transitionDelay: `${ti * 0.04}s` }}>{t}</span>
        ))}
      </div>

      <div className="work-card-footer">
        <a href={p.link} target="_blank" rel="noopener noreferrer" className="work-card-link">
          <GithubSVG /> Code
        </a>
        {'live' in p && p.live && (
          <a href={p.link} target="_blank" rel="noopener noreferrer" className="work-card-link">
            <ExternalLink size={14} /> Live
          </a>
        )}
      </div>
    </TiltCard>
  );
}

export function Work() {
  const [activeTab, setActiveTab] = useState<'web' | 'systems'>('web');
  const projects: Project[] = activeTab === 'web' ? PROJECTS_WEB : PROJECTS_SYSTEMS;

  return (
    <section id="work" className="section">
      <div className="wrap">
        <div className="eyebrow section-eyebrow reveal">Selected Work</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
          Things I have shipped<span style={{ color: 'var(--blue)' }}>.</span>
        </h2>
        <p className="section-sub reveal" style={{ transitionDelay: '0.2s' }}>
          Not cards. Not badges. What the problem was, why I approached it this way, what broke, and what I'd change.
        </p>

        <div className="tabs reveal" style={{ transitionDelay: '0.3s' }}>
          <button className={`tab-btn ${activeTab === 'web' ? 'active' : ''}`} onClick={() => setActiveTab('web')}>
            Web & Apps
          </button>
          <button className={`tab-btn ${activeTab === 'systems' ? 'active' : ''}`} onClick={() => setActiveTab('systems')}>
            Systems & Infra
          </button>
        </div>

        <div className="work-grid">
          {projects.map((p, i) => (
            <WorkCard key={p.id} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
