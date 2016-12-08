"use strict";

var express = require('express');
var router = express.Router();
//var http = require('requestify');



 //For testing
router.get('/api/helloWorld', function (req, res)
{
    res.send('Hell World!!!!');
});


module.exports = router;