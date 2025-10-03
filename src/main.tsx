import TanStackProvider from "src/providers/TanStackProvider.tsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanStackProvider>
      <App />
    </TanStackProvider>
    <Toaster position="top-center" richColors={true} />
  </StrictMode>
);
