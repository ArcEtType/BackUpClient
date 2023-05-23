
import React, { useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { useGetAllUsersQuery, useDeleteUserMutation  } from "state/api";
import { DataGrid, frFR } from "@mui/x-data-grid";
import DataGridCustomToolbarAdmin from "components/DataGridCustomToolbarAdmin";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import LogoLight from "assets/MobiOneLogo.png";
import LogoDark from "assets/MobiOneLogoDark.png";
import RegisterPage from "./RegisterPage";
import UpdatePage from "./UpdatePage";

import CircularProgress from '@mui/material/CircularProgress';

import DeleteIcon from '@mui/icons-material/Delete';

const Admin = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const Logo = isLightMode ? LogoLight : LogoDark;
  const { data, isLoading,refetch } = useGetAllUsersQuery();
  
 
  const [deleteUser] = useDeleteUserMutation();
  const [showUpdatePage, setShowUpdatePage] = useState(false);
  

  /* ------------------------------------ PRODUCT DELETE -------------------------------------------------*/
  
  const handleDelete = async (user) => {
    try {
      await deleteUser(user._id);
      refetch();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };


/* update */
const handleClick = () => {
  setShowUpdatePage(true);
};

const handleAddUserClick = () => {
  setShowUpdatePage(false);
};

/*-----------------------------*/

  const columns = [
    {
      field: "firstName",
      headerName: "Prénom",
      flex: 0.5,
    },
    {
      field: "lastName",
      headerName: "Nom",
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
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Rôle",
      flex: 0.5,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div>
        <DeleteIcon
          color="error"
          onClick={() => handleDelete(params.row)}
          style={{ cursor: 'pointer', marginRight: '0.5rem' }}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={(handleClick)}
        >
          Modifier
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={(handleClick)}
        >
          Informations
        </Button>
      </div>
        
      ),
    },
  ];



  return (
    <Box m="1.5rem 2.5rem">
      {/* BOX LOGO */}
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

     
      
      {/* BOX PROFIL ET FORMULAIRE */}
      <Box display="flex" justifyContent="center" height="40vh">
        <Box width="45%">
        {/* BOX PROFIL */}

        </Box>
        {/* BOX DU FORMULAIRE */}
        <Box width="45%" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {showUpdatePage ? (
            <>
              <UpdatePage />
              <p>
                <a href="#add-user" className="link" onClick={handleAddUserClick}>Ajouter un nouvel utilisateur</a>
              </p>
            </>
                ) : (
            <>
              <RegisterPage />
              <p>
                <a href="#modify-user" className="link" onClick={handleClick}>Modifier un utilisateur</a>
              </p>
            </>
          )}
        </Box>
      </Box>
      {/* BOX TABLEAU */}
      <Box display="flex" justifyContent="center" width= "100%" height="40vh">
        <Box width="100%">
          <Box
            height="100%"
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
        {isLoading || !data ? (
          <CircularProgress /> // Indicateur de chargement
        ) : (
          <DataGrid
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data || []}
            columns={columns}
            components={{
              Toolbar: DataGridCustomToolbarAdmin,
              ColumnMenu: CustomColumnMenu,
            }}
            onRowClick={handleDelete}
          />
        )}
      </Box>     
    </Box>
    </Box>
    </Box>
);
};
export default Admin;