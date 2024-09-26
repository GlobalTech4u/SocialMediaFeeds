import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../authContext/AuthContext";
import NavBar from "../navBar/NavBar";

const Home = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <NavBar />;
};

export default Home;
