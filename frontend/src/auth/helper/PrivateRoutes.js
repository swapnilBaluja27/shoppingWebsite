import { props } from "bluebird";
import React from "react"
import { Router,Redirect,Route } from "react-router-dom";
import { redirect } from "statuses";
import { isAuthenticated } from "./index";
const PrivatRoute = ({component:Component, ...rest}) =>
{
    return (
        <Route 
        {...rest}
        render={ props =>
            isAuthenticated() ?(
            <Component {...props}></Component>
        ):(
            <Redirect 
            to ={{
                pathname:"/signin",
                state:{from:props.location}
            }}
            />
        )
    
    }
        >

        </Route>
    )
};

export default PrivatRoute;