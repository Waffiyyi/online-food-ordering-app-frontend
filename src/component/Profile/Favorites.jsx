import React from 'react';
import RestaurantCard from "../Restaurant/RestaurantCard.jsx";
import {useSelector} from "react-redux";

const Favorites = () => {
    const {auth} = useSelector(store=>store)
  console.log(auth.favorites, "auth. fovoreeysys")
    return (
        <div>
            <h1 className={'py-5 text-xl font-semibold text-center'}>My Favorites</h1>
            <div className={'flex flex-wrap gap-3 justify-center'}>
                {auth.favorites.map((item, i)=>(
                    <RestaurantCard item={item} key={i}/>
                    )
                )}

            </div>
        </div>
    );
};

export default Favorites;