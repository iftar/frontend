import axios from 'axios';
import {BASE_URL} from '../constants/api';
import Logger from '../util/Logger';
import User from '../models/User';
import {getItem} from '../util/storage';
import CollectionPoint from '../models/CollectionPoint';
import UserOrderCheck from '../models/UserOrderCheck';

class CollectionPointService {
  constructor() {
    this.logger = new Logger(CollectionPointService.name);
  }

  fetchCollectionPoints = async function(token: string) : Array<CollectionPoint> {
    try {
      const response = await axios.get(`${BASE_URL}/api/collection-points`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      this.logger.info("data: ", data);
      return data.data.collection_points.data.map(d => Object.assign(new CollectionPoint(), d));
    } catch (error) {
      this.logger.error("error: ", error.message);
      throw new Error(error.message);
    }
  };

}

export default new CollectionPointService();