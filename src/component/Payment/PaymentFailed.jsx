import React, {useEffect} from 'react';
import {Button, Card} from "@mui/material";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';import {green,
    red
} from "@mui/material/colors";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearCart} from "../../State/Cart/Action.js";
import {updateOrderStatus} from "../../State/RestaurantOrder/Action.js";

const PaymentFailed = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const jwt = localStorage.getItem("jwt")
    useEffect(() => {
      dispatch(updateOrderStatus({orderId: id, orderStatus: "PAYMENT_CANCELED", jwt}))
    }, [dispatch]);
    return (
        <div className={'min-h-screen px-5'}>
            <div className={'flex flex-col items-center justify-center' +
                ' h-[80vh]'}>
                <Card className={'box w-50% lg:w-1/4 flex flex-col' +
                    ' items-center rounded-md p-5'}>
                    <RemoveShoppingCartIcon sx={{fontSize: "3rem", marginBottom: "1rem",color: red[500]}}/>
                    <h1>Order canceled :(</h1>
                    <p className={'py-3 text-center text-gray-400'}>Click the button below to return to your cart </p>
                    <Button onClick={() => navigate("/cart")}
                            variant={'contained'}
                            className={'py-5'}
                            sx={{margin: "1rem 0rem", marginTop:"0"}}>Return to cart</Button>
                </Card>
            </div>
        </div>
    );
};

export default PaymentFailed;