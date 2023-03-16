import {API} from "../../backend"
// API means ; http://localhost:8000/api/

export const signup = user=>{

    return fetch(`${API}/signup`,{
        method:"POST",
        header:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(respone=>{
        return respone.json();
    })
    .catch(err=> console.log(err))
}

