import axios from 'axios';
import { getItem, saveItem } from './storage';
import User from '../models/User';
import Logger from './Logger';

const BASE_URL = process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL + "/api" : "https://share-iftar-staging.herokuapp.com/api";

const USER_TOKEN_KEY = 'userToken';
const USER_KEY = 'user';

const logger = new Logger('api');

// --------------------------
// USER API FUNCTIONS

export function getUserToken() {
  return getItem(USER_TOKEN_KEY);
}

export function getUser() : User {
  return Object.assign(User, JSON.parse(getItem(USER_KEY)));
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
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      confirm: confirm,
    });

    const data = response.data;

    console.log('data: ', data);

    return data;
  } catch (error) {
    console.log('error: ', error.response);
    return error.response.data;
  }
}
