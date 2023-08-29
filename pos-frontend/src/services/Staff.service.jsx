import axios from "axios";
import { API } from "./BaseApi";

import { staffData } from "../data/Staff";

const API_URL = API;

export const fetchStaff = async () => {
  try {
    const response = await axios.get(
      API_URL + "/employee/list"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching staff:", error);
    return staffData;
  }
};

export const SearchInputChangeStaff = async (event) => {
  try {
    const response = await axios.get(
      API_URL + `/employee/search?name=${event.target.value}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered Staff:", error);
    // return null_inventory;
  }
};


export const handleForm = async (data) => {
  try {
    const response = await axios.post(
      API_URL + "/employee/create", data
    );
    console.log("Member Added", response.data);
    // refresher(true);
    return response.data;
  } catch (error) {
    console.error("Error Adding Member:", error);
  }
}


export const deleteStaff = async (data) => {
  try {
    const response = await axios.delete(
      API_URL + '/employee/delete?employeeId=' + data
    );
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error Deleting employee:", error);
    return [];
  }

}