import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./style.css";
import { ContextProvider } from "./components/context/Appcontext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
