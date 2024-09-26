const validateLogin = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must not be less than 8 characters";
  }

  return errors;
};

const validateRegister = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "First Name cannot be empty";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must not be less than 8 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Password is required";
  } else if (values.confirmPassword.length > 20) {
    errors.confirmPassword = "Password must not be less than 8 characters";
  }

  if (values.password !== values?.confirmPassword) {
    errors.confirmPassword = "Password does not match";
  }

  return errors;
};

export { validateLogin, validateRegister };
