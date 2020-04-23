"use strick"
var User = function () {

    this.Id = 0;
    this.UserName = '';
    this.Email = '';
    this.UserCurrency = '';
}

var Income = function () {

    this.Id = 0;
    this.Description = '';
    this.Amount = 0;
    this.IncomeDate = new Date();
    this.UserName = '';
}

var Expense = function () {

    this.Id = 0;
    this.Description = "";
    this.Amount = 0;
    this.ExpenseDate = new Date();
    this.UserName = '';
}