import RecordRTC from "recordrtc";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

export type GLTFAvatar = GLTF & {
  nodes: {
    [key: string]: any;
  };
  materials: {
    [key: string]: THREE.MeshStandardMaterial;
  };
};

export interface MouthCue {
  start: number;
  end: number;
  value: string;
}

export interface ConversationResponse {
  text: string;
  faceAnimation: string;
  animation: string;
}

export interface ConversationContextType {
  response: ConversationResponse | undefined;
  username: string;
  recorderRef: React.MutableRefObject<RecordRTC | null>;
  avatarSpeaking: boolean;
  setAvatarSpeaking: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setResponse: React.Dispatch<
    React.SetStateAction<ConversationResponse | undefined>
  >;
  responseLoading: boolean;
  setResponseLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
