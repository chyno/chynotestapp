define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
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
      }]);

      this.router = router;
    };

    return App;
  }();
});
define('app_orig',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);

    this.message = 'Hello World!';
    this.gun = new Gun();
    alert(this.gun);
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: false
  };
});
define('kata',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Kata = exports.Kata = function () {
        function Kata() {
            _classCallCheck(this, Kata);
        }

        Kata.prototype.activate = function activate() {};

        return Kata;
    }();
});
define('main',['exports', './environment', 'bootstrap', 'gun'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('main_org',['exports', './environment', './node_modules/gun/gun.js'], function (exports, _environment, _gun) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _gun2 = _interopRequireDefault(_gun);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('welcome',["exports", "aurelia-framework", "./service/kata-service", "./service/code-service", "aurelia-binding"], function (exports, _aureliaFramework, _kataService, _codeService, _aureliaBinding) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Welcome = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Welcome = exports.Welcome = (_dec = (0, _aureliaFramework.inject)(_kataService.KataService, _codeService.CodeService, _aureliaBinding.ObserverLocator), _dec(_class = function () {
        function Welcome(kataService, codeservice, observerlocator) {
            _classCallCheck(this, Welcome);

            this.kataService = kataService;
            this.katas = [];
            this.codeservice = codeservice;
            this.cntl = null;
            this.kataChosen = null;
            this.observerlocator = observerlocator;
            this.bar = '';
        }

        Welcome.prototype.activate = function activate() {
            this.katas = this.kataService.getKatas();
            this.kataChosen = null;
        };

        Welcome.prototype.attached = function attached() {

            this.codeservice.setControls([this.codeArea, this.testsArea]);

            if (this.kataChosen) {
                this.codeservice.setCodeValue(this.kataChosen.code);
                this.codeservice.setTestValue(this.kataChosen.assertion);
            }

            var subscription = this.observerlocator.getObserver(this, 'kataChosen').subscribe(this.onChange.bind(this));
        };

        Welcome.prototype.onChange = function onChange(newValue, oldValue) {
            if (newValue) {
                this.codeservice.setCodeValue(newValue.code);
                this.codeservice.setTestValue(this.kataChosen.assertion);
            }
        };

        return Welcome;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('service/code-service',['exports', 'codemirror'], function (exports, _codemirror) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CodeService = undefined;

    var _codemirror2 = _interopRequireDefault(_codemirror);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var CodeService = exports.CodeService = function () {
        function CodeService() {
            _classCallCheck(this, CodeService);

            this.codeeditor = null;
            this.testeditor = null;
        }

        CodeService.prototype.setControls = function setControls(cntls) {

            this.codeeditor = _codemirror2.default.fromTextArea(cntls[0], {
                lineNumbers: true,
                styleActiveLine: true,
                matchBrackets: true,
                theme: 'blackboard',
                autofocus: true
            });

            this.testeditor = _codemirror2.default.fromTextArea(cntls[1], {
                lineNumbers: true,
                styleActiveLine: true,
                matchBrackets: true,
                theme: 'blackboard',
                autofocus: true
            });
        };

        CodeService.prototype.setCodeValue = function setCodeValue(code) {
            this.codeeditor.getDoc().setValue(code);
        };

        CodeService.prototype.setTestValue = function setTestValue(tcode) {
            this.testeditor.getDoc().setValue(tcode);
        };

        return CodeService;
    }();
});
define('service/kata-service',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.KataService = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var KataService = exports.KataService = function () {
        function KataService() {
            _classCallCheck(this, KataService);

            this.kataKey = "chynotestapp/kata/3";
            this.gunKey = location.origin + '/gun';
            this.gun = new Gun();
            this.gkatas = this.gun.put(this.katas).key(this.kataKey);
            this.setData();
        }

        KataService.prototype.getKatas = function getKatas() {
            return [];
        };

        KataService.prototype.setData = function setData() {

            var kata = void 0;

            if (this.gkatas.get(this.kataKey).val()) {
                return;
            }

            katas = {
                id: 1,
                tests: []
            };

            kata.tests.push({
                name: "first Javascript kata ",
                description: "Sampple Java script. The strings were taken out and need to be placed back into the application",
                code: "function findSequence(goal) { \n function find(start, history) { \n if (start == goal) \n return history; \n else if (start > goal) \n return null; \n else \n return find(start + 5, ( + history +  + 5)) || \n find(start * 3, ( + history +  * 3)); \n } \n  return find(1, 1); \n } \n ",
                assertion: 'Assert(true == true);'
            });

            katas.tests.push({
                name: "second",
                description: "Just write to console. This is the most basic example you need to write the code from scratch",
                code: "console.writeline('2')",
                assertion: 'Assert(foo  == nulll);'
            });

            this.gkatas.put(katas).key(this.kataKey);
        };

        return KataService;
    }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"bootstrap/css/bootstrap.css\"></require>\n    <require from=\"./styles/styles.css\"></require>\n    <require from=\"./nav-bar.html\"></require>\n    <nav-bar router.bind=\"router\"></nav-bar>\n    <hr style=\"clear:both; padding-top:2em\" />\n    <div class=\"container\">\n        <loading-indicator loading.bind=\"router.isNavigating || api.isRequesting\"></loading-indicator>\n        <!-- Main component for a primary marketing message or call to action -->\n        <div> Hello world</div>\n        <router-view></router-view>\n    </div>\n</template>"; });
define('text!styles/styles.css', ['module'], function(module) { module.exports = "\r\n.funkyradio div {\r\n  clear: both;\r\n  overflow: hidden;\r\n}\r\n\r\n.funkyradio label {\r\n  width: 100%;\r\n  border-radius: 3px;\r\n  border: 1px solid #D1D3D4;\r\n  font-weight: normal;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:empty,\r\n.funkyradio input[type=\"checkbox\"]:empty {\r\n  display: none;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:empty ~ label,\r\n.funkyradio input[type=\"checkbox\"]:empty ~ label {\r\n  position: relative;\r\n  line-height: 2.5em;\r\n  text-indent: 3.25em;\r\n  margin-top: 2em;\r\n  cursor: pointer;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:empty ~ label:before,\r\n.funkyradio input[type=\"checkbox\"]:empty ~ label:before {\r\n  position: absolute;\r\n  display: block;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  content: '';\r\n  width: 2.5em;\r\n  background: #D1D3D4;\r\n  border-radius: 3px 0 0 3px;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:hover:not(:checked) ~ label,\r\n.funkyradio input[type=\"checkbox\"]:hover:not(:checked) ~ label {\r\n  color: #888;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:hover:not(:checked) ~ label:before,\r\n.funkyradio input[type=\"checkbox\"]:hover:not(:checked) ~ label:before {\r\n  content: '\\2714';\r\n  text-indent: .9em;\r\n  color: #C2C2C2;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:checked ~ label,\r\n.funkyradio input[type=\"checkbox\"]:checked ~ label {\r\n  color: #777;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio input[type=\"checkbox\"]:checked ~ label:before {\r\n  content: '\\2714';\r\n  text-indent: .9em;\r\n  color: #333;\r\n  background-color: #ccc;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:focus ~ label:before,\r\n.funkyradio input[type=\"checkbox\"]:focus ~ label:before {\r\n  box-shadow: 0 0 0 3px #999;\r\n}\r\n\r\n.funkyradio-default input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio-default input[type=\"checkbox\"]:checked ~ label:before {\r\n  color: #333;\r\n  background-color: #ccc;\r\n}\r\n\r\n.funkyradio-primary input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio-primary input[type=\"checkbox\"]:checked ~ label:before {\r\n  color: #fff;\r\n  background-color: #337ab7;\r\n}\r\n\r\n.funkyradio-success input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio-success input[type=\"checkbox\"]:checked ~ label:before {\r\n  color: #fff;\r\n  background-color: #5cb85c;\r\n}\r\n\r\n.funkyradio-danger input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio-danger input[type=\"checkbox\"]:checked ~ label:before {\r\n  color: #fff;\r\n  background-color: #d9534f;\r\n}\r\n\r\n.funkyradio-warning input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio-warning input[type=\"checkbox\"]:checked ~ label:before {\r\n  color: #fff;\r\n  background-color: #f0ad4e;\r\n}\r\n\r\n.funkyradio-info input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio-info input[type=\"checkbox\"]:checked ~ label:before {\r\n  color: #fff;\r\n  background-color: #5bc0de;\r\n}\r\n\r\n/* SCSS STYLES */\r\n/*\r\n.funkyradio {\r\n\r\n    div {\r\n        clear: both;\r\n        overflow: hidden;\r\n    }\r\n\r\n    label {\r\n        width: 100%;\r\n        border-radius: 3px;\r\n        border: 1px solid #D1D3D4;\r\n        font-weight: normal;\r\n    }\r\n\r\n    input[type=\"radio\"],\r\n    input[type=\"checkbox\"] {\r\n\r\n        &:empty {\r\n            display: none;\r\n\r\n            ~ label {\r\n                position: relative;\r\n                line-height: 2.5em;\r\n                text-indent: 3.25em;\r\n                margin-top: 2em;\r\n                cursor: pointer;\r\n                user-select: none;\r\n\r\n                &:before {\r\n                    position: absolute;\r\n                    display: block;\r\n                    top: 0;\r\n                    bottom: 0;\r\n                    left: 0;\r\n                    content: '';\r\n                    width: 2.5em;\r\n                    background: #D1D3D4;\r\n                    border-radius: 3px 0 0 3px;\r\n                }\r\n            }\r\n        }\r\n\r\n        &:hover:not(:checked) ~ label {\r\n            color: #888;\r\n\r\n            &:before {\r\n                content: '\\2714';\r\n                text-indent: .9em;\r\n                color: #C2C2C2;\r\n            }\r\n        }\r\n\r\n        &:checked ~ label {\r\n            color: #777;\r\n\r\n            &:before {\r\n                content: '\\2714';\r\n                text-indent: .9em;\r\n                color: #333;\r\n                background-color: #ccc;\r\n            }\r\n        }\r\n\r\n        &:focus ~ label:before {\r\n            box-shadow: 0 0 0 3px #999;\r\n        }\r\n    }\r\n\r\n    &-default {\r\n        input[type=\"radio\"],\r\n        input[type=\"checkbox\"] {\r\n            &:checked ~ label:before {\r\n                color: #333;\r\n                background-color: #ccc;\r\n            }\r\n        }\r\n    }\r\n\r\n    &-primary {\r\n        input[type=\"radio\"],\r\n        input[type=\"checkbox\"] {\r\n            &:checked ~ label:before {\r\n                color: #fff;\r\n                background-color: #337ab7;\r\n            }\r\n        }\r\n    }\r\n\r\n    &-success {\r\n        input[type=\"radio\"],\r\n        input[type=\"checkbox\"] {\r\n            &:checked ~ label:before {\r\n                color: #fff;\r\n                background-color: #5cb85c;\r\n            }\r\n        }\r\n    }\r\n\r\n    &-danger {\r\n        input[type=\"radio\"],\r\n        input[type=\"checkbox\"] {\r\n            &:checked ~ label:before {\r\n                color: #fff;\r\n                background-color: #d9534f;\r\n            }\r\n        }\r\n    }\r\n\r\n    &-warning {\r\n        input[type=\"radio\"],\r\n        input[type=\"checkbox\"] {\r\n            &:checked ~ label:before {\r\n                color: #fff;\r\n                background-color: #f0ad4e;\r\n            }\r\n        }\r\n    }\r\n\r\n    &-info {\r\n        input[type=\"radio\"],\r\n        input[type=\"checkbox\"] {\r\n            &:checked ~ label:before {\r\n                color: #fff;\r\n                background-color: #5bc0de;\r\n            }\r\n        }\r\n    }\r\n}\r\n*/\r\n"; });
define('text!app_orig.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n</template>\n"; });
define('text!kata.html', ['module'], function(module) { module.exports = "<template>\r\n   <div class=\"form-group\">\r\n  <label for=\"name\">Name:</label>\r\n  <input type=\"text\" class=\"form-control\" id=\"name\" value.bind=\"name\">\r\n</div>\r\n<div class=\"form-group\">\r\n  <label for=\"desc\">Descrition:</label>\r\n  <input type=\"text\" class=\"form-control\" id=\"desc\" value.bind=\"description\">\r\n</div>\r\n<div class=\"form-group\">\r\n  <label for=\"tsts\">Sample Tests:</label>\r\n  <input type=\"text\" class=\"form-control\" id=\"tsts\" value.bind=\"tests\">\r\n</div>\r\n</template>"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <!-- Fixed navbar -->\n  <nav class=\"navbar navbar-default navbar-fixed-top\">\n    <div class=\"container\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\"\n          aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n        <a class=\"navbar-brand\" href=\"#\">Project Chyno</a>\n      </div>\n      <div id=\"navbar\" class=\"navbar-collapse collapse\">\n        <ul class=\"nav navbar-nav\">\n             <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a href.bind=\"row.href\">${row.title}</a></li>\n        </ul>\n\n      </div>\n      <!--/.nav-collapse -->\n    </div>\n  </nav>\n</template>"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template>\r\n\t<require from=\"codemirror/lib/codemirror.css\"></require>\r\n\t<require from=\"codemirror/theme/blackboard.css\"></require>\r\n\t<select value.bind=\"kataChosen\" class=\"selectpicker\">\r\n      <option model.bind=\"null\">Choose...</option>\r\n      <option repeat.for=\"kata of katas\" model.bind=\"kata\">  ${kata.name} </option>\r\n</select>\r\n\t<hr/>\r\n\t<div class=\"container\">\r\n\t\t<div class=\"row\">\r\n\t\t\t<div class=\"col-md-12\">\r\n\t\t\t\t<p>${kataChosen.description}</p>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"row\">\r\n\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t<form><textarea id=\"code\" name=\"code\" ref=\"codeArea\"></textarea></form>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t<form><textarea id=\"tests\" name=\"tests\" ref=\"testsArea\"></textarea></form>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"row\" style=\"padding-top:1em\">\r\n\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t<button class=\"btn btn-primary\">Save Code</button>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"col-md-6\">\r\n\t\t\t\t<button class=\"btn btn-primary\">Run Tests</button>\r\n\t\t\t\t<button class=\"btn btn-secondary\">Save Tests</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map