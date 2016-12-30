import { inject} from "aurelia-framework";
import { KataService } from "./service/kata-service";
import {  CodeService} from './service/code-service';
import { ObserverLocator } from 'aurelia-binding';
import { User} from './user';
import * as child_process from 'child_process'; 

//var exec = require('child_process').exec;

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

    showKata(data) {
        this.katas = data;
    }

    attached() {

        this.codeservice.setControls([this.codeArea, this.testsArea]);

        if (this.kataChosen) {
            this.codeservice.setCodeValue(this.kataChosen.code);
            this.codeservice.setTestValue(this.kataChosen.assertion);
        }

        var subscription = this.observerlocator
            .getObserver(this, 'kataChosen')
            .subscribe(this.onChange.bind(this));
    }

    saveCode() {
        var cd = this.codeservice.getCodeValue();
        // alert(this.kataChosen.name + ' . username : ' + this.user.userName + 'code vlue: ' + cd)
        this.kataChosen.code = cd;
        this.kataService.saveCode(this.kataChosen._id, cd);
    }

    saveTest() {
        var assertion = this.codeservice.getTestValue();
        // alert(this.kataChosen.name + ' . username : ' + this.user.userName + 'code vlue: ' + cd)
        this.kataChosen.assertion = assertion;
        this.kataService.saveTest(this.kataChosen._id, assertion);
    }

 

    onChange(newValue, oldValue) {

        if (newValue) {
            this.codeservice.setCodeValue(newValue.code);
            this.codeservice.setTestValue(newValue.assertion);
        }

    }

    runTests() {
        var cmd  = 'docker run --rm codewars/node-runner run -l javascript -c "var a = 1;" -t cw -f "Test.assertEquals(a, 1)';

        exec(cmd, function(error, stdout, stderr) {
             this.codeservice.setTestValue(stdout);
            // command output is in stdout
       });
/*
        var cd = this.codeservice.getCodeValue();
        this.codeservice.getTestResults(cd).then(result => {
           this.codeservice.setTestValue(result);
        });
        */
    }

}