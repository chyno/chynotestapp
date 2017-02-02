import { inject} from 'aurelia-framework';
import {  DialogController } from 'aurelia-dialog';

@inject(DialogController)
export class Login {
    constructor(DialogCntrl) {
        this.controller = DialogCntrl;
    }
    activate(data) {
        this.data = {
            userName: data.userName,
            password: data.password
        };
    }
}
