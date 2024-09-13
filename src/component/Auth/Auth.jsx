import React from 'react';
import {Box, Modal} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {style} from "../Cart/Cart.jsx";
import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";
import ErrorComponent from "../../GlobalErrorComponent/ErrorComponent.jsx";
import {useSelector} from "react-redux";
import ResetPasswordForm from "./ResetPasswordForm.jsx";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {error} = useSelector((store) => store);

  const handLeOnClose = () => {
    navigate("/");
  }
  return (
    <>
      <Modal
        open={
          location.pathname === "/account/register"
          || location.pathname === "/account/login"
          || location.pathname === "/account/reset-password"
        } onClose={handLeOnClose}
      >
        <Box sx={style}>
          {location.pathname === "/account/register" ? <RegisterForm /> :
            location.pathname === "/account/reset-password" ? <ResetPasswordForm /> :
              <LoginForm />}
          {error.error && <p className={'py-2 space-y-2 text-red-600 text-sm' +
            ' text-center' +
            ' mb-5'}>{error.error}</p>}
        </Box >


      </Modal >
    </>
  );
};

export default Auth;