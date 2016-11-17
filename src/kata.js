
import {
    inject
} from "aurelia-framework";
import {
    KataService
} from "./service/kata-service";

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
        if (this.name && this.description && this.tests)
        {
            
            this.kataService.addKata(this.name, this.description, this.tests);
            this.router.navigateToRoute('welcome');
       }


    }

}