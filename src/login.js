import {
    inject
} from "aurelia-framework";

import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class Login {
 

    constructor(DialogController) {
        this.controller = DialogController
        this.userName = null;
        this.password = null;
    }

    activate(data) {
        this.userName = data;
    }
}