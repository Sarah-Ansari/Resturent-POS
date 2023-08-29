import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles/Login.scss";

export const Registration = () => {
    const navigate = useNavigate();
    const [passwordError, setPasswordErr] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordInput, setPasswordInput] = useState({
        password: '',
        confirmPassword: ''
    });
    const [formdetails, setformDetails] = useState({ email: "", password: "", address: "", phone: "", position: "" });

    const handlePasswordChange = (evnt) => {
        const passwordInputValue = evnt.target.value.trim();
        const passwordInputFieldName = evnt.target.name;
        const NewPasswordInput = { ...passwordInput, [passwordInputFieldName]: passwordInputValue }
        setPasswordInput(NewPasswordInput);

    }
    const handleValidation = (evnt) => {
        const passwordInputValue = evnt.target.value.trim();
        const passwordInputFieldName = evnt.target.name;
        //for password 
        if (passwordInputFieldName === 'password') {
            const uppercaseRegExp = /(?=.*?[A-Z])/;
            const lowercaseRegExp = /(?=.*?[a-z])/;
            const digitsRegExp = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp = /.{8,}/;
            const passwordLength = passwordInputValue.length;
            const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
            const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
            const digitsPassword = digitsRegExp.test(passwordInputValue);
            const specialCharPassword = specialCharRegExp.test(passwordInputValue);
            const minLengthPassword = minLengthRegExp.test(passwordInputValue);
            let errMsg = "";
            if (passwordLength === 0) {
                errMsg = "Password is empty";
            } else if (!uppercasePassword) {
                errMsg = "At least one Uppercase";
            } else if (!lowercasePassword) {
                errMsg = "At least one Lowercase";
            } else if (!digitsPassword) {
                errMsg = "At least one digit";
            } else if (!specialCharPassword) {
                errMsg = "At least one Special Characters";
            } else if (!minLengthPassword) {
                errMsg = "At least minumum 8 characters";
            } else {
                errMsg = "";
            }
            setPasswordErr(errMsg);
        }
        // for confirm password
        if (passwordInputFieldName === "confirmPassword" || (passwordInputFieldName === "password" && passwordInput.confirmPassword.length > 0)) {

            if (passwordInput.confirmPassword !== passwordInput.password) {
                setConfirmPasswordError("Confirm password is not matched");
            } else {
                setConfirmPasswordError("");
            }
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("here")
        try {
            await AuthService.signup(formdetails).then(
                (response) => {
                    console.log("Logged In", response);
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
            if (regResponse.employeeId) {
                navigate("/authenticate")
            }
        } catch (err) {
            console.log(err)
        }


    }
    return (
        <div className="login-page">
            {/* <MenuPanel /> */}
            <div className="auth-form-cantainer">
                <h2>
                    <b>Register</b>
                </h2>
                <h3>Enter your credentials</h3>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        value={formdetails.name}
                        onChange={(input) => setformDetails({ ...formdetails, name: input.target.value })}
                        type="text"
                        placeholder="name"
                        id="name"
                        name="name"
                        required="required"
                    />
                    <input
                        value={formdetails.email}
                        onChange={(input) => setformDetails({ ...formdetails, email: input.target.value })}
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        required="required"
                    />
                    <input
                        value={formdetails.password}
                        onChange={(input) => setformDetails({ ...formdetails, password: input.target.value })}
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        required="required"
                    // onKeyUp={handleValidation}
                    />
                    <input
                        value={formdetails.address}
                        onChange={(input) => setformDetails({ ...formdetails, address: input.target.value })}
                        type="text"
                        placeholder="address"
                        id="address"
                        name="address"
                        required="required"
                    />
                    <input
                        value={formdetails.phone}
                        onChange={(input) => setformDetails({ ...formdetails, phone: input.target.value })}
                        type="text"
                        placeholder="phone number"
                        id="phone"
                        name="phone"
                        required="required"
                    />
                    <input
                        value={formdetails.position}
                        onChange={(input) => setformDetails({ ...formdetails, position: input.target.value })}
                        type="text"
                        placeholder="position"
                        id="position"
                        name="position"
                        required="required"
                    />
                    {/* <input
                        value={formdetails.dateOfBirth}
                        onChange={(input) => setformDetails({...formdetails,dateOfBirth:input.target.value})}
                        type="datetime-local"
                        placeholder="DOB"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        
                    /> */}
                    <button type="submit" onClick={(handleSubmit)}>
                        <b>Register</b>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Registration;