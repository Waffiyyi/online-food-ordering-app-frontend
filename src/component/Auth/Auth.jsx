import React from 'react';
import {Box, Modal} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {style} from "../Cart/Cart.jsx";
import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handLeOnClose=()=>{
        navigate("/");
    }
    return (
        <>
            <Modal open={
                location.pathname==="/account/register"
                || location.pathname==="/account/login"
            } onClose={handLeOnClose} >
                <Box sx={style}>
                    {location.pathname === "/account/register"?<RegisterForm/>: <LoginForm/>}
                </Box>

            </Modal>
        </>
    );
};

export default Auth;