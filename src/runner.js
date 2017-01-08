import { inject} from "aurelia-framework";
import { KataService } from "./service/kata-service";
import {  CodeService} from './service/code-service';
import { ObserverLocator } from 'aurelia-binding';
import { User} from './user';


@inject(KataService, CodeService, ObserverLocator, User)
export class Runner {

    constructor(kataService, codeservice, observerlocator, User) {
        console.log('Runner constructor');
        this.kataService = kataService;
        this.katas = [];
        this.codeservice = codeservice;
        this.cntl = null;
        this.kataChosen = null;
        this.observerlocator = observerlocator;
        this.user = User;
       // this.exec = require('child_process').exec;
       // this.exec =  child_process.exec;
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
            this.codeservice.setSolutionValue(this.kataChosen.solution);
            this.codeservice.setTestValue(this.kataChosen.tests);
        }

        var subscription = this.observerlocator
            .getObserver(this, 'kataChosen')
            .subscribe(this.onChange.bind(this));
    }

    saveCode() {
        var solution = this.codeservice.getSolutionValue();
        // alert(this.kataChosen.name + ' . username : ' + this.user.userName + 'code vlue: ' + cd)
        this.kataChosen.code = cd;
        this.kataService.savesolution(this.kataChosen._id, solution);
    }

    saveTest() {
        var assertion = this.codeservice.getTestValue();
        // alert(this.kataChosen.name + ' . username : ' + this.user.userName + 'code vlue: ' + cd)
        this.kataChosen.assertion = assertion;
        this.kataService.saveTest(this.kataChosen._id, assertion);
    }


    onChange(newValue, oldValue) {

        if (newValue) {
            this.codeservice.setSolutionValue(newValue.instruction);
            this.codeservice.setTestValue(newValue.tests);
        }

    }

// run the tests on code wars docker image
    runTests() {

        var solution = this.codeservice.getSolutionValue();
        var tests = this.codeservice.getTestValue();

        this.codeservice.getTestResults(solution, tests).then(result => {
           this.codeservice.setTestValue(result);
        });
    }

}