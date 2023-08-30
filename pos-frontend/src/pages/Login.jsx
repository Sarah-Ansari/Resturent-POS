import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles/Login.scss";
import  ReCAPTCHA  from "react-google-recaptcha";


export const Login = () => {
  const [email, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);
 const  REACT_APP_RECAPTCHA_SITE_KEY="6LdIB-YnAAAAACsdPTaRQ_yib7CyV2pkq21SqVHU"

  function onChange(value) {
    setIsCaptchaSuccess(true)
    console.log("captcha value: ", value);
  }

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios
  //       .post("http://localhost:8080/api/v1/auth/authenticate", {
  //         username: name,
  //         password: password,
  //       })
  //       .then((Response) => {
  //         console.log("Logged In",Response);
  //         if (Response.data.token) {
  //           localStorage.setItem("user", JSON.stringify(Response.data));
  //         }
  //         return Response.data;
  //       });
  //   } catch (err) {
  //     alert(err);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("please fill required fields")
      return;
    }
    try {
      await AuthService.login(email, password).then(
        (response) => {
          console.log("Logged In", response);
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          alert("invalid credentials")
          console.log(error);
        }
      );
    } catch (err) {
      alert(err);
    }
  };
  
  return (
    <div className="login-page">
      {/* <MenuPanel /> */}
      <img
        src="assets/My_project.png"
        alt="Logo"
        className="logo"
      />
      <div className="auth-form-cantainer">
        <h2>
          <b>Login</b>
        </h2>
        <h3>Enter your credentials</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(input) => setName(input.target.value)}
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            required="required"
          />
          <input
            value={password}
            onChange={(input) => setPassword(input.target.value)}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required="required"
          />
           <ReCAPTCHA
          sitekey={"6LdIB-YnAAAAACsdPTaRQ_yib7CyV2pkq21SqVHU"}
          onChange={onChange}
          />
          <button type="submit" disabled={!isCaptchaSuccessful}>
            <b>LOGIN</b>
          </button>
          <a href="/register">
            <span className="icon"><i></i>Register</span>
          </a>
        </form>
      </div>
    </div>
  );
};
