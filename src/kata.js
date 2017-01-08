import { inject } from "aurelia-framework";
import { KataService } from "./service/kata-service";
import { Router } from 'aurelia-router';


@inject(KataService, Router)
export class Kata {

    constructor(kataService, Router) {
        this.kataService = kataService;
        this.name = null;
        this.instruction = null;
        this.tests = null;
        this.router = Router
        this.errorMessage = null;
        this.defaultSolution = null
    }

    activate() {

    }

    add() {
        this.errorMessage = null;

        if (this.name && this.instruction && this.tests) {
            this.kataService.addKata(
                {
                    _id: new Date().toISOString(),
                    name: this.name,
                    instruction: this.instruction,
                    solution : this.defaultSolution,
                    tests : this.tests
                });
            return this.router.navigateToRoute('welcome');
        }
        else {
            this.errorMessage = 'Please make sure required fields are entereed';
        }
    }
}