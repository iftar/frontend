import axios from 'axios';
import {BASE_URL} from '../constants/api';
import Logger from '../util/Logger';
import User from '../models/User';
import UserOrderCheck from '../models/UserOrderCheck';
import {getItem, saveItem} from '../util/storage';

const USER_TOKEN_KEY = 'userToken';
const USER_KEY = 'user';

class AuthService {

  constructor() {
    this.logger = new Logger(AuthService.name);
  }

  login = async function(email: string, password: string) : {user: User, token: string} {
    try {
      const response = await axios.post(BASE_URL + '/api/login', {
        email: email,
        password: password
      });
      const data = response.data.data;
      this.logger.info("data", data);
      const user = Object.assign(User, data.user);
      const token = data.token;

      saveItem(USER_TOKEN_KEY, token);
      saveItem(USER_KEY, JSON.stringify(user));

      return {
        user: user,
        token: token
      };
    } catch (err) {
      this.logger.error(err.message);
      throw new Error("Failed to login: " + err.message);
    }
  };

  refreshLogin = async function () : {user: User, token: string} {
    return {
      user: getItem(USER_KEY),
      token: getItem(USER_TOKEN_KEY)
    };
  };

  fetchUserDetails = async function(token : string) {
    try {
      const response = await axios.get(`${BASE_URL}/api/user`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      const data = response.data;
      const appData = data.data;

      this.logger.info('response data', data);

      return Object.assign(User, appData.user);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error('Failed to fetch user details');
    }
  };

  logout = async function(bearerToken: string) {
    try {
      const response = await axios.post(BASE_URL + '/api/logout', null, {
        headers: {
          Authorization: "Bearer " + bearerToken,
        },
      });
      return response.status === 200;
    } catch (err) {
      throw new Error("Failed to logout: " + err.message);
    }
  };

  fetchUserOrderCheck = async function(token: string) : UserOrderCheck {
    try {
      const response = await axios.get(`${BASE_URL}/api/user/orders/check`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      this.logger.info("data: ", data);
      return Object.assign(new UserOrderCheck(), data.data.check);
    } catch (error) {
      this.logger.error("error: ", error.message);
      throw new Error(error.message);
    }
  }



}

export default new AuthService();