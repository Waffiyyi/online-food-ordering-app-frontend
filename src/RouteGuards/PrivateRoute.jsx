import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import {getUser} from "../State/Authenthication/Action.js";

const PrivateRoute = ({ allowedRole }) => {
  const { auth } = useSelector(store => store);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const user = auth.user?.user;
  const jwt = auth.jwt || localStorage.getItem("jwt");
  const isAuthenticated = !!user;
  const userRole = user?.role;

  useEffect(() => {
    if (jwt && !user) {
      dispatch(getUser(jwt)).then(() => {
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [jwt, user, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;