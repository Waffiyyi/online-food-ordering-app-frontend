import React, {useEffect} from 'react';
import {
  Box, Button,
  Card, CardActions,
  CardHeader, IconButton, Modal,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow,
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create'
import {Delete} from "@mui/icons-material";
import CreateFoodCategoryForm from "../FoodCategory/CreateFoodCategoryForm.jsx";
import CreateIngredientForm from "./CreateIngredientForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
  getIngredientsOfRestaurant,
  updateStockOfIngredient,
} from "../../State/Ingredients/Action.js";

const orders = [1, 1, 1, 1, 1, 1]
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const IngredientTable = () => {
  const {restaurant, ingredients} = useSelector(store => store);
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getIngredientsOfRestaurant({jwt, restaurantId: restaurant.usersRestaurant.id}))
  }, [])

  const handleUpdateIngredientStock=(id)=>{
    dispatch(updateStockOfIngredient({ingredientId: id, jwt}))
  }
  return (
    <div >
      <Card >
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label={"settings"}>
              <CreateIcon />
            </IconButton >
          }
          title={"Ingredients"}
          sx={{pt: 2, alignItems: "Center"}}
        />
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label='simple table'>
            <TableHead >
              <TableRow >
                <TableCell align='left'>Id</TableCell >
                <TableCell align='right'>Name</TableCell >
                <TableCell align='right'>Category</TableCell >
                <TableCell align='right'>Availability</TableCell >

              </TableRow >
            </TableHead >
            <TableBody >
              {ingredients.ingredients.map((item) =>
                <TableRow
                  key={item.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component='th' scope='row'>
                    {item.id}
                  </TableCell >
                  <TableCell align='right'>{item.name}</TableCell >
                  <TableCell align='right'>{item.category.name}</TableCell >
                  <TableCell align='right'>
                    <Button className={'cursor-pointer'} onClick={()=>handleUpdateIngredientStock(item.id)}>
                      {item.inStock ? "In Stock": "Out Of Stock"}
                    </Button>
                  </TableCell >
                </TableRow >
              )}
            </TableBody >
          </Table >
        </TableContainer >
      </Card >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <CreateIngredientForm onSuccess={handleClose} />
        </Box>
      </Modal>
    </div >
  );
};

export default IngredientTable;