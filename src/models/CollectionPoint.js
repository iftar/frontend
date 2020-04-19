import CollectionPointTimeSlot from './CollectionPointTimeSlot';

class CollectionPoint {
  name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  county: string;
  post_code: string;
  max_daily_capacity: string;
  created_at: Date;
  updated_at: Date;
  collection_point_time_slots: Array<CollectionPointTimeSlot>;

  constructor(
      name: string, address_line_1: string, address_line_2: string,
      city: string, county: string, post_code: string,
      max_daily_capacity: string, created_at: Date, updated_at: Date,
      collection_point_time_slots: Array<CollectionPointTimeSlot>) {
    this.name = name;
    this.address_line_1 = address_line_1;
    this.address_line_2 = address_line_2;
    this.city = city;
    this.county = county;
    this.post_code = post_code;
    this.max_daily_capacity = max_daily_capacity;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.collection_point_time_slots = collection_point_time_slots;
  }
}

export default CollectionPoint;