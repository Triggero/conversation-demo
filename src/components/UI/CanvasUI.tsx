import { useState } from "react";
import { useConversation } from "../../hooks/useConversation";
import CanvasButton from "./CanvasButton";
import { Mic, MicOff, PhoneOff, WandSparkles } from "lucide-react";
import { startRecording, stopRecording } from "../../lib/speech/recorder";
import LoadingIcon from "./LoadingIcon";

export interface canvasUIProps {
  hidden?: boolean;
}

const CanvasUI = ({ hidden }: canvasUIProps) => {
  const [userSpeaking, setUserSpeaking] = useState(false);

  const {
    username,
    setResponse,
    recorderRef,
    avatarSpeaking,
    responseLoading,
    setResponseLoading,
  } = useConversation();

  return (
    <>
      {!hidden && (
        <div className="fixed bottom-10 z-10 flex w-full h-fit justify-center">
          <div className="flex flex-row w-2/3 sm:w-1/5 h-fit py-4 px-6 justify-between items-center bg-white/15 rounded-full shadow-md backdrop-blur-[4px] border border-white/20">
            <CanvasButton
              variant="switcher"
              disabled={avatarSpeaking || responseLoading}
              //Show LLM model select modal
              onClick={() => {}}
            >
              <WandSparkles />
            </CanvasButton>
            <CanvasButton
              variant="mic"
              disabled={avatarSpeaking || responseLoading}
              active={userSpeaking}
              onClick={
                userSpeaking
                  ? () => {
                      setUserSpeaking(false);
                      stopRecording(
                        username,
                        recorderRef,
                        setResponse,
                        setResponseLoading
                      );
                    }
                  : () => {
                      setUserSpeaking(true);
                      startRecording(recorderRef);
                    }
              }
            >
              {userSpeaking ? <Mic /> : <MicOff />}
            </CanvasButton>
            <CanvasButton
              variant="end"
              disabled={avatarSpeaking || responseLoading}
              // Route to Client selector
              onClick={() => {}}
            >
              <PhoneOff />
            </CanvasButton>
          </div>
        </div>
      )}
      {responseLoading && (
        <div className="flex items-center text-white font-light fixed bottom-0 pb-3 pl-4 z-10">
          <LoadingIcon />
          <p>Client is thinking</p>
        </div>
      )}
    </>
  );
};

export default CanvasUI;
