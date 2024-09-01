import React, {useState} from 'react';
import ProfileNavigation from "./ProfileNavigation.jsx";
import {Route, Routes} from "react-router-dom";
import UserProfile from "./UserProfile.jsx";
import Orders from "./Orders.jsx";
import Address from "./Address.jsx";
import Favorites from "./Favorites.jsx";
import Event from "./Event.jsx";


const Profile = () => {
    const  [openSideBar, setOpenSideBar] = useState(false);
    return (
        <div className={'lg:flex justify-between'}>
            <div className={'sticky h-[80vh] lg:w-[20%]'}>
                <ProfileNavigation open={openSideBar}/>
            </div>
            <div className={'lg:w-[80%]'}>
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