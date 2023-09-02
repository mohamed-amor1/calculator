import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import Calculator from "./Calculator";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <NextUIProvider>
        <div className="container mx-auto  flex flex-col gap-1 justify-center items-center p-4 h-screen min-w-[22%] bg-[#ef512c] dark:bg-gray-900 text-gray-900 dark:text-gray-50  ">
          <App />
          <Calculator />
        </div>
      </NextUIProvider>
    </React.StrictMode>
  );
}
