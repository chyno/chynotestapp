import { KataService } from '../../src/service/kata-service';

class DatabaseStub {
  constructor() { }

  /*
 this.db.put(data, function callback(err, result) {
          if (!err) {
              console.log('Successfully posted a kata!');
          }
      });
*/
  put(data, cb) { }
}


xdescribe('the kata service', () => {

  var sut;
  var db;
  beforeEach(function () {
    sut = new KataService();
    db = new DatabaseStub();
    sut.db = db;
    spyOn(db, 'put');
  });

  it('the service should not be null', () => {
    // expect(kataService.addDefaultData()).toNotThrow("Can not call add Default data");
    expect(sut).toBeDefined();
  });

  it('the add kata service should add data', () => {
    sut.addKata({});
    expect(db.put).toHaveBeenCalled();

  });

});
