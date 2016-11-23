import {
    inject
} from "aurelia-framework";

import {
    User
} from '../user';

@inject(User)
export class KataService {

    constructor(User) {
        this.user = User;
        this.gunKey = "http://gunjs.herokuapp.com/gun";
        this.collectionKey = 'kata';
        this.katas = null;
        // this.ref = new Gun(this.gunKey).get(this.collectionKey);
        this.gun = new Gun(this.gunKey);

        /*
        var chat = Gun(location.origin + '/gun').get('example/chat/data').not(function(){
				return this.put({1: {who: 'Welcome', what: "to the chat app!", when: 1}}).key('example/chat/data');
			});
        */
        this.ref = this.gun.put({kata: {}}).key(this.collectionKey);
    }

    getKatas() {
        var d = [];
        var self = this;

        this.ref.path(this.collectionKey).map(function (data, k) {
            d.push(data);
        });

        return d;
    }


    addDefaultData() {

    }

    addKata(name, description, tests) {
        var item = {
            name: name,
            description: description,
            code: " ",
            assertion: tests
        };
        this.ref.path(this.collectionKey).put(item).key(item.name);
    }

    saveCode(name, user, code) {
        this.ref.path(name).put({
            code: code
        }).key(name + '/' + user.userName);
    }

}