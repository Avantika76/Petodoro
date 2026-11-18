import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";


export default function Pet({ pet, scale }) {
  const { scene } = useGLTF(`/models/${pet}.glb`);

  const ref = useRef();

  useFrame(({ mouse }) => {
    if (!ref.current) return;

    // Follow cursor horizontally
    ref.current.rotation.y = mouse.x * 0.8;
  });

  const scales = {
    cat: 0.8,
    bunny: 5,
    chick: 0.8,
    dino: 1.2,
    fox: 0.8,
    sheep: 1,
    toothless: 0.7,
  };

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={(scales[pet] || 1) * scale}
      position={[0, -0.5, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}