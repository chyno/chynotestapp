
export class KataService {

    constructor() {

        this.gunKey = "http://gunjs.herokuapp.com/gun";
        this.collectionKey = 'chynotestapp/katas/data';
        this.katas = null;
        //this.ref = new Gun(this.gunKey).get(this.collectionKey);
        this.ref = new Gun().get(this.collectionKey);
    }

    getKatas() {
        var d = [];

        this.ref.map().val(function (data, k) {
            d.push(data);
        });

        return d;
    }


    addDefaultData() {
        var item1 = {
            name: "first",
            description: "Just write to console. This is the most basic example you need to write the code from scratch",
            code: "console.writeline('2')",
            assertion: 'Assert(foo  != null);'
        };

        var item2 = {
            name: "second",
            description: "Just write to console. This is the most basic example you need to write the code from scratch",
            code: "console.writeline('2')",
            assertion: 'Assert(foo  == null);'
        };

        this.ref.path(item1.name).put(item1);
        this.ref.path(item2.name).put(item2);
    }

    addKata(name, description, tests) {
        var item ={
            name: name,
            description: description,
            code: " ",
            assertion: tests
        };

        this.ref.path(item.name).put(item);
    }

}