import { SendMessage } from "react-use-websocket";

export const handleDataAvailable = async (
  event: Blob,
  username: string,
  sendMessage: SendMessage,
  blobToBase64: (blob: Blob) => Promise<string | undefined>
) => {
  if (event.size > 0) {
    try {
      const b64 = await blobToBase64(event);
      sendMessage(
        JSON.stringify({
          username: username,
          audio: b64,
        })
      );
    } catch (error) {
      console.error("Error processing audio data:", error);
    }
  }
};
