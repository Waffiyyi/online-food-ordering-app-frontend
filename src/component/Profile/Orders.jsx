import React, {useEffect} from 'react';
import OrderCard from "./OrderCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getUsersOrder} from "../../State/Order/Action.js";


const Orders = () => {
    const { order } = useSelector((store) => store);
    const jwt = localStorage.getItem('jwt');
    const dispatch = useDispatch();

    useEffect(() => {
        if (jwt) {
            dispatch(getUsersOrder(jwt));
        }
    }, [jwt, dispatch]);

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
      <div className="space-y-5 w-full lg:w-1/2">
        {order.orders && order.orders.length > 0 ? (
          order.orders
          .slice()
          .reverse()
          .map((order) =>
            order.items.map((item) => (
              <OrderCard key={item.id} item={item} order={order} />
            ))
          )
        ) : (
          <div className={'w-full space-y-5'}>
            <p className={'text-center text-gray-400'}>You have not placed any orders yet.</p >
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;