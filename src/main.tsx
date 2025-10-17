import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import Router from "./Router.tsx";
import { DictionaryContextProvider } from "./Context/DictionaryContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/hanzi-trainer">
      <DictionaryContextProvider>
        <Router />
      </DictionaryContextProvider>
    </BrowserRouter>
  </StrictMode>
);
