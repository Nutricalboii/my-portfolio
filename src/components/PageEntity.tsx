import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useScrollProgress } from '../hooks/useScrollProgress';

function CoreMesh() {
  const groupRef = useRef<THREE.Group>(null!);
  const scrollRef = useScrollProgress();
  const { size } = useThree();

  const [wireMat, coreMat] = useMemo(() => {
    const w = new THREE.MeshBasicMaterial({ color: '#3b82f6', wireframe: true, transparent: true, opacity: 0.35 });
    const c = new THREE.MeshStandardMaterial({ color: '#1e3a8a', roughness: 0.2, metalness: 0.8 });
    return [w, c];
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const p = scrollRef.current;

    // Right-aligned 3D positioning canvas area
    const aspect = size.width / size.height;
    const worldH = 2 * Math.tan((45 * Math.PI / 180) / 2) * 5;
    const worldW = worldH * aspect;

    // Place the 3D entity comfortably on the right 30% of the screen
    const rightX = (0.35) * worldW;
    const scrollY = (0.5 - p) * (worldH * 0.5);

    groupRef.current.position.x = rightX;
    groupRef.current.position.y = scrollY;
    groupRef.current.position.z = 0;

    groupRef.current.rotation.y = t * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Outer Wireframe Icosahedron */}
      <mesh material={wireMat}>
        <icosahedronGeometry args={[1.4, 2]} />
      </mesh>

      {/* Inner Solid Core */}
      <mesh material={coreMat}>
        <octahedronGeometry args={[0.8, 0]} />
      </mesh>

      {/* Orbiting Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]} material={wireMat}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
      </mesh>
    </group>
  );
}

export function PageEntity() {
  // Mobile fallback
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1, // Kept cleanly behind HTML text content (z-index 2)
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ fov: 45, position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} color="#60a5fa" intensity={3} />
        <pointLight position={[-5, -5, -2]} color="#3b82f6" intensity={1.5} />
        <CoreMesh />
      </Canvas>
    </div>
  );
}
