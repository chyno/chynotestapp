import { inject } from 'aurelia-framework';
import { KataService } from './service/kata-service';
import {Router } from 'aurelia-router';
 import { CodeService} from './service/code-service';

@inject(KataService, Router, CodeService)
export class Kata {

    constructor(kataSrv, Rtr, CodeSrv) {
        this.kataService = kataSrv;
        this.router = Rtr;
        this.errorMessage = null;
        this.doc = {name : null, instructions : null, tests : 'null', code: null};
        this.tests = null;
        this.code = null;
        this.codeService = CodeSrv;
    }

    activate(d) {

        if (d._id) {
            //Edit existing
            this.doc._id = d._id;
            this.doc.name = d.name;
            this.doc.instructions = d.instructions;
            this.tests = d.tests;
            this.code = d.code;
        } else {
            this.doc.name = null;
            this.doc.instructions = null;
            this.tests = null;
            this.code = null;
        }
    }

    save() {
        this.errorMessage = null;
         this.code = this.codeService.getSolutionValue();
        this.tests = this.codeService.getTestValue();
        if (this.doc && this.doc.name && this.doc.instructions) {
            this.doc.tests = this.tests;
            this.doc.code = this.code;
            if (this.doc._id)
            {
                this.kataService.editKata(this.doc).then(() => { return this.router.navigateToRoute('katas'); });
            }
            else {
                this.doc._id = new Date().toISOString();
                this.kataService.addKata(this.doc).then(() => { return this.router.navigateToRoute('katas'); });    
            }
         
        } else {
            this.errorMessage = 'Please make sure required fields are entereed';
        }
    }

    cancel() {
        return this.router.navigateToRoute('katas');
    }
}
