import axios from 'axios';
import {BASE_URL} from '../constants/api';

class UserService {

  login = async function(email: string, password: string) {
    try {
      const response = await axios.post(BASE_URL + '/api/login')
      const data = response.data;
      return Object.assign(new User(), data);
    } catch (err) {

    }
  }

}

export default new UserService();