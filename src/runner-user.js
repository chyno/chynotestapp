import { inject } from 'aurelia-framework';
import { KataService } from './service/kata-service';
import { CodeService } from './service/code-service';
import { ObserverLocator } from 'aurelia-binding';
import { User } from './user';


@inject(KataService, CodeService, ObserverLocator, User)
export class RunnerUser {

    constructor(KataSrv, CodeSrv, ObserveLoc, Usr) {
        this.kataService = KataSrv;
        this.katas = [];
        this.codeservice = CodeSrv;
        this.cntl = null;
        this.kataChosen = null;
        this.observerlocator = ObserveLoc;
        this.user = Usr;
        this.result = null;
        this.resultStyle = 'alert-success';
        this.ea.subscribe('Run', this.runTest);
     }

    activate() {
        return this.kataService.getUserKatas().then(docs => {
            this.katas = docs;
            this.kataChosen = null;
        });
    }
   
  runTest(result) {
       this.resultStyle = 'alert-success';
       this.result = result.text;
             if (result.status === runStates.error) {
                this.resultStyle = 'alert-danger';
            }
            else {
                if (this.result.includes('<FAILED::>')) {
                    this.resultStyle = 'alert-warning';
                }  
    }
  }
}
