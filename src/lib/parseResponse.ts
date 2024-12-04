import { ConversationResponse } from "./types";

export const parseLLMResponseWithHorribleRegex = (
  input: string
): ConversationResponse | undefined => {
  // Regular expression to match JSON within ```json ... ```
  const jsonMatch = input.match(/```json\s*([\s\S]*?)\s*```/);

  if (jsonMatch && jsonMatch[1]) {
    try {
      // Extract and parse the JSON
      return JSON.parse(jsonMatch[1].trim());
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return undefined;
    }
  } else {
    console.error("No valid JSON block found.");
    return undefined;
  }
};
