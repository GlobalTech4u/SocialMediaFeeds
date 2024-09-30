import { useContext, useState } from "react";
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";

import { TextField, Select, MenuItem, Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";

import { AuthContext } from "../authContext/AuthContext";
import { createUser } from "../../services/user.service";
import { validateRegister } from "../../helpers/validate.helper";
import { fileTypes } from "../../constants/common.constant";
import "./SignUp.css";

const BACKGROUND_IMAGE_URL =
  "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg";

const SignUp = () => {
  const { token } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleProfilePictureUpload = (file) => {
    formik.setFieldValue("profilePicture", file);
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

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
            <Alert className="error" severity="error">
              {formik.errors.firstName}
            </Alert>
          ) : null}
          <TextField
            id="lastName"
            label="Last name"
            autoComplete="last-name"
            value={values?.lastName}
            onChange={handleChange}
          />
          {formik.errors.lastName ? (
            <Alert className="error" severity="error">
              {formik.errors.lastName}
            </Alert>
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
            <Alert className="error" severity="error">
              {formik.errors.email}
            </Alert>
          ) : null}
          <FormControl className="password-field" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={values?.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {formik.errors.password ? (
            <Alert className="error" severity="error">
              {formik.errors.password}
            </Alert>
          ) : null}
          <FormControl className="password-field" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={values?.confirmPassword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
          {formik.errors.confirmPassword ? (
            <Alert className="error" severity="error">
              {formik.errors.confirmPassword}
            </Alert>
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
            <Alert className="error" severity="error">
              {formik.errors.gender}
            </Alert>
          ) : null}
          <TextField
            id="jobTitle"
            label="Job Title"
            autoComplete="job-title"
            value={values?.jobTitle}
            onChange={handleChange}
          />
          {formik.errors.jobTitle ? (
            <Alert className="error" severity="error">
              {formik.errors.jobTitle}
            </Alert>
          ) : null}
          <FileUploader
            classes="profile-picture-upload"
            multiple={false}
            handleChange={handleProfilePictureUpload}
            name="profilePicture"
            types={fileTypes}
            maxSize={12}
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
