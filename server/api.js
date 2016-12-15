"use strict";

var express = require('express');
var router = express.Router();
var gun = require('Gun')('http://yourdomain.com/gun');

//var http = require('requestify');




 //For testing
router.get('/api/helloWorld', function (req, res)
{
    res.send('Hell World!!!!');
});

router.get('/api/foo', function (req, res)
{
    var res = null
    gun.get('foo').val(x => {
        res = x;
    });
     res.send(res);
});

router.post('/api/executeCode', function (req, res)
{
    var body =  req.body;

    var result = [
        { 'name': 'Testing sequence of 3 numbers', 'Expected': '-14', 'Actual': '-8' },
        { 'name': 'Testing sequence of 11 numbers', 'Expected': '-89', 'Actual': '-17' },
        { 'name': 'Testing sequence of 58 numbers', 'Expected': '-122', 'Actual': '2' },
        {'name': 'Testing sequence of 158 numbers', 'Expected' : '685', 'Actual' : '13'}
    ];

    console.log(body);
    res.send(result);
});



module.exports = router;
module.gun = gun;