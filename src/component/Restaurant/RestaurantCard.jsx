import React from 'react';
import {Card, Chip, IconButton} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorite} from "../../State/Authenthication/Action.js";
import {isPresentInFavorites} from "../../Config/logic.js";
import auth from "../Auth/Auth.jsx";

const RestaurantCard = ({item}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth, restaurant} = useSelector(store => store)
  const handleAddToFavorite = () => {
    dispatch(addToFavorite(jwt, item.id))
  }

  const handleNavigateToRestaurant = () => {
    if (item.open) {
      navigate(`/restaurant/${item.address.city}/${item.restaurantName}/${item.id}`)
    }
  }


  return (
    <>
      { auth.user && <Card className={'w-[18rem]'}>
        <div
          onClick={handleNavigateToRestaurant}
          className={`${auth.user?.user.role === "ROLE_CUSTOMER" && item.open ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}
        >
          <img
            className={'w-full h-[10rem] rounded-t -md object-cover'}
            src={item.images[0]} alt={""}
          />
          <Chip
            size={"small"}
            className={'absolute top-2 left-2'}
            color={item.open ? "success" : "error"}
            label={item.open ? "open" : "closed"}
          />
        </div >
        <div className={'p-4 textPort lg:flex w-full justify-between'}>
          <div className={'space-y-1'}>
            <p
              onClick={handleNavigateToRestaurant}
              className={`${auth.user?.user.role === "ROLE_CUSTOMER" && item.open ? 'cursor-pointer' : 'cursor-not-allowed'} font-semibold text-lg `}
            >{item.restaurantName}</p >
            <p className={"text-gray-500 text-sm"}>
              {item.description}
            </p >
          </div >
          <div >
            {auth.user?.user.role === "ROLE_CUSTOMER" &&
              <IconButton onClick={handleAddToFavorite}>
                {isPresentInFavorites(auth.favorites, item) ?
                  <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton >

            }
          </div >
        </div >
      </Card >}
    </>
)
  ;
};

export default RestaurantCard;