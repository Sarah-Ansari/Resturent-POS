import axios from "axios";
import { API } from "./BaseApi";
axios.defaults.baseURL="http://localhost:8081/employee"

const API_URL = API;

// Registers a user by making a POST request to the API
const signup = (formdetails) => {
  console.log(formdetails);
  return axios
    .post(API_URL + '/employee/create',
      formdetails
    )
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        // Stores the user object in local storage if a token is present in the response
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }).catch((error) => {
      console.error("An error occurred:", error);
      // Handle the error appropriately
    });
};


export const registerEmployee = async (formdetails) => {
  try {
    // console.log("jesica");
    alert("jessica")
    console.log("printign request", JSON.stringify(formdetails))
    const response = await axios.post(
      API_URL + '/employee/create',
      formdetails
    );
    alert(pausing)
    console.log(response.data);
    alert("after response")
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// Authenticates a user by making a POST request to the API
const login = (email, password) => {
  // alert(password);
  return axios
    .get("http://localhost:8081/employee/login", {
      params: {
        email,
        password,
      }
    })
    .then((response) => {
      // setToken(response)
      console.log(response);
      if (response.data.token) {
        // Stores the user object in local storage if a token is present in the response
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

// Removes the user object from local storage
const logout = () => {
  localStorage.removeItem("user");
};

// Retrieves the current user object from local storage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const auth = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default auth;
