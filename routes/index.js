var express = require('express');
var router = express.Router();


// GET request
router.get('/', function(req, res){
   res.render('index')
});


var exchangeRates = { 'EUR' : 0.95, 'JPY' : 112.84, 'USD' : 1 };

/* Handle currency form submit */
router.get('/convert', function(req, res){
   var from_currency = req.query.from_currency;
   var amount = req.query.amount;
   var to_currency = req.query.to_currency;
   var rate = exchangeRates[to_currency];
   if ( from_currency == "USD"){
      result = amount * rate;
   } else{
      result = (exchangeRates[to_currency] / exchangeRates[from_currency]) * amount;
   }
   res.render('results', { amount: amount, from_currency : from_currency , result: result, to_currency: to_currency, currency_from: from_currency })
});

module.exports = router;