import {
    inject
} from "aurelia-framework";
import {
    KataService
} from "./service/kata-service";
import {
    Router
} from 'aurelia-router';


@inject(KataService, Router)
export class Kata {

    constructor(kataService, Router) {

        this.kataService = kataService;
        this.router = Router
        this.errorMessage = null;
         this.doc = null;
         this.name = null;
        this.instruction = null;
        this.tests = null;
         this.defaultSolution = null;
    }

    activate(doc) {
       
        if (doc && doc._id) {
            this.name = doc.name;
            this.instruction = doc.instruction;
            this.tests = doc.tests;
            this.defaultSolution = doc.defaultSolution;
            this.doc = doc;
        } else {
             this.cleearControls();
            this.doc = {
                _id : new Date().toISOString(),
                name : null,
                instruction : null,
                tests : null,
                defaultSolution : null
            };


        }

    }

   cleearControls() {
       this.errorMessage = null;
         this.doc = null;
         this.name = null;
        this.instruction = null;
        this.tests = null;
         this.defaultSolution = null;
   }
    save() {
        this.errorMessage = null;

        if (this.name && this.instruction && this.tests) {
             this.doc.name = this.name;
            this.doc.instruction = this.instruction;
            this.doc.tests = this.tests;
            this.doc.defaultSolution = this.defaultSolution;
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