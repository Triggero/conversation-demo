import { promptURL } from "../const";
import { parseLLMResponseWithHorribleRegex } from "../parseResponse";
import { ConversationResponse } from "../types";

export const fetchLLMResponse = async (
  username: string,
  setResponse: React.Dispatch<
    React.SetStateAction<ConversationResponse | undefined>
  >,
  setResponseLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(promptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const responseLLM = parseLLMResponseWithHorribleRegex(data.text.text);
    setResponse(responseLLM);
    setResponseLoading(false);
    return data;
  } catch (error) {
    setResponseLoading(false);
    console.error("Error sending transcription:", error);
  }
};
