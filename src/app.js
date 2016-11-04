
export class App {
  configureRouter(config, router) {
    config.title = 'Project Chyno';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: './welcome', nav: true, title: 'Welcome' },
       { route: ['kata', 'kata'], name: 'kata',      moduleId: './kata',      nav: true, title: 'Profile' }


    ]);

    this.router = router;
  }
}
