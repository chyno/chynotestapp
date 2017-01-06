import {
    inject
} from "aurelia-framework";
import CodeMirror from 'codemirror';
import { HttpClient, json} from "aurelia-fetch-client";

@inject(HttpClient)
export class CodeService {

    constructor(httpClient) {
        this.httpClient = httpClient;
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

    setSolutionValue(solution) {

        if (typeof solution === "undefined") {
            code = '';
        }

        this.codeeditor.getDoc().setValue(solution);
    }

    setTestValue(tcode) {
        if (typeof tcode === "undefined") {
            tcode = '';
        }

        this.testeditor.getDoc().setValue(tcode);
    }

    getSolutionValue() {
        var doc = this.codeeditor.getDoc();
        return doc.getValue();
    }

    getTestValue(tcode) {
        var doc = this.testeditor.getDoc();
        return doc.getValue();
    }

    getTestResults(solution, tests) {

        var testResult = 'this is the test results';
        var data = {};
        data.solution = solution;
        data.tests = tests;

        //  when not able to ru docker need to call dumm resutls
        return this.FakeTestResult(data);

    }

    FakeTestResult(data)
    {
        var promise = new Promise(function(resolve, reject) {
           // do a thing, possibly async, then…
            resolve("2 Of 2 test passed");
        });

        return promise;
    }

    ApiTestResult(data) {

        return this.httpClient.fetch('/api/executeCode', {
          headers: {'Content-Type' : 'application/json'},
           method: 'post',
            body: json(data)
        })
        .then(response => response.text())
        .then(executeResult => executeResult)
        .catch(error => {
            return 'Executing code! Error :' +  error;
        });
    }
}