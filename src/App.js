import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Transactions from "scenes/transactions";

import Admin from "scenes/admin";

import Login from "scenes/loginPage";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.global.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>

              <Route path="/" element={<Login />} />
           
              <Route element={isAuth ? <Layout /> : <Navigate to="/" />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stock" element={<Products />} />
              <Route path="/reparation" element={<Transactions />} />
              
              <Route path="/admin" element={<Admin />} />
              
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
