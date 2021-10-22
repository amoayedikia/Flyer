import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

const validationSchema = yup.object({
  email: yup.string("Enter your email").email("Enter a valid email"),
});

// const theme = createTheme();

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
    },
  });

  return (
    // <ThemeProvider theme={theme}>
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="newsletterEmail"
        name="newsletterEmail"
        label="Sign up for our newsletter"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
    // </ThemeProvider>
  );
}
