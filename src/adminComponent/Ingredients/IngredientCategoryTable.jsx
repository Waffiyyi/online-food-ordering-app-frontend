import React, {useEffect} from 'react';
import {
  Box,
  Card, CardActions,
  CardHeader, IconButton, Modal,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow,
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create'
import CreateIngredientForm from "./CreateIngredientForm.jsx";
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getIngredientCategory} from "../../State/Ingredients/Action.js";

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

const IngredientCategoryTable = () => {
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
    dispatch(getIngredientCategory({id: restaurant.usersRestaurant.id, jwt: jwt}))
  }, [])
  return (
    <Box >
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label={"settings"}>
              <CreateIcon />
            </IconButton >
          }
          title={"Ingredient Category"}
          sx={{pt: 2, alignItems: "Center"}}
        />
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead >
              <TableRow >
                <TableCell align='left'>Id</TableCell >
                <TableCell align='left'>Name</TableCell >
              </TableRow >
            </TableHead >
            <TableBody >
              {ingredients.category.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component='th' scope='row'>
                    {item.id}
                  </TableCell >
                  <TableCell align='left'>{item.name}</TableCell >
                </TableRow >
              ))}
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
          <CreateIngredientCategoryForm />

        </Box >

      </Modal >

    </Box >
  );
};

export default IngredientCategoryTable;