import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const NAV_WORK_ITEMS = {
  web: [
    { name: 'ScholarSync', desc: 'AI RAG platform — Google hackathon winner', href: '#work' },
    { name: 'Notum', desc: 'Zero-knowledge encrypted notes vault', href: '#work' },
    { name: 'The Sovereign Plate', desc: 'Restaurant platform + Twilio SMS', href: '#work' },
    { name: 'ADYA', desc: 'Local-first desktop AI assistant', href: '#work' },
    { name: 'LinguaCode', desc: 'English-to-Python compiler + PDA sim', href: '#work' },
    { name: 'Automation Bot', desc: 'Telegram webhook + scheduled tasks', href: '#work' },
  ],
  systems: [
    { name: 'Vaelix OS', desc: 'Custom Linux distro — 13 rebuilds', href: '#work' },
    { name: 'LOQ Control Center', desc: 'Hardware control suite — GTK4 + D-Bus', href: '#work' },
    { name: 'LibrePods', desc: 'AirPods for Linux via BT reverse-eng.', href: '#work' },
    { name: 'Android Bring-up', desc: 'Moto G5+ LineageOS 13 port (WIP)', href: '#work' },
  ],
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  let closeTimer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDropEnter = (name: string) => {
    clearTimeout(closeTimer);
    setOpenDrop(name);
  };

  const handleDropLeave = () => {
    closeTimer = setTimeout(() => setOpenDrop(null), 140);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Logo */}
          <a href="#" className="nav-logo" style={{ fontFamily: 'var(--mono)' }}>
            VS<span style={{ color: 'var(--blue)' }}>_</span>
          </a>

          {/* Desktop links */}
          <ul className="nav-links" style={{ listStyle: 'none', display: 'flex', gap: '2px' }}>
            {/* Work dropdown */}
            <li
              style={{ position: 'relative' }}
              onMouseEnter={() => handleDropEnter('work')}
              onMouseLeave={handleDropLeave}
            >
              <a href="#work" className="nav-link">
                Work <ChevronDown size={12} />
              </a>
              <div className={`nav-dropdown ${openDrop === 'work' ? 'open' : ''}`}>
                <div className="nav-dropdown-inner">
                  <div>
                    <div className="nav-dd-col-label">Web & Apps</div>
                    {NAV_WORK_ITEMS.web.map((item) => (
                      <a key={item.name} href={item.href} className="nav-dd-item">
                        <div>
                          <div className="nav-dd-name">{item.name}</div>
                          <div className="nav-dd-desc">{item.desc}</div>
                        </div>
                        <span className="nav-dd-arrow">→</span>
                      </a>
                    ))}
                  </div>
                  <div>
                    <div className="nav-dd-col-label">Systems & Infra</div>
                    {NAV_WORK_ITEMS.systems.map((item) => (
                      <a key={item.name} href={item.href} className="nav-dd-item">
                        <div>
                          <div className="nav-dd-name">{item.name}</div>
                          <div className="nav-dd-desc">{item.desc}</div>
                        </div>
                        <span className="nav-dd-arrow">→</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            <li><a href="#skills" className="nav-link">Skills</a></li>

            {/* Systems dropdown */}
            <li
              style={{ position: 'relative' }}
              onMouseEnter={() => handleDropEnter('systems')}
              onMouseLeave={handleDropLeave}
            >
              <a href="#pipeline" className="nav-link">
                How I Build <ChevronDown size={12} />
              </a>
              <div className={`nav-dropdown ${openDrop === 'systems' ? 'open' : ''}`} style={{ minWidth: '320px' }}>
                <div className="nav-dropdown-inner" style={{ gridTemplateColumns: '1fr' }}>
                  <div>
                    <div className="nav-dd-col-label">My Stack</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                      {['Linux BSP', 'Android Bring-up', 'GTK4', 'D-Bus', 'Kernel Config', 'WebCrypto', 'FastAPI', 'ChromaDB'].map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--dim)', marginTop: '16px', lineHeight: 1.6 }}>
                      Low-level work that most web devs never touch — kernel debugging, driver bring-up, hardware control suites.
                    </p>
                  </div>
                </div>
              </div>
            </li>

            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>

          {/* Resume CTA */}
          <a
            href="https://github.com/Nutricalboii"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '13px', padding: '8px 20px' }}
          >
            GitHub ↗
          </a>

          {/* Mobile hamburger */}
          <button
            className="nav-burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '64px',
            background: 'rgba(5,8,20,.97)',
            zIndex: 99,
            padding: '32px 24px',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {['#work', '#skills', '#pipeline', '#about', '#contact'].map((href) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--text)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--line2)',
                paddingBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              {href.replace('#', '').charAt(0).toUpperCase() + href.slice(2)}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links, .nav-links + a { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
