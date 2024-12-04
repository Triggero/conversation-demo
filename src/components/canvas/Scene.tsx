import {
  AccumulativeShadows,
  Center,
  RandomizedLight,
  Stage,
} from "@react-three/drei";

interface SceneProps {
  children?: React.ReactNode;
}

export function Scene({ children }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Stage preset={"rembrandt"} intensity={1} shadows environment={"city"}>
        <Center>{children}</Center>
      </Stage>
      {/* <AccumulativeShadows temporal frames={100} color="orange" colorBlend={2} toneMapped={true} alphaTest={0.75} opacity={2} scale={12}>
          <RandomizedLight intensity={Math.PI} amount={8} radius={4} ambient={0.5} position={[5, 5, -10]} bias={0.001} />
        </AccumulativeShadows> */}
    </>
  );
}

export default Scene;
