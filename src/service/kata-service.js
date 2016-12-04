

import { inject } from "aurelia-framework";
import { User } from '../user';

@inject(User)
export class KataService {

    constructor(User) {
        this.user = User;
        this.gunKey = "http://gunjs.herokuapp.com/gun/projectchynoapp";
        this.collectionKey = 'chynokata';
 
        this.userCollectionKey = 'user';
        this.katas = null;
     //   this.ref = new Gun(this.gunKey).get(this.collectionKey);
        this.gun = new Gun();//this.gunKey);


        var self = this;
        this.ref = this.gun.get(this.collectionKey).not(function (key) { self.gun.put({}).key(self.collectionKey); });
        this.userRef  = this.gun.get(this.userCollectionKey).not(function (key) { self.gun.put({}).key(self.userCollectionKey) });

    }

    getKatas() {
        var d = [];
        var self = this;
        //ref.get('chynokata').map(f);
        this.ref.get(this.collectionKey).map(function (data) {
            if (data && data.name) {
            d.push(data);
            }
        });

        return d;
    }
   
    
    addKata(name, description, tests) {
        var item = {
            name: name,
            description: description,
            code: "default code",
            assertion: tests,
            users : {}
        };
//ref.path('item88').put({name : 'name 88'});
        this.ref.path(item.name).put(item);
    }

    saveCode(kataName,  code) { 
         this.ref.path(kataName).path('users')
         .path(this.user.userName)
         .put({code: code});
    }

    getUserCode(kataName) {
       var code = '';
        this.gun.get(this.collectionKey)
        .path(kataName).path('users')
        .path(this.user.userName)
         .path('code')
        .val(d => {code = d});

        return code
    }

}