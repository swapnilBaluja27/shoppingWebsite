import { props } from "bluebird";
import React from "react"
import { Router,Redirect ,Route} from "react-router-dom";
import { redirect } from "statuses";
import { isAuthenticated } from "./index";
const AdminRoute = ({component:Component, ...rest}) =>
{
    return (
        <Route 
        {...rest}
        render={ props =>
            isAuthenticated() && isAuthenticated().user.role ===1 ?(
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

export default AdminRoute;