import CollectionPoint from '../models/CollectionPoint';
import OrderCreation from '../models/OrderCreation';

class CollectionPointAddressUtil {
  static getFullAddressFormatted(collectionPoint: CollectionPoint) {
    let fullAddress = "";

    if(collectionPoint.address_line_1) {
      fullAddress += collectionPoint.address_line_1 + ", ";
    }
    if(collectionPoint.address_line_2) {
      fullAddress += collectionPoint.address_line_2 + ", ";
    }
    if(collectionPoint.city) {
      fullAddress += collectionPoint.city + ", ";
    }
    if(collectionPoint.county) {
      fullAddress += collectionPoint.county + ", ";
    }
    if(collectionPoint.post_code) {
      fullAddress += collectionPoint.post_code + ", ";
    }

    return fullAddress.substring(0, fullAddress.length - 2);
  }
  static getFullAddressFormattedFromOrder(orderCreation: OrderCreation) {
    let fullAddress = "";

    if(orderCreation.address_line_1) {
      fullAddress += orderCreation.address_line_1 + ", ";
    }
    if(orderCreation.address_line_2) {
      fullAddress += orderCreation.address_line_2 + ", ";
    }
    if(orderCreation.city) {
      fullAddress += orderCreation.city + ", ";
    }
    if(orderCreation.county) {
      fullAddress += orderCreation.county + ", ";
    }
    if(orderCreation.post_code) {
      fullAddress += orderCreation.post_code + ", ";
    }

    return fullAddress.substring(0, fullAddress.length - 2);
  }
}

export default CollectionPointAddressUtil;