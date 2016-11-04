import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/edit/matchbrackets.js';

import CodeMirror from 'codemirror/lib/codemirror.js';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/blackboard.css';


export class CodeService {

    constructor() {
        this.codeeditor = null;
        this.testeditor = null;
    }

//Method needs to be called after view model can get reference to DOM object
    setControls(cntls) {

  //var cm = new CodeMirror();

        this.codeeditor = CodeMirror.fromTextArea(cntls[0], {
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            theme: 'blackboard',
            autofocus: true
        });

         this.testeditor = CodeMirror.fromTextArea(cntls[1], {
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            theme: 'blackboard',
            autofocus: true
        });

    }

    setCodeValue(code) {
        this.codeeditor.getDoc().setValue(code);
    }

    setTestValue(tcode) {
        this.testeditor.getDoc().setValue(tcode);
    }
}