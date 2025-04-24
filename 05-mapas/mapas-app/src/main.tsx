import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { MapasApp } from "./MapasApp";

import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MapasApp />
  </StrictMode>
);
