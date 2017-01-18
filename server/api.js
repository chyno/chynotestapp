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


router.post('/api/posttest', function (req, res)
{
    var body =  req.body;
    var solution = body.solution;
    var tests = body.tests;
    console.log('Code: ' + solution);
    console.log('Test: ' + tests);
     res.send({
         result : 'all tests past'
     });

});

router.post('/api/executeCode', function (req, res)
{
    var body =  req.body;
    var  result = 'error executing Code Wrarior cli';


    var solution = body.solution;
    var tests = body.tests;
    var framework = body.framework;
    console.log('Code: ' + solution);
    console.log('Test: ' + tests);
   // var code = 'var a = 1';
    //var test = 'Test.assertEquals(a, 1)';

    var cmd  = 'docker run --rm codewars/node-runner run -l javascript -c "' + solution + '" -t ' + framework  + ' -f "' + tests + '"';


     exec(cmd, function(error, stdout, stderr) {
             console.log('Executing docker code....');
             console.log('error: ' + stderr);
             if (stderr)
             {
                 console.log('Error! Message: ' + stderr);
                  res.status(500).send(stderr);
             }
             else
             {
                 console.log(stdout);
                 res.send(stdout);
             }
       });
});

module.exports = router;