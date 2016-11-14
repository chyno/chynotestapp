
import {
    inject
} from "aurelia-framework";
import {
    KataService
} from "./service/kata-service";




@inject(KataService)
export class Kata {

    constructor(kataService) {
        this.kataService = kataService;
        this.name = null;
        this.description = null;
        this.tests = null
    }

    activate() {

    }

    add() {
        if (this.name && this.description && this.tests)
        {
            this.kataService.addKata(this.name, this.description, this.tests);
       }


    }

}