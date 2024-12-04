import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import { ConversationResponse } from "../types";
import { fetchLLMResponse } from "../fetch/fetchLLMResponse";

export const initRecorder = async (
  recorderRef: React.MutableRefObject<RecordRTC | null>,
  handleDataAvailable: (event: Blob) => Promise<void>
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    recorderRef.current = new RecordRTC(stream, {
      type: "audio",
      recorderType: StereoAudioRecorder,
      mimeType: "audio/wav",
      timeSlice: 4000,
      desiredSampRate: 12000,
      numberOfAudioChannels: 1,
      ondataavailable: handleDataAvailable,
    });
  } catch (error) {
    console.error("Error accessing microphone:", error);
  }
};

export const startRecording = (
  recorderRef: React.MutableRefObject<RecordRTC | null>
) => {
  if (recorderRef.current) {
    recorderRef.current.reset();
    recorderRef.current.startRecording();
  }
};

export const stopRecording = async (
  username: string,
  recorderRef: React.MutableRefObject<RecordRTC | null>,
  setResponse: React.Dispatch<
    React.SetStateAction<ConversationResponse | undefined>
  >,
  setResponseLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!recorderRef.current || recorderRef.current.getState() != "recording")
    return;
  setResponseLoading(true);
  recorderRef.current.stopRecording();
  fetchLLMResponse(username, setResponse, setResponseLoading);
};
