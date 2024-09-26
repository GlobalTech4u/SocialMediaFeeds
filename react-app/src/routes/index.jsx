import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import SignUp from "../components/signUp/SignUp";
import Login from "../components/login/Login";
import Home from "../components/home/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
