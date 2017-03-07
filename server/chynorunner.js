var fs = require('fs'),
    expect = require('chai').expect,
    yaml = require('js-yaml'),
   runner = require('../lib/runner.js');

var runTest = function (cb) {

    var stdoutResult = 'code was not run';
    var code = 'var a = {b: 2};console.log(this);';
     var fixture = '';
    // cb( 'call back: ' + JSON.stringify(runner.run));
    // cb('Hello From Chyno Runner'); 
      
      var assert = 'require(\"chai\").assert;suite(\"test\", function(){test(\"should be 2\", function(){assert.equal(2, a.b);})});';
       
            try {
                runner.run({
                    language: 'javascript',
                    fixture: assert,
                    testFramework: 'mocha_tdd'
                }, function (buffer) {
                    console.log('... std out');
                    console.log(buffer.stdout);
                    cb(buffer.stdout);
                     
                });
            }
    catch (excep) {
        cb("Error : " + JSON.stringify(excep.mes));
    }
    
}
module.exports = runTest