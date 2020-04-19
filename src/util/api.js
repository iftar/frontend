import axios from "axios";
import { saveItem, getItem } from "./storage";

const BASE_URL = "https://share-your-iftar-backend.herokuapp.com/api";
const LOCATION_URL =
  "https://share-your-iftar-backend.herokuapp.com/api/collection-points";
const ORDER_CHECK_URL =
  "https://share-your-iftar-backend.herokuapp.com//api/user/orders/check";

export async function login(email, password) {
  let response;

  try {
    response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    const data = response.data;

    if (response.status === 200) {
      const user = data.data.user;
      const token = data.data.token;

      // Storing user info and token in localStorage
      saveItem("userToken", token);
      saveItem("user", JSON.stringify(user));
    }

    return data;
  } catch (error) {
    console.log("error: ", error.response);
    return error.response.data;
  }
}

export async function register(firstname, lastname, email, password, confirm) {
  let response;

  try {
    response = await axios.post(`${BASE_URL}/register`, {
      firstname,
      lastname,
      email,
      password,
      confirm,
    });

    const data = response.data;

    console.log("data: ", data);

    return data;
  } catch (error) {
    console.log("error: ", error.response);
    return error.response.data;
  }
}

export async function ordercheck(userId, user_can_order) {
  let response;

  try {
    response = await axios.get(`${ORDER_CHECK_URL}?id={userId}`, {
      user_can_order,
    });
    const data = response.data;
    console.log("data: ", data);
    return data;
  } catch (error) {
    console.log("error: ", error.response);
    return error.response.data;
  }
}

export async function getLocations() {
  const token = getItem("userToken");
  let response;
  try {
    response = await axios.get(`${LOCATION_URL}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = response.data;
    console.log("data: ", data);
    return Object.assign(new Location(), data);
  } catch (error) {
    console.log("error: ", error.response);
    return error.response.data;
  }
}
