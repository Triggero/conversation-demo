import { Canvas } from "@react-three/fiber";
import Scene from "../components/canvas/Scene";
import Avatar from "../components/canvas/Avatar";
import { Loader } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { Stats } from "@react-three/drei";
import CanvasUI from "../components/UI/CanvasUI";
import useWebSocket from "react-use-websocket";
import { transcribeURL } from "../lib/const";
import { initRecorder } from "../lib/speech/recorder";
import { handleDataAvailable } from "../lib/speech/handleDataAvailable";
import { blobToBase64 } from "../lib/speech/blobToBase64";
import { useConversation } from "../hooks/useConversation";

function Conversation() {
  const { sendMessage } = useWebSocket(transcribeURL, {
    onOpen: () => console.log("WebSocket connection opened"),
    onClose: () => console.log("WebSocket connection closed"),
    onMessage: (event) => {
      console.log(event);
      const transcriptionResponse = JSON.parse(event.data);
      console.log(transcriptionResponse.transcription);
    },
    //shouldReconnect: () => true,
  });

  const { username, recorderRef } = useConversation();

  useEffect(() => {
    initRecorder(recorderRef, (event: Blob) =>
      handleDataAvailable(event, username, sendMessage, blobToBase64)
    );
  }, []);

  return (
    <>
      <CanvasUI />
      <Canvas
        shadows
        dpr={[1, 1.5]}
        className="bg-gradient-to-br from-rose-300 via-red-300 to-orange-200"
        camera={{ position: [0, 3, 10], fov: 30 }}
      >
        <Suspense fallback={null}>
          <Scene>
            <Avatar />
          </Scene>
        </Suspense>
        <Stats />
      </Canvas>
      <Loader />
    </>
  );
}

export default Conversation;
