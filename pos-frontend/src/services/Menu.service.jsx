import axios from "axios";
import { API } from "./BaseApi";

import { menuItemsData, newMenu } from "../data/Menu";

const API_URL = API;

export const fetchMenu = async () => {
  try {
    const response = await axios.get(
      API_URL + "/item/list_withIngredients"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu:", error);
    return newMenu;
  }
};

export const creteMenuItem = async (menuItemRequest) => {
  try {
    console.log("menu item create req" + JSON.stringify(menuItemRequest))
    const response = await axios.post(
      API_URL + "/item/create",
      menuItemRequest
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu:", error);
    return newMenu;
  }
};

export const updateMenuItem = async (menuItemRequest) => {
  try {
    console.log("menu item update req" + JSON.stringify(menuItemRequest))
    const response = await axios.put(
      API_URL + "/item/update",
      menuItemRequest
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu:", error);
    return newMenu;
  }
};

export const deleteMenuItem = async (data) => {
  try {
    const response = await axios.delete(
      API_URL + '/item/delete?itemId=' + data
    );
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error Deleting menuItem:", error);
    return [];
  }

}