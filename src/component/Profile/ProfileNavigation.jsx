import React, {Fragment, useState} from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import {Divider, Drawer, IconButton, useMediaQuery} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../State/Authenthication/Action.js";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PlaceIcon from '@mui/icons-material/Place';

const menu = [
  {
    title: "orders",
    icon: <ShoppingBagIcon />,
  },
  {
    title: "Favorites",
    icon: <FavoriteIcon />,
  },
  {
    title: "Address",
    icon: <PlaceIcon/>,
  },
  {
    title: "Payments",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    title: "Notifications",
    icon: <NotificationsActiveIcon />,
  },
  {
    title: "Events",
    icon: <EventIcon />,
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
  },
]
const ProfileNavigation = () => {
  const isSmallScreen = useMediaQuery('(max-width:1023px)');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/")
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`)
    }
    if (isSmallScreen) {
      setIsOpen(false);
    }
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div >
      { isSmallScreen && <IconButton
        onClick={toggleSidebar}
        sx={{
          position: 'fixed',
          top: 70,
          left: 10,
          zIndex: 1300,
        }}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton >}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={toggleSidebar}
        open={isOpen || !isSmallScreen}
        anchor={'left'}
        sx={{zIndex: 1, position: "sticky"}}
      >
        <div
          className={'w-[40vw] lg:w-[20vw] h-[100vh] flex flex-col' +
            ' justify-center text-xl gap-8 pt-16'}
        >
          {menu.map((item, i) =>
            <Fragment key={i}>
              <div
                onClick={() => handleNavigate(item)}
                className={'px-5 flex items-center space-x-5 cursor-pointer'}
              >
                {item.icon}
                <span >{item.title}</span >
              </div >
              {i !== menu.length - 1 && <Divider />}
            </Fragment>,
          )}

        </div >
      </Drawer >
    </div >
  );
};

export default ProfileNavigation;