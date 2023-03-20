import {API} from "../../backend"
// API means ; http://localhost:8000/api/
// var payload = {
//     a: 1,
//     b: 2
// };

// var data = new FormData();
// data.append( "json", JSON.stringify( payload ) );

// fetch("/echo/json/",
// {
//     method: "POST",
//     body: data
// })
// .then(function(res){ return res.json(); })
// export const signup = user =>{
    
//     // const user={
//     //     "name":"Swapnilee",
//     //     "email":"sbaluja53@uwaterloo.com",
//     //     "password":"12345e67"
//     // }
//     // console.log(user);
//     // // debugger;
//     // var data = new FormData();
//     // data.append( "json", JSON.stringify( user ) );
//     return fetch(`${API}/signup`,{
//         method:"POST",
//         headers:{
            
//             Accept:"application/json,text/plain,*/*",
//             'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
//         },
//         body:JSON.stringify({
//             "name":"Swapnilee",
//         "email":"sbaluja53@uwaterloo.com",
//         "password":"12345e67"
//         })
//     })
//     .then(respone=>{
//         console.log("HI")
//         return respone.json();
//     })
//     .catch(err=> console.log(err))
// }
export const signup = user => {
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  

export const signin = user=>{

    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
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

export const authenticate = (data,next)=>{
    if(typeof window!=="undefined")
    {
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
}

export const signout = next =>{
    if(typeof window!=="undefined")
    {
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/signout`,{
            method:"GET"
        })
        .then(response => console.log("signout done"))
        .catch(err => console.log(err))
    }
    
};

export const isAuthenticated = () =>{

    if(typeof window!=="undefined")
    {
        return false;
    }
    if( localStorage.getItem("jwt"))
    {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false;
    }
}