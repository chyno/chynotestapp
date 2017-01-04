import { inject } from "aurelia-framework";
//import { PouchDB } from "pouchdb-browser";
var PouchDB = require('pouchdb');

@inject()
export class KataService {

    constructor() {
        this.db = new PouchDB('chynokata');
    }

    getKatas() {
        return this.db.allDocs({
            include_docs: true,
            descending: true
        });
    }


    addKata(name, description, tests) {
        var kata = {
            _id: new Date().toISOString(),
            name: name,
            description: description,
            tests: tests,
            code: 'default',
            assertion: ''
        };


        this.db.put(kata, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a kata!');
            }
        });

    }

    saveCode(id, code) {
        var self = this;
        //Reading the contents of a Document
        this.db.get(id, function (err, doc) {
            if (err) {
                return console.log(err);
            } else {
                doc.code = code;
                self.db.put(doc);
            }
        });

    }

    saveTest(id, assertion) {
        var self = this;
         //Reading the contents of a Document
       this.db.get(id, function (err, doc) {
            if (err) {
                return console.log(err);
            } else {
                doc.assertion = assertion;
                self.db.put(doc);
            }
        });

    }

}