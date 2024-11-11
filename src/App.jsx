import {CssBaseline, ThemeProvider} from "@mui/material";
import {darkTheme} from "./theme/DarkTheme.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkJwtExpiration, getUser} from "./State/Authenthication/Action.js";
import {findCart} from "./State/Cart/Action.js";
import Routers from "./Routers/Routers.jsx";
import {getRestaurantByUserId} from "./State/Restaurant/Action.js";


function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store => store);
  console.log("auth", auth)

  useEffect(() => {
    checkJwtExpiration()
  }, [])

  useEffect(() => {
    if (auth.jwt || jwt) {
      dispatch(getUser(auth.jwt || jwt));
      dispatch(findCart(auth.jwt || jwt));
    }
  }, [auth.jwt, dispatch, jwt]);

  useEffect(() => {
      if (auth.user?.user.role === "ROLE_RESTAURANT_OWNER" && auth.user?.hasRestaurant) dispatch(
        getRestaurantByUserId(auth.jwt || jwt));
    },
    [auth.jwt,
     auth.user?.hasRestaurant,
     auth.user?.user,
     dispatch,
     jwt]);
  return (<ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider >

  );
}

export default App
