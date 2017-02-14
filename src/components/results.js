import { inject} from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';


@inject(DialogController )
export class Results {
    constructor(DialogCntrl, AuthSrv) {
        this.controller = DialogCntrl;
        this.result;
    }
    activate(data) {
        this.data =  result;
    }

    done() {
        return this.controller.ok();
 
	}
}
