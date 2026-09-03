"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import type * as THREE from "three";

const BuildingBlock = ({
  position,
  color,
  delay = 0,
}: {
  position: [number, number, number];
  color: string;
  delay?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + delay) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const BusinessNodes = () => {
  const nodes = [
    { pos: [0, 0, 0] as [number, number, number], color: "#00FF85", scale: 1.2 },
    { pos: [-2, 1, -1] as [number, number, number], color: "#1E90FF", scale: 0.8 },
    { pos: [2, -1, 1] as [number, number, number], color: "#FFD700", scale: 0.9 },
    { pos: [0, 2, -2] as [number, number, number], color: "#FF6B6B", scale: 0.7 },
    { pos: [-1, -2, 0] as [number, number, number], color: "#00FF85", scale: 0.6 },
  ];

  return (
    <group>
      {nodes.map((node, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={node.pos} castShadow>
            <sphereGeometry args={[node.scale, 32, 32]} />
            <MeshDistortMaterial
              color={node.color}
              distort={0.2}
              speed={2}
              metalness={0.5}
              roughness={0.3}
              emissive={node.color}
              emissiveIntensity={0.15}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const CatchmentRing = ({ radius = 3, color = "#1E90FF" }: { radius?: number; color?: string }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const Hero3DScene = () => {
  return (
    <>
      <BusinessNodes />
      <CatchmentRing radius={3.5} color="#00FF85" />
      <CatchmentRing radius={4.2} color="#1E90FF" />
      <CatchmentRing radius={5} color="#FFD700" />
      <BuildingBlock position={[-4, -2, 2]} color="#1E90FF" delay={0} />
      <BuildingBlock position={[4, 1, -3]} color="#FFD700" delay={1} />
      <BuildingBlock position={[-3, 3, 1]} color="#FF6B6B" delay={2} />
      <BuildingBlock position={[3, -3, 2]} color="#00FF85" delay={3} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00FF85" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#1E90FF" />
    </>
  );
};

interface HeroSceneProps {
  className?: string;
}

export const HeroScene = ({ className = "absolute inset-0" }: HeroSceneProps) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Hero3DScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export const MotionDiv = motion.div;
export const MotionP = motion.p;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionButton = motion.button;
