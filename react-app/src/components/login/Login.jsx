import { useContext } from "react";
import { useFormik } from "formik";
import { TextField, Alert } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

import { loginUser } from "../../services/auth.service";
import { AuthContext } from "../authContext/AuthContext";

import { validateLogin } from "../../helpers/validate.helper";
import "./Login.css";

const BACKGROUND_IMAGE_URL =
  "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg";

const Login = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitSignInForm = async (values) => {
    const payload = {
      email: values?.email,
      password: values?.password,
    };

    loginUser(payload)
      .then((res) => {
        if (res?.status === 200) {
          const user = res?.data?.user;
          setToken(user?.token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        }
      })
      .catch((err) => {
        setToken("");
        localStorage.removeItem("token");
      });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "select",
      jobTitle: "",
      profilePicture: "",
    },
    validate: validateLogin,
    onSubmit: submitSignInForm,
  });

  const redirectToSignUp = () => navigate("/sign-up");

  const { values, handleChange } = formik;

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-container">
      <div className="left-container">
        <img
          src={BACKGROUND_IMAGE_URL}
          className="img-fluid"
          alt="Background image"
        />
      </div>
      <div className="right-container">
        <button className="trial-btn text-white">
          <span className="text-bold">Login</span>
        </button>
        <form className="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            label="Email"
            required={true}
            autoComplete="email"
            value={values?.email}
            onChange={handleChange}
          />
          {formik.errors.email ? (
            <Alert severity="error">{formik.errors.email}</Alert>
          ) : null}
          <TextField
            id="password"
            label="Password"
            autoComplete="password"
            type="password"
            required={true}
            value={values?.password}
            onChange={handleChange}
          />
          {formik.errors.password ? (
            <Alert severity="error">{formik.errors.password}</Alert>
          ) : null}

          <button
            type="submit"
            className="submit-btn text-white cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="footer-text">
          Don't have an account?&nbsp;
          <span
            onClick={redirectToSignUp}
            className="footer-link cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
