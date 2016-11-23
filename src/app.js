import {
  inject
} from "aurelia-framework";

import {
  KataService
} from "./service/kata-service";


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
    config.map([{
      route: ['', 'welcome'],
      name: 'welcome',
      moduleId: './welcome',
      nav: true,
      title: 'Welcome'
    }, {
      route: ['kata'],
      name: 'kata',
      moduleId: './kata',
      nav: true,
      title: 'Profile'
    },
    {
      route: ['login'],
      name: 'login',
      moduleId: './login',
      nav: false,
      title: 'Login'
    }

    ]);

    this.router = router;

  }
}