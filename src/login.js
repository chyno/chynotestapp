import {  inject } from "aurelia-framework";

import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class Login {


    constructor(DialogController) {
        this.controller = DialogController

    }

    activate(data) {
        this.data = { userName: data.userName, password: data.password };
    }
}