import { inject} from 'aurelia-framework';
import { KataService} from './service/kata-service';
import {Router} from 'aurelia-router';

@inject(KataService, Router)
export class KatasManage {

    constructor(kataSrv, Rtr) {
        this.kataService = kataSrv;
        this.router = Rtr;
        this.katas = null;
    }
    activate() {
        let self = this;
        return this.kataService.getKatas().then((doc, error) => {
            self.katas = doc.rows.map(x => {
                return x.doc;
            });
        });
    }
    add() { }
    edit(kata) { }
    delete(kata) { }
}
