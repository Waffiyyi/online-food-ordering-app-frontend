import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../State/Authenthication/Action.js";
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const {auth} = useSelector(store => store)

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
  }

  return (
    <div
      className={'h-[80vh] flex flex-col justify-center' +
        ' items-center'}
    >
      <div className={'flex flex-col items-center justify-center'}>
        <AccountCircleIcon sx={{fontSize: '9rem'}}/>
        <h1 className={'py-5 text-2xl font-semibold'}>{auth.user?.fullName}</h1 >
        <p >Email: {auth.user?.email} </p >
        <Button
          variant={'contained'}
          onClick={handleLogout}
          sx={{margin: "2rem 0rem"}}
        >Logout</Button >
      </div >

    </div >
  );
};

export default UserProfile;