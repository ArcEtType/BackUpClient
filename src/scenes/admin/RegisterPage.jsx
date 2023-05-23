import React from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";


const registerSchema = yup.object().shape({

  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  pseudo: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  role: yup
        .string()
        .required("Le rôle de l'utilisateur est requis")
        .oneOf(["Lecteur", "Reparateur","Vendeur", "Empereur"], "Le rôle n'est pas valide'")
        .default("Lecteur"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  pseudo: "",
  password: "",
  email: "",
  role: "Lecteur",
};

const RegisterPage = () => {
 
  
  const handleFormSubmit = async (values, onSubmitProps) => {
    const user = JSON.stringify(values);
    
    

  const response = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
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
    <Box m="1.5rem 2.5rem" display="flex" flexDirection="column" alignItems="center">
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
              required
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
              required
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
              required
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
              required
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
              required
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              select
              label="Role"
              name="role"
              required
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.role && Boolean(errors.role)}
              helperText={touched.role && errors.role}
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="Lecteur">Lecteur</MenuItem>
              <MenuItem value="Reparateur">Reparateur</MenuItem>
              <MenuItem value="Vendeur">Vendeur</MenuItem>
              <MenuItem value="Empereur">Empereur</MenuItem>

            </TextField>
            <Box>
            <Button type="submit" variant="contained" color="primary">
              Ajouter
            </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterPage;