import React,{useState}  from "react";
import Base from "../core/Base"
import { Link,Redirect } from "react-router-dom";
import {signin,authenticate,isAuthenticated} from "../auth/helper"
const Sigin =()=>{
    const [values,setValues] =useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false,

    });

    const {email,password,error,loading,didRedirect} = values;
    const {user} = isAuthenticated();
    const handleChange = name => event =>{
        setValues({...values,error:false,[name]:event.target.value})
    }
    const onSubmit = event =>{
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data =>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }
            else{
                authenticate(data,()=>{
                    setValues({...values,
                    didRedirect:true
                    })
                })
            }
        })
        .catch(console.log("Could not connect signup failed"));

    }

    const performRedirect =()=>{
        if(didRedirect){
            if(user && user.role===1)
            {
                return <p> redirect ADMIN Page</p>
            }else{
                return <p> redirect User Page</p>
            }
        }
        if(isAuthenticated())
        {
            return <Redirect to="/"/>;
        }
    }
    const loadingMessage = () =>{
     return (
        loading && (
            <div className="alert alert-info">
                <h2> Loading.....</h2>
            </div>
        )
     )
    }
    const errorMessage = () =>{
    
       return ( <div className="alert alert-danger" style={{display:error?"":"none"}}>
            {error}
        </div>
       )
    }
    const signInForm = () => {
        return ( 
        <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                           <label className="text-light">Email
                            </label> 
                            <input 
                            onChange ={handleChange("email")}
                            value={email} 
                            className ="form-control" 
                            type="email"></input>
                        </div>
                        <div className="form-group">
                           <label 
                           onChange ={handleChange("password")}
                           value={password} 
                           className="text-light">Password
                            </label> 
                            <input className ="form-control" type="password"></input>
                        </div>
                        <button 
                        onClick ={onSubmit}
                        className="form-control btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        );
    }



    return(
        <Base title="Sigin Page" description="A page for user to sigin">
       {loadingMessage()}
       {errorMessage()}
       {signInForm()}
       {performRedirect()}
        </Base>
    )
}
export default Sigin;