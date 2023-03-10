import React from 'react';
import Base from "./Base";
import {API} from "../backend"
import "../styles.css"
const Home = ()=>{
  console.log(API);
    return (
      <Base title="Home Page">
          <h1 className="text-white">Hi frontend</h1>
      </Base>
            
        )
}
export default Home;