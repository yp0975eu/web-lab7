
var request = require('request');

var exchange_api = (function ExchangeApi() {
    var api_base_url = "https://openexchangerates.org/api/";
    var api_all_currencies_endpoint = "currencies.json";
    var api_convert_currencies_endpoint = "convert/";
    var all_currencies = null;
    var base_currency = 'USD';
    // todo: create environment variable for api key
    var api_id = "b25c21139ec64598a468243b58a7dc10";

    function get_all_currencies() {
        var url = api_base_url + api_all_currencies_endpoint;
        request(url, function(err, resp, body){
                //console.log(err);
                //console.log(resp);
                //console.log(body);
            all_currencies = body;
        });
        return all_currencies;
    }

    //value - integer to be converted
    //from - base from  currency ( 3 letter currency code)
    //to - target currency ( 3 letter currency code)
    function convert_currency(value, from, to) {
        console.log( api_convert_currencies_endpoint + ':'+ value + ':/' + from + ':/' + to + "?api_id=" + api_id );
    }

    return {
        getAllCurrencies: get_all_currencies,
        convertCurrency: convert_currency
    };
})();

module.exports = exchange_api;