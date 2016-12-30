"use strict";

var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

//var http = require('requestify');




 //For testing
router.get('/api/isAlive', function (req, res)
{
    res.send('I am alive!!!!');
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
    var result = "not run";
    var code = 'var a = 1';
    var test = 'Test.assertEquals(a, 1)';

    var cmd  = 'docker run --rm codewars/node-runner run -l javascript -c "' + code + '" -t cw -f "' + test + '"';

        exec(cmd, function(error, stdout, stderr) {
             
             console.log(stdout);
             res.send(stdout);
       });
});


module.exports = router;