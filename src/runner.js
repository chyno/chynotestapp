import {
    inject
} from "aurelia-framework";
import {
    KataService
} from "./service/kata-service";
import {
    CodeService
} from './service/code-service';
import {
    ObserverLocator
} from 'aurelia-binding';
import {
    User
} from './user';


@inject(KataService, CodeService, ObserverLocator, User)
export class Runner {

/*
 'alert-danger' : 'alert-success'
*/
    constructor(kataService, codeservice, observerlocator, User) {
        console.log('Runner constructor');
        this.kataService = kataService;
        this.katas = [];
        this.codeservice = codeservice;
        this.cntl = null;
        this.kataChosen = null;
        this.observerlocator = observerlocator;
        this.user = User;
        this.result = null;
        this.resultStyle = 'alert-success';
        
    }

    activate() {

        console.log('Runner activate');
        this.kataService.getKatas().then((doc, error) => {
            this.katas = doc.rows.map(x => {
                return x.doc
            });
        });

        this.kataChosen = null;
    }

    attached() {

        this.codeservice.setControls([this.solutionArea, this.testsArea]);

        if (this.kataChosen) {
            this.codeservice.setSolutionValue(this.kataChosen.defaultSolution);
            this.codeservice.setTestValue(this.kataChosen.tests);
        }

        this.subscription = this.observerlocator
            .getObserver(this, 'kataChosen')
            .subscribe(this.onChange.bind(this));
    }

    saveKata() {
        var solution = this.codeservice.getSolutionValue();
         var tests = this.codeservice.getTestValue();
        // alert(this.kataChosen.name + ' . username : ' + this.user.userName + 'code vlue: ' + cd)
      
        this.kataService.saveSolution(this.kataChosen._id, solution, tests);
    }

    


    onChange(newValue, oldValue) {
        this.result = null;
         this.resultStyle = 'alert-success';
        if (newValue) {
            this.codeservice.setSolutionValue(newValue.defaultSolution);
            this.codeservice.setTestValue(newValue.tests);
        }

    }

/*
.alert-success, .alert-info, .alert-warning or .alert-danger

*/
    // run the tests on code wars docker image
    runTests() {
        this.resultStyle = 'alert-success';
        var solution = this.codeservice.getSolutionValue();
        var tests = this.codeservice.getTestValue();
        this.hasError = false;
        this.codeservice.getTestResults(solution, tests).then(result => {
            this.result = result.text;
             if (result.hasError) {
                this.resultStyle = 'alert-danger';
            }
            else {
                if (result.includes('<FAILED::>')) {
                    this.resultStyle = 'alert-warning';
                }
             }       
        })
        .catch(error => {
            this.resultStyle = 'alert-danger';
            this.result  = 'Executing code! Error :' +  error;
        });;
    }

}