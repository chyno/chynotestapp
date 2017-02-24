import { inject } from 'aurelia-framework';
import { KataService } from './service/kata-service';
import { User } from './user';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RunStates } from './run-states';
import { CodeService} from './service/code-service';


@inject(KataService, User, EventAggregator,CodeService)
export class RunnerUser {

    constructor(KataSrv, Usr, EvntAgg, CodeServ) {
        this.SuccessStyle = 'alert-success';
        this.WarnStyle = "alert-warning";
        this.ErrorStyle = "alert-danger";
        this.kataService = KataSrv;
        this.katas = [];
        this.kataChosen = null;
        this.ea = EvntAgg;
        this.user = Usr;
        this.result = null;
        this.resultStyle = this.SuccessStyle;
        this.ea.subscribe('Run', this.runTest.bind(this));
        this.rs = new RunStates();
        this.isActiveInstruction = true;
        this.codeService = CodeServ;

    }

    activate() {
        var self = this;
        return this.kataService.getUserKatas().then(docs => {
            self.katas = docs;
            self.kataChosen = null;
        }).catch(e => {
            this.result = e;
            this.resultStyle = this.ErrorStyle;
        });
    }

    runTest(result) {

        this.resultStyle = this.SuccessStyle;

        this.result = result.text;
        if (result.status === this.rs.error) {
            this.resultStyle = this.ErrorStyle;
        }
        else {
            if (this.result.includes('<FAILED::>')) {
                this.resultStyle = this.WarnStyle;
            }
        }

        //Set results tab active
        this.anchorOutput.click();

    }

   save() {
        this.errorMessage = null;
         this.code = this.codeService.getSolutionValue();
        this.tests = this.codeService.getTestValue();
        if (this.doc && this.doc.name && this.doc.instructions) {
            this.doc.tests = this.tests;
            this.doc.code = this.code;
           
            if (this.doc._id)
            {
                this.kataService.editKata(this.doc).then(() => { return this.router.navigateToRoute('katas'); });
            }
            else {
                this.doc._id = new Date().toISOString();
                this.kataService.addKata(this.doc).then(() => { return this.router.navigateToRoute('katas'); });    
            }
            this.resultStyle = null;
            return this.router.navigateToRoute('katas');
         
        } else {
             this.resultStyle = this.ErrorStyle;
             this.result = 'Please make sure required fields are entereed';
        }
    }

/*
    saveKata() {

        let ck = this.runner.getCurrentKata();
        if (ck) {
            this.kataChosen.code = ck.code;
            this.kataChosen.tests = ck.tests;
            return this.kataService.addUserKata(this.kataChosen, this.user.userName)
                .then(res => { alert('success! message: ' + res); })
                .catch(err => { alert(err); });
        }
    }
<<<<<<< HEAD
*/
}

=======

}
>>>>>>> b3cbb2641a0c01d3a16234ea64030a0ddec8b012
