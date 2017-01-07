
import {App} from '../../src/app';
import {EventAggregator} from 'aurelia-event-aggregator'
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

describe('the App module', () => {
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

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContain({
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: './welcome',
        nav: true,
        title: 'Welcome',
        requireLogin : false
      });
  });

  it('should have a runner route', () => {
    expect(sut.router.routes).toContain( {
        route: ['runner'],
        name: 'runner',
        moduleId: './runner',
        nav: true,
        title: 'Run Katas',
        requireLogin : true
      });
  });

  it('should have a manage route',() => {
   expect(sut.router.routes).toContain({
        route: ['kata'],
        name: 'kata',
        moduleId: './kata',
        nav: true,
        title: 'Manage Tests',
        requireLogin : true
   });
  });

  it('should have a login route', () => {
    expect(sut.router.routes).toContain( {
        route: ['login'],
        name: 'login',
        moduleId: './login',
        nav: false,
        title: 'Login',
        requireLogin : true
      });
  });


  it('Authorize step default to no user', () => {
    var rout = new EventAggregator();
    var ea =  new EventAggregator();

    var auth = mockedRouter.stepClass();
    var sut = new auth(rout, ea);

     expect(sut).toBeDefined();
    // expect(auth.user).toBeDefined();

  });

});