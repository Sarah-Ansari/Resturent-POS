import axios from "axios";
import { API } from "./BaseApi";

import { confirmedOrders, OrdersTrial, waitingOrders } from "../data/Orders";

const API_URL = API;

export const fetchOrders = async () => {
  try {
    const response = await axios.get(
      API_URL + "/order/list"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return OrdersTrial;
  }
};

export const fetchWaitingOrders = async () => {
  try {
    const response = await axios.get(
      API_URL + "/order/waiting"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching waiting orders:", error);
    return OrdersTrial;
  }
};

export const handleForm = async (data, refresher) => {
  console.log("request ", JSON.stringify(data))
  try {
    const response = await axios.post(API_URL + "/order/create", data);
    console.log("Response:", response.data);
    refresher(true);
    return response.data
    // Handle successful response here, if needed
  } catch (error) {
    console.error("Error:", error);
    // alert("Error:", error);
    // Handle error here, if needed
  }
};

export const deleteOrder = async (order, refresher) => {
  try {

    const response = await axios.delete(API_URL + "/order/delete?orderId=" + order.orderId)
    refresher(true)
    return response.data
  }
  catch (error) {
    console.error("Error:", error)
  }
};

export const markOrderComplete = async (order, refresher) => {
  try {

    const response = await axios.get(API_URL + "/order/mark_complete?orderId=" + order.orderId)
    refresher(true)
    return response.data
  }
  catch (error) {
    console.error("Error:", error)
  }
};