"use strick"


//global variable to store the current user currency
var baseCurrency = "CAD";

//retrieving the login user date to use in page other than login.html
var login = Utility.getKeyData("login");

/*immediately invoked function to assign some required variables
and to add the basic user data 
*/
(function () {


    AddUsers();

    if (login != null) {

        login = login[0];
        baseCurrency = login.UserCurrency;
        AddIncomes();
        AddExpenses();
        AddConversionRates();
        //LoginUser();
    }
})();

$(document).ready(function () {

    // to execute the code on the clause page other than login.html
    if (login != null) {

        $('.dropdown-list').css('height', '350px');
        $('.dropdown-list').css('overflow-y', 'scroll');

        $('#alertsDropdown').click(function () {

            $('.badge').removeClass('badge-danger');
            $('.badge').html('');
        });

        $("#userName").text(login.UserName);
        CreateNotifications();
    }

    //click event of the User Icon on the right-top side of the nav bar
    $("#userDropdown").click(function () {

        $("#dialog-message").dialog({
            modal: false,
            buttons: {
                //function call when logout button is clicked.
                Logout: LogoutUser,

                //anonymous function to close the dialog box 
                cancel: function () {
                    $(this).dialog("close");
                }

            }
        });
    });

    //checking the if user is logged in or not
    if (!location.pathname.includes("login.html")) {
        ValidateUser();
    }
});


function ValidateUser() {

    //checks for the key login if the value does not avaliable
    //it will redirect to the login page
    if (Utility.getKeyData("login") == null) {

        location.href = "login.html";
    }
}

//to logout user from the application
function LogoutUser() {

    //clears the user login
    localStorage.removeItem("login");
    location.reload(true);
}

//function to generate the contain of the Alert-box 
function CreateNotifications() {

    var notifications = new Array();

    //gets the expense and income data for current user
    var income = Utility.search("income", "UserName", login.UserName);
    var expense = Utility.search("expense", "UserName", login.UserName);

    //if income and expense data is not available  
    if (income == undefined && expense == undefined) {

        $('.dropdown-list').prepend('<h6 class="dropdown-header">Alerts Center</h6><h2>No Data Found!</h2>');
        return;
    }

    //filters the income data to display on the notification
    if (income != undefined) {

        var incomes = income.reverse((a, b) => new Date(b.IncomeDate) - new Date(a.IncomeDate));

        $.each(incomes, function (index, value) {

            if (value.isNew) {

                $('.badge').addClass('badge-danger');
                $('.badge').html('+1');
            }

            value.Dates = value.IncomeDate;
            notifications.push(value);
            value.isNew = false;
            Utility.update("income", value.Id, "isNew", false);
        });
    }

    //filters the expense data to display on the notification
    if (expense != undefined) {

        var expenses = expense.reverse((a, b) => new Date(b.ExpenseDate) - new Date(a.ExpenseDate));

        $.each(expenses, function (index, value) {

            if (value.isNew) {

                $('.badge').addClass('badge-danger');
                $('.badge').html('+1');
            }

            value.Dates = value.ExpenseDate;
            notifications.push(value);
            value.isNew = false;
            Utility.update("expense", value.Id, "isNew", false);
        });
    }


    //appends the required html to Alert-box 
    var notificationHeader = $('<h6 class="dropdown-header">Alerts Center</h6>');

    if (notifications.length > 0) {

        notifications.sort(function (a, b) {
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

//API call using XMLHttpRequest object  and storing the result in the 
//local-storage
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

//function to add the user data to the local-storage
function AddUsers() {

    if (Utility.getKeyData("users") != null) {

        return;
    }

    var user1 = new User();
    var user2 = new User();
    var user3 = new User();
    var users = new Array();

    user1.UserName = "Nilakanth Bajaniya";
    user1.Email = "nbajaniya@email.com";
    user1.UserCurrency = "CAD";
    user1.Password = "Abcd&1234";
    users.push(user1);

    user2.UserName = "John Wick";
    user2.Email = "jwick@email.com";
    user2.UserCurrency = "USD";
    user2.Password = "Abcd&1234";
    users.push(user2);

    user3.UserName = "James Bond";
    user3.Email = "jbond@email.com";
    user3.UserCurrency = "INR";
    user3.Password = "Abcd&1234";
    users.push(user3);

    Utility.add("users", users);
}

function LoginUser() {

//     var users = Utility.getKeyData("users");
//     var login = Utility.getKeyData("login");

//     if (login != null) {

//         return;
//     }

//     if (users != null) {

//         Utility.add("login", users[0]);
//     } else {

//         RefreshPage();
//     }
}

//adds dummy income data for user: Nilakanth Bajaniya
function AddIncomes() {

    var income = '[{"Id":1,"Description":"Salary April","Amount":2000,"IncomeDate":"2020-04-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":2,"Description":"Kingsway Drive - Rent","Amount":1500,"IncomeDate":"2020-04-02T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":3,"Description":"Store Profit","Amount":2500,"IncomeDate":"2020-04-10T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":4,"Description":"March Salary","Amount":2000,"IncomeDate":"2020-03-01T05:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":5,"Description":"Kingsway DriveRent","Amount":1500,"IncomeDate":"2020-03-01T05:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":6,"Description":"Store Profit - March","Amount":3500,"IncomeDate":"2020-03-12T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":7,"Description":"Salary February","Amount":2000,"IncomeDate":"2020-02-01T05:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":8,"Description":"Kingsway Drive Rent","Amount":1500,"IncomeDate":"2020-02-01T05:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":9,"Description":"Store Profit","Amount":5000,"IncomeDate":"2020-02-13T05:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":10,"Description":"Salary January","Amount":2000,"IncomeDate":"2020-01-01T05:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":11,"Description":"Kingsway Drive Rent - January","Amount":1500,"IncomeDate":"2020-01-03T05:00:00.000Z","UserName":"Nilakanth Bajaniya"}]';

    if (Utility.getKeyData("income") != null) {

        return;
    }

    var incomes = JSON.parse(income);
    Utility.add("income", incomes);
}

//adds dummy expense data for user: Nilakanth Bajaniya
function AddExpenses() {

    var expense = '[{"Id":1,"Description":"Coffee","Amount":5,"ExpenseDate":"2020-04-23T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":2,"Description":"Coffee","Amount":5,"ExpenseDate":"2020-04-23T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":3,"Description":"Coffee","Amount":3.531,"ExpenseDate":"2020-04-23T04:00:00.000Z","UserName":"John Wick","isNew":true},{"Id":4,"Description":"Car Insurance - April","Amount":150,"ExpenseDate":"2020-04-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":5,"Description":"Mobile Bill - April","Amount":45,"ExpenseDate":"2020-04-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":6,"Description":"Utilities - April","Amount":80,"ExpenseDate":"2020-04-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":7,"Description":"Laundry - April","Amount":20,"ExpenseDate":"2020-04-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":8,"Description":"Grocery - April ","Amount":100,"ExpenseDate":"2020-04-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya","isNew":true},{"Id":9,"Description":"Car Insurance - March","Amount":150,"ExpenseDate":"2020-03-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":10,"Description":"Mobile Bill - March","Amount":45,"ExpenseDate":"2020-03-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":11,"Description":"Utilities - March","Amount":80,"ExpenseDate":"2020-03-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":12,"Description":"Laundry - March","Amount":20,"ExpenseDate":"2020-03-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":14,"Description":"Grocery - March","Amount":100,"ExpenseDate":"2020-03-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":15,"Description":"Car Insurance - February","Amount":150,"ExpenseDate":"2020-02-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":16,"Description":"Mobile Bill - February","Amount":45,"ExpenseDate":"2020-02-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":17,"Description":"Utilities - February","Amount":80,"ExpenseDate":"2020-02-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":18,"Description":"Laundry - February","Amount":20,"ExpenseDate":"2020-02-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":19,"Description":"Grocery - February","Amount":100,"ExpenseDate":"2020-02-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":20,"Description":"Car Insurance - January","Amount":150,"ExpenseDate":"2020-01-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":21,"Description":"Mobile Bill - January","Amount":45,"ExpenseDate":"2020-01-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":22,"Description":"Utilities - January","Amount":80,"ExpenseDate":"2020-01-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":23,"Description":"Laundry - January","Amount":20,"ExpenseDate":"2020-01-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"},{"Id":24,"Description":"Grocery - January","Amount":100,"ExpenseDate":"2020-01-01T04:00:00.000Z","UserName":"Nilakanth Bajaniya"}]';

    if (Utility.getKeyData("expense") != null) {

        return;
    }

    var expenses = JSON.parse(expense);
    Utility.add("expense", expenses);
}

