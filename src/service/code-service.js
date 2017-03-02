import { inject } from 'aurelia-framework';
import CodeMirror from 'codemirror';
import { HttpClient, json } from 'aurelia-fetch-client';
import { RunStates } from '../run-states';
import { ObserverLocator } from 'aurelia-binding';

@inject(HttpClient)
export class CodeService {
    constructor(httpClient) {
            this.httpClient = httpClient;
            this.codeeditor = null;
            this.testeditor = null;
            this.rs = new RunStates();
        }
        //Method needs to be called after view model can get reference to DOM object
    setControls(cntls) {
        this.codeeditor = CodeMirror.fromTextArea(cntls[0], {
            mode: 'javascript',
            lineNumbers: true,
            lineWrapping: true,
            theme: 'blackboard'
        });
        this.codeeditor.refresh();

        this.testeditor = CodeMirror.fromTextArea(cntls[1], {
            mode: 'javascript',
            lineNumbers: true,
            lineWrapping: true,
            theme: 'blackboard'
        });
        this.testeditor.refresh();
    }
    setSolutionValue(solution) {
        if (this.codeeditor) {

            if (typeof solution === 'undefined') {
                solution = '';
            }

            let doc = this.codeeditor.getDoc();
            if (doc)
            {
                doc.setValue(solution);
            }
            //this.codeeditor.getDoc().setValue(solution);
        }
    }

    setTestValue(tcode) {
        if (this.testeditor) {
            if (typeof tcode === 'undefined') {
                tcode = '';
            }
            this.testeditor.getDoc().setValue(tcode);
        }
    }

    getSolutionValue() {
        let doc = this.codeeditor.getDoc();
        return doc.getValue();
    }

    getTestValue(tcode) {
        let doc = this.testeditor.getDoc();
        return doc.getValue();
    }

    getTestResults(solution, tests) {
        let data = {};
        data.solution = solution;
        data.tests = tests;
        data.framework = 'cw';
        // return this.fakeTestResult(data);
        return this.ApiTestResult(data)
    }
    fakeTestResult(data) {
        var self = this;
        let promise = new Promise(function (resolve, reject) {
            let res = {};
            res.text = "<FAILED::>. a should be 1";
            res.status = self.rs.success;
            resolve(res);
        });
        return promise;
    }

    ApiTestResult(data) {
        data.testFramework = 'mocha_tdd';
        let res = {
            status: this.rs.error,
            text: ''
        };

        return this.httpClient.fetch('/api/executeCode', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: json(data)
            })
            .then(response => {
                if (response.ok) {
                    res.status = this.rs.success;
                }
                var jsn = response.text();
                return jsn;

            })
            .then(data => {
                res.text = data;
                return res;
            })
            .catch(ex => {
            return {
                status: this.rs.error,
                text: ex.toString()
            }
        });
    }
}