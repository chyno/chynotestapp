import {
    inject
} from "aurelia-framework";

import { Behavior } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Login } from './login';
import {
    User
} from "./user";


@inject(DialogService, User)
export class NavBar {
    @bindable router;

    constructor(DialogService, User) {
        this.LoginText = "Log In";
        this.dialogService = DialogService;
        this.buttonName =  this.LoginText;

        this.user = User
    }


    login() {
        var self = this;

        if (this.user.userName)
        {
            this.user.userName = null;
            this.user.password = null;
            this.buttonName = this.LoginText;
        }
        else {
            this.dialogService.open({ viewModel: Login, model: self.user }).then(response => {
            if (!response.wasCancelled && response.output.userName) {
                self.user.userName = response.output.userName;
                self.user.password = response.output.password;
                this.buttonName = "Log Out";
            }
             console.log(response.output);
        });
        }

    }
}
