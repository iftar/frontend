class Order {
  id: number;
  name: string;
  type: string;
  collection_point_id: number;
  collection_point_timeslot_id: number;
  meals_adults: number;
  meals_children: number;
  notes: string;

  constructor(
      id: number, name: string, type: string, collection_point_id: number,
      collection_point_timeslot_id: number, meals_adults: number,
      meals_children: number, notes: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.collection_point_id = collection_point_id;
    this.collection_point_timeslot_id = collection_point_timeslot_id;
    this.meals_adults = meals_adults;
    this.meals_children = meals_children;
    this.notes = notes;
  }
}