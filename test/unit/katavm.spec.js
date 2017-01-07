
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


describe('the kata vm', () => {
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
      //Arrange
        sut.instruction = 'instruction on how to do test';
        sut.name = 'valid phone number';
        sut.solution = 'funciton foo(x){}';
        sut.tests = 'Test.assertEquals(validPhoneNumber("(123) 456-7890"), true);';

    //Act
        sut.add();

        //Assert
        expect(router.navigateToRoute).toHaveBeenCalledWith('welcome');
        expect(ks.addKata).toHaveBeenCalled();
        expect(sut.errorMessage).toBe(null);
    });


     xit('adding kata with missing name data does not redirect', () => {
     //Arrange
        sut.description = 'description';
        sut.name = '';
        sut.tests = 'tests';
     //Act
        sut.add();

      //Assert
        expect(router.navigateToRoute).not.toHaveBeenCalledWith('welcome');
        expect(ks.addKata).not.toHaveBeenCalled();
         expect(sut.errorMessage).not.toBe(null);
    });

});