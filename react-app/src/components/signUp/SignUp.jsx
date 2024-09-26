import { useContext } from "react";
import { useFormik } from "formik";
import { TextField, Select, MenuItem, Input, Alert } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

import { AuthContext } from "../authContext/AuthContext";
import { createUser } from "../../services/auth.service";
import { validateRegister } from "../../helpers/validate.helper";
import "./SignUp.css";

const BACKGROUND_IMAGE_URL =
  "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg";

const SignUp = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitSignUpForm = async (values) => {
    const payload = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      jobTitle: values?.jobTitle,
      gender: values?.gender,
      password: values?.password,
      profilePicture: values?.profilePicture,
    };

    createUser(payload)
      .then((res) => {
        if (res?.status == 201) {
          navigate("/login");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleProfilePictureUpload = (event) => {
    formik.setFieldValue("profilePicture", event?.target?.files[0]);
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
    validate: validateRegister,
    onSubmit: submitSignUpForm,
  });

  const redirectToLogin = () => navigate("/login");

  const { values, handleChange } = formik;

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="sign-up-container">
      <div className="left-container">
        <img
          src={BACKGROUND_IMAGE_URL}
          className="img-fluid"
          alt="Background image"
        />
      </div>
      <div className="right-container">
        <button className="trial-btn text-white">
          <span className="text-bold">Sign up for free</span>
        </button>
        <form className="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="firstName"
            label="First name"
            required={true}
            autoComplete="first-name"
            value={values?.firstName}
            onChange={handleChange}
          />
          {formik.errors.firstName ? (
            <Alert severity="error">{formik.errors.firstName}</Alert>
          ) : null}
          <TextField
            id="lastName"
            label="Last name"
            autoComplete="last-name"
            value={values?.lastName}
            onChange={handleChange}
          />
          {formik.errors.lastName ? (
            <Alert severity="error">{formik.errors.lastName}</Alert>
          ) : null}
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
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            autoComplete="confirm-password"
            required={true}
            value={values?.confirmPassword}
            onChange={handleChange}
          />
          {formik.errors.confirmPassword ? (
            <Alert severity="error">{formik.errors.confirmPassword}</Alert>
          ) : null}
          <Select
            id="gender"
            label="Gender"
            value={values?.gender}
            onChange={(event) =>
              formik.setFieldValue("gender", event?.target?.value)
            }
          >
            <MenuItem value={"select"} disabled={true}>
              Select Gender
            </MenuItem>
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
          {formik.errors.gender ? (
            <Alert severity="error">{formik.errors.gender}</Alert>
          ) : null}
          <TextField
            id="jobTitle"
            label="Job Title"
            autoComplete="job-title"
            value={values?.jobTitle}
            onChange={handleChange}
          />
          {formik.errors.jobTitle ? (
            <Alert severity="error">{formik.errors.jobTitle}</Alert>
          ) : null}
          <Input
            type="file"
            name="profilePicture"
            onChange={handleProfilePictureUpload}
          />
          <button
            type="submit"
            className="submit-btn text-white cursor-pointer"
          >
            Sign up
          </button>
        </form>
        <p className="footer-text">
          By clicking the button, you are agreeing to our&nbsp;
          <a href="#" className="footer-link">
            Terms and Services
          </a>
        </p>
        <p className="footer-text">
          Already have an account?&nbsp;
          <span
            onClick={redirectToLogin}
            className="footer-link cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
