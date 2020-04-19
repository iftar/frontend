class CollectionPointTimeSlot {
  id: number;
  collection_point_id: number;
  start_time: Date;
  end_time: Date;
  max_capacity: number;
  type: string;
  created_at: Date;
  updated_at: Date;

  constructor(
      id: number, collection_point_id: number, start_time: Date, end_time: Date,
      max_capacity: number, type: string, created_at: Date, updated_at: Date) {
    this.id = id;
    this.collection_point_id = collection_point_id;
    this.start_time = start_time;
    this.end_time = end_time;
    this.max_capacity = max_capacity;
    this.type = type;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default CollectionPointTimeSlot;