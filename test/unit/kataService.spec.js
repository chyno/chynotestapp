import {KataSercie} from '../../src/service/kata-service';


describe('kata service', () => {


 let kataService;

beforeEach(function() {
    kataService = new KataSercie();
   
  });


  it('load default data', () => {
    expect(kataService.addDefaultData()).toNotThrow("Can not call add Default data");
  });
});
