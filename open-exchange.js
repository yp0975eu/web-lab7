
var request = require('request');
var fs = require('fs');
var fx = require('money');

var exchange_api = (function ExchangeApi() {
    var api_base_url = "https://openexchangerates.org/api/";
    var api_all_currencies_endpoint = api_base_url + "currencies.json";
    var api_id = '?app_id='+process.env.OPEN_EXCHANGE_API_KEY;// Make sure an environment variable is set, containing a valid key
    var api_latest = api_base_url + 'latest.json' + api_id;

    // used to load up the home page select lists
    function get_all_currencies(callback) {
        request(api_all_currencies_endpoint, function(err, resp, body){
            var all_currencies = JSON.parse(body);
            callback(all_currencies);
        });
    }

    //value - integer to be converted
    //from - base from  currency ( 3 letter currency code)
    //to - target currency ( 3 letter currency code)
    function convert_currency(value, from, to, callback) {

        request(api_latest, function(err, resp, body, conversion){

                var body_json = JSON.parse(body);

                // should be USD per api documentation:  https://docs.openexchangerates.org/docs/

                fx.base = body_json.base;

                fx.rates = body_json.rates;
                try{
                    conversion = fx.convert(value, {from: from.toUpperCase(), to: to.toUpperCase()});
                    callback(err, resp, conversion);

                } catch(e){

                    console.log('logging error', e);

                    callback(true, resp, null);

                }
        });
    }

    return {
        getAllCurrencies: get_all_currencies,
        convertCurrency: convert_currency
    };
})();

module.exports = exchange_api;