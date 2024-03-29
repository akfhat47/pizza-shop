import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConsoleContextProvider } from "./hooks/ConsoleStateHook";
import { store } from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConsoleContextProvider>
        <App />
      </ConsoleContextProvider>
    </Provider>
  </React.StrictMode>
);
