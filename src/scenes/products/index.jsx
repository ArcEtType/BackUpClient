import React, { useState, useEffect } from "react";
import { Box, useTheme, Modal, Select, MenuItem, IconButton, Menu } from "@mui/material";
import { DataGrid, frFR } from "@mui/x-data-grid";
import { useGetAllProductsQuery } from "state/api";
import DataGridCustomToolbarProduct from "components/DataGridCustomToolbarProduct";
import ProductRegister from "./productRegister";
import LogoLight from "assets/MobiOneLogo.png";
import LogoDark from "assets/MobiOneLogoDark.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3001';

const Products = ({ columnField, headerName, uniqueValues, onFilterChange }) => {

  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const Logo = isLightMode ? LogoLight : LogoDark;
  
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [filteredData, setData] = useState([]);
  const filterDeletedProduct = (productId) => {setData(filteredData.filter((item) => item._id !== productId));};
  const [openModal, setOpenModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
 
  
 
  const [quantities, setQuantities] = useState({});
  const currentPage = page;

  const { data, isLoading } = useGetAllProductsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search: searchInput,
  });

/*---------------------------------------------------------SEARCH ----------------------------------------*/
  /* SELECT SUR LE FIELD 'RAYON' */

  const handleValueChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    handleFilterChange("Rayon", value);
  };
  const getUniqueValues = (column) => {
    if (data && data.length > 0) {
      const uniqueValues = new Set(data.map((item) => item.Rayon));
      return [...uniqueValues];
    }
    return [];
  };

  const uniqueRayons = getUniqueValues("Rayon");

  const handleFilterChange = (columnField, value) => {
    let filteredData = data;
    if (value !== "") {
      filteredData = data.filter((item) => item.Rayon === value);
    }
    setData(filteredData);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
/* --------------------- */

  /* RECHERCHE*/
  useEffect(() => {
    if (data) {
      const filtered = data.filter((product) =>
        Object.values(product).some((value) =>
          String(value).toLowerCase().includes(searchInput.toLowerCase())
        )
      );
      setData(filtered || []);
    }
  }, [data, searchInput, setData]);

  /* ------------------- */

/* -------------------------------------------------MODAL ----------------------------------------------*/

  /* MODAL DE CREATION PRODUIT */
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  /* --------------------- */

  /* MODAL DE CONFIRMATION DE SUPRESSION */



  /*--------------QUANTITY UPDATE-----------------------*/

  const handleConfirm = (product) => {
    // Récupérer l'identifiant du produit et la quantité
    const { _id } = product;
    const quantity = quantities[_id];
  
    // Appel de l'API pour mettre à jour le stock du produit dans la base de données
    axios
      .put(`product/${_id}`, { Stock: quantity })
      .then((response) => {
        // Le stock du produit a été mis à jour avec succès
        console.log("Le stock du produit a été mis à jour :", response.data);
        
        // Mettre à jour les données du produit côté client
        const updatedData = data.map((item) => {
          if (item._id === _id) {
            return { ...item, Stock: quantity };
          }
          return item;
        });
        
      // Mettre à jour les données du produit dans l'état local
      setData(updatedData);

      // Restaurer la page actuelle
      setPage(currentPage);

      // Vider l'entrée de quantité
      setQuantities({ ...quantities, [_id]: "" });

      })
      .catch((error) => {
        // Une erreur s'est produite lors de la mise à jour du stock du produit
        console.error("Erreur lors de la mise à jour du stock du produit :", error);
      });
  };

  const handleQuantityChange = (productId, e) => {
    const newQuantities = { ...quantities, [productId]: e.target.value };
    setQuantities(newQuantities);
  };

/* ------------------------------------ PRODUCT DELETE -------------------------------------------------*/
  
      const handleDelete = async (product) => {
      try {
        const productId = product._id;
        const response = await fetch(`http://localhost:3001/product/${productId}`, {
          method: 'DELETE',
        });
    
        const deletedProduct = await response.json();
    
        if (deletedProduct.message === 'Product deleted successfully.') {
          console.log('Produit supprimé avec succès !');
          filterDeletedProduct(productId); // Filtrer le produit supprimé du tableau

          
        } else {
          console.error('Erreur lors de la suppression du produit :', deletedProduct.message);
          // Gérez les erreurs de suppression
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error);
        // Gérez les erreurs de suppression
      }
    };

  /*--------------------------------------------------------------------------------------------*/

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

      /* Les infos a afficher dans le header (rayon + select) */
      renderHeader: () => (
    
        <Box display="flex" alignItems="center">
          <span>Rayon</span>
        <IconButton
      aria-label="Menu"
      aria-controls="rayon-menu"
      aria-haspopup="true"
      onClick={(e) => setAnchorEl(e.currentTarget)}
    >
      <ArrowDropDownIcon />
    </IconButton>
        
        </Box>
      ),
    /* ------------------------------------------------------*/

    },
    {
      field: "PointDeVente",
      headerName: "Point de vente",
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
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="text"
        value={quantities[params.row._id] || ""}
        style={{ width: "25%", margin: "0 auto" }}
        pattern="[0-9]*"
        onChange={(e) => handleQuantityChange(params.row._id, e)}
      />
      <button style={{ marginLeft: "10px" }} onClick={() => handleConfirm(params.row)}>Confirmer</button>
    </div>
  ),
},
    
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        
          <DeleteIcon  color="error" onClick={() => handleDelete(params.row)} style={{ cursor: 'pointer' }} />
        
      ),
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
         
<Menu
  id="rayon-menu"
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
  MenuListProps={{
    'aria-labelledby': 'rayon-menu',
  }}
>
  <Select value={selectedValue} onChange={handleValueChange}>
    <MenuItem value="">{headerName}</MenuItem>
    {uniqueRayons.map((value) => (
      <MenuItem key={value} value={value}>{value}</MenuItem>
    ))}
  </Select>
</Menu>


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
          <ProductRegister />
        </Box>
      </Modal>

    
        
        <DataGrid 
  localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
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
  components={{ Toolbar: DataGridCustomToolbarProduct }}
  componentsProps={{
    toolbar: { searchInput, setSearchInput, handleOpenModal },
  }}
/>
          </Box>
          </Box>
          );
          };

          export default Products;