
import { Kata } from '../../src/kata';

class KataServiceStub {
    constructor() {
        this.data = null;
    }


    addKata(data) {
        this.data = data;
    }
}

class RouterStub {
    constructor() { }

    navigateToRoute(name) { }
}


xdescribe('the kata vm', () => {
    var sut;
    var router;
    var sut;
    var ks;


    beforeEach(() => {


        ks = new KataServiceStub();
        router = new RouterStub();
        sut = new Kata(ks, router);
        spyOn(router, 'navigateToRoute');
        spyOn(ks, 'addKata');

    });


    it('contains a router property', () => {
        expect(sut).toBeDefined();
    });


    it('adding kata when all required information entered  redirects user  to home page', () => {

        sut.description = 'description';
        sut.name = 'name';
        sut.tests = 'tests';
        sut.add();

        expect(router.navigateToRoute).toHaveBeenCalledWith('welcome');
        expect(ks.addKata).toHaveBeenCalled();
    });

    it('adding kata with missing description  data does not redirect', () => {
        sut.description = '';
        sut.name = 'name';
        sut.tests = 'tests';
        sut.add();

        expect(router.navigateToRoute).not.toHaveBeenCalledWith('welcome');
        expect(ks.addKata).not.toHaveBeenCalled();
    });

     it('adding kata with missing name data does not redirect', () => {

        sut.description = 'description';
        sut.name = '';
        sut.tests = 'tests';
        sut.add();

        expect(router.navigateToRoute).not.toHaveBeenCalledWith('welcome');
        expect(ks.addKata).not.toHaveBeenCalled();
    });

    it('adding kata with missing tests data does not redirect', () => {

        sut.description = 'description';
        sut.name = 'name';
        sut.tests = null;
        sut.add();

        expect(router.navigateToRoute).not.toHaveBeenCalledWith('welcome');
        expect(ks.addKata).not.toHaveBeenCalled();
    });


});