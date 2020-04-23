"use strick"
$(document).ready(function () {

    $('.add-new-item').tooltip();

    $("#date").datepicker();
    $("#date").datepicker("option", "dateFormat", "mm/dd/yy");

    $("#addIncome").click(function () {

        dialog.dialog("open");
    });


    var dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 250,
        width: 500,
        modal: true,
        buttons: {
            "Add Income": addIncome,
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
        addIncome()
    });
});


function addIncome() {

    var income = new Income();

    var description = $("#description").val();
    var amount = parseFloat($('#amount').val());
    var incomeDate = $('#date').val();

    if (description === '') {

        alert("Please Enter some Description");
        return;
    } else if (isNaN(amount)) {

        alert("Amount must an number");
        return;
    } else if (date === '') {

        alert("Please Select a valid a Date!");
        return;
    } else {

        var user = Utility.getKeyData("login");

        if (user == null) {
            RefreshPage();
        }
        if (user != null && user[0].UserCurrency != baseCurrency) {

            amount = Currency.ConvertCurrency(user[0].UserCurrency, amount);
            income.Amount = amount;
        } else {

            income.Amount = amount;
        }

        income.Description = description;
        income.IncomeDate = new Date(incomeDate);
        income.UserName = user[0].UserName;
    }

    Utility.add("income", income);

    $("#dialog-form").dialog("close");

    location.reload(true);

}