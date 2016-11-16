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

 
  constructor(KataService, DialogService) {
    this.userName = null;
     this.kataService = KataService;
    this.dialogService = DialogService;
  }

  activate() {
   // this.kataService.addDefaultData();

   /*
    this.routerVm.userName = null;
    this.routerVm.login = () => {
       this.dialogService.open({ viewModel: Login, model: this.userName }).then(response => {
          if (!response.wasCancelled) {
            this.userName = esponse.output;
          }
          console.log(response.output);
        });
    };
  }
*/
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
   
    var self = this;
     router.userName = "Not Logged in";
     router.login = () => {
       this.dialogService.open({ viewModel: Login, model: this.userName }).then(response => {
          if (!response.wasCancelled) {
            self.router.userName = response.output;
          }
          console.log(response.output);
        });
    }

    this.router = router;
    
  }
}