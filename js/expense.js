"use strick"
$(document).ready(function () {

    $('.add-new-item').tooltip();

    $("#date").datepicker();
    $("#date").datepicker("option", "dateFormat", "mm/dd/yy");
    $('#splitBetween').selectpicker();

    var users = Utility.getKeyData("users");

    if (users != null) {
        var i = 0;

        while (i != users.length) {

            var option = document.createElement("OPTION");
            var text = document.createTextNode(users[i].UserName);
            option.appendChild(text);
            $(option).attr("value", users[i].UserName);

            document.getElementById("splitBetween").appendChild(option);
            i++;
        }
    }

    $('#splitBetween').selectpicker('refresh')

    $("#addExpense").click(function () {

        dialog.dialog("open");
    });


    var dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 350,
        width: 500,
        modal: true,
        buttons: {
            "Add Expense": AddExpense,
            Cancel: function () {
                dialog.dialog("close");
            }
        },
        close: function () {
            form[0].reset();
        }
    });

    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        AddExpense();
    });
});


function AddExpense() {

    var description = $("#description").val();
    var amount = parseFloat($('#amount').val());
    var expenseDate = $('#date').val();

    var splitBetween = $('#splitBetween').selectpicker('val');

    if (description === '') {

        alert("Please Enter some Description");
        return;
    } else if (isNaN(amount)) {

        alert("Amount must an number");
        return;
    } else if (date === '') {

        alert("Please Select a valid a Date!");
        return;

    } else if (splitBetween.length == 0) {

        var expense = new Expense();

        var user = Utility.getKeyData("login");

        if (user == null) {
            RefreshPage();
        }
        if (user != null && user[0].UserCurrency != baseCurrency) {

            amount = Currency.ConvertCurrency(user[0].UserCurrency, amount);
            expense.Amount = amount;
        } else {

            expense.Amount = amount;
        }

        expense.Description = description;
        expense.ExpenseDate = new Date(expenseDate);
        expense.UserName = user[0].UserName;

        Utility.add("expense", expense);
        $("#dialog-form").dialog("close");
        location.reload(true);
    } else if (splitBetween.length > 0) {

        var splittedAmount = amount / splitBetween.length;
        var users = Utility.getKeyData("users");

        if (users == null) {
            return;
        }

        var i = 0;
        do {

            var userName = users[i].UserName;
            var userCurrency = users[i].UserCurrency;
            if (splitBetween.includes(userName)) {

                var expense = new Expense();

                if (userCurrency != baseCurrency) {

                    expense.Amount = Currency.ConvertCurrency(userCurrency, splittedAmount);
                } else {
                    expense.Amount = splittedAmount;
                }

                expense.Description = description;
                expense.ExpenseDate = new Date(expenseDate);
                expense.UserName = userName;
                Utility.add("expense", expense);
            }
            i++;
        } while (i < users.length)

        location.reload(true);

    }
}