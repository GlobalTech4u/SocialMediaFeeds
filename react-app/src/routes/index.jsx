import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import SignUp from "../components/signUp/SignUp";
import Login from "../components/login/Login";
import Home from "../components/home/Home";
import Newsfeed from "../components/newsfeed/Newsfeed";
import Profile from "../components/profile/Profile";
import User from "../components/user/User";
import { AuthContext } from "../components/authContext/AuthContext";

const AppRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* <ProtectedRoute> */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Newsfeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<User />} />
        </Route>
        {/* </ProtectedRoute> */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
