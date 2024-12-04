import { createContext, useContext, useRef, useState } from "react";
import RecordRTC from "recordrtc";
import { ConversationContextType, ConversationResponse } from "../lib/types";

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

export const ConversationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  console.log("render");
  const [username, setUsername] = useState("testuser");
  const recorderRef = useRef<RecordRTC | null>(null);
  const [response, setResponse] = useState<ConversationResponse>();
  const [responseLoading, setResponseLoading] = useState(false);
  const [avatarSpeaking, setAvatarSpeaking] = useState(false);

  return (
    <ConversationContext.Provider
      value={{
        recorderRef,
        response,
        setResponse,
        responseLoading,
        setResponseLoading,
        username,
        setUsername,
        avatarSpeaking,
        setAvatarSpeaking,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useConversation = (): ConversationContextType => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  return context;
};
