import React,{useState}  from "react";
import Base from "../core/Base"
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup =()=>{
const [values,setValues]=useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:false
});
const {name,email,password,error,success}=values;
const handleChange = name => event =>{
    setValues({...values,error:false,[name]:event.target.value})
}
const successMessage = () =>{

    return ( <div className="alert alert-success" style={{display:success?"":"none"}}>
        NEW account done .Please<Link to ="/sigin"> Login here</Link>

    </div>
    )
}
const errorMessage = () =>{

   return ( <div className="alert alert-danger" style={{display:error?"":"none"}}>
        {error}
    </div>
   )
}
const onSubmit = event =>{
    event.preventDefault();
    setValues({...values,error:false})
    signup({name,email,password})
    .then(data =>{
        debugger;
        if(data.error)
        {
            setValues({...values,error:data.error,success:false})
        }
        else{
            
            setValues({
                ...values,
                name:"",
                email:"",
                password:"",
                error:"",
                success:true,
            })
        }
    })
    .catch(error => {
        debugger;
        console.log(error);
    })
        
        
};


    const signUpForm = () => {
        return ( 
        <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                           <label className="text-light">Name
                            </label> 
                            <input className ="form-control" 
                            onChange ={handleChange("name")}
                            type="text"
                            values={name}
                            ></input>
                        </div>
                        <div className="form-group">
                           <label className="text-light">Email
                            </label> 
                            <input className ="form-control"
                            onChange ={handleChange("email")} 
                            type="email"
                            values={email}
                            ></input>
                        </div>
                        <div className="form-group">
                           <label className="text-light">Password
                            </label> 
                            <input className ="form-control" 
                            onChange ={handleChange("password")}
                            type="password"
                            values={password}
                            ></input>
                        </div>
                        <button className="form-control btn btn-success btn-block"
                        onClick ={onSubmit}
                        >Submit</button>
                    </form>
                </div>
            </div>
        );
    }
    return(
        <Base title="Signup Page" description="A page for user to signup">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}
export default Signup;