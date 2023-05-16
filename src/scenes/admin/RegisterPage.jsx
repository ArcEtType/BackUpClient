import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";


const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  pseudo: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  pseudo: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
    
 
  const handleFormSubmit = async (values,  onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
        formData.append(value, values[value]);
      }
    
    const response = await fetch(
        "http://localhost:5001/auth/register", 
        {
          method: "POST",
          body: formData,
        }
    );
    const savedUser = await response.json();
    onSubmitProps.resetForm();
        if (savedUser) {
          
    
          // Réinitialiser le formulaire après l'enregistrement de l'utilisateur
          onSubmitProps.resetForm();
        } 
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Formik
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Prénom"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Nom"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Pseudo"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.pseudo}
              name="pseudo"
              error={Boolean(touched.pseudo) && Boolean(errors.pseudo)}
              helperText={touched.pseudo && errors.pseudo}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ marginBottom: 2 }}
            />

            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterPage;