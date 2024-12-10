import React from 'react';
import { createRoot } from "react-dom/client";
import 'sweetalert2/src/sweetalert2.scss';
import Routers from "./routers";
import './index.css';

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<React.StrictMode><Routers /></React.StrictMode>);
} else {
  console.error("Root element not found. Make sure there is an element with id 'root' in your HTML.");
}
