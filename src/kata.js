import { inject } from 'aurelia-framework';
import { KataService } from './service/kata-service';
import {Router } from 'aurelia-router';


@inject(KataService, Router)
export class Kata {

    constructor(kataSrv, Rtr) {
        this.kataService = kataSrv;
        this.router = Rtr;
        this.errorMessage = null;
        this.doc = null;
        this.name = null;
        this.instruction = null;
        this.tests = null;
        this.solution = null;
    }

    activate(doc) {
    if (doc && doc._id) {
        this.name = doc.name;
        this.instruction = doc.instruction;
        this.tests = doc.tests;
        this.solution = doc.solution;
        this.doc = doc;
        } else {
        this.cleearControls();
        this.doc = {
         _id: new Date().toISOString(),
         name: null,
         instruction: null,
         tests: null,
         solution: null
        };
    }
    }
    cleearControls() {
        this.errorMessage = null;
        this.doc = null;
        this.name = null;
        this.instruction = null;
        this.tests = null;
        this.code = null;
    }
    save() {
        this.errorMessage = null;

        if (this.name && this.instruction && this.tests) {
            this.doc.name = this.name;
            this.doc.instruction = this.instruction;
            this.doc.tests = this.tests;
            this.doc.code = this.code;
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
