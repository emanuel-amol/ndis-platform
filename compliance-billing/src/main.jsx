import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";
createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes><Route path="/*" element={<App/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes>
  </BrowserRouter>
);