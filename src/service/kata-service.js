
export class KataService {

    constructor() {

        this.gunKey = "http://gunjs.herokuapp.com/gun";
        this.collectionKey = 'chynotestapp/katas/data';
        this.katas = null;
        this.ref = new Gun(this.gunKey).get(this.collectionKey);
       // this.ref = new Gun().get(this.collectionKey);
    }

    getKatas() {
        var d = [];

        this.ref.map().val(function (data, k) {
            d.push(data);
        });

        return d;
    }


    addDefaultData() {

        alert('HW');
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