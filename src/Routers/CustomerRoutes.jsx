import React, {useEffect, useState} from 'react';
import Navbar from "../component/Navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "../component/Home/Home.jsx";
import RestaurantDetails from "../component/Restaurant/RestaurantDetails.jsx";
import Cart from "../component/Cart/Cart.jsx";
import Profile from "../component/Profile/Profile.jsx";
import Auth from "../component/Auth/Auth.jsx";
import PaymentSuccess from "../component/Payment/PaymentSuccess.jsx";
import PaymentFailed from "../component/Payment/PaymentFailed.jsx";
import ErrorComponent from "../GlobalErrorComponent/ErrorComponent.jsx";
import {useSelector} from "react-redux";
import PrivateRoute from "../RouteGuards/PrivateRoute.jsx";
import {CustomerPrivateRoute} from "../RouteGuards/CustomerPrivateRoute.jsx";

const CustomerRoutes = () => {
  const {error} = useSelector((store) => store);
  return (
    <div >
      <Navbar />
      {error.error && <ErrorComponent message={error.error}/>}
      <Routes >
        <Route path={'/'} element={<Home />}/>
        <Route path={'/account/:register'} element={<Home />}/>
        <Route element={<CustomerPrivateRoute/>} >
        <Route
          path={'/restaurant/:city/:title/:id'}
          element={<RestaurantDetails />}
        />

        <Route path={'/cart'} element={<Cart />}/>
        <Route path={'/my-profile/*'} element={<Profile />}/>
        <Route path={'/payment/success/:id'} element={<PaymentSuccess />}/>
        <Route path={'/payment/fail/:id'} element={<PaymentFailed />}/>
        </Route>
      </Routes >
      <Auth />
    </div >
  );
};

export default CustomerRoutes;