import axios from 'axios';
import {BASE_URL} from '../constants/api';
import Logger from '../util/Logger';
import User from '../models/User';
import {getItem} from '../util/storage';
import CollectionPoint from '../models/CollectionPoint';
import UserOrderCheck from '../models/UserOrderCheck';
import isEmpty from 'lodash-es/isEmpty';

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


  fetchCollectionPointsNearMe = async function(token: string, lat: number, long: number) : Array<CollectionPoint> {
    try {
      const response = await axios.get(`${BASE_URL}/api/collection-points/near-me`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          lat: lat, long: long
        }
      });
      const data = response.data;
      this.logger.info("data: ", data);
      if (data.status === "success") {
        const collectionPoints = data.data.collection_points;
        if (!isEmpty(collectionPoints)) {
          return collectionPoints.data.map(d => Object.assign(new CollectionPoint(), d));
        } else {
          return [];
        }
      } else {
        return [];
      }

    } catch (error) {
      this.logger.error("error: ", error.message);
      throw new Error("Failed to fetch collection points: " + error.response.data.message);
    }
  };

}

export default new CollectionPointService();