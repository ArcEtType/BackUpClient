import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import LogoLight from "assets/MobiOneLogo.png";
import LogoDark from "assets/MobiOneLogoDark.png";

const Admin = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const Logo = isLightMode ? LogoLight : LogoDark;
  const { data, isLoading } = useGetCustomersQuery();

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
                
                sx={{  objectFit: "cover" }}
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
    </Box>
  );
};

export default Admin;
