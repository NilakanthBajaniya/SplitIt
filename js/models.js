"use strick"

//constructor to create User object
var User = function () {

    this.Id = 0;
    this.UserName = '';
    this.Email = '';
    this.UserCurrency = '';
    this.Password = '';
}

//constructor to create Income object
var Income = function () {

    this.Id = 0;
    this.Description = '';
    this.Amount = 0;
    this.IncomeDate = new Date();
    this.UserName = '';
    this.isNew = true;
}

//constructor to create Expense object
var Expense = function () {

    this.Id = 0;
    this.Description = "";
    this.Amount = 0;
    this.ExpenseDate = new Date();
    this.UserName = '';
    this.isNew = true;
}