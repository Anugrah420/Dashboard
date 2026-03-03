import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Receptionist.css";

const Receptionist = ({ user }) => {
  const [data, setData] = useState(user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patient_name: "",
    doctor_name: "",
  });

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setData(user);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPatient = {
      id: Date.now(),
      ...formData
    };

    setPatients([...patients, newPatient]);
    setFormData({ patient_name: "", doctor_name: "" });
  };

  return (
    <div className="main-container">

      {/* Header */}
      <div className="main-header">
        <h2>Welcome, {data?.name || data?.user?.name}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Profile Card */}
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

      {/* Add Patient Form */}
      <div className="form-card">
        <h3>Register New Patient</h3>
        <form className="addPatient" onSubmit={handleSubmit}>
          <input
            type="text"
            name="patient_name"
            placeholder="Patient Name"
            value={formData.patient_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="doctor_name"
            placeholder="Doctor Name"
            value={formData.doctor_name}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Patient</button>
        </form>
      </div>

      {/* Patient List */}
      <div className="patient-list">
        <h3>Today's Registered Patients</h3>
        {patients.length === 0 ? (
          <p>No patients registered yet.</p>
        ) : (
          <ul>
            {patients.map((patient) => (
              <li key={patient.id}>
                <strong>{patient.patient_name}</strong> → Dr. {patient.doctor_name}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default Receptionist;  