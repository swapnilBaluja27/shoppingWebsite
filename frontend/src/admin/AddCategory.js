import React,{useState}  from "react";
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import {creatCategory} from "./helper/adminapicall"
const AddCategory = ()=>{

    const [name,setName] = useState({
        name:""
    });

    const [error,setError] = useState({
        error:false
    });
    const [success,setSuccess] = useState(false);
    const {user ,token} = isAuthenticated();
    const goBack =()=>{
        return (
           <div className="mt-5">
               <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
                   Admin Home
                </Link>

           </div>

        )
    }
    const handleChange =(event)=>{
        setError("");
        setName(event.target.value);
    }
    const onSubmit =(event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false);
        //Backend request called

        creatCategory(user._id,token,{name})
        .then(response =>{
            if(response.error)
            {
                setError(true)
            }
            else{
                setError("")
                setSuccess(true)
                setName("")
            }
        })
        .catch()
    }

    const myCategoryForm  = ()=>{
        return (
        <form>
            <div className="form-group">
                <p className="lead">Enter Category</p>
                <input type="text"
                className="form-control my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="for Ex. summer"

                >

                </input>
                <button onClick ={onSubmit} 
                className="btn btn-outline-info">Create Category</button>

            </div>
        </form>
        )
    }

    const successMessage = () =>{
        if(success){
            return <h4 className="text-success">Category Created Successfully</h4>
        }
    }

    const warningMessage =() =>{
        if(error){
            return <h4 className="text-success">Failed to create a Category</h4>
        }
    }

    return(
        <Base 
        title="Create a Category " 
        description="Add a new category for new shirt"
        className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">

                </div>
            </div>
            {successMessage()}
            {warningMessage()}
            {myCategoryForm()}
            {goBack()}
        </Base>
    );
};

export default AddCategory;