import axios from "axios";
import { API } from "./BaseApi";

import { authHeader } from "./auth_header";
import { ingredients_sample } from "../data/InventoryAndSuppliers";

const API_URL = API;

export const fetchIngredients = async () => {
  try {
    const response = await axios.get(
      API_URL + "/ingredient/list"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return ingredients_sample;
  }
};

export const SearchInputChangeIngredients = async (event) => {
  try {
    const response = await axios.get(
      API_URL + `/ingredient/search?name=${event.target.value}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered ingredients:", error);
    // return null_inventory;
  }
};

export const createIngredient = (data) => {
  console.log("Printing from inventory service creeate inventory " + JSON.stringify(data))
  try {
    const response = axios.post(API_URL + "/ingredient/create", data);
    console.log("Response:", response.data);
    return response.data
    // Handle successful response here, if needed
  } catch (error) {
    console.error("Error:", error);
    // alert("Error:", error);
    // Handle error here, if needed
  }
};

export const deleteIngredient = async (data) => {
  try {
    const response = await axios.delete(
      API_URL + '/ingredient/delete?ingredientId=' + data
    );
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error Deleting ingredient:", error);
    return [];
  }

}