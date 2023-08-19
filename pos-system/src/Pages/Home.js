import React, { useState } from "react";
import LayoutComponent from "../component/LayoutComponent";
import { useNavigate } from "react-router-dom";
// import "../styles/DefaultLayout.css"
import "../styles/HomeStyle.css"
import CafeService from "../service/CafeService";


function HomePage(props) {
        let navigate =useNavigate;
    let [formdetails,setformDetails]=useState({email:"",password:""});
    let login=()=>{
        if(formdetails.email==="" || formdetails.password===""){
            alert("please fill required fields")
            return;
        }
        console.log("here")
        CafeService.signinCafe(formdetails)
        .then((result)=>{
            setformDetails({email:"",password:""});
            navigate("/restaurantPage")
        })
    }
    return (
        <div>
        
        <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form>
        <h3>Login Here</h3>

        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username"/>

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password"/>

        <button id='login' name='login' onClick={login}>Log In</button>
        <form action="/register">

        <div class="social">
          <div class="go"><h6>Do not have an account?</h6></div>
          <button type="submit" id='register' class='btn btn-primary'>Register</button>
        </div>
        </form>
    </form>
        </div>
     );
}

export default HomePage;