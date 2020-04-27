import CollectionPointTimeSlot from './CollectionPointTimeSlot';

class CollectionPoint {
  id: number;
  name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  county: string;
  post_code: string;
  max_daily_capacity: string;
  created_at: Date;
  updated_at: Date;
  available_capacity: number;
  accepting_orders: boolean;
  accepting_collections: boolean;
  accepting_deliveries: boolean;
  collection_point_time_slots: Array<CollectionPointTimeSlot>;

  constructor(
      id: number, name: string, address_line_1: string, address_line_2: string,
      city: string, county: string, post_code: string,
      max_daily_capacity: string, created_at: Date, updated_at: Date,
      available_capacity: number, accepting_orders: boolean,
      accepting_collections: boolean, accepting_deliveries: boolean,
      collection_point_time_slots: Array<CollectionPointTimeSlot>) {
    this.id = id;
    this.name = name;
    this.address_line_1 = address_line_1;
    this.address_line_2 = address_line_2;
    this.city = city;
    this.county = county;
    this.post_code = post_code;
    this.max_daily_capacity = max_daily_capacity;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.available_capacity = available_capacity;
    this.accepting_orders = accepting_orders;
    this.accepting_collections = accepting_collections;
    this.accepting_deliveries = accepting_deliveries;
    this.collection_point_time_slots = collection_point_time_slots;
  }
}

export default CollectionPoint;