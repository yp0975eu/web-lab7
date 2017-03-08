var express = require('express');
var router = express.Router();
var exchange = require('../open-exchange');


// GET request
router.get('/', function(req, res){

   exchange.getAllCurrencies(function(all_currencies){

       res.render('index', {all_currencies : all_currencies})

   });

});

/* Handle currency form submit */
router.get('/convert', function(req, res){


    var from_currency = req.query.from_currency;

    var amount = req.query.amount;

    var to_currency = req.query.to_currency;

    exchange.convertCurrency(amount, from_currency, to_currency, function(err, resp, conversion){
        // if there is an error then set the error variable to true in the template
        if( err ){

            res.render('results', {error: true});


        } else if(resp && resp.statusCode == 200){

            // if there is a response then set the currency conversion variables
            res.render('results', { amount: amount, from_currency : from_currency, to_currency: to_currency, result: conversion})

        }
    });
});

module.exports = router;