import React, { useState } from "react";
import { Box, useTheme, Button, Modal } from "@mui/material";
import { useGetAllCustomersQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import LogoLight from "assets/MobiOneLogo.png";
import LogoDark from "assets/MobiOneLogoDark.png";
import RegisterPage from "./RegisterPage";
//import Register from "../loginPage/Form";

const Admin = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const Logo = isLightMode ? LogoLight : LogoDark;
  const { data, isLoading } = useGetAllCustomersQuery();
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    {
      field: "firstName",
      headerName: "Firstname",
      flex: 0.5,
    },
    {
      field: "lastName",
      headerName: "lastName",
      flex: 0.5,
    },
    {
      field: "pseudo",
      headerName: "Pseudo",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        display="flex"
        alignItems="center"
        component="img"
        alt="profile"
        src={Logo}
        height="70px"
        width="300px"
        sx={{ objectFit: "cover" }}
      />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          
        </Box>
</Modal>

    <Button
      variant="contained"
      color="primary"
      onClick={handleOpenModal}
      sx={{ mt: 2 }}
    >
      Register New User
    </Button>
  </Box>

);
};

export default Admin;
