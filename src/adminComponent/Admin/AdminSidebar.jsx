import React, {Fragment, useState} from 'react';
import {Dashboard, ShoppingBag} from "@mui/icons-material";
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastFoodIcon from '@mui/icons-material/FastFood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {Divider, Drawer, IconButton, useMediaQuery} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../State/Authenthication/Action.js";

const menu = [
  {title: "Dashboard", icon: <Dashboard />, path: "/"},
  {title: "Orders", icon: <ShoppingBag />, path: "/orders"},
  {title: "Menu", icon: <ShopTwoIcon />, path: "/menu"},
  {title: "FoodCategory", icon: <CategoryIcon />, path: "/category"},
  {title: "Ingredients", icon: <FastFoodIcon />, path: "/ingredients"},
  {title: "Events", icon: <EventIcon />, path: "/event"},
  {title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details"},
  {title: "Logout", icon: <LogoutIcon />, path: "/"},
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:1023px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (item) => {
    navigate(`/admin/restaurant${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
    }
    if (isSmallScreen) {
      setIsOpen(false);
    }
  };

  return (
    <div >
      {isSmallScreen && <IconButton
        onClick={toggleSidebar}
        sx={{position: 'fixed', top: 15, left: 10, zIndex: 13001}}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton >
      }
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={toggleSidebar}
        open={isOpen || !isSmallScreen}
        anchor={'left'}
      >
        <div className={'w-[40vw] lg:w-[20vw] h-[100vh] flex flex-col' +
          ' justify-center text-xl gap-8 pt-16'}>
          {menu.map((item, i) =>
            <Fragment key={i}>
              <div
                key={i}
                onClick={() => handleNavigate(item)}
                className={'px-5 flex items-center space-x-5 cursor-pointer'}
              >
                {item.icon}
                <span >{item.title}</span >
              </div >
              {i !== menu.length - 1 && <Divider />}
            </Fragment >,
          )}
        </div >
      </Drawer >
    </div >
  );
};

export default AdminSidebar;