import React, { useEffect, useState } from 'react';
import {
  Avatar, AvatarGroup, Button,
  Card, CardHeader, Chip, Menu, MenuItem,
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurantOrder,
  updateOrderStatus,
} from "../../State/RestaurantOrder/Action.js";

const orderStatus = [
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const OrderTable = () => {
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { restaurantOrder, restaurant } = useSelector((store) => store);

  const [anchorEls, setAnchorEls] = useState({});

  useEffect(() => {
    dispatch(fetchRestaurantOrder({
      jwt,
      restaurantId: restaurant.usersRestaurant.id,
    }));
  }, [dispatch, jwt, restaurant.usersRestaurant.id]);

  const handleClick = (event, orderId) => {
    setAnchorEls((prev) => ({
      ...prev,
      [orderId]: event.currentTarget,
    }));
  };

  const handleClose = (orderId) => {
    setAnchorEls((prev) => ({
      ...prev,
      [orderId]: null,
    }));
  };

  const handleUpdateOrder = (orderId, status) => {
    dispatch(updateOrderStatus({
      orderId,
      orderStatus: status,
      jwt,
    }));
    handleClose(orderId);
  };

  return (
    <div>
      <Card>
        <CardHeader title="All Orders" sx={{ pt: 2, alignItems: "Center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders.map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{item.id}</TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem) => (
                        <Avatar
                          key={orderItem.food?.id}
                          src={orderItem.food?.images[0]}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{item.customer?.fullName}</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => (
                      <p key={orderItem.food.id}>{orderItem.food.price}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => (
                      <p key={orderItem.food.id}>{orderItem.food.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => (
                      <div key={orderItem.food.id}>
                        {orderItem.ingredients.map((ingredient) => (
                          <Chip label={ingredient} key={ingredient.id} />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <div>
                      <Button
                        id={`basic-button-${item.id}`}
                        aria-controls={anchorEls[item.id] ? `basic-menu-${item.id}` : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEls[item.id] ? 'true' : undefined}
                        onClick={(event) => handleClick(event, item.id)}
                        variant="contained"
                      >
                        Update
                      </Button>
                      <Menu
                        id={`basic-menu-${item.id}`}
                        anchorEl={anchorEls[item.id]}
                        open={Boolean(anchorEls[item.id])}
                        onClose={() => handleClose(item.id)}
                        MenuListProps={{
                          'aria-labelledby': `basic-button-${item.id}`,
                        }}
                      >
                        {orderStatus.map((status) => (
                          <MenuItem
                            key={status.label}
                            onClick={() => handleUpdateOrder(item.id, status.value)}
                          >
                            {status.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrderTable;