import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from "@mui/icons-material/Twitter";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../../State/Restaurant/Action.js";
import CreateIcon from "@mui/icons-material/Create";
import {useNavigate} from "react-router-dom";

const RestaurantDetails = () => {
  const { restaurant, loading } = useSelector(store => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRestaurantStatus = () => {
    if (!loading) {
      dispatch(updateRestaurantStatus({
        restaurantId: restaurant.usersRestaurant.id,
        jwt: localStorage.getItem("jwt")
      }));
    }
  };

  return (
    <div className={'lg:px-20 px-5'}>

      <div className={'py-5 flex justify-center items-center gap-5'}>
        <h1
          className={'text-2xl lg:text-7xl text-center font-bold p-5'}
        >
          {restaurant.usersRestaurant?.restaurantName}
        </h1>
        <div className={'flex align-middle gap-10'}>
          <Button
            color={!restaurant.usersRestaurant?.open ? "primary" : "error"}
            className={'py-[1rem] px-[2rem]'}
            variant={'contained'}
            onClick={handleRestaurantStatus}
            size={'large'}
            disabled={loading}
          >
            {restaurant.usersRestaurant?.open ? "Close" : "Open"}
          </Button>
          <IconButton
            onClick={() => navigate('/admin/restaurant/update-restaurant')}
            aria-label={"settings"}
          >
            <CreateIcon />
          </IconButton >
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<span className={'text-gray-500'}>Restaurant</span>} />
            <CardContent>
              <div className={'space-y-4 text-gray-200'}>
                <div className={'flex'}>
                  <p className={'w-48'}>Owner</p>
                  <p className={'text-gray-400'}>
                    <span className={'pr-5'}>-</span>
                    {restaurant.usersRestaurant?.owner.fullName}
                  </p>
                </div>
                <div className={'flex'}>
                  <p className={'w-48'}>Restaurant Name</p>
                  <p className={'text-gray-400'}>
                    <span className={'pr-5'}>-</span>
                    {restaurant.usersRestaurant?.restaurantName}
                  </p>
                </div>
                <div className={'flex'}>
                  <p className={'w-48'}>Cuisine Type</p>
                  <p className={'text-gray-400'}>
                    <span className={'pr-5'}>-</span>
                    {restaurant.usersRestaurant?.cuisineType}
                  </p>
                </div>
                <div className={'flex'}>
                  <p className={'w-48'}>Opening Hours</p>
                  <p className={'text-gray-400'}>
                    <span className={'pr-5'}>-</span>
                    {restaurant.usersRestaurant?.openingHours}
                  </p>
                </div>
                <div className={'flex'}>
                  <p className={'w-48'}>Status</p>
                  <p className={'text-gray-400'}>
                    <span className={'pr-5'}>-</span>
                    {restaurant.usersRestaurant?.open ?
                      <span
                        className={'px-5 py-2 rounded-full bg-green-400 text-gray-950'}
                      > Open </span> :
                      <span
                        className={'px-5 py-2 rounded-full bg-red-400 text-gray-950'}
                      > Closed </span>}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className={'text-gray-500'}>Address</span>} />
            <CardContent>
              <div className={'space-y-4 text-gray-200'}>
                <div className={'flex'}>
                  <p className={'w-48'}>Country</p>
                  <p className={'text-gray-400'}>
                    <span className={'pr-5'}>-</span>
                    {restaurant.usersRestaurant.address.country}
                  </p>
                </div>
                <div className={'flex'}>
                  <p className={'w-48'}>City</p>
                  <p className={'text-gray-400'}>
                    <span className={'pr-5'}>-</span>
                    {restaurant.usersRestaurant.address.city}
                  </p>
                </div>
                <div className={'flex'}>
                  <p className={'w-48'}>Postal Code</p>
                  <p className={'text-gray-400'}>
                    <span className={'pr-5'}>-</span>
                    {restaurant.usersRestaurant.address.postalCode}
                  </p>
                </div>
                <div className={'flex'}>
                  <p className={'w-48'}>Street Address</p>
                  <p className={'text-gray-400'}>
                    <span className={'pr-5'}>-</span>
                    {restaurant.usersRestaurant.address.streetAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className={'text-gray-500'}>Contact</span>} />
            <CardContent>
              <div className={'space-y-4 text-gray-200'}>
                <div className={'flex'}>
                  <p className={'w-48'}>Email</p>
                  <p className={'text-gray-400'}>
                    <span className={'pr-5'}>-</span>
                    {restaurant.usersRestaurant?.contactInformation?.email}
                  </p>
                </div>
                <div className={'flex'}>
                  <p className={'w-48'}>Phone Number</p>
                  <p className={'text-gray-400'}>
                    <span className={'pr-5'}>-</span>
                    {restaurant.usersRestaurant?.contactInformation?.mobile}
                  </p>
                </div>
                <div className={'flex'}>
                  <p className={'w-48'}>Social</p>
                  <div className={'flex text-gray-400 pb-3 items-center gap-2'}>
                    <span className={'pr-5'}>-</span>
                    <a href={restaurant.usersRestaurant?.contactInformation?.instagram} target="_blank" rel="noopener noreferrer">
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href={restaurant.usersRestaurant?.contactInformation?.twitter} target="_blank" rel="noopener noreferrer">
                      <TwitterIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RestaurantDetails;