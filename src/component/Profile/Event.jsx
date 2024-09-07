import React, {useEffect} from 'react';
import EventCard from "./EventCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
  getAllEvent,
} from "../../State/Restaurant/Action.js";

const Event = () => {
  const jwt = localStorage.getItem("jwt")
  const {restaurant} = useSelector((store) => store)
  const dispatch = useDispatch();
  console.log("events", restaurant.events)

  useEffect(() => {
    dispatch(getAllEvent(
      {
        jwt,
      },
    ))
  }, [])
  return (
    <div className={'mt-5 px-5 flex flex-wrap gap-5'}>
      {
        restaurant.events && restaurant.events.length > 0 ? (
          restaurant.events.map((item) =>
            <EventCard
              key={item.id}
              image={item.image}
              location={item.location}
              eventName={item.eventName}
              startDateTime={item.startDateTime}
              endDateTime={item.endDateTime}
              restaurantName={restaurant.usersRestaurant?.restaurantName}
              isAdmin={false}
            />,
          )) : (
          <div className={'w-full space-y-5'}>
            <p className={'text-center text-gray-400'}>There are currently no events.</p >
          </div>

        )

      }
    </div >
  );
};

export default Event;