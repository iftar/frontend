import CollectionPoint from '../models/CollectionPoint';

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

    return fullAddress;
  }
}

export default CollectionPointAddressUtil;