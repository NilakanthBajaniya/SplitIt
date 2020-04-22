(function () {

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

            location.reload(true);
        }
    };

    xhttp.send();
})();