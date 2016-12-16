
import { inject } from "aurelia-framework";
import { User } from '../user';
var PouchDB = require('pouchdb');

@inject(User)
export class KataService {

    constructor(User) {
        this.user = User;
        this.gunKey = "http://gunjs.herokuapp.com/gun/projectchynoapp";
        this.collectionKey = 'chynokata';
        this.katas = null;

        this.db = new PouchDB('chynokata');

      
    }

    getKatas() {
       return  this.db.allDocs({include_docs: true, descending: true});
    }


    addKata(name, description, tests) {

        var kata = {
             _id: new Date().toISOString(),
               name: name,
               description: description,
              tests : tests
        };


        this.db.put(kata, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a kata!');
            }
        });

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