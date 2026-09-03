"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { random } from "maath";

interface StarsProps {
  count?: number;
  radius?: number;
  color?: string;
  speed?: number;
}

const StarsField = ({
  count = 5000,
  radius = 1.2,
  color = "#00FF85",
  speed = 1,
}: StarsProps) => {
  const ref = useRef<import("three").Points>(null);
  
  const positions = random.inSphere(new Float32Array(count * 3), { radius }) as Float32Array;

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / (10 * speed);
      ref.current.rotation.y -= delta / (15 * speed);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={color}
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

interface StarsCanvasProps {
  count?: number;
  radius?: number;
  color?: string;
  speed?: number;
  className?: string;
}

export const StarsCanvas = ({
  count = 600,
  radius = 1.2,
  color = "#00FF85",
  speed = 1,
  className = "absolute inset-0 z-[-1] h-auto w-full",
}: StarsCanvasProps) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.2]}
        gl={{ powerPreference: "low-power", antialias: false }}
      >
        <StarsField count={count} radius={radius} color={color} speed={speed} />
      </Canvas>
    </div>
  );
};
