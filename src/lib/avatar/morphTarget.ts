import * as THREE from "three";
import { lerp } from "three/src/math/MathUtils.js";

export const morphTarget = (
  target: string,
  value: number,
  duration = 0.1,
  scene: THREE.Group<THREE.Object3DEventMap>
) => {
  scene.traverse((object: any) => {
    if (object.isSkinnedMesh && object.morphTargetDictionary) {
      const influence = object.morphTargetDictionary[target];

      object.morphTargetInfluences[influence] = lerp(
        object.morphTargetInfluences[influence],
        value,
        duration
      );
    }
  });
};
