import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.jsx";
import { LoaderProvider } from "./context/loaderProvider.jsx";
import NotificationProvider from "./component/shared/notificationProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NotificationProvider>
      <LoaderProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </LoaderProvider>
    </NotificationProvider>
  </BrowserRouter>
);
