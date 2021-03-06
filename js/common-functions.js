
var today = new Date();
var currentMonth = today.getMonth();

var monthlyIncome = 0,
    monthlyExpense = 0,
    totalIncome = 0,
    totalExpense = 0;

$(document).ready(function () {

    //append the current user currency to h1 tag below the navigation bar
    $('h1').next().html('User Currency: ' + login.UserCurrency);
});

//function to generate card values on the like Total income, Monthly Income  etc.
//also generates the income and expense record tables on the income.html and expense.html
function RetrieveTabValues() {

    var incomes = Utility.search("income", "UserName", login.UserName);
    var expenses = Utility.search("expense", "UserName", login.UserName);

    if (incomes != undefined) {

        PrepareIncomeLayout(incomes);
    }

    if (expenses != undefined) {

        PrepareExpenseLayout(expenses);
    }

    $('#dataTable').dataTable({
        "paging": true
    });

    $('#totalEarning').html(totalIncome.toFixed(2));
    $('#monthlyEarning').html(monthlyIncome.toFixed(2));

    $('#monthlyExpense').html(monthlyExpense.toFixed(2));
    $('#totalExpense').html(totalExpense.toFixed(2));

};

//Prepares the Income record table on the income.html page
//also calculates the totalIncome and monthlyIncome 
function PrepareIncomeLayout(incomes) {

    var incomeTbody = $("<tbody></tbody>");

    incomes.sort(function (a, b) {

        return new Date(a.IncomeDate).getTime() - new Date(b.IncomeDate).getTime()
    });

    incomes.reverse();

    $.each(incomes, function (index, value) {

        var tr = $("<tr></tr>");

        totalIncome += value.Amount;
        var incomeDate = new Date(value.IncomeDate);

        if (currentMonth == incomeDate.getMonth()) {

            monthlyIncome += value.Amount;
        }

        $(tr).append(`<td>${index + 1}</td>`);
        $(tr).append(`<td>${value.Description}</td>`);
        $(tr).append(`<td>${value.Amount}</td>`);
        $(tr).append(`<td>${incomeDate.toLocaleDateString()}</td>`);

        $(incomeTbody).append(tr);
    });

    $('.incomeTable').append(incomeTbody);
};

//Prepares the Expense record table on the expense.html page
//also calculates the totalExpense and monthlyExpense 
function PrepareExpenseLayout(expenses) {

    var expenseTbody = $("<tbody></tbody>");

    //expenses = expenses.reverse(x => new Date(x.ExpenseDate).getMonth());

    expenses.sort(function (a, b) {

        return new Date(a.ExpenseDate).getTime() - new Date(b.ExpenseDate).getTime()
    });

    expenses.reverse();

    $.each(expenses, function (index, value) {

        var tr = $("<tr></tr>");

        totalExpense += value.Amount;
        var expenseDate = new Date(value.ExpenseDate);

        if (currentMonth == expenseDate.getMonth()) {

            monthlyExpense += value.Amount;
        }

        $(tr).append(`<td>${index + 1}</td>`);
        $(tr).append(`<td>${value.Description}</td>`);
        $(tr).append(`<td>${value.Amount}</td>`);
        $(tr).append(`<td>${expenseDate.toLocaleDateString()}</td>`);

        $(expenseTbody).append(tr);
    });

    $('.expenseTable').append(expenseTbody);
};

