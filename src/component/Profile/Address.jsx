import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import AddressCard from "../Cart/AddressCard.jsx";
import {Card} from "@mui/material";

const Address = () => {
    const {auth} = useSelector((store) => store)
    return (
      <section className={'flex justify-center mt-10 px-5 pb-10 lg:pb-0'}>
          <div className={'flex gap-5 flex-wrap justify-center'}>
              {
                  auth.user?.addresses.map((item)=> <AddressCard key={item.id} item={item} showButton={false}/>)
              }
          </div>
      </section>

    );
};

export default Address;