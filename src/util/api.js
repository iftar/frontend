import axios from 'axios';
import { getItem, saveItem } from './storage';
import Order from '../models/Order';
import User from '../models/User';
import Logger from './Logger';
import CollectionPoint from '../models/CollectionPoint';

const BASE_URL = 'https://share-your-iftar-backend.herokuapp.com/api';
const LOCATION_URL = BASE_URL + "/collection-points";
const ORDER_CHECK_URL = "https://share-your-iftar-backend.herokuapp.com//api/user/orders/check";

const USER_TOKEN_KEY = 'userToken';
const USER_KEY = 'user';

const logger = new Logger('api');

// --------------------------
// USER API FUNCTIONS

export function getUserToken() {
  return getItem(USER_TOKEN_KEY);
}

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
      saveItem(USER_TOKEN_KEY, token);
      saveItem(USER_KEY, JSON.stringify(user));
    }

    return data;
  } catch (error) {
    console.log('error: ', error.response);
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

    console.log('data: ', data);

    return data;
  } catch (error) {
    console.log('error: ', error.response);
    return error.response.data;
  }
}

export async function getUserDetails() {
  const token = getUserToken();

  let response;

  try {
    response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

    const data = response.data;
    const appData = data.data;

    logger.info('response data', data);

    return Object.assign(User, appData.user);
  } catch (error) {
    logger.error(error.message);
    throw new Error('Failed to fetch user details');
  }
}

// --------------------------
// ORDER API FUNCTIONS

export async function getOrders() : Array<Order> {
  const token = getUserToken();

  let response;

  try {
    response = await axios.get(`${BASE_URL}/user/orders`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

    const data = response.data;
    const appData = data.data;

    logger.info('response data', data);

    return appData.orders.map(order => Object.assign(Order, order));
  } catch (error) {
    logger.error(error.message);
    throw new Error('Failed to fetch orders');
  }
}

export async function canUserPlaceOrder() {
  let response;

  try {
    response = await axios.get(`${BASE_URL}/user/orders/check`, {
      headers: {
        'Authorization': 'Bearer ' + getUserToken(),
      },
    });
    const data = response.data;
    logger.info("data: ", data);
    return data.data.check.user_can_order;
  } catch (error) {
    logger.error("error: ", error.response);
    throw new Error(error.response.data);
  }
}

export async function getCollectionPoints() {
  const token = getItem("userToken");
  let response;
  try {
    response = await axios.get(`${BASE_URL}/collection-points`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = response.data;
    logger.info("data: ", data);
    return data.data.collection_points.data.map(d => Object.assign(new CollectionPoint(), d));
  } catch (error) {
    logger.error("error: ", error.message);
    throw new Error(error.message);
  }
}