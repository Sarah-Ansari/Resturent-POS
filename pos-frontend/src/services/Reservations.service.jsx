import axios from "axios";
import { API } from "./BaseApi";

import { cReservations } from "../data/Reservations";

const API_URL = API;

export const fetchReservations = async () => {
  try {
    console.log("jesica");
    const response = await axios.get(
      API_URL + "/reservation/list"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return cReservations;
  }
};


export const fetchPast = async () => {
  try {
    console.log("jesica");
    const response = await axios.get(
      API_URL + "/reservation/list_past"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return cReservations;
  }
};


export const fetchPresent = async () => {
  try {
    console.log("jesica");
    const response = await axios.get(
      API_URL + "/reservation/list_now"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return cReservations;
  }
};

export const handleForm = async (data) => {
  try {
    console.log(data);
    // alert(JSON.stringify(data));
    const response = await axios.post(API_URL + "/reservation/create", data);
    console.log("Response:", response.data);
    return response.data
    // Handle successful response here, if needed
  } catch (error) {
    console.error("Error:", error);
    // alert("Error:", error);
    // Handle error here, if needed
  }
};

export const deleteReservation = async (data) => {
  try {
    const response = await axios.delete(
      API_URL + '/reservation/delete?reservationId=' + data
    );
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error Deleting reservation:", error);
    return [];
  }

}