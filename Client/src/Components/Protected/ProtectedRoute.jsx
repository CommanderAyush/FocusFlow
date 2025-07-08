// src/Components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/userId/check") // backend must handle this route
      .then(() => {
        setAuthorized(true);
        setLoading(false);
      })
      .catch(() => {
        setAuthorized(false);
        setLoading(false);
        navigate("/"); // redirect to login
      });
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  return authorized ? children : null;
}
