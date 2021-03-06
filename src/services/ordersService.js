import axios from 'axios';
import {BASE_URL} from '../constants/api';
import Logger from '../util/Logger';
import User from '../models/User';
import Order from '../models/Order';
import OrderCreation from '../models/OrderCreation';
import OrderCreationServerRequest from '../models/OrderCreationServerRequest';

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

  createOrder = async function (token: string, orderServerRequest : OrderCreationServerRequest) : Order {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/orders`, orderServerRequest, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      const data = response.data;
      const appData = data.data;

      this.logger.info('response data', data);

      return Object.assign(new Order(), appData.order);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error('Failed to create order: ' + error.response.data.message);
    }
  }

}

export default new OrdersService();