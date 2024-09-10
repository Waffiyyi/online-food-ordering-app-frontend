import React, {useState, useRef} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Avatar, Badge, Box, IconButton, InputBase, Paper} from "@mui/material";
import {pink} from "@mui/material/colors";
import './Navbar.css';
import {useNavigate} from "react-router-dom";
import {Person} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {searchRestaurant} from "../../State/Restaurant/Action.js";

const Navbar = () => {
  const {auth, cart} = useSelector(store => store);
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false); // State to control search bar visibility
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const searchRef = useRef(); // Reference to the search bar
  const dispatch = useDispatch();

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurant/");
    }
  };

  const handleSearchIconClick = () => {
    setShowSearchBar(true);
  };


  const handleSearchOnEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Search for:', searchQuery);
      dispatch(searchRestaurant(searchQuery, localStorage.getItem("jwt")));
    }
  };

 const handleSearchIfOpen = ()=>{
   if(showSearchBar) dispatch(searchRestaurant(searchQuery, localStorage.getItem("jwt")));
 }






  const handleBlur = (e) => {
    if (!searchRef.current.contains(e.relatedTarget)) {
      setShowSearchBar(false); // Close the search bar when clicking outside
    }
  };

  return (
    <Box className={'px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'}>
      <div className={'lg:mr-10 cursor-pointer flex items-center space-x-4'}>
        <li
          onClick={() => navigate("/")}
          className={'logo font-semibold text-gray-300 text-2xl'}
        >
          CraveCourier
        </li >
      </div >

      <div className={'flex items-center space-x-2 lg:space-x-10'}>
        <div
          className={'relative flex items-center'}
          ref={searchRef}
          onBlur={handleBlur}
        >
          {auth.user && (
            <>
              {showSearchBar ? (
                <Paper
                  component='form'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: {xs: '100%', sm: 300, md: 400},
                    height: '40px',
                    borderRadius: '999px',
                    boxShadow: 'none',
                    border: '1px solid black',
                    paddingLeft: '8px',
                  }}
                  onSubmit={(e) => e.preventDefault()}
                  onBlur={handleBlur}
                >
                  <InputBase
                    placeholder='Search'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchOnEnter}
                    sx={{
                      flex: 1,
                      paddingLeft: '10px',
                      fontSize: '1rem',
                    }}
                  />
                  <IconButton
                    onBlur={handleBlur}
                    onClick={handleSearchIfOpen}
                    type='button'
                    sx={{
                      backgroundColor: 'black',
                      borderRadius: '50%',
                      padding: '10px',
                      marginRight: '4px',
                    }}
                  >
                    <SearchIcon />
                  </IconButton >
                </Paper >
              ) : (
                <IconButton onClick={handleSearchIconClick}>
                  <SearchIcon sx={{fontSize: "1.5rem"}}/>
                </IconButton >
              )}
            </>
          )}
        </div >

        <div className={'cursor-pointer'}>
          {auth.user ? (
            <Avatar
              onClick={handleAvatarClick} sx={{
              bgcolor: "white",
              color: pink.A400,
            }}
            >
              {auth.user?.fullName[0].toUpperCase()}
            </Avatar >
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton >
          )}
        </div >

        <div className={''}>
          {auth.user && (
            <IconButton onClick={() => navigate("/cart")}>
              <Badge
                color='primary'
                badgeContent={cart.cart?.items.length}
              >
                <ShoppingCartIcon sx={{fontSize: "1.5rem"}}/>
              </Badge >
            </IconButton >
          )}
        </div >
      </div >
    </Box >
  );
};

export default Navbar;
