import Navbar from "./component/Navbar/Navbar.jsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {darkTheme} from "./theme/DarkTheme.jsx";
import CustomerRoutes from "./Routers/CustomerRoutes.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./State/Authenthication/Action.js";
import {findCart} from "./State/Cart/Action.js";
import Routers from "./Routers/Routers.jsx";
import {getRestaurantByUserId} from "./State/Restaurant/Action.js";



function App() {
    const  dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const {auth, cart} = useSelector(store=>store);


    useEffect(()=>{
        dispatch(getUser(auth.jwt || jwt))
        dispatch(findCart(auth.jwt || jwt))
        }, [auth.jwt])

  useEffect(()=>{
    dispatch(getRestaurantByUserId(auth.jwt || jwt))
  }, [auth.user])

  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <Routers/>
      </ThemeProvider>

  );
}

export default App
