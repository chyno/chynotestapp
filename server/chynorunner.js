var fs = require('fs'),
    expect = require('chai').expect,
    yaml = require('js-yaml'),
    runner = require('../lib/runner');

var runTest = function (code) {
  
  var stdoutResult;
 
  runner.run({language: 'javascript', code: code}, function (buffer) {
                    console.log(buffer.stderr);
                    stdoutResult = buffer.stdout;
                   // expect(buffer.stdout).to.contain('{"a":1}');
                   // done();
    });

    return stdoutResult;
}
module.exports.runTest = runTest