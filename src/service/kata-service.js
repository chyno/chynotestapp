

import { inject } from "aurelia-framework";
import { User } from '../user';

@inject(User)
export class KataService {

    constructor(User) {
        this.user = User;
        this.gunKey = "http://gunjs.herokuapp.com/gun/projectchynoapp";
        this.collectionKey = 'chynokata';
        this.katas = null;
     //   this.ref = new Gun(this.gunKey).get(this.collectionKey);
        this.gun = new Gun();//this.gunKey);


        var self = this;
        this.ref = this.gun.get(this.collectionKey).not(function (key) { self.gun.put({}).key(self.collectionKey); });
        this.userref = null;


    }

    getKatas() {
        var d = [];
        var self = this;


        //ref.get('chynokata').map(f);
        this.ref.map(function (data) {
            if (data &&
                data.name &&
               ! d.some(x => { return x.name === data.name })) {
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
            assertion: tests

        };
//ref.path('item88').put({name : 'name 88'});
        this.ref.path(item.name).put(item);
    }

    saveCode(kataName, code) {
        this.setUserRef();
        this.userref.path(kataName).put({code: code});
        //this.ref.path(put({code: code}).key(kataName  + '_' + this.user.userName);
    }

    getUserCode(kataName) {
        this.setUserRef();
        var code = '';
        this.userref.path(kataName + '.code').val(x => code = x);
      //  this.ref.get(kataName + '_' + this.user.userName, cd => { code = 'cd.code' });
        return code
    }

    setUserRef() {

        if(!this.user.userName) {
            this.user.userName = 'unknown';
        }
        
        if (!this.userref) {
            this.userref = this.gun.get(this.user.userName).not(function (key) { self.gun.put({}).key(self.user.userName); });
        }
    }

}