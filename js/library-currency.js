"use strick"
var Currency = {

    ConvertCurrency: function (to, amount) {

        var conversionRates = Utility.getKeyData('conversionRates');
        return amount * conversionRates[0][to];
    }
}

