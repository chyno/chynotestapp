import {
    inject
} from "aurelia-framework";
import {
    KataService
} from "./service/kata-service";
import {
    Router
} from 'aurelia-router';


@inject(KataService, Router)
export class KatasManage {

    constructor(kataService, router) {
        console.log('KM Constructor');
        this.kataService = kataService;
        this.router = router;
        this.katas = null;
    }

    activate() {
        console.log('KM Activates');
        var self = this;
        return this.kataService.getKatas().then((doc, error) => {
            self.katas = doc.rows.map(x => {
                return x.doc
            });
        });
    }

    add() {
        //  return this.router.navigateToRoute('katas-manage');
    }

    edit(kata) {
        //  return this.router.navigateToRoute('katas-manage');
    }

    delete(kata) {

    }
}