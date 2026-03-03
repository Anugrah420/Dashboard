import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import Dashboard from "./Dash";
import AuthProtection from "./AuthProtection";
import RoleProtectedRoute from "./RoleProtectedRoute";
import Receptionist from "./Receptionist";
function App() {
  return (
    <Router>
      <Routes>
        {/* Login / Signup Page */}
        <Route path="/" element={<AuthPage />} />
        {/* Protected Dashboard */}
        <Route
          path="/receptionist"
          element={
              <RoleProtectedRoute allowedRoles={["admin","receptionist"]}>
              <Receptionist/>
              </RoleProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
              <AuthProtection>
                <Dashboard/>
              </AuthProtection>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;

