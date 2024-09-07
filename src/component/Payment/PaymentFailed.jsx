import React from 'react';
import {Button, Card} from "@mui/material";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';import {green,
    red
} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";

const PaymentFailed = () => {
    const navigate = useNavigate();
    return (
        <div className={'min-h-screen px-5'}>
            <div className={'flex flex-col items-center justify-center' +
                ' h-[80vh]'}>
                <Card className={'box w-50% lg:w-1/4 flex flex-col' +
                    ' items-center rounded-md p-5'}>
                    <RemoveShoppingCartIcon sx={{fontSize: "3rem", marginBottom: "1rem",color: red[500]}}/>
                    <h1>Order canceled :(</h1>
                    <p className={'py-3 text-center text-gray-400'}>Click the button below to return to homepage </p>
                    {/*<p className={'py-2 text-center text-gray-200 text-lg'}>Have*/}
                    {/*    A Great Day!</p>*/}
                    <Button onClick={() => navigate("/")}
                            variant={'contained'}
                            className={'py-5'}
                            sx={{margin: "1rem 0rem"}}>Return to home</Button>
                </Card>
            </div>
        </div>
    );
};

export default PaymentFailed;