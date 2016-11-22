
export class KataService {

    constructor() {

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
            }).key(key)
        });


    }

    getKatas() {
        var d = [];

        this.ref.path(this.collectionKey).map().val(function (data) {
            if (data && data.name) {
                d.push(data);
            }
        });

        return d;
    }

    addDefaultData() {

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