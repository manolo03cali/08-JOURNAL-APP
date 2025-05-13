import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { JournalApp } from "./JournalApp";
import { AppTheme } from "./theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppTheme>
      <JournalApp />
    </AppTheme>
  </StrictMode>
);
