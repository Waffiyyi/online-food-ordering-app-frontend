import React, {useEffect} from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import {green} from "@mui/material/colors";
import {Button, Card} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearCart} from "../../State/Cart/Action.js";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearCart(localStorage.getItem("jwt")));
    }, [dispatch]);
    return (
        <div className={'min-h-screen px-5'}>
            <div className={'flex flex-col items-center justify-center' +
                ' h-[80vh]'}>
                <Card className={'box w-50% lg:w-1/4 flex flex-col' +
                    ' items-center rounded-md p-5'}>
                    <TaskAltIcon sx={{fontSize: "3rem", color: green[500]}}/>
                    <h1>Order Success!</h1>
                    <p className={'py-3 text-center text-gray-400'}>Thank you
                        for choosing our restaurant! We appreciate your
                        Order </p>
                    <p className={'py-2 text-center text-gray-200 text-lg'}>Have
                        A Great Day!</p>
                    <Button onClick={() => navigate("/")}
                            variant={'contained'}
                            className={'py-5'}
                            sx={{margin: "1rem 0rem"}}>Return to home</Button>
                </Card>
            </div>
        </div>
    );
};

export default PaymentSuccess;