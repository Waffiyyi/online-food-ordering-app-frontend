import React, {useEffect, useState} from 'react';
import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from "./MenuCard.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  getRestaurantById,
  getRestaurantCategory,
} from "../../State/Restaurant/Action.js";
import {getMenuItemsByRestaurantId} from "../../State/Menu/Action.js";


const foodTypes = [
  {
    label: "all",
    value: "all",
  },
  {
    label: "Vegetarian only",
    value: "vegetarian",
  },
  {
    label: "Non-Vegetarian",
    value: "non_vegetarian",
  },
  {
    label: "Seasonal",
    value: "seasonal",
  },
];
const menu = ["hhaa", "haha", "hshhs", "haha", "haha", "haha", "haha"];
const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState("all");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant, menu} = useSelector(store => store);
  const [selectedCategory, setSelectedCategory] = useState("");

console.log(restaurant)

  const {id} = useParams();

  const handleFilter = (e, value) => {
    setFoodType(value)
  }
  const handleFilterCategory = (e, value) => {
    setSelectedCategory(value)
    console.log(restaurant.categories)
    console.log(e.target.value, e.target.name, value)
  }


  useEffect(() => {
    dispatch(getRestaurantById({jwt, restaurantId: id}))
    dispatch(getRestaurantCategory({restaurantId: id, jwt: jwt}))
  }, [dispatch, id, jwt]);


  useEffect(() => {
    dispatch(getMenuItemsByRestaurantId({
        jwt,
        restaurantId: id,
        vegetarian: foodType === "vegetarian",
        seasonal: foodType === "seasonal",
        nonveg: foodType === "non_vegetarian",
        foodCategory: selectedCategory,
      }),
    );
  }, [selectedCategory, foodType, dispatch, jwt, id])
  return (
    <div className={'px-5 lg:px-20'}>
      <section >
        {/*<h3 className={'text-gray-500 py-2 mt-10'}></h3>*/}
        <div className={'mt-5'}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                className={"w-full h-[40vh] object-cover"}
                src={restaurant.restaurant?.images[0]}
                alt={"Restaurant image 1"}
              />
            </Grid >
            <Grid item xs={12} lg={6}>
              <img
                className={"w-full h-[40vh] object-cover"}
                src={restaurant.restaurant?.images[1]}
                alt={"Restaurant image 2"}
              />
            </Grid >
            <Grid item xs={12} lg={6}>
              <img
                className={'w-full h-[40vh] object-cover'}
                src={restaurant.restaurant?.images[2]}
                alt={"Restaurant image 3"}
              />
            </Grid >
          </Grid >
        </div >
        <div className={'pt-3 pb-5'}>
          <h1 className={'text-4xl font-semibold'}>{restaurant.restaurant?.restaurantName}</h1 >
          <p className={'text-gray-500 mt-1'}> {restaurant.restaurant?.description}</p >
          <div className={'space-y-3 mt-3'}>
            <p className={'text-gray-500 items-center gap-3'}>
              <LocationOnIcon />
              <span >{restaurant.restaurant?.address.city}</span >
            </p >
            <p className={'text-gray-500 items-center gap-3'}>
              <CalendarTodayIcon />
              <span > {restaurant.restaurant?.openingHours} (Today)</span >
            </p >
          </div >

        </div >
      </section >
      <Divider />
      <section className={'pt-[2rem] lg:flex relative'}>
        <div className={'space-y-10 lg:w-[20%] filter p-5 shadow-md'}>
          <div className={'box space-y-5 lg:sticky top-20'}>
            <div >
              <Typography variant={'h5'} sx={{paddingBottom: "1rem"}}>
                Food Type
              </Typography >
              <FormControl className={'py-10 space-y-5'} component={"fieldset"}>
                <RadioGroup
                  onChange={handleFilter} name={'food_type'}
                  value={foodType}
                >
                  {foodTypes.map((item) => <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />)}
                </RadioGroup >
              </FormControl >
            </div >
            <Divider />
            <div >
              <Typography variant={'h5'} sx={{paddingBottom: "1rem"}}>
                Food Category
              </Typography >
              <FormControl className={'py-10 space-y-5'} component={"fieldset"}>
                <RadioGroup
                  onChange={handleFilterCategory} name={'food_category'}
                  value={selectedCategory}
                >
                  {restaurant.categories.map((item) => <FormControlLabel
                    key={item.id}
                    value={item.name}
                    control={<Radio />}
                    label={item.name}
                  />)}

                </RadioGroup >
              </FormControl >

            </div >


          </div >
        </div >
        <div className={'space-y-5 lg:w-[80%] lg:pl-10'}>
          {menu.menuItems.map((item, i) => <MenuCard key={i} item={item}/>)}
        </div >

      </section >
    </div >
  );
};

export default RestaurantDetails;