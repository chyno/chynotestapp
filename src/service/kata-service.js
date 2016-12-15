
import { inject } from "aurelia-framework";
import { User } from '../user';
var PouchDB = require('pouchdb-browser');

@inject(User)
export class KataService {

    constructor(User) {
        this.user = User;
        this.gunKey = "http://gunjs.herokuapp.com/gun/projectchynoapp";
        this.collectionKey = 'chynokata';
        this.katas = null;

        this.db = new PouchDB('chynokata');

     //   this.ref = new Gun(this.gunKey).get(this.collectionKey);


       // this.db = new this.PouchDB('katadb');

    }

    getKatas(f) {
        /*
        db.allDocs({include_docs: true, descending: true}, function(err, doc) {
                f(doc.rows);
      });
*/
    }


    addKata(name, description, tests) {

        var kata = {
             _id: new Date().toISOString(),
               name: name,
               description: description,
              tests : tests
        };

/*
        this.db.put(todo, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a kata!');
            }
        });
*/
    }

    saveCode(kataName, code) {

    }

    getUserCode(kataName) {

    }

    setUserRef() {

        if(!this.user.userName) {
            this.user.userName = 'unknown';
        }
    }

}