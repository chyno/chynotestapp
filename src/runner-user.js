import { inject } from 'aurelia-framework';
import { KataService } from './service/kata-service';
import { User } from './user';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RunStates } from './run-states';

@inject(KataService, User, EventAggregator)
export class RunnerUser {

    constructor(KataSrv, Usr, EvntAgg) {
        this.SuccessStyle = 'alert-success';
        this.WarnStyle = "alert-warn";
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
    }

}

