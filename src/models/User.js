class User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: Date;
  type: string;
  status: string;
  updated_at: Date;
  created_at: Date;

  constructor(
      id: number, first_name: string, last_name: string, email: string,
      email_verified_at: Date, type: string, status: string, updated_at: Date,
      created_at: Date) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.email_verified_at = email_verified_at;
    this.type = type;
    this.status = status;
    this.updated_at = updated_at;
    this.created_at = created_at;
  }
}

export default User;