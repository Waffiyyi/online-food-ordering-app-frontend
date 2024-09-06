import React from 'react';
import {Route, Routes} from "react-router-dom";
import CreateRestaurantForm
  from "../adminComponent/createRestaurantForm/CreateRestaurantForm.jsx";
import Admin from "../adminComponent/Admin/Admin.jsx";
import {useSelector} from "react-redux";
import ErrorComponent from "../GlobalErrorComponent/ErrorComponent.jsx";

const AdminRoute = () => {
  const { restaurant, error } = useSelector((store) => store);


  return (
    <div>
      {error.error && <ErrorComponent message={error.error}/>}
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