import React from 'react';

import {Button, Card} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import {useSelector} from "react-redux";


const AddressCard = ({item, showButton, handleSelectAddress}) => {
  const {cart } = useSelector(store => store);

    return (
        <Card className={'flex gap-5 w-64 p-5'}>
            <PlaceIcon/>
            <div className={'space-y-3 text-gray-400'}>
                <h1 className={'font-semibold text-lg text-white'}>{item.place}</h1>
                <p>{ item.streetAddress + ", "  + item.city + ", " + item.stateProvince}</p>
                { showButton &&(
                    <Button disabled={!cart.cartItems[0]?.food}  sx={{cursor: `${cart.cartItems[0]?.food ? 'pointer': 'not-allowed'}`}} variant={'outlined'} onClick={() => handleSelectAddress(item)}>select address</Button>)}
            </div>
        </Card>
    );
};

export default AddressCard;