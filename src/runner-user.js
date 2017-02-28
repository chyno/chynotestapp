import { inject } from 'aurelia-framework';
import { KataService } from './service/kata-service';
import { User } from './user';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RunStates } from './run-states';
import { CodeService} from './service/code-service';


@inject(KataService, User, EventAggregator,CodeService)
export class RunnerUser {

    constructor(KataSrv, Usr, EvntAgg, CodeServ) {
       //Warning messages
        this.SuccessStyle = 'alert-success';
        this.WarnStyle = "alert-warning";
        this.ErrorStyle = "alert-danger";

        //Service objects
        this.kataService = KataSrv;
        this.codeService = CodeServ;
        this.ea = EvntAgg;

        //View Model objects
        this.katas = [];
        this.kataChosen = null;
        this.result = null;
        this.resultStyle = this.SuccessStyle;

        //Global states
        this.user = Usr;
        this.rs = new RunStates();
        
        this.ea.subscribe('Run', this.runTest.bind(this));
        
        //Testing
        this.tests = null;
        this.code = null;

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

    ChangedKata() {
       this.tests = this.kataChosen.tests;
       this.code = this.kataChosen.code;
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
}
