import { inject } from 'aurelia-framework';
import { KataService } from './service/kata-service';
import {Router } from 'aurelia-router';
 import { CodeService} from './service/code-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RunStates } from './run-states';

@inject(KataService, Router, CodeService, EventAggregator, RunStates)
export class Kata {


    constructor(kataSrv, Rtr, CodeSrv, EventAgg, RunSts) {
        this.SuccessStyle = 'alert-success';
        this.WarnStyle = "alert-warning";
        this.ErrorStyle = "alert-danger";

        this.resultStyle = null;
        this.kataService = kataSrv;
        this.router = Rtr;
        this.result = null;
        this.doc = {name : null, instructions : null, tests : 'null', code: null};

        this.codeService = CodeSrv;
        this.ea = EventAgg;
        this.ea.subscribe('Run', this.runTest.bind(this));
        this.rs = RunSts;

        this.tests = "";
        this.code = "";
    }

    activate(d) {

        if (d._id) {
            //Edit existing
            this.doc._id = d._id;
            this.doc.name = d.name;
            this.doc.instructions = d.instructions;
            this.tests = d.tests;
            this.code =  d.code;


        } else {
            this.doc.name = null;
            this.doc.instructions = null;
            this.codeService.setTestValue("");
            this.codeService.setSolutionValue("");
        }
    }

    bind() {
        this.codeService.setTestValue(this.tests);
        this.codeService.setSolutionValue(this.code);
    }

    save() {
        this.errorMessage = null;
         let code = this.codeService.getSolutionValue();
         let tests = this.codeService.getTestValue();
        if (this.doc && this.doc.name && this.doc.instructions) {
            this.doc.tests =  tests;
            this.doc.code =  code;

            if (this.doc._id)
            {
                this.kataService.editKata(this.doc).then(() => { return this.router.navigateToRoute('katas'); }).then(() => { return this.router.navigateToRoute('katas');});
            }
            else {
                this.doc._id = new Date().toISOString();
                this.kataService.addKata(this.doc).then(() => { return this.router.navigateToRoute('katas'); }).then(() => { return this.router.navigateToRoute('katas');});
            }
            this.resultStyle = null;


        } else {
             this.resultStyle = this.ErrorStyle;
             this.result = 'Please make sure required fields are entereed';
        }
    }

    cancel() {
      return this.router.navigateToRoute('katas');


    }

     runTest(result) {

        this.resultStyle = this.SuccessStyle;

        this.result = result.text;
        if (result.status === this.rs.error) {
            this.resultStyle = this.ErrorStyle;
        }
        else {
            if (this.result.includes('<FAILED::>')) {
                this.resultStyle = this.WarnStyle;
            }
        }


    }
}
