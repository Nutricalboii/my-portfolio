import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useMousePosition } from '../hooks/useMousePosition';

// Waypoints configured to float in dedicated empty space away from left-side text content
// Waypoints: [scrollProgress, x_fraction, y_fraction, scale]
const WAYPOINTS = [
  [0.00,  0.82, 0.22, 1.4], // Hero: top right
  [0.25,  0.85, 0.45, 1.5], // Work section: far right side
  [0.50,  0.82, 0.65, 1.6], // Skills: far right side
  [0.75,  0.85, 0.80, 1.4], // Experience: far right side
  [1.00,  0.82, 0.92, 1.2], // Contact: far right bottom
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getInterpolatedState(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const segs = WAYPOINTS.length - 1;
  const idx = Math.min(Math.floor(p * segs), segs - 1);
  const t = (p * segs) - idx;
  const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  const w1 = WAYPOINTS[idx];
  const w2 = WAYPOINTS[idx + 1];

  return {
    x: lerp(w1[1], w2[1], easeT),
    y: lerp(w1[2], w2[2], easeT),
    scale: lerp(w1[3], w2[3], easeT),
  };
}

function SatelliteEntity() {
  const groupRef = useRef<THREE.Group>(null!);
  const scrollRef = useScrollProgress();
  const mouseRef = useMousePosition();
  const { size } = useThree();

  const [cyanWire, blueWire, glassMat] = useMemo(() => {
    const cw = new THREE.MeshBasicMaterial({ color: '#22d3ee', wireframe: true, transparent: true, opacity: 0.55 });
    const bw = new THREE.MeshBasicMaterial({ color: '#3b82f6', wireframe: true, transparent: true, opacity: 0.35 });
    const gm = new THREE.MeshPhysicalMaterial({
      color: '#60a5fa',
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      transparent: true,
      opacity: 0.6,
      ior: 1.5,
    });
    return [cw, bw, gm];
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const p = scrollRef.current;
    const state = getInterpolatedState(p);

    const aspect = size.width / size.height;
    const worldH = 2 * Math.tan((50 * Math.PI / 180) / 2) * 5;
    const worldW = worldH * aspect;

    const targetX = (state.x - 0.5) * worldW;
    const targetY = (0.5 - state.y) * worldH;

    // Subtle parallax
    const mx = mouseRef.current.nx * 0.15;
    const my = mouseRef.current.ny * 0.15;

    groupRef.current.position.x = lerp(groupRef.current.position.x, targetX + mx, 0.05);
    groupRef.current.position.y = lerp(groupRef.current.position.y, targetY + my, 0.05);
    groupRef.current.scale.setScalar(lerp(groupRef.current.scale.x, state.scale * 0.65, 0.05));

    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    groupRef.current.rotation.y = t * 0.25;
    groupRef.current.rotation.z = Math.cos(t * 0.3) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Central Satellite Chassis */}
      <mesh material={cyanWire}>
        <boxGeometry args={[1.2, 0.7, 0.5]} />
      </mesh>
      <mesh material={blueWire}>
        <boxGeometry args={[1.26, 0.76, 0.56]} />
      </mesh>

      {/* Solar Arrays */}
      <mesh position={[-1.1, 0, 0]} material={cyanWire}>
        <boxGeometry args={[0.9, 0.04, 0.55]} />
      </mesh>
      <mesh position={[1.1, 0, 0]} material={cyanWire}>
        <boxGeometry args={[0.9, 0.04, 0.55]} />
      </mesh>

      {/* Parabolic Antenna Dish */}
      <mesh position={[0, 0.45, 0]} rotation={[0.3, 0, 0]} material={cyanWire}>
        <coneGeometry args={[0.22, 0.3, 10]} />
      </mesh>

      {/* Glass Orb */}
      <mesh position={[-1.6, 0.3, 0.2]} material={glassMat}>
        <sphereGeometry args={[0.3, 32, 32]} />
      </mesh>

      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]} material={blueWire}>
        <torusGeometry args={[1.5, 0.012, 16, 80]} />
      </mesh>
    </group>
  );
}

export function PageEntity() {
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0, // Positioned cleanly behind content
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ fov: 50, position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} color="#22d3ee" intensity={3} />
        <pointLight position={[-5, -5, -2]} color="#3b82f6" intensity={1.5} />
        <SatelliteEntity />
      </Canvas>
    </div>
  );
}
