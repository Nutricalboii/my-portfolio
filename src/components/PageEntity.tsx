import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useMousePosition } from '../hooks/useMousePosition';

// Waypoints: [scrollProgress, x_percent, y_percent, scale, rotX, rotY, rotZ]
// Traverses from Top-Right -> Mid-Left -> Center-Right -> Lower-Center -> Bottom-Right
const WAYPOINTS = [
  [0.00,  0.80, 0.20, 1.6, 0.2,   0.5,  0.1],
  [0.25,  0.22, 0.40, 1.9, -0.3,  1.2,  -0.2],
  [0.50,  0.78, 0.58, 2.2, 0.4,   2.1,  0.3],  // Major feature highlight
  [0.75,  0.30, 0.76, 1.8, -0.2,  3.2,  -0.1],
  [1.00,  0.82, 0.92, 1.4, 0.1,   4.2,  0.0],
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getInterpolatedState(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const segs = WAYPOINTS.length - 1;
  const idx = Math.min(Math.floor(p * segs), segs - 1);
  const t = (p * segs) - idx;
  // Smooth cubic easing for continuous movement
  const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const w1 = WAYPOINTS[idx];
  const w2 = WAYPOINTS[idx + 1];

  return {
    x: lerp(w1[1], w2[1], easeT),
    y: lerp(w1[2], w2[2], easeT),
    scale: lerp(w1[3], w2[3], easeT),
    rx: lerp(w1[4], w2[4], easeT),
    ry: lerp(w1[5], w2[5], easeT),
    rz: lerp(w1[6], w2[6], easeT),
  };
}

function SatelliteEntity() {
  const groupRef = useRef<THREE.Group>(null!);
  const scrollRef = useScrollProgress();
  const mouseRef = useMousePosition();
  const { size } = useThree();

  const [cyanWire, blueWire, glassMat] = useMemo(() => {
    const cw = new THREE.MeshBasicMaterial({ color: '#22d3ee', wireframe: true, transparent: true, opacity: 0.65 });
    const bw = new THREE.MeshBasicMaterial({ color: '#3b82f6', wireframe: true, transparent: true, opacity: 0.4 });
    const gm = new THREE.MeshPhysicalMaterial({
      color: '#60a5fa',
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      transparent: true,
      opacity: 0.7,
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

    // Mouse interactive lag offset
    const mx = mouseRef.current.nx * 0.25;
    const my = mouseRef.current.ny * 0.25;

    // Smooth movement interpolation
    groupRef.current.position.x = lerp(groupRef.current.position.x, targetX + mx, 0.05);
    groupRef.current.position.y = lerp(groupRef.current.position.y, targetY + my, 0.05);
    groupRef.current.scale.setScalar(lerp(groupRef.current.scale.x, state.scale, 0.05));

    // Continuous motion + scroll-driven rotation
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, state.rx + Math.sin(t * 0.5) * 0.1, 0.05);
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, state.ry + t * 0.2, 0.05);
    groupRef.current.rotation.z = lerp(groupRef.current.rotation.z, state.rz + Math.cos(t * 0.4) * 0.08, 0.05);
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
      <mesh position={[-1.2, 0, 0]} material={cyanWire}>
        <boxGeometry args={[1.0, 0.05, 0.6]} />
      </mesh>
      <mesh position={[1.2, 0, 0]} material={cyanWire}>
        <boxGeometry args={[1.0, 0.05, 0.6]} />
      </mesh>

      {/* Parabolic Antenna Dish */}
      <mesh position={[0, 0.5, 0]} rotation={[0.4, 0, 0]} material={cyanWire}>
        <coneGeometry args={[0.25, 0.35, 12]} />
      </mesh>

      {/* Floating Refractive Orbs */}
      <mesh position={[-1.8, 0.4, 0.3]} material={glassMat}>
        <sphereGeometry args={[0.35, 32, 32]} />
      </mesh>
      <mesh position={[1.6, -0.5, -0.2]} material={glassMat}>
        <sphereGeometry args={[0.25, 32, 32]} />
      </mesh>

      {/* Orbiting Sensor Ring */}
      <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]} material={blueWire}>
        <torusGeometry args={[1.6, 0.015, 16, 100]} />
      </mesh>
    </group>
  );
}

export function PageEntity() {
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5, // Rendered as an active foreground/floating narrative layer
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
        <pointLight position={[5, 5, 5]} color="#22d3ee" intensity={4} />
        <pointLight position={[-5, -5, -2]} color="#3b82f6" intensity={2} />
        <SatelliteEntity />
      </Canvas>
    </div>
  );
}
