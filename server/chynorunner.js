var fs = require('fs'),
    expect = require('chai').expect,
    yaml = require('js-yaml');
//  runner = require('../lib/runner');

var runTest = function (cd) {

    var stdoutResult = 'code was not run';
    var code = 'var a = {b: 2};console.log(this);';
     var fixture = ''; 
      /*
      //var assert = require("chai").assert;suite("test", function(){test("should be 2", function(){assert.equal(2, a.b);})});',
       
            try {
                runner.run({
                    language: 'javascript',
                    language: 'javascript',
                    code: code,
                    fixture: fixture,
                    testFramework: 'mocha_tdd'
                }, function (buffer) {
                    console.log(buffer.stderr);
                    stdoutResult = buffer.stdout;
                    // expect(buffer.stdout).to.contain('{"a":1}');
                    // done();
                });
            }
    catch (excep) {
        stdoutResult = excep;
    }
*/
    return stdoutResult;
}
module.exports = runTest