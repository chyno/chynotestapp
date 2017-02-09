import { inject } from 'aurelia-framework';
import { RedirectToRoute } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

@inject()
export class App {

  constructor(KataService) {
    this.userName = null;
    this.test = false;
 }

  activate() {
  }

  configureRouter(config, router) {
    config.title = 'Project Chyno';
    config.user = this.user;
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([{
      route: ['', 'welcome'],
      name: 'welcome',
      moduleId: './welcome',
      nav: true,
      title: 'Welcome',
      requireLogin: false
    }, {
      route: ['runner-user'],
      name: 'runner-user',
      moduleId: './runner-user',
      nav: true,
      title: 'Run User Katas',
      requireLogin: true
    }, {
      route: ['katas'],
      name: 'katas',
      moduleId: './katas',
      nav: true,
      title: 'Manage',
      requireLogin: false
    }, {
      route: ['login'],
      name: 'login',
      moduleId: './login',
      nav: false,
      title: 'Login',
      requireLogin: true
    },
    {
      route: ['kata'],
      name: 'kata',
      moduleId: './kata',
      nav: false,
      title: 'Manage Test',
      requireLogin: false
    }

    ]);
    this.router = router;
  }
}

@inject(EventAggregator, Router)
class AuthorizeStep {

  constructor(EventAgg, Rtr) {
    this.user = {};
    this.ea = EventAgg;
    this.router = Rtr;
    this.ea.subscribe('Login', usr => {
      if (usr) {
        this.user = usr;
      }
      else {
        return this.router.navigateToRoute('welcome');
      }
    });
  }

  run(navigationInstruction, next) {
    if (navigationInstruction.config.requireLogin && !this.user.userName) {
      //this.user.userName = 'chyno';
      return next.cancel(new RedirectToRoute('welcome'));
    }
    return next();
  }
}
