
export class KataService {

    constructor() {

        this.gunKey = "http://gunjs.herokuapp.com/gun";
        this.collectionKey = 'kata2';
        this.katas = null;
     //   this.ref = new Gun(this.gunKey).get(this.collectionKey);
        this.gun = new Gun();

        this.ref = this.gun.get(this.collectionKey);
        var self = this;
        this.gun.get(this.collectionKey).not(function (key) {
            // put in an object and key it
            self.gun.put({
                kata: {}
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

    saveCode(name, user, code) {
        //this.ref.get(name).put({ code: code });
    }

}