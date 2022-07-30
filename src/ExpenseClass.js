export default class Expense {
  constructor(title, amount) {
    this.title = title;
    this.amount = amount;
  }

  getDetails() {
    return {
      title: this.title,
      amount: this.amount,
    };
  }
}
