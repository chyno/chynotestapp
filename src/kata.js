import { inject } from 'aurelia-framework';
import { KataService } from './service/kata-service';
import {Router } from 'aurelia-router';
import { Runner } from './components/runner';

@inject(KataService, Router, Runner)
export class Kata {

    constructor(kataSrv, Rtr, Runr) {
        this.kataService = kataSrv;
        this.router = Rtr;
        this.errorMessage = null;
        this.doc = {name : null, instructions : null, tests : null, code: null};
        this.runner = Runr;
    }

    activate(d) {

        if (d._id) {
            //Edit existing
            this.doc._id = d._id;
            this.doc.name = d.name;
            this.doc.instruction = d.instructions;
            this.doc.tests = d.tests;
            this.doc.code = d.code;
        } else {
            this.doc._id = new Date().toISOString();
            this.doc.name = null;
            this.doc.instruction = null;
            this.doc.tests = null;
            this.doc.code = null;
        }
    }

    save() {
        this.errorMessage = null;
        let ck = this.runner.getCurrentKata();

        if (this.doc && this.doc.name && his.doc.instruction &&  ck && ck.code && ck.tests) {
            this.doc.tests = ck.tests;
            this.doc.code = ck.code;
            this.kataService.addKata(this.doc).then(() => {
                return this.router.navigateToRoute('katas');
            });
        } else {
            this.errorMessage = 'Please make sure required fields are entereed';
        }
    }

    cancel() {
        return this.router.navigateToRoute('katas');
    }
}
