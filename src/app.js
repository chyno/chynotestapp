import { inject} from "aurelia-framework";
import { KataService } from "./service/kata-service";
import { User } from "./user";
import { RedirectToRoute } from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator'
import { Router } from 'aurelia-router';

@inject(KataService)
export class App {


  constructor(KataService) {
    this.userName = null;
    this.kataService = KataService;
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
        requireLogin : false
      }, {
        route: ['runner'],
        name: 'runner',
        moduleId: './runner',
        nav: true,
        title: 'Run Katas',
        requireLogin : true
      }, {
        route: ['kata'],
        name: 'kata',
        moduleId: './kata',
        nav: true,
        title: 'Manage Tests',
        requireLogin : true
      }, {
        route: ['login'],
        name: 'login',
        moduleId: './login',
        nav: false,
        title: 'Login',
        requireLogin : true
      }

    ]);

    this.router = router;

  }
}

@inject(EventAggregator, Router)
class AuthorizeStep {

  constructor(EventAggregator, Router) {
    this.router =  Router;
    this.user = {};
    this.eventAggregator = EventAggregator;

    this.eventAggregator.subscribe('Login', usr => {
       if (usr)
       {
         this.user = usr;

       }
       else
       {
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