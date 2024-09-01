import React from 'react';
import Navbar from "../component/Navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "../component/Home/Home.jsx";
import AdminRoute from "./AdminRoute.jsx";
import CustomerRoutes from "./CustomerRoutes.jsx";

const Routers = () => {
    return (
        <div>
            <Routes>
                <Route path={'/admin/restaurant/*'} element={<AdminRoute/>}/>
                <Route path={'/*'} element={<CustomerRoutes/>}/>
            </Routes>
        </div>
    );
};

export default Routers;