import {
    inject
} from "aurelia-framework";
import {
    KataService
} from "./service/kata-service";
import {
    CodeService
} from './service/code-service';
import {
    ObserverLocator
} from 'aurelia-binding';

import { User } from './user';

@inject(KataService, CodeService, ObserverLocator, User)
export class Welcome {

 constructor(kataService, codeservice, observerlocator, User) {
        this.kataService = kataService;
        this.katas = [];
        this.codeservice = codeservice;
        this.cntl = null;
        this.kataChosen = null;
        this.observerlocator = observerlocator;
        this.user = User;

    }

    activate() {
        this.katas = this.kataService.getKatas();
        this.kataChosen = null;
    }


    attached() {

        this.codeservice.setControls([this.codeArea, this.testsArea]);

        if (this.kataChosen) {
            this.codeservice.setCodeValue(this.kataChosen.code);
            this.codeservice.setTestValue(this.kataChosen.assertion);
        }

        var subscription = this.observerlocator
            .getObserver(this, 'kataChosen')
            .subscribe(this.onChange.bind(this));
    }

    saveCode() {
        var cd = this.codeservice.getCodeValue();
        // alert(this.kataChosen.name + ' . username : ' + this.user.userName + 'code vlue: ' + cd)
       this.kataService.saveCode(this.kataChosen.name, cd);
    }

    onChange(newValue, oldValue) {
        if (newValue) {
            this.codeservice.setCodeValue(newValue.code);
            this.codeservice.setTestValue(this.kataChosen.assertion);
        }
    }

}