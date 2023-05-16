import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";




const Products = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetProductsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search: searchInput,
  });
  useEffect(() => {
    // Filtrer les données en fonction de la valeur de recherche
    if (data) {
      const filtered = data.filter((product) =>
        product.Designation.includes(searchInput)
      );
      setFilteredData(filtered || []);
    }
  }, [data, searchInput, setFilteredData]);

  const columns = [
    {
      field: "Code article",
      headerName: "Code article",
      flex: 1,
    },
    {
      field: "Designation",
      headerName: "Designation",
      flex: 1,
    },
    {
      
        field: "Taille",
        headerName: "Taille",
        flex: 1,
        valueFormatter: (params) => {
          if (params.value === null) {
            return ""; // Retourne une chaîne vide si la valeur est null
          }
          return `${params.value} GO`;
        },
    },
    {
      field: "Couleur",
      headerName: "Couleur",
      flex: 1,
    },
    {
      field: "Rayon",
      headerName: "Rayon",
      flex: 1,
    },
   {
  field: "Stock",
  headerName: "Stock",
  flex: 1,
  cellClassName: (params) =>
    params.value <= 0 ? "negative-stock flash-warning" : "negative-stock",
  renderCell: (params) => (
    <div className={params.row.Stock <= 0 ? "flash-warning" : ""}>
      {params.row.Stock}
    </div>
  ),
},
    {
      field: "quantity",
      headerName: "Quantité",
      flex: 1,
      renderCell: (params) => (
        <input
          type="number"
          value={params.row.quantity || ""}
          onChange={(e) => handleQuantityChange(params.row._id, e.target.value)}
        />
      ),
    },
  ];

  const handleQuantityChange = (productId, quantity) => {
    // Mettez à jour la quantité pour le produit spécifié
    // Vous pouvez gérer l'état de la quantité ici ou appeler une fonction pour mettre à jour les données côté serveur
    console.log(`Nouvelle quantité pour le produit ${productId}: ${quantity}`);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      <Box
        height="80vh"
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
  rows={filteredData}
  columns={columns}
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
  components={{ Toolbar: DataGridCustomToolbar }}
  componentsProps={{
    toolbar: { searchInput, setSearchInput },
  }}
/>
          </Box>
          </Box>
          );
          };

          export default Products;