import { CustomersData } from "../data/Customers";
import { API } from "./BaseApi";
import axios from "axios";

const API_URL = API;

export const fetchCustomer = async (data) => {
  try {
    const response = await axios.get(
      API_URL + "/customer/list", data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return CustomersData;
  }
};

export const addCustomers = async (data) => {
  try {
    const response = await axios.post(
      API_URL + "/customer/create", data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding customers:", error);
    return [];
  }
};

export const deleteCustomer = async (data) => {
  try {
    data = parseInt(data);
    const response = await axios.delete(
      API_URL + '/customer/delete?customerId=' + data
    );
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error Deleting customers:", error);
    return [];
  }

}