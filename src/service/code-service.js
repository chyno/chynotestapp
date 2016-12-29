
import CodeMirror from 'codemirror';

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
        
        if (typeof code === "undefined") {
            code = '';
        }

        this.codeeditor.getDoc().setValue(code);
    }

    setTestValue(tcode) {
        if (typeof tcode === "undefined") {
            tcode = '';
        }

        this.testeditor.getDoc().setValue(tcode);
    }

     getCodeValue() {
         var doc = this.codeeditor.getDoc();
         return doc.getValue();
    }

    getTestValue(tcode) {
        var doc = this.testeditor.getDoc();
        return doc.getValue();
    }
}