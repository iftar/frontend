import CollectionPoint from '../models/CollectionPoint';
import OrderCreation from '../models/OrderCreation';
import Order from '../models/Order';

class AddressUtil {
  static getFullAddressFormattedFromCollectionPoint(collectionPoint: CollectionPoint) {
    return this.getFullAddressFormatted(
        collectionPoint.address_line_1,
        collectionPoint.address_line_2,
        collectionPoint.city,
        collectionPoint.county,
        collectionPoint.post_code,
    );
  }

  static getFullAddressFormattedFromOrderCreation(orderCreation: OrderCreation) {
    return this.getFullAddressFormatted(
        orderCreation.address_line_1,
        orderCreation.address_line_2,
        orderCreation.city,
        orderCreation.county,
        orderCreation.post_code,
    );
  }

  static getFullAddressFormattedFromOrder(order: Order) {
    return this.getFullAddressFormatted(
        order.address_line_1,
        order.address_line_2,
        order.city,
        order.county,
        order.post_code,
    );
  }

  static getFullAddressFormatted(address_line_1, address_line_2, city, county, post_code) {
    let fullAddress = "";

    if(address_line_1) {
      fullAddress += address_line_1 + ", ";
    }
    if(address_line_2) {
      fullAddress += address_line_2 + ", ";
    }
    if(city) {
      fullAddress += city + ", ";
    }
    if(county) {
      fullAddress += county + ", ";
    }
    if(post_code) {
      fullAddress += post_code + ", ";
    }

    return fullAddress.substring(0, fullAddress.length - 2);
  }
}

export default AddressUtil;