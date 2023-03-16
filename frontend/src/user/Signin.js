import React,{useState}  from "react";
import Base from "../core/Base"
import { Link } from "react-router-dom";

const Sigin =()=>{
    const signInForm = () => {
        return ( 
        <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                           <label className="text-light">Email
                            </label> 
                            <input className ="form-control" type="email"></input>
                        </div>
                        <div className="form-group">
                           <label className="text-light">Password
                            </label> 
                            <input className ="form-control" type="password"></input>
                        </div>
                        <button className="form-control btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        );
    }



    return(
        <Base title="Sigin Page" description="A page for user to sigin">
       {signInForm()}
        </Base>
    )
}
export default Sigin;