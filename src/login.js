import {DialogController} from 'aurelia-dialog';


export class Login {
  static inject = [DialogController];

    constructor() {

        this.userName = null;
        this.password = null;
    }

    activate(data) {
        this.userName = data;
    }
}