import React, {useEffect} from 'react';
import {
  Avatar, Button,
  Card,
  CardHeader, Chip, IconButton,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow,
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create'
import {Delete} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  deleteFood,
  getMenuItems,
  updateMenuItemAvailability,
} from "../../State/Menu/Action.js";

const MenuTable = () => {
  const {restaurant, menu} = useSelector(store => store);
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteMenu = (foodId) => {
    dispatch(deleteFood({
      foodId,
      jwt,
    }))
  }

  const handleUpdateMenuAvailability = (foodId) => {
    dispatch(updateMenuItemAvailability({
      foodId,
      jwt,
    }))
  }
  useEffect(() => {
    dispatch(getMenuItems({
      restaurantId: restaurant.usersRestaurant.id,
      jwt: jwt,
    }))
  }, [])
  return (
    <div >
      <Card >
        <CardHeader
          action={
            <IconButton
              onClick={() => navigate('/admin/restaurant/add-menu')}
              aria-label={"settings"}
            >
              <CreateIcon />
            </IconButton >
          }
          title={"Menu"}
          sx={{pt: 2, alignItems: "Center"}}
        />
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label='simple table'>
            <TableHead >
              <TableRow >
                <TableCell align='left'>Image</TableCell >
                <TableCell align='right'>Title</TableCell >
                <TableCell align='right'>Ingredients</TableCell >
                <TableCell align='right'>Price</TableCell >
                <TableCell align='right'>Availability</TableCell >
                <TableCell align='right'>Delete</TableCell >

              </TableRow >
            </TableHead >
            <TableBody >
              {menu.menuItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component='th' scope='row'>
                    <Avatar src={item.images[0]}> </Avatar >
                  </TableCell >
                  <TableCell align='right'> {item.name}</TableCell >
                  <TableCell align='right'>{item.ingredientItems.map((ingredients) =>
                    (<Chip key={ingredients.id} label={ingredients.name}/>),
                  )}</TableCell >
                  <TableCell align='right'>₦{item.price}</TableCell >
                  <TableCell align='right'><Button
                    onClick={() => handleUpdateMenuAvailability(item.id)}
                    className={'cursor-pointer'}
                  >{item.available ? "In" +
                    " Stock" : "Out" +
                    " Of Stock"}</Button ></TableCell >
                  <TableCell align='right'><IconButton
                    sx={{color: "red"}}
                    className={'cursor-pointer'}
                    onClick={() => handleDeleteMenu(item.id)}
                  ><Delete /></IconButton ></TableCell >
                </TableRow >
              ))}
            </TableBody >
          </Table >
        </TableContainer >
      </Card >
    </div >
  );
};

export default MenuTable;