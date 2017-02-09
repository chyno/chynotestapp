let PouchDB = require('pouchdb');
import { inject } from 'aurelia-framework';
import { User } from '../user';
import * as utils from '../utils';



@inject(User)
export class KataService {
    constructor(Usr) {
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
        data._id = data.name;
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

    editKata(doc) {
        doc._deleted = false;
        return db.put(doc).then(function (result) {
            return result;
        }).catch(function (err) {
            return err;
        });
    }

    addUserKata(udoc, userName) {
        let self = this;
        return this.db.get(udoc.name).then(function (doc) {
            doc._deleted = false;
            let userCode = { userName: userName, code: udoc.code, tests: udoc.tests };

            let wdoc = R.compose(utils.addUser(userCode), utils.addUserArray)(doc);
            return self.db.put(wdoc).then(function (result) {
                return result.id + ' updated.';
            }).catch(function (err) {
                return err;
            });

        }).catch(function (err) {
            return err;
        });
    }
}
