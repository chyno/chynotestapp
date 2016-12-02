define('app',["exports", "aurelia-framework", "./service/kata-service", "./user", "aurelia-router", "aurelia-event-aggregator"], function (exports, _aureliaFramework, _kataService, _user, _aureliaRouter, _aureliaEventAggregator) {
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

  var _dec, _class, _dec2, _class2;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_kataService.KataService), _dec(_class = function () {
    function App(KataService) {
      _classCallCheck(this, App);

      this.userName = null;
      this.kataService = KataService;
    }

    App.prototype.activate = function activate() {};

    App.prototype.configureRouter = function configureRouter(config, router) {
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
        route: ['runner'],
        name: 'runner',
        moduleId: './runner',
        nav: true,
        title: 'Run Katas',
        requireLogin: true
      }, {
        route: ['kata'],
        name: 'kata',
        moduleId: './kata',
        nav: true,
        title: 'Profile',
        requireLogin: true
      }, {
        route: ['login'],
        name: 'login',
        moduleId: './login',
        nav: false,
        title: 'Login',
        requireLogin: true
      }]);

      this.router = router;
    };

    return App;
  }()) || _class);
  var AuthorizeStep = (_dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaRouter.Router), _dec2(_class2 = function () {
    function AuthorizeStep(EventAggregator, Router) {
      var _this = this;

      _classCallCheck(this, AuthorizeStep);

      this.router = Router;
      this.user = {};
      this.eventAggregator = EventAggregator;

      this.eventAggregator.subscribe('Login', function (usr) {
        if (usr) {
          _this.user = usr;
        } else {
          return _this.router.navigateToRoute('welcome');
        }
      });
    }

    AuthorizeStep.prototype.run = function run(navigationInstruction, next) {

      if (navigationInstruction.config.requireLogin && !this.user.userName) {
        return next.cancel(new _aureliaRouter.RedirectToRoute('welcome'));
      }

      return next();
    };

    return AuthorizeStep;
  }()) || _class2);
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
define('kata',["exports", "aurelia-framework", "./service/kata-service", "aurelia-router"], function (exports, _aureliaFramework, _kataService, _aureliaRouter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Kata = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Kata = exports.Kata = (_dec = (0, _aureliaFramework.inject)(_kataService.KataService, _aureliaRouter.Router), _dec(_class = function () {
        function Kata(kataService, Router) {
            _classCallCheck(this, Kata);

            this.kataService = kataService;
            this.name = null;
            this.description = null;
            this.tests = null;
            this.router = Router;
        }

        Kata.prototype.activate = function activate() {};

        Kata.prototype.add = function add() {
            if (this.name && this.description && this.tests) {
                this.kataService.addKata(this.name, this.description, this.tests);
                return this.router.navigateToRoute('welcome');
            }
        };

        Kata.prototype.clearAll = function clearAll() {
            this.kataService.clearAll();
        };

        return Kata;
    }()) || _class);
});
define('login',["exports", "aurelia-framework", "aurelia-dialog"], function (exports, _aureliaFramework, _aureliaDialog) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Login = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
        function Login(DialogController) {
            _classCallCheck(this, Login);

            this.controller = DialogController;
        }

        Login.prototype.activate = function activate(data) {
            this.data = {
                userName: data.userName,
                password: data.password
            };
        };

        return Login;
    }()) || _class);
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
    aurelia.use.standardConfiguration().plugin('aurelia-dialog').feature('resources');

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
define('nav-bar',['exports', 'aurelia-framework', 'aurelia-dialog', 'aurelia-event-aggregator', './login', './user'], function (exports, _aureliaFramework, _aureliaDialog, _aureliaEventAggregator, _login, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NavBar = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var NavBar = exports.NavBar = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService, _user.User, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function NavBar(DialogService, User, EventAggregator) {
            _classCallCheck(this, NavBar);

            _initDefineProp(this, 'router', _descriptor, this);

            this.LoginText = "Log In";
            this.LogoutText = "Log Out";
            this.dialogService = DialogService;
            this.buttonName = this.LoginText;
            this.eventAggregator = EventAggregator;
            this.user = User;
        }

        NavBar.prototype.login = function login() {
            var _this = this;

            var self = this;

            if (this.user.userName) {
                this.user.userName = null;
                this.user.password = null;
                this.buttonName = this.LoginText;
                self.eventAggregator.publish('Login', null);
            } else {
                this.dialogService.open({ viewModel: _login.Login, model: self.user }).then(function (response) {
                    if (!response.wasCancelled && response.output.userName) {
                        self.user.userName = response.output.userName;
                        self.user.password = response.output.password;
                        self.eventAggregator.publish('Login', self.user);
                        _this.buttonName = _this.LogoutText;
                    }
                    console.log(response.output);
                });
            }
        };

        return NavBar;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'router', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('runner',["exports", "aurelia-framework", "./service/kata-service", "./service/code-service", "aurelia-binding", "./user"], function (exports, _aureliaFramework, _kataService, _codeService, _aureliaBinding, _user) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Runner = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Runner = exports.Runner = (_dec = (0, _aureliaFramework.inject)(_kataService.KataService, _codeService.CodeService, _aureliaBinding.ObserverLocator, _user.User), _dec(_class = function () {
        function Runner(kataService, codeservice, observerlocator, User) {
            _classCallCheck(this, Runner);

            this.kataService = kataService;
            this.katas = [];
            this.codeservice = codeservice;
            this.cntl = null;
            this.kataChosen = null;
            this.observerlocator = observerlocator;
            this.user = User;
        }

        Runner.prototype.activate = function activate() {

            this.katas = this.kataService.getKatas();
            this.kataChosen = null;
        };

        Runner.prototype.attached = function attached() {

            this.codeservice.setControls([this.codeArea, this.testsArea]);

            if (this.kataChosen) {
                this.codeservice.setCodeValue(this.kataChosen.code);
                this.codeservice.setTestValue(this.kataChosen.assertion);
            }

            var subscription = this.observerlocator.getObserver(this, 'kataChosen').subscribe(this.onChange.bind(this));
        };

        Runner.prototype.saveCode = function saveCode() {
            var cd = this.codeservice.getCodeValue();

            this.kataService.saveCode(this.kataChosen.name, cd);
        };

        Runner.prototype.onChange = function onChange(newValue, oldValue) {
            if (newValue) {
                this.codeservice.setCodeValue(newValue.code);
                this.codeservice.setTestValue(this.kataChosen.assertion);
            }
        };

        return Runner;
    }()) || _class);
});
define('user',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var User = exports.User = function User() {
        _classCallCheck(this, User);

        this.userName = null;
        this.password = null;
    };
});
define('welcome',["exports", "aurelia-framework", "./user"], function (exports, _aureliaFramework, _user) {
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

    var Welcome = exports.Welcome = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function Welcome(User) {
        _classCallCheck(this, Welcome);

        this.user = User;
    }) || _class);
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
                lineNumbers: false,
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

        CodeService.prototype.getCodeValue = function getCodeValue() {
            var doc = this.codeeditor.getDoc();
            return doc.getValue();
        };

        CodeService.prototype.getTestValue = function getTestValue(tcode) {
            var doc = this.testeditor.getDoc();
            return doc.getValue();
        };

        return CodeService;
    }();
});
define('service/kata-service',["exports", "aurelia-framework", "../user"], function (exports, _aureliaFramework, _user) {
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

    var _dec, _class;

    var KataService = exports.KataService = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
        function KataService(User) {
            _classCallCheck(this, KataService);

            this.user = User;
            this.gunKey = "http://gunjs.herokuapp.com/gun/projectchynoapp";
            this.collectionKey = 'chynokata';

            this.userCollectionKey = 'user';
            this.katas = null;

            this.gun = new Gun();

            var self = this;
            this.ref = this.gun.get(this.collectionKey).not(function (key) {
                self.gun.put({}).key(self.collectionKey);
            });
            this.userRef = this.gun.get(this.userCollectionKey).not(function (key) {
                self.gun.put({}).key(self.userCollectionKey);
            });
        }

        KataService.prototype.getKatas = function getKatas() {
            var d = [];
            var self = this;

            this.ref.get(this.collectionKey).map(function (data) {
                if (data && data.name) {
                    self.userRef.get(data.name + '_' + self.user.userName, function (cd) {
                        data.code = cd;
                    });

                    d.push(data);
                }
            });

            return d;
        };

        KataService.prototype.addKata = function addKata(name, description, tests) {
            var item = {
                name: name,
                description: description,
                code: "code",
                assertion: tests
            };

            this.ref.path(item.name).put(item);
        };

        KataService.prototype.saveCode = function saveCode(kataName, code) {
            this.userRef.put(code).key(kataName + '_' + this.user.userName);
        };

        return KataService;
    }()) || _class);
});
define('aurelia-dialog/ai-dialog-header',['exports', 'aurelia-templating', './dialog-controller'], function (exports, _aureliaTemplating, _dialogController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogHeader = undefined;

  

  var _dec, _dec2, _class, _class2, _temp;

  var AiDialogHeader = exports.AiDialogHeader = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-header'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <button type="button" class="dialog-close" aria-label="Close" if.bind="!controller.settings.lock" click.trigger="controller.cancel()">\n      <span aria-hidden="true">&times;</span>\n    </button>\n\n    <div class="dialog-header-content">\n      <slot></slot>\n    </div>\n  </template>\n'), _dec(_class = _dec2(_class = (_temp = _class2 = function AiDialogHeader(controller) {
    

    this.controller = controller;
  }, _class2.inject = [_dialogController.DialogController], _temp)) || _class) || _class);
});
define('aurelia-dialog/dialog-controller',['exports', './lifecycle', './dialog-result'], function (exports, _lifecycle, _dialogResult) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogController = undefined;

  

  var DialogController = exports.DialogController = function () {
    function DialogController(renderer, settings, resolve, reject) {
      

      this.renderer = renderer;
      this.settings = settings;
      this._resolve = resolve;
      this._reject = reject;
    }

    DialogController.prototype.ok = function ok(output) {
      return this.close(true, output);
    };

    DialogController.prototype.cancel = function cancel(output) {
      return this.close(false, output);
    };

    DialogController.prototype.error = function error(message) {
      var _this = this;

      return (0, _lifecycle.invokeLifecycle)(this.viewModel, 'deactivate').then(function () {
        return _this.renderer.hideDialog(_this);
      }).then(function () {
        _this.controller.unbind();
        _this._reject(message);
      });
    };

    DialogController.prototype.close = function close(ok, output) {
      var _this2 = this;

      if (this._closePromise) {
        return this._closePromise;
      }

      this._closePromise = (0, _lifecycle.invokeLifecycle)(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
        if (canDeactivate) {
          return (0, _lifecycle.invokeLifecycle)(_this2.viewModel, 'deactivate').then(function () {
            return _this2.renderer.hideDialog(_this2);
          }).then(function () {
            var result = new _dialogResult.DialogResult(!ok, output);
            _this2.controller.unbind();
            _this2._resolve(result);
            return result;
          });
        }

        _this2._closePromise = undefined;
      }, function (e) {
        _this2._closePromise = undefined;
        return Promise.reject(e);
      });

      return this._closePromise;
    };

    return DialogController;
  }();
});
define('aurelia-dialog/lifecycle',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.invokeLifecycle = invokeLifecycle;
  function invokeLifecycle(instance, name, model) {
    if (typeof instance[name] === 'function') {
      var result = instance[name](model);

      if (result instanceof Promise) {
        return result;
      }

      if (result !== null && result !== undefined) {
        return Promise.resolve(result);
      }

      return Promise.resolve(true);
    }

    return Promise.resolve(true);
  }
});
define('aurelia-dialog/dialog-result',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var DialogResult = exports.DialogResult = function DialogResult(cancelled, output) {
    

    this.wasCancelled = false;

    this.wasCancelled = cancelled;
    this.output = output;
  };
});
define('aurelia-dialog/ai-dialog-body',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogBody = undefined;

  

  var _dec, _dec2, _class;

  var AiDialogBody = exports.AiDialogBody = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-body'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec(_class = _dec2(_class = function AiDialogBody() {
    
  }) || _class) || _class);
});
define('aurelia-dialog/ai-dialog-footer',['exports', 'aurelia-templating', './dialog-controller'], function (exports, _aureliaTemplating, _dialogController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogFooter = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _class3, _temp;

  var AiDialogFooter = exports.AiDialogFooter = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-footer'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n\n    <template if.bind="buttons.length > 0">\n      <button type="button" class="btn btn-default" repeat.for="button of buttons" click.trigger="close(button)">${button}</button>\n    </template>\n  </template>\n'), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
    function AiDialogFooter(controller) {
      

      _initDefineProp(this, 'buttons', _descriptor, this);

      _initDefineProp(this, 'useDefaultButtons', _descriptor2, this);

      this.controller = controller;
    }

    AiDialogFooter.prototype.close = function close(buttonValue) {
      if (AiDialogFooter.isCancelButton(buttonValue)) {
        this.controller.cancel(buttonValue);
      } else {
        this.controller.ok(buttonValue);
      }
    };

    AiDialogFooter.prototype.useDefaultButtonsChanged = function useDefaultButtonsChanged(newValue) {
      if (newValue) {
        this.buttons = ['Cancel', 'Ok'];
      }
    };

    AiDialogFooter.isCancelButton = function isCancelButton(value) {
      return value === 'Cancel';
    };

    return AiDialogFooter;
  }(), _class3.inject = [_dialogController.DialogController], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'buttons', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return [];
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'useDefaultButtons', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class) || _class);
});
define('aurelia-dialog/attach-focus',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AttachFocus = undefined;

  

  var _dec, _class, _class2, _temp;

  var AttachFocus = exports.AttachFocus = (_dec = (0, _aureliaTemplating.customAttribute)('attach-focus'), _dec(_class = (_temp = _class2 = function () {
    function AttachFocus(element) {
      

      this.value = true;

      this.element = element;
    }

    AttachFocus.prototype.attached = function attached() {
      if (this.value && this.value !== 'false') {
        this.element.focus();
      }
    };

    AttachFocus.prototype.valueChanged = function valueChanged(newValue) {
      this.value = newValue;
    };

    return AttachFocus;
  }(), _class2.inject = [Element], _temp)) || _class);
});
define('aurelia-dialog/dialog-configuration',['exports', './renderer', './dialog-renderer', './dialog-options', 'aurelia-pal'], function (exports, _renderer, _dialogRenderer, _dialogOptions, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogConfiguration = undefined;

  

  var defaultRenderer = _dialogRenderer.DialogRenderer;

  var resources = {
    'ai-dialog': './ai-dialog',
    'ai-dialog-header': './ai-dialog-header',
    'ai-dialog-body': './ai-dialog-body',
    'ai-dialog-footer': './ai-dialog-footer',
    'attach-focus': './attach-focus'
  };

  var defaultCSSText = 'ai-dialog-container,ai-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0}ai-dialog-overlay{opacity:0}ai-dialog-overlay.active{opacity:1}ai-dialog-container{display:block;transition:opacity .2s linear;opacity:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}ai-dialog-container.active{opacity:1}ai-dialog-container>div{padding:30px}ai-dialog-container>div>div{display:block;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto}ai-dialog-container,ai-dialog-container>div,ai-dialog-container>div>div{outline:0}ai-dialog{display:table;box-shadow:0 5px 15px rgba(0,0,0,.5);border:1px solid rgba(0,0,0,.2);border-radius:5px;padding:3;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;background:#fff}ai-dialog>ai-dialog-header{display:block;padding:16px;border-bottom:1px solid #e5e5e5}ai-dialog>ai-dialog-header>button{float:right;border:none;display:block;width:32px;height:32px;background:0 0;font-size:22px;line-height:16px;margin:-14px -16px 0 0;padding:0;cursor:pointer}ai-dialog>ai-dialog-body{display:block;padding:16px}ai-dialog>ai-dialog-footer{display:block;padding:6px;border-top:1px solid #e5e5e5;text-align:right}ai-dialog>ai-dialog-footer button{color:#333;background-color:#fff;padding:6px 12px;font-size:14px;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid #ccc;border-radius:4px;margin:5px 0 5px 5px}ai-dialog>ai-dialog-footer button:disabled{cursor:default;opacity:.45}ai-dialog>ai-dialog-footer button:hover:enabled{color:#333;background-color:#e6e6e6;border-color:#adadad}.ai-dialog-open{overflow:hidden}';

  var DialogConfiguration = exports.DialogConfiguration = function () {
    function DialogConfiguration(aurelia) {
      

      this.aurelia = aurelia;
      this.settings = _dialogOptions.dialogOptions;
      this.resources = [];
      this.cssText = defaultCSSText;
      this.renderer = defaultRenderer;
    }

    DialogConfiguration.prototype.useDefaults = function useDefaults() {
      return this.useRenderer(defaultRenderer).useCSS(defaultCSSText).useStandardResources();
    };

    DialogConfiguration.prototype.useStandardResources = function useStandardResources() {
      return this.useResource('ai-dialog').useResource('ai-dialog-header').useResource('ai-dialog-body').useResource('ai-dialog-footer').useResource('attach-focus');
    };

    DialogConfiguration.prototype.useResource = function useResource(resourceName) {
      this.resources.push(resourceName);
      return this;
    };

    DialogConfiguration.prototype.useRenderer = function useRenderer(renderer, settings) {
      this.renderer = renderer;
      this.settings = Object.assign(this.settings, settings || {});
      return this;
    };

    DialogConfiguration.prototype.useCSS = function useCSS(cssText) {
      this.cssText = cssText;
      return this;
    };

    DialogConfiguration.prototype._apply = function _apply() {
      var _this = this;

      this.aurelia.transient(_renderer.Renderer, this.renderer);
      this.resources.forEach(function (resourceName) {
        return _this.aurelia.globalResources(resources[resourceName]);
      });

      if (this.cssText) {
        _aureliaPal.DOM.injectStyles(this.cssText);
      }
    };

    return DialogConfiguration;
  }();
});
define('aurelia-dialog/renderer',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var Renderer = exports.Renderer = function () {
    function Renderer() {
      
    }

    Renderer.prototype.getDialogContainer = function getDialogContainer() {
      throw new Error('DialogRenderer must implement getDialogContainer().');
    };

    Renderer.prototype.showDialog = function showDialog(dialogController) {
      throw new Error('DialogRenderer must implement showDialog().');
    };

    Renderer.prototype.hideDialog = function hideDialog(dialogController) {
      throw new Error('DialogRenderer must implement hideDialog().');
    };

    return Renderer;
  }();
});
define('aurelia-dialog/dialog-renderer',['exports', 'aurelia-pal', 'aurelia-dependency-injection'], function (exports, _aureliaPal, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogRenderer = undefined;

  

  var _dec, _class;

  var containerTagName = 'ai-dialog-container';
  var overlayTagName = 'ai-dialog-overlay';
  var transitionEvent = function () {
    var transition = null;

    return function () {
      if (transition) return transition;

      var t = void 0;
      var el = _aureliaPal.DOM.createElement('fakeelement');
      var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };
      for (t in transitions) {
        if (el.style[t] !== undefined) {
          transition = transitions[t];
          return transition;
        }
      }
    };
  }();

  var DialogRenderer = exports.DialogRenderer = (_dec = (0, _aureliaDependencyInjection.transient)(), _dec(_class = function () {
    function DialogRenderer() {
      var _this = this;

      

      this._escapeKeyEventHandler = function (e) {
        if (e.keyCode === 27) {
          var top = _this._dialogControllers[_this._dialogControllers.length - 1];
          if (top && top.settings.lock !== true) {
            top.cancel();
          }
        }
      };
    }

    DialogRenderer.prototype.getDialogContainer = function getDialogContainer() {
      return _aureliaPal.DOM.createElement('div');
    };

    DialogRenderer.prototype.showDialog = function showDialog(dialogController) {
      var _this2 = this;

      var settings = dialogController.settings;
      var body = _aureliaPal.DOM.querySelectorAll('body')[0];
      var wrapper = document.createElement('div');

      this.modalOverlay = _aureliaPal.DOM.createElement(overlayTagName);
      this.modalContainer = _aureliaPal.DOM.createElement(containerTagName);
      this.anchor = dialogController.slot.anchor;
      wrapper.appendChild(this.anchor);
      this.modalContainer.appendChild(wrapper);

      this.stopPropagation = function (e) {
        e._aureliaDialogHostClicked = true;
      };
      this.closeModalClick = function (e) {
        if (!settings.lock && !e._aureliaDialogHostClicked) {
          dialogController.cancel();
        } else {
          return false;
        }
      };

      dialogController.centerDialog = function () {
        if (settings.centerHorizontalOnly) return;
        centerDialog(_this2.modalContainer);
      };

      this.modalOverlay.style.zIndex = settings.startingZIndex;
      this.modalContainer.style.zIndex = settings.startingZIndex;

      var lastContainer = Array.from(body.querySelectorAll(containerTagName)).pop();

      if (lastContainer) {
        lastContainer.parentNode.insertBefore(this.modalContainer, lastContainer.nextSibling);
        lastContainer.parentNode.insertBefore(this.modalOverlay, lastContainer.nextSibling);
      } else {
        body.insertBefore(this.modalContainer, body.firstChild);
        body.insertBefore(this.modalOverlay, body.firstChild);
      }

      if (!this._dialogControllers.length) {
        _aureliaPal.DOM.addEventListener('keyup', this._escapeKeyEventHandler);
      }

      this._dialogControllers.push(dialogController);

      dialogController.slot.attached();

      if (typeof settings.position === 'function') {
        settings.position(this.modalContainer, this.modalOverlay);
      } else {
        dialogController.centerDialog();
      }

      this.modalContainer.addEventListener('click', this.closeModalClick);
      this.anchor.addEventListener('click', this.stopPropagation);

      return new Promise(function (resolve) {
        var renderer = _this2;
        if (settings.ignoreTransitions) {
          resolve();
        } else {
          _this2.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
        }

        _this2.modalOverlay.classList.add('active');
        _this2.modalContainer.classList.add('active');
        body.classList.add('ai-dialog-open');

        function onTransitionEnd(e) {
          if (e.target !== renderer.modalContainer) {
            return;
          }
          renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }
      });
    };

    DialogRenderer.prototype.hideDialog = function hideDialog(dialogController) {
      var _this3 = this;

      var settings = dialogController.settings;
      var body = _aureliaPal.DOM.querySelectorAll('body')[0];

      this.modalContainer.removeEventListener('click', this.closeModalClick);
      this.anchor.removeEventListener('click', this.stopPropagation);

      var i = this._dialogControllers.indexOf(dialogController);
      if (i !== -1) {
        this._dialogControllers.splice(i, 1);
      }

      if (!this._dialogControllers.length) {
        _aureliaPal.DOM.removeEventListener('keyup', this._escapeKeyEventHandler);
      }

      return new Promise(function (resolve) {
        var renderer = _this3;
        if (settings.ignoreTransitions) {
          resolve();
        } else {
          _this3.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
        }

        _this3.modalOverlay.classList.remove('active');
        _this3.modalContainer.classList.remove('active');

        function onTransitionEnd() {
          renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }
      }).then(function () {
        body.removeChild(_this3.modalOverlay);
        body.removeChild(_this3.modalContainer);
        dialogController.slot.detached();

        if (!_this3._dialogControllers.length) {
          body.classList.remove('ai-dialog-open');
        }

        return Promise.resolve();
      });
    };

    return DialogRenderer;
  }()) || _class);


  DialogRenderer.prototype._dialogControllers = [];

  function centerDialog(modalContainer) {
    var child = modalContainer.children[0];
    var vh = Math.max(_aureliaPal.DOM.querySelectorAll('html')[0].clientHeight, window.innerHeight || 0);

    child.style.marginTop = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
    child.style.marginBottom = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
  }
});
define('aurelia-dialog/dialog-options',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var dialogOptions = exports.dialogOptions = {
    lock: true,
    centerHorizontalOnly: false,
    startingZIndex: 1000,
    ignoreTransitions: false
  };
});
define('aurelia-dialog/dialog-service',['exports', 'aurelia-metadata', 'aurelia-dependency-injection', 'aurelia-templating', './dialog-controller', './renderer', './lifecycle', './dialog-result', './dialog-options'], function (exports, _aureliaMetadata, _aureliaDependencyInjection, _aureliaTemplating, _dialogController, _renderer, _lifecycle, _dialogResult, _dialogOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogService = undefined;

  

  var _class, _temp;

  var DialogService = exports.DialogService = (_temp = _class = function () {
    function DialogService(container, compositionEngine) {
      

      this.container = container;
      this.compositionEngine = compositionEngine;
      this.controllers = [];
      this.hasActiveDialog = false;
    }

    DialogService.prototype.open = function open(settings) {
      return this.openAndYieldController(settings).then(function (controller) {
        return controller.result;
      });
    };

    DialogService.prototype.openAndYieldController = function openAndYieldController(settings) {
      var _this = this;

      var childContainer = this.container.createChild();
      var dialogController = void 0;
      var promise = new Promise(function (resolve, reject) {
        dialogController = new _dialogController.DialogController(childContainer.get(_renderer.Renderer), _createSettings(settings), resolve, reject);
      });
      childContainer.registerInstance(_dialogController.DialogController, dialogController);
      dialogController.result = promise;
      dialogController.result.then(function () {
        _removeController(_this, dialogController);
      }, function () {
        _removeController(_this, dialogController);
      });
      return _openDialog(this, childContainer, dialogController).then(function () {
        return dialogController;
      });
    };

    return DialogService;
  }(), _class.inject = [_aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine], _temp);


  function _createSettings(settings) {
    settings = Object.assign({}, _dialogOptions.dialogOptions, settings);
    settings.startingZIndex = _dialogOptions.dialogOptions.startingZIndex;
    return settings;
  }

  function _openDialog(service, childContainer, dialogController) {
    var host = dialogController.renderer.getDialogContainer();
    var instruction = {
      container: service.container,
      childContainer: childContainer,
      model: dialogController.settings.model,
      view: dialogController.settings.view,
      viewModel: dialogController.settings.viewModel,
      viewSlot: new _aureliaTemplating.ViewSlot(host, true),
      host: host
    };

    return _getViewModel(instruction, service.compositionEngine).then(function (returnedInstruction) {
      dialogController.viewModel = returnedInstruction.viewModel;
      dialogController.slot = returnedInstruction.viewSlot;

      return (0, _lifecycle.invokeLifecycle)(dialogController.viewModel, 'canActivate', dialogController.settings.model).then(function (canActivate) {
        if (canActivate) {
          return service.compositionEngine.compose(returnedInstruction).then(function (controller) {
            service.controllers.push(dialogController);
            service.hasActiveDialog = !!service.controllers.length;
            dialogController.controller = controller;
            dialogController.view = controller.view;

            return dialogController.renderer.showDialog(dialogController);
          });
        }
      });
    });
  }

  function _getViewModel(instruction, compositionEngine) {
    if (typeof instruction.viewModel === 'function') {
      instruction.viewModel = _aureliaMetadata.Origin.get(instruction.viewModel).moduleId;
    }

    if (typeof instruction.viewModel === 'string') {
      return compositionEngine.ensureViewModel(instruction);
    }

    return Promise.resolve(instruction);
  }

  function _removeController(service, controller) {
    var i = service.controllers.indexOf(controller);
    if (i !== -1) {
      service.controllers.splice(i, 1);
      service.hasActiveDialog = !!service.controllers.length;
    }
  }
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"bootstrap/css/bootstrap.css\"></require>\n    <require from=\"./styles/styles.css\"></require>\n    <require from=\"./nav-bar\"></require>\n    <nav-bar router.bind=\"router\"></nav-bar>\n    <hr style=\"clear:both; padding-top:2em\" />\n    <div class=\"container\">\n        <loading-indicator loading.bind=\"router.isNavigating || api.isRequesting\"></loading-indicator>\n        <!-- Main component for a primary marketing message or call to action -->\n\n        <router-view></router-view>\n    </div>\n</template>"; });
define('text!styles/styles.css', ['module'], function(module) { module.exports = "\r\n.funkyradio div {\r\n  clear: both;\r\n  overflow: hidden;\r\n}\r\n\r\n.funkyradio label {\r\n  width: 100%;\r\n  border-radius: 3px;\r\n  border: 1px solid #D1D3D4;\r\n  font-weight: normal;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:empty,\r\n.funkyradio input[type=\"checkbox\"]:empty {\r\n  display: none;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:empty ~ label,\r\n.funkyradio input[type=\"checkbox\"]:empty ~ label {\r\n  position: relative;\r\n  line-height: 2.5em;\r\n  text-indent: 3.25em;\r\n  margin-top: 2em;\r\n  cursor: pointer;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:empty ~ label:before,\r\n.funkyradio input[type=\"checkbox\"]:empty ~ label:before {\r\n  position: absolute;\r\n  display: block;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  content: '';\r\n  width: 2.5em;\r\n  background: #D1D3D4;\r\n  border-radius: 3px 0 0 3px;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:hover:not(:checked) ~ label,\r\n.funkyradio input[type=\"checkbox\"]:hover:not(:checked) ~ label {\r\n  color: #888;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:hover:not(:checked) ~ label:before,\r\n.funkyradio input[type=\"checkbox\"]:hover:not(:checked) ~ label:before {\r\n  content: '\\2714';\r\n  text-indent: .9em;\r\n  color: #C2C2C2;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:checked ~ label,\r\n.funkyradio input[type=\"checkbox\"]:checked ~ label {\r\n  color: #777;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio input[type=\"checkbox\"]:checked ~ label:before {\r\n  content: '\\2714';\r\n  text-indent: .9em;\r\n  color: #333;\r\n  background-color: #ccc;\r\n}\r\n\r\n.funkyradio input[type=\"radio\"]:focus ~ label:before,\r\n.funkyradio input[type=\"checkbox\"]:focus ~ label:before {\r\n  box-shadow: 0 0 0 3px #999;\r\n}\r\n\r\n.funkyradio-default input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio-default input[type=\"checkbox\"]:checked ~ label:before {\r\n  color: #333;\r\n  background-color: #ccc;\r\n}\r\n\r\n.funkyradio-primary input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio-primary input[type=\"checkbox\"]:checked ~ label:before {\r\n  color: #fff;\r\n  background-color: #337ab7;\r\n}\r\n\r\n.funkyradio-success input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio-success input[type=\"checkbox\"]:checked ~ label:before {\r\n  color: #fff;\r\n  background-color: #5cb85c;\r\n}\r\n\r\n.funkyradio-danger input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio-danger input[type=\"checkbox\"]:checked ~ label:before {\r\n  color: #fff;\r\n  background-color: #d9534f;\r\n}\r\n\r\n.funkyradio-warning input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio-warning input[type=\"checkbox\"]:checked ~ label:before {\r\n  color: #fff;\r\n  background-color: #f0ad4e;\r\n}\r\n\r\n.funkyradio-info input[type=\"radio\"]:checked ~ label:before,\r\n.funkyradio-info input[type=\"checkbox\"]:checked ~ label:before {\r\n  color: #fff;\r\n  background-color: #5bc0de;\r\n}\r\n\r\n/* SCSS STYLES */\r\n/*\r\n.funkyradio {\r\n\r\n    div {\r\n        clear: both;\r\n        overflow: hidden;\r\n    }\r\n\r\n    label {\r\n        width: 100%;\r\n        border-radius: 3px;\r\n        border: 1px solid #D1D3D4;\r\n        font-weight: normal;\r\n    }\r\n\r\n    input[type=\"radio\"],\r\n    input[type=\"checkbox\"] {\r\n\r\n        &:empty {\r\n            display: none;\r\n\r\n            ~ label {\r\n                position: relative;\r\n                line-height: 2.5em;\r\n                text-indent: 3.25em;\r\n                margin-top: 2em;\r\n                cursor: pointer;\r\n                user-select: none;\r\n\r\n                &:before {\r\n                    position: absolute;\r\n                    display: block;\r\n                    top: 0;\r\n                    bottom: 0;\r\n                    left: 0;\r\n                    content: '';\r\n                    width: 2.5em;\r\n                    background: #D1D3D4;\r\n                    border-radius: 3px 0 0 3px;\r\n                }\r\n            }\r\n        }\r\n\r\n        &:hover:not(:checked) ~ label {\r\n            color: #888;\r\n\r\n            &:before {\r\n                content: '\\2714';\r\n                text-indent: .9em;\r\n                color: #C2C2C2;\r\n            }\r\n        }\r\n\r\n        &:checked ~ label {\r\n            color: #777;\r\n\r\n            &:before {\r\n                content: '\\2714';\r\n                text-indent: .9em;\r\n                color: #333;\r\n                background-color: #ccc;\r\n            }\r\n        }\r\n\r\n        &:focus ~ label:before {\r\n            box-shadow: 0 0 0 3px #999;\r\n        }\r\n    }\r\n\r\n    &-default {\r\n        input[type=\"radio\"],\r\n        input[type=\"checkbox\"] {\r\n            &:checked ~ label:before {\r\n                color: #333;\r\n                background-color: #ccc;\r\n            }\r\n        }\r\n    }\r\n\r\n    &-primary {\r\n        input[type=\"radio\"],\r\n        input[type=\"checkbox\"] {\r\n            &:checked ~ label:before {\r\n                color: #fff;\r\n                background-color: #337ab7;\r\n            }\r\n        }\r\n    }\r\n\r\n    &-success {\r\n        input[type=\"radio\"],\r\n        input[type=\"checkbox\"] {\r\n            &:checked ~ label:before {\r\n                color: #fff;\r\n                background-color: #5cb85c;\r\n            }\r\n        }\r\n    }\r\n\r\n    &-danger {\r\n        input[type=\"radio\"],\r\n        input[type=\"checkbox\"] {\r\n            &:checked ~ label:before {\r\n                color: #fff;\r\n                background-color: #d9534f;\r\n            }\r\n        }\r\n    }\r\n\r\n    &-warning {\r\n        input[type=\"radio\"],\r\n        input[type=\"checkbox\"] {\r\n            &:checked ~ label:before {\r\n                color: #fff;\r\n                background-color: #f0ad4e;\r\n            }\r\n        }\r\n    }\r\n\r\n    &-info {\r\n        input[type=\"radio\"],\r\n        input[type=\"checkbox\"] {\r\n            &:checked ~ label:before {\r\n                color: #fff;\r\n                background-color: #5bc0de;\r\n            }\r\n        }\r\n    }\r\n}\r\n*/\r\n"; });
define('text!app_orig.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n</template>\n"; });
define('text!kata.html', ['module'], function(module) { module.exports = "<template>\r\n  \r\n   <div class=\"form-group\">\r\n  <label for=\"name\">Name:</label>\r\n  <input type=\"text\" class=\"form-control\" id=\"name\" value.bind=\"name\">\r\n</div>\r\n<div class=\"form-group\">\r\n  <label for=\"desc\">Descrition:</label>\r\n  <input type=\"text\" class=\"form-control\" id=\"desc\" value.bind=\"description\">\r\n</div>\r\n<div class=\"form-group\">\r\n  <label for=\"tsts\">Sample Tests:</label>\r\n  <input type=\"text\" class=\"form-control\" id=\"tsts\" value.bind=\"tests\">\r\n</div>\r\n\r\n<div class=\"container\">\r\n\t\t<button class=\"btn btn-primary\" click.trigger=\"add()\"  >Add</button>\r\n\t</div>\r\n</template>"; });
define('text!login.html', ['module'], function(module) { module.exports = "<template>\r\n<ai-dialog>\r\n\t\t<ai-dialog-body>\r\n\t\t\t<div class=\"container\">\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col-md-offset-5 col-md-3\">\r\n\t\t\t\t\t\t<div class=\"form-login\">\r\n\t\t\t\t\t\t\t<h4>Welcome back to Project Chyno.</h4>\r\n\t\t\t\t\t\t\t<input type=\"text\" id=\"userName\" class=\"form-control input-sm chat-input\" placeholder=\"username\" value.bind=\"data.userName\" />\r\n\t\t\t\t\t\t\t</br>\r\n\t\t\t\t\t\t\t<input type=\"password\" id=\"userPassword\" class=\"form-control input-sm chat-input\" placeholder=\"password\" value.bind=\"data.password\"\r\n\t\t\t\t\t\t\t/>\r\n\t\t\t\t\t\t\t</br>\r\n\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t</ai-dialog-body>\r\n\r\n\t\t<ai-dialog-footer>\r\n\t\t\t<button click.trigger=\"controller.ok(data)\">Login</button>\r\n\t\t\t<button click.trigger=\"controller.cancel()\">Cancel</button>\r\n\r\n\t\t</ai-dialog-footer>\r\n\t</ai-dialog>\r\n</template>"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <!-- Fixed navbar -->\n  <nav class=\"navbar navbar-default navbar-fixed-top\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\"\n              aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n            <a class=\"navbar-brand\" href=\"#\">Project Chyno</a>\n          </div>\n          <div id=\"navbar\" class=\"navbar-collapse collapse\">\n            <ul class=\"nav navbar-nav\">\n              <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a href.bind=\"row.href\">${row.title}</a></li>\n            </ul>\n          </div>\n          <!--/.nav-collapse -->\n        </div>\n        <div class=\"col-md-3\">\n          <button style=\"padding-top:1em\" class=\"pull-right btn-link text-warning\" click.trigger=\"login()\"> ${buttonName}</button>\n        </div>\n        <div class=\"col-md-3\" style=\"padding-top:1.2em\">\n          <span> ${user.userName}</span>\n        </div>\n      </div>\n    </div>\n  </nav>\n</template>"; });
define('text!runner.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"codemirror/lib/codemirror.css\"></require>\n\t<require from=\"codemirror/theme/blackboard.css\"></require>\n\t<label for=\"availKatas\">Available Katas: </label>\n\t<select value.bind=\"kataChosen\" class=\"selectpicker\" id=\"availKatas\">\n      <option model.bind=\"null\">Choose...</option>\n      <option repeat.for=\"kata of katas\" model.bind=\"kata\">  ${kata.name} </option>\n</select>\n\t<hr/>\n\t<div class=\"container\" show.bind=\"kataChosen\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-md-12\">\n\t\t\t\t<p>${kataChosen.description}</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-md-6\">\n\t\t\t\t<form><textarea id=\"code\" name=\"code\" ref=\"codeArea\"></textarea></form>\n\t\t\t</div>\n\t\t\t<div class=\"col-md-6\">\n\t\t\t\t<form><textarea id=\"tests\" name=\"tests\" ref=\"testsArea\"></textarea></form>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\" style=\"padding-top:1em\">\n\t\t\t<div class=\"col-md-6\">\n\t\t\t\t<button class=\"btn btn-primary\" click.trigger=\"saveCode()\">Save Code</button>\n\t\t\t</div>\n\t\t\t<div class=\"col-md-6\">\n\t\t\t\t<button class=\"btn btn-primary\">Run Tests</button>\n\t\t\t\t<button class=\"btn btn-secondary\">Save Tests</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n</template>"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template>\r\n\t<header>Project Chyno</header>\r\n\t <ariticle>\r\n\t\t <p>\r\n\t\t This is a testing application based on <a href=\"https://www.codewars.com/dashboard\" > Code Wars site. </a>. Please log in to start learning!\r\n\t\t </p>\r\n\r\n\t </ariticle>\r\n\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map