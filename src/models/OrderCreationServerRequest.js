class OrderCreationServerRequest {
  first_name: string;
  last_name: string;
  email: string;
  quantity: number;
  collection_point_id: number;
  collection_point_time_slot_id: number;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  county: string;
  post_code: string;
  notes: string;

  constructor(
      first_name: string, last_name: string, email: string, quantity: number,
      collection_point_id: number, collection_point_time_slot_id: number,
      phone: string, address_line_1: string, address_line_2: string,
      city: string, county: string, post_code: string, notes: string) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.quantity = quantity;
    this.collection_point_id = collection_point_id;
    this.collection_point_time_slot_id = collection_point_time_slot_id;
    this.phone = phone;
    this.address_line_1 = address_line_1;
    this.address_line_2 = address_line_2;
    this.city = city;
    this.county = county;
    this.post_code = post_code;
    this.notes = notes;
  }

}

export default OrderCreationServerRequest;