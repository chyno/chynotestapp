import {
    inject
} from 'aurelia-framework';
import {
    KataService
} from './service/kata-service';
import {
    CodeService
} from './service/code-service';
import {
    ObserverLocator
} from 'aurelia-binding';
import {
    User
} from './user';


@inject(KataService, CodeService, ObserverLocator, User)
export class Runner {

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
    }
    activate() {
        this.kataService.getKatas().then((doc, error) => {
            this.katas = doc.rows.map(x => {
                return x.doc;
            });
        });

        this.kataChosen = null;
    }
    attached() {
        this.codeservice.setControls([this.solutionArea, this.testsArea]);
        if (this.kataChosen) {
            this.codeservice.setSolutionValue(this.kataChosen.solution);
            this.codeservice.setTestValue(this.kataChosen.tests);
        }
        this.subscription = this.observerlocator
            .getObserver(this, 'kataChosen')
            .subscribe(this.onChange.bind(this));
    }
    saveKata() {
        if (this.kataChosen) {
            this.kataChosen.solution = this.codeservice.getSolutionValue();
            this.kataChosen.tests = this.codeservice.getTestValue();
            // alert(this.kataChosen.name + ' . username : ' + this.user.userName + 'code vlue: ' + cd)
            this.kataService.addUserKata(this.kataChosen, this.user.userName);
        }
    }
    onChange(newValue, oldValue) {
        this.result = null;
         this.resultStyle = 'alert-success';
        if (newValue) {
            this.codeservice.setSolutionValue(newValue.solution);
            this.codeservice.setTestValue(newValue.tests);
        }
    }

    // run the tests on code wars docker image
    runTests() {
        let solution = this.codeservice.getSolutionValue();
        let tests = this.codeservice.getTestValue();
        this.result = null;
        this.resultStyle = 'alert-success';
        this.hasError = false;
        this.codeservice.getTestResults(solution, tests).then(result => {
            this.result = result.text;
             if (result.hasError) {
                this.resultStyle = 'alert-danger';
            }
            else {
                if (this.result.includes('<FAILED::>')) {
                    this.resultStyle = 'alert-warning';
                }
             }
        })
        .catch(error => {
            this.resultStyle = 'alert-danger';
            this.result  = 'Executing code! Error :' +  error;
        });
    }

    undoChanges() {
      this.codeservice.setSolutionValue(this.kataChosen.solution);
      this.codeservice.setTestValue(this.kataChosen.tests);
    }
}
