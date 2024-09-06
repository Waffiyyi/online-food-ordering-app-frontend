import React, {useEffect} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Avatar, Badge, Box, IconButton} from "@mui/material";
import {pink} from "@mui/material/colors";
import './Navbar.css'
import {useNavigate} from "react-router-dom";
import {Person} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";

const Navbar = () => {
    const {auth, cart} = useSelector(store => store);
    const navigate = useNavigate();


    const handleAvaterClick = () => {
        if(auth.user?.role==="ROLE_CUSTOMER"){
            navigate("/my-profile")
        }else{
        navigate("/admin/restaurant/")
        }
    }
    return (
        <Box className={'px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'}
        >


            <div className={'lg:mr-10 cursor-pointer flex items-center space-x-4'}>
                <li onClick={() => navigate("/")}
                    className={'logo font-semibold text-gray-300 text-2xl'}>
                    CraveCourier
                </li>

            </div>


            <div className={'flex items-center space-x-2 lg:space-x-10'}>
                <div className={''}>
                    <IconButton>
                        <SearchIcon sx={{fontSize: "1.5rem"}}/>
                    </IconButton>
                </div>
                <div className={'cursor-pointer'}>
                    {auth.user ? <Avatar onClick={handleAvaterClick} sx={{
                            bgcolor: "white",
                            color: pink.A400
                        }}>{auth.user?.fullName[0].toUpperCase()}</Avatar> :
                        <IconButton onClick={() => navigate("/account/login")}>
                            <Person/>
                        </IconButton>}
                </div>
                <div className={''}>
                    <IconButton onClick={() => navigate("/cart")}>
                        <Badge color="primary"
                               badgeContent={cart.cart?.items.length}>
                            <ShoppingCartIcon sx={{fontSize: "1.5rem"}}/>
                        </Badge>

                    </IconButton>
                </div>

            </div>
        </Box>

    );
};

export default Navbar;