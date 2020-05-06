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


  fetchCollectionPointsNearMeUsingPostcode = async function(token: string, postcode: string) : Array<CollectionPoint> {
    try {
      const response = await axios.post(`${BASE_URL}/api/collection-points/near-me`, {
        postcode: postcode
      }, {
        headers: {
          Authorization: "Bearer " + token,
        }
      });
      const data = response.data;
      this.logger.info("data: ", data);
      if (data.status === "success") {
        const collectionPoints = data.data.collection_points;
        if (!isEmpty(collectionPoints)) {
          return collectionPoints.map(d => Object.assign(new CollectionPoint(), d));
        } else {
          return [];
        }
      } else {
        throw new Error(data.message);
      }

    } catch (error) {
      let errorMessage;
      this.logger.error("error: ", error);
      this.logger.error("error.response: ", error.response);
      this.logger.error("error.message: ", error.message);
      if (error.response) {
        errorMessage = error.response.data.message
      } else {
        errorMessage = error.message
      }


      throw new Error("Failed to fetch collection points: " + errorMessage);
    }
  };


  canDeliverToLocation = async function(token: string, id: number, postcode: string) : Array<CollectionPoint> {
    try {
      const response = await axios.post(`${BASE_URL}/api/collection-points/${id}/can-deliver-to-location`, {
        address: postcode,
      }, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      this.logger.info("data: ", data);
      if (data.status === "success") {
        return data.data.can_deliver_to_location;
      } else {
        return false;
      }

    } catch (error) {
      this.logger.error("error: ", error.message);
      throw new Error("Failed to check if delivery is valid: " + error.response.data.message);
    }
  };

}

export default new CollectionPointService();