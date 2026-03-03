import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await fetch("http://localhost:7000/authRole", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ "roles": allowedRoles })
        });

        if (!res.ok) throw new Error("Unauthorized");

        const result = await res.json();
        setData(result.user);

      } catch (error) {
        localStorage.removeItem("access_token");
        navigate("/");
      } finally {
        setLoad(false);
      }
    };

    checkRole();
  }, [navigate, allowedRoles]);

  if (load) return <div>Loading...</div>;
  return React.cloneElement(children, { user: data });
};

export default RoleProtectedRoute;