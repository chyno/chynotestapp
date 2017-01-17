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
export class Katas {

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
         console.log('Adding');
          return this.router.navigateToRoute('kata', null);
    }

    edit(selKata) {
         console.log('Editting');
         return this.router.navigateToRoute('kata', selKata);
    }

    delete(selKata) {
        var self = this;
        console.log('Delete Katas');
        console.log(selKata);
       return this.kataService.removeKata(selKata).then( () => {
           self.katas = self.katas.filter( (x) =>  x._id !== selKata._id);
       });
       

    }
}