import { inject} from 'aurelia-framework';
import { KataService} from './service/kata-service';
import {Router} from 'aurelia-router';

@inject(KataService, Router)
export class Katas {

    constructor(kataService, router) {
        this.kataService = kataService;
        this.router = router;
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
    add() {
        return this.router.navigateToRoute('kata', null);
    }
    edit(selKata) {
        return this.router.navigateToRoute('kata', selKata);
    }
    delete(selKata) {
        let self = this;
        return this.kataService.removeKata(selKata).then(() => {
            self.katas = self.katas.filter((x) => x._id !== selKata._id);
        });
    }
}
