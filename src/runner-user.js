import { inject } from 'aurelia-framework';
import { KataService } from './service/kata-service';
import { User } from './user';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RunStates } from './run-states';
import { Runner } from './components/runner';


@inject(KataService, User, EventAggregator, Runner)
export class RunnerUser {

    constructor(KataSrv, Usr, EvntAgg, Runr) {
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
        this.runner = Runr;

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

}

