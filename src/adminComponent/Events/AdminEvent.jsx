import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import CreateEvent from "./CreateEvent.jsx";
import EventCard from "../../component/Profile/EventCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
  deleteEvent,
  getRestaurantEvents,
} from "../../State/Restaurant/Action.js";
import dayjs from "dayjs";

const AdminEvent = () => {
  const jwt = localStorage.getItem("jwt")
  const {restaurant} = useSelector((store) => store)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantEvents({
      restaurantId: restaurant.usersRestaurant?.id,
      jwt,
    }))
  }, [])

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent({
      eventId,
      jwt,
    }))
  }

  return (
    <div >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <CreateEvent />
        </Grid >

        <Grid item xs={12} lg={12}>
          <div className={'mt-5 px-5 flex flex-wrap gap-5'}>
            {
              restaurant.restaurantsEvents.map((item) =>
                <EventCard
                  key={item.id}
                  image={item.image}
                  location={item.location}
                  eventName={item.eventName}
                  startDateTime={dayjs(item.startDateTime)
                  .format("ddd, DD MMM YYYY hh:mm A")}
                  endDateTime={dayjs(item.endDateTime)
                  .format("ddd, DD MMM YYYY hh:mm A")}
                  restaurantName={restaurant.usersRestaurant.restaurantName}
                  isAdmin={true}
                  handleDelete={() => handleDeleteEvent(item.id)}
                />,
              )
            }
          </div >
        </Grid >
      </Grid >
    </div >
  );
};

export default AdminEvent;