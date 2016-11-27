import { inject } from "aurelia-framework";
import { Behavior } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import {EventAggregator} from 'aurelia-event-aggregator';
import { Login } from './login';
import { User } from "./user";


@inject(DialogService, User, EventAggregator)
export class NavBar {
    @bindable router;

    constructor(DialogService, User, EventAggregator) {
        this.LoginText = "Log In";
        this.LogoutText = "Log Out";
        this.dialogService = DialogService;
        this.buttonName =  this.LoginText;
        this.eventAggregator = EventAggregator;
        this.user = User
    }


    login() {
        var self = this;
         
        

        if (this.user.userName)
        {
            this.user.userName = null;
            this.user.password = null;
            this.buttonName = this.LoginText;
            self.eventAggregator.publish('Login', null);
        }
        else {
            this.dialogService.open({ viewModel: Login, model: self.user }).then(response => {
            if (!response.wasCancelled && response.output.userName) {
                self.user.userName = response.output.userName;
                self.user.password = response.output.password;
                self.eventAggregator.publish('Login',self.user);
                this.buttonName = this.LogoutText;
            }
             console.log(response.output);
        });
        }
    }
}
