import { KataService } from '../../src/service/kata-service';

describe('the kata service', () => {

  var sut;

  beforeEach(function () {
    sut = new KataService();
  });

  it('the service should not be null', () => {
    // expect(kataService.addDefaultData()).toNotThrow("Can not call add Default data");
    expect(sut).toBeDefined();
  });
});
