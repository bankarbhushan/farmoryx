// CustomToaster.jsx
import React from "react";
import { Toaster } from "react-hot-toast"; // or "sonner" if you're using Sonner

const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: {
          background: "#fff",
          color: "#0a7a30",
          padding: "12px 18px",
          fontSize: "15px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        },
        success: {
          iconTheme: {
            primary: "#0a7a30",
            secondary: "white",
          },
        },
        error: {
          style: {
            background: "#c62828",
            color: "#ffff",
          },
          iconTheme: {
            primary: "#c62828 ",
            secondary: "white",
          },
        },
      }}
    />
  );
};

export default CustomToaster;
