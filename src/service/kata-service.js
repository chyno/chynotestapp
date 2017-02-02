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
            if (doc.users) {
                var cuc = doc.userCode.filter(uc => uc.userName === userName);

                if (cuc)
                {
                    cuc.code = udoc.code;
                    cuc.tests = udoc.tests;
                }
                else {
                    doc.users.add(userCode);
                }
            }
            else {
                doc.users = [userCode];
            }
            return db.put(doc).then(function (result) {
            }).catch(function (err) {
                return err;
            });

        }).catch(function (err) {
            console.log(err);
        });



    }
}
