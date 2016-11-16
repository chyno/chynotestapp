import {
    inject
} from "aurelia-framework";

import {
    KataService
} from "./service/kata-service";


@inject(KataService)
export class App {

  constructor(KataService) {
    this.ks = KataService;  
  }

  activate() {
    this.ks.addDefaultData();
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
        route: ['kata', 'kata'],
        name: 'kata',
        moduleId: './kata',
        nav: true,
        title: 'Profile'
      }


    ]);
    this.router = router;
  }
}