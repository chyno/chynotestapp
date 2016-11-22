import {
    inject
} from "aurelia-framework";

import { User } from '../user';


@inject(User)
export class KataService {

    constructor(User) {

        this.user = User;


        this.gunKey = "http://gunjs.herokuapp.com/gun";
        this.collectionKey = 'kata';
        this.userCollectionKey = 'user';
        this.katas = null;
     //   this.ref = new Gun(this.gunKey).get(this.collectionKey);
        this.gun = new Gun();


        var self = this;
        this.ref = this.gun.get(this.collectionKey).not(function (key) {
            // put in an object and key it
            self.gun.put({
                kata: {}
            }).key(self.collectionKey);
        });

        this.userRef  = this.gun.get(this.userCollectionKey).not(function (key) {
            // put in an object and key it
            self.gun.put({
                user: {}
            }).key(self.userCollectionKey)
        });


    }

    getKatas() {
        var d = [];
        var self = this;

        this.ref.path(this.collectionKey).map().val(function (data) {
            if (data && data.name) {

                self.userRef.get(data.userName + '.' + self.user.userName).val(x => {
                    data.code = x;
                });
                d.push(data);
            }
        });

        return d;
    }



    addKata(name, description, tests) {
        var item ={
            name: name,
            description: description,
            code: "kata code",
            assertion: tests
        };

        this.ref.path(this.collectionKey + '.' + name).put(item).key(name);
    }

    saveCode(kataName, user, code) {
       this.userRef.path(this.userCollectionKey + '.' + name).put(code).key(kataName + '.'  + this.user.userName);
    }

}