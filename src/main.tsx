import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConversationProvider } from "./hooks/useConversation.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConversationProvider>
      <App />
    </ConversationProvider>
  </StrictMode>
);
