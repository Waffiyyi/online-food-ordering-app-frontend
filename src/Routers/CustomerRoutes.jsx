import React, {useEffect, useState} from 'react';
import Navbar from "../component/Navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "../component/Home/Home.jsx";
import RestaurantDetails from "../component/Restaurant/RestaurantDetails.jsx";
import Cart from "../component/Cart/Cart.jsx";
import Profile from "../component/Profile/Profile.jsx";
import Auth from "../component/Auth/Auth.jsx";
import {
    addItemToCart,
    findCart,
    removeCartItem,
    updateCartItem
} from "../State/Cart/Action.js";
import {useDispatch, useSelector} from "react-redux";
import PaymentSuccess from "../component/Payment/PaymentSuccess.jsx";
import PaymentFailed from "../component/Payment/PaymentFailed.jsx";

const CustomerRoutes = () => {
    // const  dispatch = useDispatch();
    // const jwt = localStorage.getItem("jwt");
    // const {auth, cart} = useSelector(store=>store);
    // const [localCartItems, setLocalCartItems] = useState([]);

    // useEffect(() => {
    //     if (auth.jwt && !cart.cart) {
    //         dispatch(findCart(auth.jwt || jwt));
    //     }
    // }, [auth.jwt, cart.cart, dispatch, jwt]);
    //
    // useEffect(() => {
    //     if (cart.cartItems) {
    //         setLocalCartItems(cart.cartItems);
    //     }
    // }, [cart.cartItems]);
    //
    //
    // const addItemsToCart = (newItem) => {
    //     const updatedItems = [...localCartItems, newItem];
    //     setLocalCartItems(updatedItems);
    //     dispatch(addItemToCart(updatedItems))
    // };
    //
    // const updateCartItems = (updatedItem) => {
    //     const updatedItems = localCartItems.map((item) =>
    //         item.id === updatedItem.id ? updatedItem : item
    //     );
    //     setLocalCartItems(updatedItems);
    //     dispatch(updateCartItem(updatedItems))
    // };
    //
    // const removeCartItems = (itemId) => {
    //     const updatedItems = localCartItems.filter((item) => item.id !== itemId);
    //     setLocalCartItems(updatedItems);
    //     dispatch(removeCartItem({itemId, jwt}))
    // };
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/account/:register'} element={<Home/>}/>
                <Route path={'/restaurant/:city/:title/:id'} element={<RestaurantDetails/>}/>
                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'/my-profile/*'} element={<Profile/>}/>
                <Route path={'/payment/success/:id'} element={<PaymentSuccess/>}/>
                <Route path={'/payment/fail'} element={<PaymentFailed/>}/>
            </Routes>
            <Auth/>
        </div>
    );
};

export default CustomerRoutes;