//import { PouchDB } from "pouchdb-browser";
var PouchDB = require('pouchdb');

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


    addKata(data) {
        this.db.put(data, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a kata!');
            }
        });
    }

    saveSolution(id, solution) {
        var self = this;
        //Reading the contents of a Document
        this.db.get(id, function (err, doc) {
            if (err) {
                return console.log(err);
            } else {
                doc.solution = solution;
                self.db.put(doc);
            }
        });
    }

    saveTest(id, tests) {
        var self = this;
         //Reading the contents of a Document
       this.db.get(id, function (err, doc) {
            if (err) {
                return console.log(err);
            } else {
                doc.tests = tests;
                self.db.put(doc);
            }
        });
    }
}