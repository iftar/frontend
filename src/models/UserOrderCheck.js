class UserOrderCheck {
  user_can_order: boolean;
  user_has_ordered_today: boolean;
  time_passed_daily_deadline: boolean;
  messages: Array<String>;

  constructor(
      user_can_order: boolean, user_has_ordered_today: boolean,
      time_passed_daily_deadline: boolean, messages: Array<String>) {
    this.user_can_order = user_can_order;
    this.user_has_ordered_today = user_has_ordered_today;
    this.time_passed_daily_deadline = time_passed_daily_deadline;
    this.messages = messages;
  }
}

export default UserOrderCheck;