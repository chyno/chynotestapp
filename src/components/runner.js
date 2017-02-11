//import { inject } from 'aurelia-framework';
//import { CodeService } from '../service/code-service';
//import { ObserverLocator } from 'aurelia-binding';



//@inject( CodeService, ObserverLocator)
export class Runner {

    constructor() { //CodeSrv, ObserveLoc) {
/*
        this.cb = null;
        this.codeservice = CodeSrv;
        this.kataChosen = null;
        this.observerlocator = ObserveLoc;
        this.result = null;
        this.resultStyle = 'alert-success';
        */
    }

    activate(data) {
       // this.cb = data.cd;
       // this.kataChosen = data.kataChosen;
    }
/*
     attached() {
        this.codeservice.setControls([this.solutionArea, this.testsArea]);
        if (this.kataChosen) {
            this.codeservice.setSolutionValue(this.kataChosen.code);
            this.codeservice.setTestValue(this.kataChosen.tests);
        }
        this.subscription = this.observerlocator
            .getObserver(this, 'kataChosen')
            .subscribe(this.onChange.bind(this));
    }
    onChange(newValue, oldValue) {
        this.result = null;
        this.resultStyle = 'alert-success';
        if (newValue) {
            this.codeservice.setSolutionValue(newValue.code);
            this.codeservice.setTestValue(newValue.tests);
        }
    }

    // run the tests on code wars docker image
    runTests() {
        let code = this.codeservice.getSolutionValue();
        let tests = this.codeservice.getTestValue();
        this.result = null;
        this.resultStyle = 'alert-success';
        this.hasError = false;
        this.codeservice.getTestResults(code, tests).then(result => {
            this.result = result.text;
            if (result.hasError) {
                this.resultStyle = 'alert-danger';
            }
            else {
                if (this.result.includes('<FAILED::>')) {
                    this.resultStyle = 'alert-warning';
                }
            }
        })
            .catch(error => {
                this.resultStyle = 'alert-danger';
                this.result = 'Executing code! Error :' + error;
            });
    }

    undoChanges() {
        this.codeservice.setSolutionValue(this.kataChosen.code);
        this.codeservice.setTestValue(this.kataChosen.tests);
    }
    saveKata() {
        if (this.kataChosen) {
            this.kataChosen.code = this.codeservice.getSolutionValue();
            this.kataChosen.tests = this.codeservice.getTestValue();
            // alert(this.kataChosen.name + ' . username : ' + this.user.userName + 'code vlue: ' + cd)
            return this.kataService.addUserKata(this.kataChosen, this.user.userName).then(res => { alert(res) });
        }
        
    }
*/
}