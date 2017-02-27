import {inject, customAttribute, bindable} from 'aurelia-framework';
//import { CodeService } from '../../service/code-service';

//@inject(CodeService)
@customAttribute('coder')
export class CoderAttribute {
  @bindable code;
  @bindable tests;

  constructor() {
    //this.CodeService = CodeServ;
  }

  codeChanged(newValue, oldValue) {
    console.log('code CHange : ' + newValue);
   // this.codeservice.setSolutionValue(newValue);
   }

  testsChanged(newValue, oldValue) {
    console.log('tests CHange : ' + newValue);
   // this.codeservice.setTestValue(newValue);
   }
}