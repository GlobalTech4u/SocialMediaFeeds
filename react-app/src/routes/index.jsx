import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "../components/signUp/SignUp";
import Login from "../components/login/Login";
import Home from "../components/home/Home";
import Newsfeed from "../components/newsfeed/Newsfeed";
import Profile from "../components/profile/Profile";
import User from "../components/user/User";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <ProtectedRoute> */}
        <Route path="/" element={<Home />}>
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
