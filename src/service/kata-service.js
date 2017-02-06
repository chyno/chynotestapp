let PouchDB = require('pouchdb');
import { Utils } from '../utils';
import { addUserArray, addUs } from 'utils';

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
        data._id = data.name;
        return this.db.put(data, function callback(err, result) {
            if (!err) {   // console.log('Successfully posted a kata!');
            }
        });
    }


    removeKata(doc) {
        doc._deleted = true;
        return this.db.put(doc).then(function (result) {
        }).catch(function (err) {
        });
    }
    editKata(doc) {
        doc._deleted = false;
        return db.put(doc).then(function (result) {
        }).catch(function (err) {
            return err;
        });
    }

    addUserKata(udoc, userName) {
        return db.get(udoc.name).then(function (doc) {
            doc._deleted = false;
            var userCode = { userName: userName, code: udoc.code, tests: udoc.tests };

            let wdoc =  R.compose(addUser(userCode),addUserArray)(doc)
            return db.put(wdoc).then(function (result) {
            }).catch(function (err) {
                return err;
            });

        }).catch(function (err) {
            console.log(err);
        });



    }
}
