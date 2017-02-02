// we want font-awesome to load as soon as possible to show the fa-spinner
import 'bootstrap';
import environment from './environment';
import config from './authConfig';

Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-dialog')
    .plugin('aurelia-auth', (baseConfig)=>{
         baseConfig.configure(config);
    })
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
