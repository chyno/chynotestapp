
import { App } from '../../src/app';
import { EventAggregator } from 'aurelia-event-aggregator'
import { Router } from 'aurelia-router';

class RouterStub {
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }

  addPipelineStep(stepname, stepClass) {
    this.stepClass = stepClass
  }


}

xdescribe('the App module', () => {
  var sut;
  var mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Project Chyno');
  });

  xit('should have a welcome route', () => {
    expect(sut.router.routes).toContain({
      route: ['', 'welcome'],
      name: 'welcome',
      moduleId: './welcome',
      nav: true,
      title: 'Welcome',
      requireLogin: false
    });
  });

 
});