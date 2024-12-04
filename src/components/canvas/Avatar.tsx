import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { faceAnimations, blendShapes } from "../../lib/const";
import { GLTFAvatar, MouthCue } from "../../lib/types";
import { useFrame } from "@react-three/fiber";
import { useConversation } from "../../hooks/useConversation";
import { morphTarget } from "../../lib/avatar/morphTarget";

const responseTest = {
  text: "example",
  //animation: "Waving",
  //faceAnimation: "smile",
  //audio: "../../audio/intro_0.wav",
  mouthCues: [
    { start: 0.0, end: 0.03, value: "X" },
    { start: 0.03, end: 0.15, value: "C" },
    { start: 0.15, end: 0.57, value: "B" },
    { start: 0.57, end: 0.94, value: "X" },
    { start: 0.94, end: 1.04, value: "C" },
    { start: 1.04, end: 1.11, value: "E" },
    { start: 1.11, end: 1.25, value: "F" },
    { start: 1.25, end: 1.32, value: "B" },
    { start: 1.32, end: 1.53, value: "C" },
    { start: 1.53, end: 1.6, value: "B" },
    { start: 1.6, end: 1.9, value: "X" },
  ],
};

const outputAudio = new Audio();

const Avatar = ({ ...props }) => {
  // Define ref for avatar object group
  const group = useRef<THREE.Group>(null!);

  // Load avatar model
  const { nodes, materials, scene } = useGLTF(
    "/models/670d16ab05e11779300760fd.glb"
  ) as GLTFAvatar;

  // Load animations and assign to group ref
  const { animations } = useGLTF("/models/animations1.glb");
  const { actions } = useAnimations(animations, group);

  const { response, username, avatarSpeaking, setAvatarSpeaking } =
    useConversation();

  // State
  const [mouthCues, setMouthCues] = useState<MouthCue[]>();
  const [faceAnimation, setFaceAnimation] = useState("");
  const [animation, setAnimation] = useState("");

  // Set state to response from API
  useEffect(() => {
    if (response) {
      console.log(response.text);
      console.log(response);

      setAnimation(response.animation);
      setFaceAnimation(response.faceAnimation);
      setMouthCues(responseTest.mouthCues);

      outputAudio.src = `http://localhost:8502/audio/${username}`;
      outputAudio.play();

      outputAudio.onplay = () => {
        setAvatarSpeaking(true);
      };

      outputAudio.onended = () => {
        setAvatarSpeaking(false);
      };
    } else {
      setAnimation("Standing Idle");
      setFaceAnimation("smile");
    }
  }, [response, username]);

  // Play animation when it's set to a new value. Fade out previous animation.
  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [actions, animation]);

  useFrame(() => {
    // Morph facial nodes to expression
    const currentFaceAnimation = faceAnimations[faceAnimation];
    Object.keys(nodes.Wolf3D_Head.morphTargetDictionary).forEach((key) => {
      const value =
        currentFaceAnimation && currentFaceAnimation[key]
          ? currentFaceAnimation[key]
          : 0;
      morphTarget(key, value, 0.1, scene);
    });

    // Morph blend shapes based on mouth cues, synced with current audio time
    if (avatarSpeaking) {
      if (response && mouthCues) {
        const currentMouthCue = mouthCues.find(
          (mouthCue) =>
            outputAudio.currentTime >= mouthCue.start &&
            outputAudio.currentTime <= mouthCue.end
        );

        if (currentMouthCue) {
          morphTarget(blendShapes[currentMouthCue.value], 1, 0.2, scene);
        }
      }
    }
  });

  return (
    <group {...props} dispose={null} ref={group} castShadow>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
  );
};

useGLTF.preload([
  "/models/670d16ab05e11779300760fd.glb",
  "/models/animations1",
]);
export default Avatar;
