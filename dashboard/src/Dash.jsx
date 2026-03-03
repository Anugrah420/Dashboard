import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const [data, setData] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    setData(user);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <h2>Welcome, {data?.name || data?.user?.name}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">My App</h2>

        <nav className="sidebar-menu">

          {data?.user?.role === "receptionist" && (
            <NavLink to="/receptionist" className="sidebar-link">
              Receptionist
            </NavLink>
          )}

          {data?.user?.role === "doctor" && (
            <NavLink to="/doctor" className="sidebar-link">
              Doctor
            </NavLink>
          )}

          {data?.user?.role === "admin" && (
            <NavLink to="/admin" className="sidebar-link">
              Admin
            </NavLink>
          )}

        </nav>
      </div>

      {/* User Info Card */}
      <div className="card">
        <h3>Profile Information</h3>
        <div className="info-row">
          <span>Email:</span>
          <span>{data?.email || data?.user?.email}</span>
        </div>
        <div className="info-row">
          <span>Role:</span>
          <span>{data?.role || data?.user?.role}</span>
        </div>
        <div className="info-row">
          <span>User ID:</span>
          <span>{data?.user_id || data?.user?.user_id}</span>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;