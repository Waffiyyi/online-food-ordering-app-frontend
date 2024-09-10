import React, {useEffect} from 'react';
import AdminSidebar from "./AdminSidebar.jsx";
import {Route, Routes} from "react-router-dom";
import Menu from "../Menu/Menu.jsx";
import FoodCategory from "../FoodCategory/FoodCategory.jsx";
import RestaurantDetails from "./RestaurantDetails.jsx";
import Ingredients from "../Ingredients/Ingredients.jsx";
import Orders from "../Orders/Orders.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import CreateMenuForm from "../Menu/CreateMenuForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
  getRestaurantById,
  getRestaurantCategory,
} from "../../State/Restaurant/Action.js";
import {getMenuItemsByRestaurantId} from "../../State/Menu/Action.js";
import {getUsersOrder} from "../../State/Order/Action.js";
import {fetchRestaurantOrder} from "../../State/RestaurantOrder/Action.js";
import AdminEvent from "../Events/AdminEvent.jsx";
import {useMediaQuery} from "@mui/material";
import CreateRestaurantForm
  from "../createRestaurantForm/CreateRestaurantForm.jsx";

const Admin = () => {
  const {restaurant, loading} = useSelector(store => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const isSmallScreen = useMediaQuery('(max-width:1023px)');
  const handleClose = () => {
  }
  useEffect(() => {
    dispatch(getRestaurantCategory({
      jwt: jwt,
      restaurantId: restaurant.usersRestaurant?.id}))
    dispatch(fetchRestaurantOrder({
      restaurantId: restaurant.usersRestaurant?.id,
      jwt: jwt,
      orderStatus: ""}))
  }, [])

  return (
    <div className={'lg:flex justify-between'}>
      <div >
        <AdminSidebar handleClose={handleClose}/>
      </div >
      <div style={{ marginTop: isSmallScreen ? '60px' : '0px' }} className={'lg:w-[80%]'}>
        <Routes >
          <Route path={'/'} element={<Dashboard />}/>
          <Route path={'/orders'} element={<Orders />}/>
          <Route path={'/menu'} element={<Menu />}/>
          <Route path={'/category'} element={<FoodCategory />}/>
          <Route path={'/ingredients'} element={<Ingredients />}/>
          <Route path={'/event'} element={<AdminEvent />}/>
          <Route path={'/details'} element={<RestaurantDetails />}/>
          <Route path={'/add-menu'} element={<CreateMenuForm />}/>
          <Route path={'/update-restaurant'} element={<CreateRestaurantForm type={"Update"} />}/>
        </Routes >


      </div >
    </div >
  );
};

export default Admin;