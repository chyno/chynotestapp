var expect = require('chai').expect,
    runner = require('../test/runner');

describe( 'javascript runner', function(){
   
       // runner.assertCodeExamples('javascript');
        
        //----------------------------------------------------------------------------------------
        // Basics
        //----------------------------------------------------------------------------------------

        describe( 'basics', function() {
            it('should handle basic code evaluation', function (done) {
                runner.run({language: 'javascript', code: 'console.log(42)'}, function (buffer) {
                    expect(buffer.stdout).to.equal('42\n');
                    done();
                });
        }); }
    ); }
    
);