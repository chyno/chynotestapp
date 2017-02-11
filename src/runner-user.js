import { inject } from 'aurelia-framework';
import { KataService } from './service/kata-service';
import { CodeService } from './service/code-service';
import { ObserverLocator } from 'aurelia-binding';
import { User } from './user';


@inject(KataService, CodeService, ObserverLocator, User)
export class RunnerUser {

    constructor(KataSrv, CodeSrv, ObserveLoc, Usr) {
        this.kataService = KataSrv;
        this.katas = [];
        this.codeservice = CodeSrv;
        this.cntl = null;
        this.kataChosen = null;
        this.observerlocator = ObserveLoc;
        this.user = Usr;
        this.result = null;
        this.resultStyle = 'alert-success';
        this.model = {};
    }

    activate() {
        return this.kataService.getUserKatas().then(docs => {
            this.katas = docs;
            this.kataChosen = null;
        });
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
        let solution = this.codeservice.getSolutionValue();
        let tests = this.codeservice.getTestValue();
        this.result = null;
        this.resultStyle = 'alert-success';
        this.hasError = false;
        this.codeservice.getTestResults(solution, tests).then(result => {
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
            this.result  = 'Executing code! Error :' +  error;
        });
    }     
}
