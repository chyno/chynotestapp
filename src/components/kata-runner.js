import {
  bindable,
  bindingMode
} from 'aurelia-framework';
import {
  inject
} from 'aurelia-framework';
import {
  CodeService
} from '../service/code-service';
import {
  ObserverLocator
} from 'aurelia-binding';
import {
  EventAggregator
} from 'aurelia-event-aggregator';

@inject(CodeService, ObserverLocator, EventAggregator)
export class KataRunnerCustomElement {
  @bindable code;
  @bindable  tests;


  constructor(CodeSrv, ObserveLoc, EventAggr) {
    this.codeservice = CodeSrv;
    this.observerlocator = ObserveLoc;
    this.result = null;
    this.resultStyle = 'alert-success';
    this.ea = EventAggr;
   this.subscription1;
   this.subscription2;
  
  }
 
  attached() {
    this.codeservice.setControls([this.solutionArea, this.testsArea]);  
     this.codeservice.setTestValue(this.tests);
    this.codeservice.setSolutionValue(this.code);
    /*
    this.subscription1 = this.observerlocator
      .getObserver(this, 'code')
      .subscribe(this.onChangeCode.bind(this));


    this.subscription2 = this.observerlocator
      .getObserver(this, 'tests')
      .subscribe(this.onChangeTests.bind(this)); 
      */
  }


  onChangeTests(newValue) {
    if (newValue) {
      // this.tests =  this.codeservice.getSolutionValue();
     // this.codeservice.setTestValue(newValue.tests);
     // this.tests = newValue;
    }
  }

  onChangeCode(newValue) {
    if (newValue) {
    // this.code =  this.codeservice.getCodeValue();
     // this.codeservice.setSolutionValue(newValue.code);
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
    //this.codeservice.setSolutionValue(this.kataChosen.code);
    // this.codeservice.setTestValue(this.kataChosen.tests);
  }


  getCurrentKata() {
    let code = this.codeservice.getSolutionValue();
    let tests = this.codeservice.getTestValue();
    let rs = {}
    rs.code = code;
    rs.tests = tests;
    return rs;
  }

}