import React, {useEffect} from 'react';
import {
  Avatar, AvatarGroup, Button,
  Card,
  CardHeader, Chip, Menu, MenuItem,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
  fetchRestaurantOrder,
  updateOrderStatus,
} from "../../State/RestaurantOrder/Action.js";

const orderStatus = [
  {label: "Pending", value: "PENDING"},
  {label: "Completed", value: "COMPLETED"},
  {label: "Out For Delivery", value: "OUT_FOR_DELIVERY"},
  {label: "Delivered", value: "DELIVERED"},

]
const OrderTable = () => {
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch();
  const {restaurantOrder, restaurant} = useSelector((store) => store)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateOrder = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({
      orderId,
      orderStatus,
      jwt,
    }))
    handleClose();
    console.log("order id", orderId)
  }

  useEffect(() => {
    dispatch(fetchRestaurantOrder({
      jwt,
      restaurantId: restaurant.usersRestaurant.id,
    }))
  }, [])
  return (
    <div >
      <Card >
        <CardHeader
          title={"All Orders"}
          sx={{pt: 2, alignItems: "Center"}}
        />
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label='simple table'>
            <TableHead >
              <TableRow >
                <TableCell >Id</TableCell >
                <TableCell align='right'>Image</TableCell >
                <TableCell align='right'>Customer</TableCell >
                <TableCell align='right'>Price</TableCell >
                <TableCell align='right'>Name</TableCell >
                <TableCell align='right'>Ingredients</TableCell >
                <TableCell align='right'>Status</TableCell >
                <TableCell align='right'>Update</TableCell >
              </TableRow >
            </TableHead >
            <TableBody >
              {restaurantOrder.orders.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component='th' scope='row'>
                    {item.id}
                  </TableCell >
                  <TableCell align='right'>
                    <AvatarGroup >
                      {item.items.map((orderItem) =>
                        <Avatar
                          key={orderItem.food?.id}
                          src={orderItem.food?.images[0]}
                        />,
                      )}


                    </AvatarGroup >

                  </TableCell >
                  <TableCell align='right'>{item.customer?.fullName}</TableCell >
                  <TableCell align='right'>{item.totalPrice}</TableCell >
                  <TableCell align='right'> {item.items.map((orderItem) =>
                    <p
                      key={orderItem.food.id}
                    >
                      {orderItem.food.name}
                    </p >,
                  )}</TableCell >
                  <TableCell align='right'>{
                    item.items.map((orderItem) =>
                      <div key={orderItem.food.id}>
                        {
                          orderItem.ingredients.map((ingredient) =>
                            <Chip label={ingredient} key={ingredient.id}/>)
                        }
                      </div >)
                  }
                  </TableCell >
                  <TableCell align='right'>{item.orderStatus}</TableCell >
                  <TableCell align={'right'}>
                    <div >
                      <Button
                        id='basic-button'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        variant={'contained'}
                      >
                        Update
                      </Button >
                      <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        {orderStatus.map((status) => <MenuItem
                          key={status.label}
                          onClick={()=>handleUpdateOrder(item.id, status.value)}
                        >{status.label}</MenuItem >)}
                      </Menu >
                    </div >
                  </TableCell >
                </TableRow >
              ))}
            </TableBody >
          </Table >
        </TableContainer >
      </Card >
    </div >
  );
};

export default OrderTable;