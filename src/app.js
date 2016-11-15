import {
  inject
} from "aurelia-framework";

import {
  KataService
} from "./service/kata-service";
import { DialogService } from 'aurelia-dialog';

import { Login } from './login';

@inject(KataService, DialogService)
export class App {

  constructor(kataService, DialogService) {
    this.router = null

    this.kataService = KataService;
    this.dialogService = DialogService;
  }

  activate() {
    this.kataService.addDefaultData();

    if (this.router) {
      this.router.userName = null;

      this.router.login = () => {


        this.dialogService.open({ viewModel: Login, model: this.userName }).then(response => {
          if (!response.wasCancelled) {
            this.userName = esponse.output;
          }
          console.log(response.output);
        });
      };
    }

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
      name: 'kata',
      moduleId: './kata',
      nav: false,
      title: 'Login'
    }

    ]);



    this.router = router;


  }
}