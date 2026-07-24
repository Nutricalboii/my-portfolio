import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useMousePosition } from '../hooks/useMousePosition';

// Bezier waypoints: [scrollProgress, x_fraction, y_fraction, scale]
const WAYPOINTS = [
  [0.00,  0.82, 0.20, 1.4],
  [0.25,  0.68, 0.43, 1.7],
  [0.50,  0.50, 0.52, 1.9], // dive point
  [0.75,  0.30, 0.68, 1.3],
  [1.00,  0.10, 0.88, 0.8],
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getWaypointValues(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress));
  const segCount = WAYPOINTS.length - 1;
  const seg = Math.min(Math.floor(clamped * segCount), segCount - 1);
  const t = (clamped * segCount) - seg;
  // ease in-out
  const te = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const a = WAYPOINTS[seg];
  const b = WAYPOINTS[seg + 1];
  return {
    xf: lerp(a[1], b[1], te),
    yf: lerp(a[2], b[2], te),
    scale: lerp(a[3], b[3], te),
    pitch: lerp(0, -0.3, te),
  };
}

/* ── Satellite geometry (wires) ────────────────────────── */
function SatelliteWireframe() {
  const groupRef = useRef<THREE.Group>(null!);
  const scrollRef = useScrollProgress();
  const mouseRef = useMousePosition();
  const { size } = useThree();

  const [bodyMat, glowMat] = useMemo(() => {
    const m = new THREE.MeshBasicMaterial({ color: '#3b82f6', wireframe: true, transparent: true, opacity: 0.55 });
    const g = new THREE.MeshBasicMaterial({ color: '#3b82f6', wireframe: true, transparent: true, opacity: 0.07 });
    return [m, g];
  }, []);

  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#a0c4ff',
    metalness: 0.1,
    roughness: 0,
    transmission: 0.95,
    transparent: true,
    opacity: 0.55,
    ior: 1.5,
  }), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const p = scrollRef.current;
    const { xf, yf, scale, pitch } = getWaypointValues(p);

    // Convert fraction to scene coords (orthographic-ish mapping)
    const W = size.width;
    const H = size.height;
    // Map viewport fraction → world space (camera fov 50, distance 5)
    const aspect = W / H;
    const worldH = 2 * Math.tan((50 * Math.PI / 180) / 2) * 5;
    const worldW = worldH * aspect;

    const targetX = (xf - 0.5) * worldW;
    const targetY = (0.5 - yf) * worldH;

    // Mouse parallax nudge
    const mx = mouseRef.current.nx * 0.15;
    const my = mouseRef.current.ny * 0.15;

    // Smooth follow
    groupRef.current.position.x = lerp(groupRef.current.position.x, targetX + mx, 0.04);
    groupRef.current.position.y = lerp(groupRef.current.position.y, targetY + my, 0.04);
    groupRef.current.position.z = 0;

    groupRef.current.scale.setScalar(lerp(groupRef.current.scale.x, scale * 0.7, 0.04));

    // Continuous slow Y rotation
    groupRef.current.rotation.y += 0.004;
    // Scroll-driven pitch
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, pitch + Math.sin(t * 0.4) * 0.08, 0.04);
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Central body */}
      <mesh material={bodyMat}>
        <boxGeometry args={[1.2, 0.65, 0.38]} />
      </mesh>
      {/* Glow body (slightly larger) */}
      <mesh material={glowMat}>
        <boxGeometry args={[1.28, 0.72, 0.44]} />
      </mesh>

      {/* Left solar panel */}
      <mesh position={[-1.1, 0, 0]} material={bodyMat}>
        <boxGeometry args={[0.82, 0.04, 0.52]} />
      </mesh>
      {/* Right solar panel */}
      <mesh position={[1.1, 0, 0]} material={bodyMat}>
        <boxGeometry args={[0.82, 0.04, 0.52]} />
      </mesh>

      {/* Strut left */}
      <mesh position={[-0.65, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={bodyMat}>
        <cylinderGeometry args={[0.02, 0.02, 0.14, 6]} />
      </mesh>
      {/* Strut right */}
      <mesh position={[0.65, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={bodyMat}>
        <cylinderGeometry args={[0.02, 0.02, 0.14, 6]} />
      </mesh>

      {/* Antenna dish */}
      <mesh position={[0, 0.45, 0.1]} rotation={[0.4, 0, 0]} material={bodyMat}>
        <coneGeometry args={[0.14, 0.28, 8]} />
      </mesh>

      {/* Glass orb left */}
      <mesh position={[-2.4, 0.15, 0.2]} material={glassMat}>
        <sphereGeometry args={[0.42, 32, 32]} />
      </mesh>
      {/* Glass orb right */}
      <mesh position={[1.9, -0.55, -0.3]} material={glassMat}>
        <sphereGeometry args={[0.28, 32, 32]} />
      </mesh>
    </group>
  );
}

/* ── Main export ───────────────────────────────────────── */
export function PageEntity() {
  // Don't mount 3D on mobile (perf)
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ fov: 50, position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} color="#3b82f6" intensity={2} />
        <pointLight position={[-3, -2, 2]} color="#818cf8" intensity={1} />
        <SatelliteWireframe />
      </Canvas>
    </div>
  );
}
