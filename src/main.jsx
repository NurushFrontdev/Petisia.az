import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
const ClIENT_ID =
  "505524197697-ra4aihm6l39lbeq95rd502h7g4m5mbra.apps.googleusercontent.com";
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={ClIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);
