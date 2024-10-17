
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate from react-router-dom

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Use element prop to render the component */}
      <Route path="/admin/*" element={<AdminLayout />} /> {/* Pass the AdminLayout directly */}
      {/* Redirect from the root to /admin/dashboard */}
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  </BrowserRouter>
);






















