import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MagneticButton } from '../components/ui/MagneticButton';

const GithubSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ─── Particle field ─────────────────────────────────────── */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions] = [
    (() => {
      const pos = new Float32Array(600 * 3);
      for (let i = 0; i < 600; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 18;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      }
      return pos;
    })(),
  ];

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.012;
    }
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial size={0.035} color="#3b82f6" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ─── Grid floor ─────────────────────────────────────────── */
function GridFloor() {
  return (
    <gridHelper
      args={[30, 30, '#1e3a5f', '#0f2040']}
      position={[0, -3.5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

/* ─── Main wireframe sphere ──────────────────────────────── */
function WireframeSphere() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.08;
    ref.current.rotation.x = Math.sin(t * 0.15) * 0.15;
    ref.current.position.x = mouse.x * 0.3;
    ref.current.position.y = -0.3 + mouse.y * 0.2;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.18} />
    </mesh>
  );
}

/* ─── Hero Section ───────────────────────────────────────── */
export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const text = el.innerText;
    el.innerHTML = '';
    text.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.textContent = ch === ' ' ? '\u00a0' : ch;
      span.style.cssText = `
        display: inline-block;
        opacity: 0;
        transform: translateY(0.6em);
        transition: opacity 0.5s ${0.04 + i * 0.025}s cubic-bezier(0.16,1,0.3,1),
                    transform 0.5s ${0.04 + i * 0.025}s cubic-bezier(0.16,1,0.3,1);
      `;
      el.appendChild(span);
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.querySelectorAll('span').forEach((s) => {
          s.style.opacity = '1';
          s.style.transform = 'translateY(0)';
        });
      });
    });
  }, []);

  return (
    <section id="hero" className="hero">
      {/* 3D Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas
          camera={{ fov: 50, position: [0, 0, 5] }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
        >
          <fog attach="fog" args={['#050814', 6, 18]} />
          <ambientLight intensity={0.15} />
          <pointLight position={[5, 5, 3]} color="#3b82f6" intensity={2.5} />
          <pointLight position={[-4, -3, 2]} color="#818cf8" intensity={1.2} />
          <hemisphereLight args={['#0a1628', '#000000', 0.3]} />
          <WireframeSphere />
          <ParticleField />
          <GridFloor />
        </Canvas>
      </div>

      {/* Content */}
      <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="hero-avail reveal visible"
          style={{ animationDelay: '0s' }}
        >
          <span className="hero-avail-dot" />
          Available for roles — Jan 2027
        </div>

        <h1 className="hero-title" ref={titleRef}>
          Vaibhav{'\n'}Sharma
        </h1>

        <p
          className="hero-sub reveal"
          style={{ transitionDelay: '0.3s' }}
        >
          Full-stack developer and systems tinkerer from Dehradun. I build things that touch hardware, kernels, and production — not just components.
        </p>

        <div className="hero-actions reveal" style={{ transitionDelay: '0.5s' }}>
          <MagneticButton href="#work" className="btn btn-primary">
            View Work →
          </MagneticButton>
          <MagneticButton href="#contact" className="btn btn-ghost">
            Get in Touch
          </MagneticButton>
          <a
            href="https://github.com/Nutricalboii"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-icon-link"
            aria-label="GitHub"
          >
            <GithubSVG />
          </a>
          <a
            href="https://linkedin.com/in/vaibsharma86"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-icon-link"
            aria-label="LinkedIn"
          >
            <LinkedinSVG />
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '10px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--faint)', fontFamily: 'var(--mono)' }}>
            Scroll
          </span>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--blue), transparent)' }} />
        </div>
      </div>
    </section>
  );
}
