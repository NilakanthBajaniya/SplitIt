"use strick"
var baseCurrency = "CAD";
(function () {

    AddIncomes();
    AddExpenses();
    AddConversionRates();
    AddUsers();
    LoginUser();

})();

$(document).ready(function () {

    $('.dropdown-list').css('height', '350px');
    $('.dropdown-list').css('overflow-y', 'scroll');

    $('#alertsDropdown').click(function () {

        $('.badge').removeClass('badge-danger');
    });

    $("#userName").text(login.UserName);

    CreateNotifications();
});

function CreateNotifications() {

    var income = Utility.search("income", "UserName", login.UserName);
    var expense = Utility.search("expense", "UserName", login.UserName);

    var incomes = income.reverse((a, b) => new Date(b.IncomeDate) - new Date(a.IncomeDate));
    var expenses = expense.reverse((a, b) => new Date(b.ExpenseDate) - new Date(a.ExpenseDate));

    var notifications = new Array();

    $.each(incomes, function (index, value) {

        if (value.isNew) {

            $('.badge').addClass('badge-danger');
            $('.badge').text('+1');
        }

        value.Dates = value.IncomeDate;
        notifications.push(value);
        value.isNew = false;
        Utility.update("income", value.Id, "isNew", false);
    });

    $.each(expenses, function (index, value) {

        if (value.isNew) {

            $('.badge').addClass('badge-danger');
            $('.badge').text('+1');
        }

        value.Dates = value.ExpenseDate;
        notifications.push(value);
        value.isNew = false;
        Utility.update("expense", value.Id, "isNew", false);
    });

    var notificationHeader = $('<h6 class="dropdown-header">Alerts Center</h6>');

    if (notifications.length > 0) {

        notifications.sort(function (a, b) {
            debugger
            return new Date(a.Dates).getTime() - new Date(b.Dates).getTime()
        });

        // notifications.reverse();

        $.each(notifications, function (index, value) {

            var notificationRecord = $('<span class="dropdown-item d-flex align-items-center" href="#"> <div class="mr-3"> <div class="icon-circle"> <i class="fas fa fa-dollar-sign text-white"></i> </div></div><div> <div class="small text-gray-500">December 12, 2019</div><span class="font-weight-bold">A new monthly report is ready to download!</span> </div></span>');

            if (value.ExpenseDate != undefined) {

                notificationRecord.find('.small').html(new Date(value.ExpenseDate).toDateString());
                notificationRecord.find('.icon-circle').addClass('bg-danger');
                notificationRecord.find('.font-weight-bold').html(value.Amount + " has spent on " + value.Description);
            } else {

                notificationRecord.find('.small').html(new Date(value.IncomeDate).toDateString());
                notificationRecord.find('.icon-circle').addClass('bg-success');
                notificationRecord.find('.font-weight-bold').html(value.Amount + " has earned by " + value.Description);
            }

            $('.dropdown-list').prepend(notificationRecord);
        });

        $('.dropdown-list').prepend(notificationHeader);
    }
};

function AddConversionRates() {

    if (Utility.getKeyData("conversionRates") != null) {

        return;
    }

    try {

        //function to retrieve the currency conversion rates
        var url = 'https://prime.exchangerate-api.com/v5/50d8b6b9d8ac1e40db7454a3/latest/CAD';

        //request object to api for conversion rates.
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);

        xhttp.onreadystatechange = function () {

            try {

                //validating the response
                if (this.readyState == 4 && this.status == 200) {

                    var result = JSON.parse(this.response);
                    var rates = result.conversion_rates;

                    if (result != undefined && result != null && result.result === "success" && rates != undefined) {

                        //storing the conversion Rates in the local-storage
                        Utility.add("conversionRates", rates);
                    };
                }
            } catch (Exception) {

                RefreshPage();
            }
        };

        xhttp.send();
    } catch (ex) {

        RefreshPage();
    }
}

function AddUsers() {

    if (Utility.getKeyData("users") != null) {

        return;
    }

    var user1 = new User();
    var user2 = new User();
    var users = new Array();

    user1.UserName = "Nilakanth Bajaniya";
    user1.Email = "nbajaniya@email.com";
    user1.UserCurrency = "CAD";
    users.push(user1);

    user2.UserName = "John Wick";
    user2.Email = "jwick@email.com";
    user2.UserCurrency = "USD";
    users.push(user2);

    Utility.add("users", users);
}

function LoginUser() {

    var users = Utility.getKeyData("users");
    var login = Utility.getKeyData("login");

    if (login != null) {

        return;
    }

    if (users != null) {

        Utility.add("login", users[0]);
    } else {

        RefreshPage();
    }
}

function AddIncomes() {

    var income = '[{"Id":1,"Description":"Salary April","Amount":2000,"IncomeDate":"2020-04-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":2,"Description":"Kingsway Drive - Rent","Amount":1500,"IncomeDate":"2020-04-02T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":3,"Description":"Store Profit","Amount":2500,"IncomeDate":"2020-04-10T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":4,"Description":"March Salary","Amount":2000,"IncomeDate":"2020-03-01T05:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":5,"Description":"Kingsway DriveRent","Amount":1500,"IncomeDate":"2020-03-01T05:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":6,"Description":"Store Profit - March","Amount":3500,"IncomeDate":"2020-03-12T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":7,"Description":"Salary February","Amount":2000,"IncomeDate":"2020-02-01T05:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":8,"Description":"Kingsway Drive Rent","Amount":1500,"IncomeDate":"2020-02-01T05:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":9,"Description":"Store Profit","Amount":5000,"IncomeDate":"2020-02-13T05:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":10,"Description":"Salary January","Amount":2000,"IncomeDate":"2020-01-01T05:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":11,"Description":"Kingsway Drive Rent - January","Amount":1500,"IncomeDate":"2020-01-03T05:00:00.000Z","UserName":"Nilakanth Bajaniya"}]';

    if (Utility.getKeyData("income") != null) {

        return;
    }

    var incomes = JSON.parse(income);
    Utility.add("income", incomes);
}


function AddExpenses() {

    var expense = '[{"Id":1,"Description":"Coffee","Amount":5,"ExpenseDate":"2020-04-23T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":2,"Description":"Coffee","Amount":5,"ExpenseDate":"2020-04-23T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":3,"Description":"Coffee","Amount":3.531,"ExpenseDate":"2020-04-23T04:00:00.000Z","UserName":"John Wick","isNew":true},{"Id":4,"Description":"Car Insurance - April","Amount":150,"ExpenseDate":"2020-04-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":5,"Description":"Mobile Bill - April","Amount":45,"ExpenseDate":"2020-04-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":6,"Description":"Utilities - April","Amount":80,"ExpenseDate":"2020-04-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":7,"Description":"Laundry - April","Amount":20,"ExpenseDate":"2020-04-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":8,"Description":"Grocery - April ","Amount":100,"ExpenseDate":"2020-04-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":9,"Description":"Car Insurance - March","Amount":150,"ExpenseDate":"2020-03-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":10,"Description":"Mobile Bill - March","Amount":45,"ExpenseDate":"2020-03-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":11,"Description":"Utilities - March","Amount":80,"ExpenseDate":"2020-03-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":12,"Description":"Laundry - March","Amount":20,"ExpenseDate":"2020-03-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":14,"Description":"Grocery - March","Amount":100,"ExpenseDate":"2020-03-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":15,"Description":"Car Insurance - February","Amount":150,"ExpenseDate":"2020-02-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":16,"Description":"Mobile Bill - February","Amount":45,"ExpenseDate":"2020-02-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":17,"Description":"Utilities - February","Amount":80,"ExpenseDate":"2020-02-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":18,"Description":"Laundry - February","Amount":20,"ExpenseDate":"2020-02-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":19,"Description":"Grocery - February","Amount":100,"ExpenseDate":"2020-02-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":20,"Description":"Car Insurance - January","Amount":150,"ExpenseDate":"2020-01-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":21,"Description":"Mobile Bill - January","Amount":45,"ExpenseDate":"2020-01-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":22,"Description":"Utilities - January","Amount":80,"ExpenseDate":"2020-01-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":23,"Description":"Laundry - January","Amount":20,"ExpenseDate":"2020-01-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":24,"Description":"Grocery - January","Amount":100,"ExpenseDate":"2020-01-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"}]';

    if (Utility.getKeyData("expense") != null) {

        return;
    }

    var expenses = JSON.parse(expense);
    Utility.add("expense", expenses);
}

