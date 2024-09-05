import React, {useState} from 'react';
import ProfileNavigation from "./ProfileNavigation.jsx";
import {Route, Routes} from "react-router-dom";
import UserProfile from "./UserProfile.jsx";
import Orders from "./Orders.jsx";
import Address from "./Address.jsx";
import Favorites from "./Favorites.jsx";
import Event from "./Event.jsx";
import {useMediaQuery} from "@mui/material";


const Profile = () => {
    const isSmallScreen = useMediaQuery('(max-width:1023px)');
    return (
        <div className={'lg:flex justify-between '}>
            <div className={'mb-10'}>
                <ProfileNavigation/>
            </div>
            <div style={{ marginTop: isSmallScreen ? '60px' : '0px' }} className={'lg:w-[80%]'}>
                <Routes>
                    <Route path={'/'} element={<UserProfile/>}/>
                    <Route path={'/orders'} element={<Orders/>}/>
                    <Route path={'/address'} element={<Address/>}/>
                    <Route path={'/favorites'} element={<Favorites/>}/>
                    <Route path={'/events'} element={<Event/>}/>
                </Routes>

            </div>
        </div>
    );
};

export default Profile;