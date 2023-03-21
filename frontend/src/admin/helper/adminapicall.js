import { API } from "../../backend";

export const creatCategory =(userId,token,category)=>{

    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
        "Content-type":"application/json",
        Authorization:`Bearer ${token}`
        },
        body :JSON.stringify(category)
    },
    
    )
    .then(response =>{
        return response.json();
    })
    .catch(error =>{
        console.log(error);
    })

}