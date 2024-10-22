import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Parent route: AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Child routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user" element={<UserProfile />} />
        <Route path="table" element={<TableList />} />
        <Route path="maps" element={<Maps />} />
        <Route path="upgrade" element={<Upgrade />} />
      </Route>

      {/* Redirect from root to /admin/dashboard */}
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  </BrowserRouter>
);
