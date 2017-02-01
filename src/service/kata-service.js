let PouchDB = require('pouchdb');

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
        return this.db.put(data, function callback(err, result) {
            if (!err) {   // console.log('Successfully posted a kata!');
            }
        });
    }

    saveSolution(id, solution, tests) {
        let self = this;
        //Reading the contents of a Document
        this.db.get(id, function(err, doc) {
            if (err) {
                return err;
            }
            doc.solution = solution;
            doc.tests = tests;
            self.db.put(doc);
        });
    }
    removeKata(doc) {
        doc._deleted = true;
        return this.db.put(doc).then(function(result) {
        }).catch(function(err) {
        });
    }
    editKata(doc) {
        doc._deleted = false;
        return db.put(doc).then(function(result) {
        }).catch(function(err) {
            return err;
        });
    }
}
