import axios from 'axios';
import {BASE_URL} from '../constants/api';
import Logger from '../util/Logger';
import User from '../models/User';
import Order from '../models/Order';

class OrdersService {
  constructor() {
    this.logger = new Logger(OrdersService.name);
  }

  fetchOrders = async function(token: string) : Array<Order> {
    try {
      const response = await axios.get(`${BASE_URL}/api/user/orders`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      const data = response.data;
      const appData = data.data;

      this.logger.info('response data', data);

      return appData.orders.map(order => Object.assign(new Order(), order));
    } catch (error) {
      this.logger.error(error.message);
      throw new Error('Failed to fetch orders');
    }
  };

}

export default new OrdersService();