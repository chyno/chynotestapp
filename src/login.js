import { inject} from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { AuthService } from 'aurelia-auth';

@inject(DialogController, AuthService )
export class Login {
    constructor(DialogCntrl, AuthSrv) {
        this.controller = DialogCntrl;
        this.auth = AuthSrv;
    }
    activate(data) {
        this.data = {
            userName: data.userName,
            password: data.password
        };
    }

    authenticate(name) {
        return this.controller.ok(this.data);
/*
        this.auth.authenticate(name, false, null)
		.then((response)=>{
		});
        */
	}
}
