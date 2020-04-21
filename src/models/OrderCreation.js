import CollectionPointTimeSlot from './CollectionPointTimeSlot';
import CollectionPoint from './CollectionPoint';

class OrderCreation {
  first_name: string;
  last_name: string;
  email: string;
  quantity: number;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  county: string;
  post_code: string;
  collection_point: CollectionPoint;
  collection_point_time_slot: CollectionPointTimeSlot;

  constructor(
      first_name: string, last_name: string, email: string, quantity: number,
      phone: string, address_line_1: string, address_line_2: string,
      city: string, county: string, post_code: string,
      collection_point: CollectionPoint,
      collection_point_time_slot: CollectionPointTimeSlot) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.quantity = quantity;
    this.phone = phone;
    this.address_line_1 = address_line_1;
    this.address_line_2 = address_line_2;
    this.city = city;
    this.county = county;
    this.post_code = post_code;
    this.collection_point = collection_point;
    this.collection_point_time_slot = collection_point_time_slot;
  }

  isDelivery() {
    return this.address_line_1 != null;
  }
}

export default OrderCreation;