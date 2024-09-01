import React from 'react';
import {Route, Routes} from "react-router-dom";
import CreateRestaurantForm
  from "../adminComponent/createRestaurantForm/CreateRestaurantForm.jsx";
import Admin from "../adminComponent/Admin/Admin.jsx";
import {useSelector} from "react-redux";

const AdminRoute = () => {
  const { restaurant, loading } = useSelector((store) => store);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator
  }
  return (
    <div>
      <Routes>
        <Route
          path={'/*'}
          element={!restaurant.usersRestaurant ? <CreateRestaurantForm /> : <Admin />}
        />
      </Routes>
    </div>
  );
};

export default AdminRoute;