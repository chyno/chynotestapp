// we want font-awesome to load as soon as possible to show the fa-spinner
import 'bootstrap';
import environment from './environment';
import config from './authConfig';

const runStates = {success :  0, warning : 1, error : 2};

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

/*
if (window.Worker) { // Check if Browser supports the Worker api.
	// Requires script name as input
  var myWorker = new Worker("worker.js", { type: "module" });
   worker.onmessage = receiveFromWorker;

// onkeyup could be used instead of onchange if you wanted to update the answer every time
// an entered value is changed, and you don't want to have to unfocus the field to update its .value

	function sendToWorker() {
      //worker.postMessage({ imageData, filter: filter.value });
  }

  function receiveFromWorker(e) {
    //context.putImageData(e.data, 0, 0);
  }

}
*/