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
        this.id = null;
        this.rev = null;
        this.kataService = kataService;
        this.name = null;
        this.instruction = null;
        this.tests = null;
        this.router = Router
        this.errorMessage = null;
        this.defaultSolution = null
    }

    activate(doc) {

        if (doc) {
            this.id = doc._id;
            this.rev = doc._rev;
            this.name = doc.name;
            this.instruction = doc.instruction;
            this.tests = doc.tests;
            this.defaultSolution = doc.defaultSolution;
        }

    }

    save() {
        this.errorMessage = null;

        if (this.name && this.instruction && this.tests) {
            this.kataService.addKata({
                _id: new Date().toISOString(),
                name: this.name,
                instruction: this.instruction,
                solution: this.defaultSolution,
                tests: this.tests
            });
            return this.router.navigateToRoute('katas');
        } else {
            this.errorMessage = 'Please make sure required fields are entereed';
        }
    }

    cancel() {
        return this.router.navigateToRoute('katas');
    }
}