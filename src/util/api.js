import axios from 'axios'
import {getItem, saveItem} from './storage';
import Order from '../models/Order'

const BASE_URL = 'https://share-your-iftar-backend.herokuapp.com/api'

const USER_TOKEN_KEY = "userToken";
const USER_KEY = "user";

export async function login(email, password) {
  let response

  try {
    response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    })
    const data = response.data

    if (response.status === 200) {
      const user = data.data.user
      const token = data.data.token

      // Storing user info and token in localStorage
      saveItem(USER_TOKEN_KEY, token)
      saveItem(USER_KEY, JSON.stringify(user))
    }

    return data
  }
  catch (error) {
    console.log('error: ', error.response)
    return error.response.data
  }
}

export function getUserToken() {
  return getItem(USER_TOKEN_KEY);
}


export async function register(firstname, lastname, email, password, confirm) {
  let response

  try {
    response = await axios.post(`${BASE_URL}/register`, {
      firstname,
      lastname,
      email,
      password,
      confirm
    })

    const data = response.data

    console.log('data: ', data)

    return data
  }
  catch (error) {
    console.log('error: ', error.response)
    return error.response.data
  }
}


export async function getOrders() {
  const token = getItem("userToken");

  let response;

  try {
    response = await axios.get(`${BASE_URL}/user/orders`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    const data = response.data;

    console.log('data', data);

    return Object.assign(new Order(), data);
  } catch (error) {

  }
}
