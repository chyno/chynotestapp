import { inject } from 'aurelia-framework';
import { CodeService } from '../service/code-service';
import { ObserverLocator } from 'aurelia-binding';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject( CodeService, ObserverLocator, EventAggregator)
export class Runner {

    constructor(CodeSrv, ObserveLoc, EventAggr) {
        this.codeservice = CodeSrv;
        this.kataChosen = null;
        this.observerlocator = ObserveLoc;
        this.result = null;
        this.resultStyle = 'alert-success';
        this.ea = EventAggr;

    }

    activate(data) {
        this.kataChosen = data;

         if (this.kataChosen) {
            this.codeservice.setSolutionValue(this.kataChosen.code);
            this.codeservice.setTestValue(this.kataChosen.tests);
        }
        this.subscription = this.observerlocator
            .getObserver(this, 'kataChosen')
            .subscribe(this.onChange.bind(this));
    }

     attached() {
        this.codeservice.setControls([this.solutionArea, this.testsArea]);
    }

    onChange(newValue, oldValue) {
        this.result = null;
        this.resultStyle = 'alert-success';
        if (newValue) {
            this.codeservice.setSolutionValue(newValue.code);
            this.codeservice.setTestValue(newValue.tests);
        }
    }

    // run the tests on code wars docker image
    runTests() {
        var self = this;
        let code = this.codeservice.getSolutionValue();
        let tests = this.codeservice.getTestValue();


      return this.codeservice.getTestResults(code, tests).then(result => {
              self.ea.publish('Run', result);
        })
            .catch(error => {
                let errRes = {};
                errRes.status = 3;
                errRes.text = 'Executing code! Error :' + error;
                self.ea.publish('Run', errRes);
            });
    }

    undoChanges() {
        this.codeservice.setSolutionValue(this.kataChosen.code);
        this.codeservice.setTestValue(this.kataChosen.tests);
    }
    saveKata() {
        if (this.kataChosen) {
            this.kataChosen.code = this.codeservice.getSolutionValue();
            this.kataChosen.tests = this.codeservice.getTestValue();
            // alert(this.kataChosen.name + ' . username : ' + this.user.userName + 'code vlue: ' + cd)
            return this.kataService.addUserKata(this.kataChosen, this.user.userName).then(res => { alert(res) });
        }

    }

}