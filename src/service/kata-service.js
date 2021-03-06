let PouchDB = require('pouchdb');
import { inject } from 'aurelia-framework';
import { User } from '../user';
import * as utils from '../utils';


@inject(User)
export class KataService {
    constructor(Usr) {
        //http://45.79.89.144:5984/chynodb
       //  this.db = new PouchDB('http://li1188-144.members.linode.com:5984/chyno');
        this.db = new PouchDB('chynokata');
        this.user = Usr;
    }

    getKatas() {
        return this.db.allDocs({
            include_docs: true,
            descending: true
        }).then((doc, error) => {
            return doc.rows.map(x => x.doc);
        });
    }

     getUserKatas() {
        return this.db.allDocs({
            include_docs: true,
            descending: true
        }).then((doc, error) => {
            return doc.rows.map(x => {
                return utils.getUserCodeOrDefault(this.user.userName, x.doc)
            });
        });
    }

    addKata(data) {
        data._deleted = false;
        return this.db.put(data, function callback(err, result) {
            if (!err) {
                return "succussfully added";
            }
            else { return err;}
        });
    }

    removeKata(doc) {
        doc._deleted = true;
        return this.db.put(doc).then(function (result) {
        }).catch(function (err) {
        });
    }

    editKata(udoc) {
         let self = this;
        return this.db.get(udoc._id).then(function (doc) {
            doc._deleted = false;
            doc.name = udoc.name;
            doc.code = udoc.code;
            doc.tests = udoc.tests;
            doc.instructions = udoc.instructions;

            return self.db.put(doc).then(function (result) {
                return result.name + ' updated.';
            }).catch(function (err) {
                return err;
            });

        }).catch(function (err) {
            return err;
             });

        doc._deleted = false;
        return db.put(doc).then(function (result) {
            return result;
        }).catch(function (err) {
            return err;
        });
    }

    addUserKata(id, code, tests, userName) {
        let self = this;
        return this.db.get(id).then(function (doc) {
            doc._deleted = false;
            let userCode = { userName: userName, code: code, tests: tests };

            let wdoc = R.compose(utils.addUser(userCode), utils.addUserArray)(doc);
            return self.db.put(wdoc).then(function (result) {
                return doc.name + ' updated.';
            }).catch(function (err) {
                return err;
            });

        }).catch(function (err) {
            return err;
        });
    }
}
