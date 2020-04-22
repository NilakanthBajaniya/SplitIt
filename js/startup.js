var baseCurrency = "CAD";
(function () {

    //function to retrieve the currency conversion rates 
    var url = 'https://prime.exchangerate-api.com/v5/50d8b6b9d8ac1e40db7454a3/latest/CAD';

    //request object to api for conversion rates.
    var xhttp = new XMLHttpRequest();
    //  xhttp.open("GET", url, true);

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

    //xhttp.send();

    AddUsers();
    LoginUser();
})();


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