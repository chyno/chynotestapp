import {App} from '../../src/app';

class FakeKataService {

    addDefaultData() {

    }
}

describe('the app', () => {

 let app;
 let kataService;

beforeEach(function() {
    kataService = new FakeKataService();
    app = new App(kataService);
    spyOn(kataService, 'addDefaultData').and.callThrough();
  });

  

  it('load default data', () => {
    app.activate();
  //  expect(1).toEqual(1);
    expect(kataService.addDefaultData).toHaveBeenCalled();
  });
});
