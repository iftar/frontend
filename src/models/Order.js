import CollectionPointTimeSlot from './CollectionPointTimeSlot';
import CollectionPoint from './CollectionPoint';

class Order {

  id: number;
  user_id: number;
  quantity: number;
  required_date: Date;
  collection_point_id: number;
  collection_point_time_slot_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  county: string;
  post_code: string;
  notes: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  collection_point_time_slot: CollectionPointTimeSlot;
  collection_point: CollectionPoint;

  constructor(
      id: number, user_id: number, quantity: number, required_date: Date,
      collection_point_id: number, collection_point_time_slot_id: number,
      first_name: string, last_name: string, email: string, phone: string,
      address_line_1: string, address_line_2: string, city: string,
      county: string, post_code: string, notes: string, status: string,
      created_at: Date, updated_at: Date,
      collection_point_time_slot: CollectionPointTimeSlot,
      collection_point: CollectionPoint) {
    this.id = id;
    this.user_id = user_id;
    this.quantity = quantity;
    this.required_date = required_date;
    this.collection_point_id = collection_point_id;
    this.collection_point_time_slot_id = collection_point_time_slot_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.address_line_1 = address_line_1;
    this.address_line_2 = address_line_2;
    this.city = city;
    this.county = county;
    this.post_code = post_code;
    this.notes = notes;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.collection_point_time_slot = collection_point_time_slot;
    this.collection_point = collection_point;
  }
}

export default Order;