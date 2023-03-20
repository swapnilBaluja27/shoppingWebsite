import React from 'react';

import { BrowserRouter,Switch,Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from './auth/helper/AdminRoutes';
import PrivatRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';

const Routes = () => {
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component ={Home} /> 
            <Route path="/signup" exact component ={Signup} />
            <Route path="/sigin" exact component ={Signin} />
            <PrivatRoute path="/user/dashboard" exact component ={UserDashBoard} ></PrivatRoute>
            <AdminRoute path="/admin/dashboard" exact component ={AdminDashBoard} ></AdminRoute>
                        

        </Switch>
        </BrowserRouter>
    );
};

export default Routes;