import { inject } from "aurelia-framework";
import { KataService } from "./service/kata-service";
import { Router } from 'aurelia-router';


@inject(KataService, Router)
export class Kata {

    constructor(kataService, Router) {
        this.kataService = kataService;
        this.name = null;
        this.description = null;
        this.tests = null;
        this.router = Router
    }

    activate() {

    }

    add() {
        if (this.name && this.description && this.tests) {
            this.kataService.addKata(
                {
                    _id: new Date().toISOString(),
                    name: this.name,
                    description: this.description,
                    tests: this.tests,
                    code: 'default',
                    assertion: '1 == 1'
                });
            return this.router.navigateToRoute('welcome');
        }
    }
}