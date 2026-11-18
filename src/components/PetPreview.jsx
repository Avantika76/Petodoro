import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";

function Model({ pet }) {
  const { scene } = useGLTF(`/models/${pet}.glb`);

  const ref = useRef();

  const scales = {
    cat: 0.7,
    bunny: 5,
    chick: 0.5,
    dino: 1,
    fox: 0.5,
    sheep: 0.9,
    toothless: 0.4,
  };

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;

      ref.current.position.y =
        -1 +
        Math.sin(state.clock.elapsedTime * 2) *
          0.08;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={scales[pet]}
    />
  );
}

export default function PetPreview({ pet }) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 45,
      }}
    >
      <ambientLight intensity={2} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <Model pet={pet} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}