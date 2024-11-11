import React, {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleAvatarClick = () => {
    if (auth.user?.user.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurant/");
    }
  };

  const handleSearch = async () => {
    if (jwt && searchQuery.trim()) {
      setLoading(true);
      const res = await dispatch(searchRestaurant(searchQuery, jwt));
      setLoading(false);
      if (res.status === 200) {
        handleSearchToggle();
      }
    }
  };

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
  };

  return (
    <Box
      className={'px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'}
    >
      <div className={'lg:mr-10 cursor-pointer flex items-center space-x-4'}>
        <li
          onClick={() => navigate("/")}
          className={'logo font-semibold text-gray-300 text-2xl'}
        >
          CraveCourier
        </li>
      </div>

      <div className={'flex items-center space-x-2 lg:space-x-10'}>
        <div className={'relative flex items-center'}>
          {auth.user && (
            <Box
              component='form'
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: searchOpen ? {xs: '100%', sm: 300, md: 400} : '40px',
                height: '40px',
                borderRadius: '999px',
                border: searchOpen ? '2px solid white' : 'none',
                paddingLeft: searchOpen ? '8px' : '0',
                transition: 'width 0.3s ease-in-out',
                overflow: 'hidden',
                backgroundColor: `${searchOpen ? '#ffffff' : 'transparent'}`,
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              {searchOpen && (
                <InputBase
                  placeholder='Search restaurant by name'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{flex: 1, paddingLeft: '10px', fontSize: '1rem', color: '#000000'}}
                />
              )}

              <IconButton
                onClick={searchOpen ? handleSearch : handleSearchToggle}
                sx={{
                  backgroundColor: `${searchOpen ? '#ffffff' : 'transparent'}`,
                  borderRadius: '50%',
                  padding: '10px',
                  marginRight: '4px',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: `${searchOpen ? '#ffffff' : 'transparent'}`,
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={20} sx={{ color: 'black' }} />
                ) : (
                  <SearchIcon sx={{ color: `${searchOpen ? '#000000' : '#ffffff'}` }} />
                )}
              </IconButton>
            </Box>
          )}
        </div>

        <div className={'cursor-pointer'}>
          {auth?.user ? (
            <Avatar
              onClick={handleAvatarClick}
              sx={{
                bgcolor: "white", color: pink.A400,
              }}
            >
              {auth.user?.user.fullName[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>

        <div className={''}>
          {auth.user && (
            <IconButton onClick={() => navigate("/cart")}>
              <Badge color='primary' badgeContent={cart.cart?.items.length}>
                <ShoppingCartIcon sx={{fontSize: "1.5rem"}}/>
              </Badge>
            </IconButton>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Navbar;