import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment
} from "@react-three/drei";

import Pet from "./Pet";

export default function PetScene({
  pet,
  scale = 1
}) {
  return (
    <Canvas
      camera={{
        position: [0, 1.5, 5],
        fov: 50,
      }}
    >
      {/* Sunset lighting */}
      <ambientLight intensity={2} />

      <directionalLight
        position={[10, 10, 5]}
        intensity={3}
      />

      <pointLight
        position={[-10, 5, -10]}
        intensity={4}
        color="orange"
      />

      {/* Beautiful environment */}
      <Environment preset="sunset" />

      {/* Grass Ground */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
      >
        <planeGeometry
          args={[100, 100]}
        />

        <meshStandardMaterial
          color="#7ED957"
        />
      </mesh>

      {/* Pet */}
      <Pet
        pet={pet}
        scale={scale}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}