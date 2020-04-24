"use strick"
var Currency = {

    ConvertCurrency: function (to, amount) {

        var conversionRates = Utility.getKeyData('conversionRates');
        var returnValue = (amount * (conversionRates[0][to] / conversionRates[0][baseCurrency])).toFixed(2);
        return parseFloat(returnValue);
    }
}

