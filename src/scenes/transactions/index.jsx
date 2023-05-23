import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, frFR } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import LogoLight from "assets/MobiOneLogo.png";
import LogoDark from "assets/MobiOneLogoDark.png";
import DataGridCustomToolbarInProgress from "components/DataGridCustomToolbarInProgress";
import DataGridCustomToolbarFinish from "components/DataGridCustomToolbarFinish";
import {  styled } from "@mui/system";

/*--------------------------------------------------------------*/

const StepBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
}));

const StepIndicator = styled(Box)(({ theme, isActive, isCompleted }) => ({
  width: theme.spacing(2),
  height: theme.spacing(2),
  borderRadius: "50%",
  backgroundColor: isCompleted ? "green" : isActive ? "yellow" : "red",
  marginRight: theme.spacing(1),
}));

const StepLabel = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
}));


/*--------------------------------------------------------------*/
const Transactions = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const Logo = isLightMode ? LogoLight : LogoDark;

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
 /* ----------------------------------------------------------------------------------------*/
 

 
    const steps = [
      { label: "Réception", isCompleted: true },
      { label: "Diagnostic", isActive: true },
      { label: "Réparation" },
      { label: "Test" },
      { label: "Finalisé" },
    ];
  /*--------------------------------------------------------------------------------------------*/
  const columnsArray1 = [
    {
      field: "blabla",
      headerName: "Code article",
      flex: 1,
    },
    {
      field: "Code article",
      headerName: "Code article",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
    },
  ];
  const columnsArray2 = [
    {
      field: "Code article",
      headerName: "Code article",
      flex: 1,
    },
    {
      field: "waf waf",
      headerName: "waf waf",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
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
        sx={{  objectFit: "cover" }}
      />
      
      {/* BOX STEPBAR */}
      <Box display="flex" justifyContent="center" height="10vh">
        <StepBar style={{ width: "80%" }}>
          {steps.map((step, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          flex="1"
          justifyContent="center"
        >
          <StepIndicator
            isActive={step.isActive}
            isCompleted={step.isCompleted}
          />
          <StepLabel>{step.label}</StepLabel>
        </Box>
          ))}
        </StepBar>
      </Box>

      {/* BOX AUTRE ET FORM */}
      <Box display="flex" justifyContent="center" height="30vh">
        <Box width="45%">
          {/* BOX AUTRE */}

        </Box>
        <Box width="45%">
        {/* BOX DU FORMULAIRE */}

        </Box>
      </Box>

      {/* BOX  TABLEAUX */}    
      <Box display="flex" justifyContent="space-between" height="40vh">

        {/* TABLEAU 1 EN COURS */}
        <Box width="45%">
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
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row._id}
              rows={(data && data.transactions) || []}
              columns={columnsArray1}
              rowCount={(data && data.total) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              sortingMode="server"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              components={{ Toolbar: DataGridCustomToolbarInProgress }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
              }}
            />
          </Box>
        </Box>

        {/* TABLEAU 2 TERMINE */}
        <Box width="45%"  >
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
            <DataGrid
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
              loading={isLoading || !data}
              getRowId={(row) => row._id}
              rows={(data && data.transactions) || []}
              columns={columnsArray2}
              rowCount={(data && data.total) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              sortingMode="server"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              components={{ Toolbar: DataGridCustomToolbarFinish }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Transactions;