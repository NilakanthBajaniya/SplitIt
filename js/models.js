"use strick"
var User = function () {

    this.Id = 0;
    this.UserName = '';
    this.Email = '';
    this.UserCurrency = '';
    this.Password = '';
}

var Income = function () {

    this.Id = 0;
    this.Description = '';
    this.Amount = 0;
    this.IncomeDate = new Date();
    this.UserName = '';
    this.isNew = true;
}

var Expense = function () {

    this.Id = 0;
    this.Description = "";
    this.Amount = 0;
    this.ExpenseDate = new Date();
    this.UserName = '';
    this.isNew = true;
}