import React, {useEffect, useState} from 'react';
import {
  Card,
  FormControl,
  FormControlLabel, Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import OrderTable from "./OrderTable.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchRestaurantOrderByStatus
} from "../../State/RestaurantOrder/Action.js";

const orderStatus = [
  {label: "Payment Completed", value: "PAYMENT_COMPLETED"},
  {label: "Out For Delivery", value: "OUT_FOR_DELIVERY"},
  {label: "Delivered", value: "DELIVERED"},
  {label: "All", value: ""},

]
const Orders = () => {
  const [filterValue, setFilterValue] = useState("");
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const {restaurant } = useSelector((store) => store);
  const handleFilter = (e, value) => {
    setFilterValue(value);
  };
  useEffect(()=>{
    dispatch(fetchRestaurantOrderByStatus({
      restaurantId: restaurant.usersRestaurant.id,
      orderStatus: filterValue,
      jwt
    }))
  },[filterValue])
  return (
    <div className={'px-2'}>
      <Card className={'p-5'}>
        <Typography sx={{paddingBottom: "1rem"}} variant={'h5'}>
          Order Status
        </Typography >
        <FormControl >
          <RadioGroup
            onChange={handleFilter}
            row
            name={'category'}
            value={filterValue || "all"}
          >
            {orderStatus.map((item) => <FormControlLabel
                key={item.label}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{color: "grey"}}
              />,
            )}
          </RadioGroup >
        </FormControl >
      </Card >
      <OrderTable />
    </div >
  );
};

export default Orders;