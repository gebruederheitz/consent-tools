var ghconsent = (function (exports) {
  'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
  }

  function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }

  function _iterableToArray$1(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var check$1 = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$d =
    // eslint-disable-next-line es/no-global-this -- safe
    check$1(typeof globalThis == 'object' && globalThis) ||
    check$1(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check$1(typeof self == 'object' && self) ||
    check$1(typeof commonjsGlobal$1 == 'object' && commonjsGlobal$1) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var fails$8 = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Detect IE8's incomplete defineProperty implementation
  var descriptors$1 = !fails$8(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var $propertyIsEnumerable$2 = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG$1 = getOwnPropertyDescriptor$4 && !$propertyIsEnumerable$2.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$7 = NASHORN_BUG$1 ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$4(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$2;

  var objectPropertyIsEnumerable$1 = {
  	f: f$7
  };

  var createPropertyDescriptor$4 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString$4 = {}.toString;

  var classofRaw$1 = function (it) {
    return toString$4.call(it).slice(8, -1);
  };

  var split$1 = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject$1 = fails$8(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw$1(it) == 'String' ? split$1.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$3 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject$4 = function (it) {
    return indexedObject$1(requireObjectCoercible$3(it));
  };

  // `isCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable = function (argument) {
    return typeof argument === 'function';
  };

  var isObject$9 = function (it) {
    return typeof it === 'object' ? it !== null : isCallable(it);
  };

  var aFunction$3 = function (argument) {
    return isCallable(argument) ? argument : undefined;
  };

  var getBuiltIn$3 = function (namespace, method) {
    return arguments.length < 2 ? aFunction$3(global$d[namespace]) : global$d[namespace] && global$d[namespace][method];
  };

  var engineUserAgent$1 = getBuiltIn$3('navigator', 'userAgent') || '';

  var process$5 = global$d.process;
  var Deno = global$d.Deno;
  var versions$1 = process$5 && process$5.versions || Deno && Deno.version;
  var v8$1 = versions$1 && versions$1.v8;
  var match$1, version$1;

  if (v8$1) {
    match$1 = v8$1.split('.');
    version$1 = match$1[0] < 4 ? 1 : match$1[0] + match$1[1];
  } else if (engineUserAgent$1) {
    match$1 = engineUserAgent$1.match(/Edge\/(\d+)/);
    if (!match$1 || match$1[1] >= 74) {
      match$1 = engineUserAgent$1.match(/Chrome\/(\d+)/);
      if (match$1) version$1 = match$1[1];
    }
  }

  var engineV8Version$1 = version$1 && +version$1;

  /* eslint-disable es/no-symbol -- required for testing */

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol$2 = !!Object.getOwnPropertySymbols && !fails$8(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && engineV8Version$1 && engineV8Version$1 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var useSymbolAsUid$1 = nativeSymbol$2
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var isSymbol$1 = useSymbolAsUid$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$3('Symbol');
    return isCallable($Symbol) && Object(it) instanceof $Symbol;
  };

  var tryToString = function (argument) {
    try {
      return String(argument);
    } catch (error) {
      return 'Object';
    }
  };

  // `Assert: IsCallable(argument) is true`
  var aCallable = function (argument) {
    if (isCallable(argument)) return argument;
    throw TypeError(tryToString(argument) + ' is not a function');
  };

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable(func);
  };

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject$9(val = fn.call(input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject$9(val = fn.call(input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject$9(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var setGlobal$4 = function (key, value) {
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty(global$d, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$d[key] = value;
    } return value;
  };

  var SHARED$1 = '__core-js_shared__';
  var store$5 = global$d[SHARED$1] || setGlobal$4(SHARED$1, {});

  var sharedStore$1 = store$5;

  var shared$4 = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore$1[key] || (sharedStore$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.18.0',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
  });

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$3 = function (argument) {
    return Object(requireObjectCoercible$3(argument));
  };

  var hasOwnProperty$a = {}.hasOwnProperty;

  var has$8 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty$a.call(toObject$3(it), key);
  };

  var id$1 = 0;
  var postfix$1 = Math.random();

  var uid$3 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix$1).toString(36);
  };

  var WellKnownSymbolsStore$2 = shared$4('wks');
  var Symbol$4 = global$d.Symbol;
  var createWellKnownSymbol$1 = useSymbolAsUid$1 ? Symbol$4 : Symbol$4 && Symbol$4.withoutSetter || uid$3;

  var wellKnownSymbol$4 = function (name) {
    if (!has$8(WellKnownSymbolsStore$2, name) || !(nativeSymbol$2 || typeof WellKnownSymbolsStore$2[name] == 'string')) {
      if (nativeSymbol$2 && has$8(Symbol$4, name)) {
        WellKnownSymbolsStore$2[name] = Symbol$4[name];
      } else {
        WellKnownSymbolsStore$2[name] = createWellKnownSymbol$1('Symbol.' + name);
      }
    } return WellKnownSymbolsStore$2[name];
  };

  var TO_PRIMITIVE$1 = wellKnownSymbol$4('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$4 = function (input, pref) {
    if (!isObject$9(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE$1);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = exoticToPrim.call(input, pref);
      if (!isObject$9(result) || isSymbol$1(result)) return result;
      throw TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey = function (argument) {
    var key = toPrimitive$4(argument, 'string');
    return isSymbol$1(key) ? key : String(key);
  };

  var document$3 = global$d.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$2 = isObject$9(document$3) && isObject$9(document$3.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS$2 ? document$3.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine$1 = !descriptors$1 && !fails$8(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(documentCreateElement$1('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$6 = descriptors$1 ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$4(O);
    P = toPropertyKey(P);
    if (ie8DomDefine$1) try {
      return $getOwnPropertyDescriptor$2(O, P);
    } catch (error) { /* empty */ }
    if (has$8(O, P)) return createPropertyDescriptor$4(!objectPropertyIsEnumerable$1.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor$1 = {
  	f: f$6
  };

  // `Assert: Type(argument) is Object`
  var anObject$3 = function (argument) {
    if (isObject$9(argument)) return argument;
    throw TypeError(String(argument) + ' is not an object');
  };

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty$2 = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$5 = descriptors$1 ? $defineProperty$2 : function defineProperty(O, P, Attributes) {
    anObject$3(O);
    P = toPropertyKey(P);
    anObject$3(Attributes);
    if (ie8DomDefine$1) try {
      return $defineProperty$2(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty$1 = {
  	f: f$5
  };

  var createNonEnumerableProperty$5 = descriptors$1 ? function (object, key, value) {
    return objectDefineProperty$1.f(object, key, createPropertyDescriptor$4(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var functionToString$1 = Function.toString;

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable(sharedStore$1.inspectSource)) {
    sharedStore$1.inspectSource = function (it) {
      return functionToString$1.call(it);
    };
  }

  var inspectSource$3 = sharedStore$1.inspectSource;

  var WeakMap$3 = global$d.WeakMap;

  var nativeWeakMap$1 = isCallable(WeakMap$3) && /native code/.test(inspectSource$3(WeakMap$3));

  var keys$2 = shared$4('keys');

  var sharedKey$2 = function (key) {
    return keys$2[key] || (keys$2[key] = uid$3(key));
  };

  var hiddenKeys$5 = {};

  var OBJECT_ALREADY_INITIALIZED$1 = 'Object already initialized';
  var WeakMap$2 = global$d.WeakMap;
  var set$2, get$1, has$7;

  var enforce$1 = function (it) {
    return has$7(it) ? get$1(it) : set$2(it, {});
  };

  var getterFor$1 = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$9(it) || (state = get$1(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap$1 || sharedStore$1.state) {
    var store$4 = sharedStore$1.state || (sharedStore$1.state = new WeakMap$2());
    var wmget$1 = store$4.get;
    var wmhas$1 = store$4.has;
    var wmset$1 = store$4.set;
    set$2 = function (it, metadata) {
      if (wmhas$1.call(store$4, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED$1);
      metadata.facade = it;
      wmset$1.call(store$4, it, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return wmget$1.call(store$4, it) || {};
    };
    has$7 = function (it) {
      return wmhas$1.call(store$4, it);
    };
  } else {
    var STATE$1 = sharedKey$2('state');
    hiddenKeys$5[STATE$1] = true;
    set$2 = function (it, metadata) {
      if (has$8(it, STATE$1)) throw new TypeError(OBJECT_ALREADY_INITIALIZED$1);
      metadata.facade = it;
      createNonEnumerableProperty$5(it, STATE$1, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return has$8(it, STATE$1) ? it[STATE$1] : {};
    };
    has$7 = function (it) {
      return has$8(it, STATE$1);
    };
  }

  var internalState$1 = {
    set: set$2,
    get: get$1,
    has: has$7,
    enforce: enforce$1,
    getterFor: getterFor$1
  };

  var FunctionPrototype = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = descriptors$1 && Object.getOwnPropertyDescriptor;

  var EXISTS$1 = has$8(FunctionPrototype, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS$1 && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS$1 && (!descriptors$1 || (descriptors$1 && getDescriptor(FunctionPrototype, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS$1,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var redefine$2 = createCommonjsModule(function (module) {
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

  var getInternalState = internalState$1.get;
  var enforceInternalState = internalState$1.enforce;
  var TEMPLATE = String(String).split('String');

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;
    if (isCallable(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }
      if (!has$8(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
        createNonEnumerableProperty$5(value, 'name', name);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }
    if (O === global$d) {
      if (simple) O[key] = value;
      else setGlobal$4(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$5(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable(this) && getInternalState(this).source || inspectSource$3(this);
  });
  });

  var ceil$1 = Math.ceil;
  var floor$2 = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger$3 = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$2 : ceil$1)(argument);
  };

  var min$4 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$3 = function (argument) {
    return argument > 0 ? min$4(toInteger$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max$2 = Math.max;
  var min$3 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$2 = function (index, length) {
    var integer = toInteger$3(index);
    return integer < 0 ? max$2(integer + length, 0) : min$3(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$3 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$4($this);
      var length = toLength$3(O.length);
      var index = toAbsoluteIndex$2(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes$1 = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$3(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$3(false)
  };

  var indexOf$1 = arrayIncludes$1.indexOf;


  var objectKeysInternal$1 = function (object, names) {
    var O = toIndexedObject$4(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has$8(hiddenKeys$5, key) && has$8(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has$8(O, key = names[i++])) {
      ~indexOf$1(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$2 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$4 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal$1(O, hiddenKeys$4);
  };

  var objectGetOwnPropertyNames$1 = {
  	f: f$4
  };

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  var f$3 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols$1 = {
  	f: f$3
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys$2 = getBuiltIn$3('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames$1.f(anObject$3(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols$1.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties$2 = function (target, source) {
    var keys = ownKeys$2(source);
    var defineProperty = objectDefineProperty$1.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has$8(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement$1 = /#|\.prototype\./;

  var isForced$2 = function (feature, detection) {
    var value = data$1[normalize$1(feature)];
    return value == POLYFILL$1 ? true
      : value == NATIVE$1 ? false
      : isCallable(detection) ? fails$8(detection)
      : !!detection;
  };

  var normalize$1 = isForced$2.normalize = function (string) {
    return String(string).replace(replacement$1, '.').toLowerCase();
  };

  var data$1 = isForced$2.data = {};
  var NATIVE$1 = isForced$2.NATIVE = 'N';
  var POLYFILL$1 = isForced$2.POLYFILL = 'P';

  var isForced_1$1 = isForced$2;

  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor$1.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */
  var _export$1 = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$d;
    } else if (STATIC) {
      target = global$d[TARGET] || setGlobal$4(TARGET, {});
    } else {
      target = (global$d[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$3(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties$2(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$5(sourceProperty, 'sham', true);
      }
      // extend global
      redefine$2(target, key, sourceProperty, options);
    }
  };

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aCallable(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$5 = Array.isArray || function isArray(argument) {
    return classofRaw$1(argument) == 'Array';
  };

  var TO_STRING_TAG$2 = wellKnownSymbol$4('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$1 = wellKnownSymbol$4('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$2 = toStringTagSupport ? classofRaw$1 : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw$1(O)
      // ES3 arguments fallback
      : (result = classofRaw$1(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
  };

  var empty = [];
  var construct$2 = getBuiltIn$3('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = constructorRegExp.exec;
  var INCORRECT_TO_STRING = !constructorRegExp.exec(function () { /* empty */ });

  var isConstructorModern = function (argument) {
    if (!isCallable(argument)) return false;
    try {
      construct$2(Object, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function (argument) {
    if (!isCallable(argument)) return false;
    switch (classof$2(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
      // we can't check .prototype since constructors produced by .bind haven't it
    } return INCORRECT_TO_STRING || !!exec.call(constructorRegExp, inspectSource$3(argument));
  };

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor = !construct$2 || fails$8(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var SPECIES$6 = wellKnownSymbol$4('species');

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor = function (originalArray) {
    var C;
    if (isArray$5(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor(C) && (C === Array || isArray$5(C.prototype))) C = undefined;
      else if (isObject$9(C)) {
        C = C[SPECIES$6];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array : C;
  };

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$2 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$2 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$3($this);
      var self = indexedObject$1(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength$3(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$2;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push.call(target, value); // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$2(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$2(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$2(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$2(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$2(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$2(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$2(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$2(7)
  };

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$8(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var $forEach$1 = arrayIteration.forEach;


  var STRICT_METHOD = arrayMethodIsStrict('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
    return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  _export$1({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
    forEach: arrayForEach
  });

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`


  var classList = documentCreateElement$1('span').classList;
  var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

  var domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
      createNonEnumerableProperty$5(CollectionPrototype, 'forEach', arrayForEach);
    } catch (error) {
      CollectionPrototype.forEach = arrayForEach;
    }
  };

  for (var COLLECTION_NAME in domIterables) {
    handlePrototype(global$d[COLLECTION_NAME] && global$d[COLLECTION_NAME].prototype);
  }

  handlePrototype(domTokenListPrototype);

  var slice$2 = [].slice;
  var factories$1 = {};

  var construct$1 = function (C, argsLength, args) {
    if (!(argsLength in factories$1)) {
      for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
      // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
      factories$1[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
    } return factories$1[argsLength](C, args);
  };

  // `Function.prototype.bind` method implementation
  // https://tc39.es/ecma262/#sec-function.prototype.bind
  var functionBind$1 = Function.bind || function bind(that /* , ...args */) {
    var fn = aCallable(this);
    var partArgs = slice$2.call(arguments, 1);
    var boundFunction = function bound(/* args... */) {
      var args = partArgs.concat(slice$2.call(arguments));
      return this instanceof boundFunction ? construct$1(fn, args.length, args) : fn.apply(that, args);
    };
    if (isObject$9(fn.prototype)) boundFunction.prototype = fn.prototype;
    return boundFunction;
  };

  // `Function.prototype.bind` method
  // https://tc39.es/ecma262/#sec-function.prototype.bind
  _export$1({ target: 'Function', proto: true }, {
    bind: functionBind$1
  });

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new ListCache;
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  var freeGlobal$1 = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal$1 || freeSelf || Function('return this')();

  var root$1 = root;

  /** Built-in value references. */
  var Symbol$2 = root$1.Symbol;

  var Symbol$3 = Symbol$2;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$a.toString;

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$9.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$9.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = Symbol$3 ? Symbol$3.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? getRawTag(value)
      : objectToString$1(value);
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject$8(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag$1 = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject$8(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root$1['__core-js_shared__'];

  var coreJsData$1 = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$8 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$8.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$8).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject$8(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /* Built-in method references that are verified to be native. */
  var Map = getNative(root$1, 'Map');

  var Map$1 = Map;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = getNative(Object, 'create');

  var nativeCreate$1 = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$7.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate$1) {
      var result = data[key];
      return result === HASH_UNDEFINED$1 ? undefined : result;
    }
    return hasOwnProperty$7.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$6.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$6.call(data, key);
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (nativeCreate$1 && value === undefined) ? HASH_UNDEFINED : value;
    return this;
  }

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map$1 || ListCache),
      'string': new Hash
    };
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

  var defineProperty$5 = (function() {
    try {
      var func = getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var defineProperty$6 = defineProperty$5;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && defineProperty$6) {
      defineProperty$6(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq(object[key], value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor();

  var baseFor$1 = baseFor;

  /** Detect free variable `exports`. */
  var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

  /** Built-in value references. */
  var Buffer$1 = moduleExports$2 ? root$1.Buffer : undefined,
      allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  /** Built-in value references. */
  var Uint8Array = root$1.Uint8Array;

  var Uint8Array$1 = Uint8Array;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
    return result;
  }

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  /** Built-in value references. */
  var objectCreate$1 = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject$8(proto)) {
        return {};
      }
      if (objectCreate$1) {
        return objectCreate$1(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var baseCreate$1 = baseCreate;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /** Built-in value references. */
  var getPrototype = overArg(Object.getPrototypeOf, Object);

  var getPrototype$1 = getPrototype;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

    return value === proto;
  }

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !isPrototype(object))
      ? baseCreate$1(getPrototype$1(object))
      : {};
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$1;
  }

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$4.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$5.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments$1 = isArguments;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray$3 = Array.isArray;

  var isArray$4 = isArray$3;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$3 = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$3;
  }

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  /** Detect free variable `exports`. */
  var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

  /** Built-in value references. */
  var Buffer = moduleExports$1 ? root$1.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;

  var isBuffer$1 = isBuffer;

  /** `Object#toString` result references. */
  var objectTag$1 = '[object Object]';

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto$3 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$3.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag$1) {
      return false;
    }
    var proto = getPrototype$1(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$4.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike(value) &&
      isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal$1.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  var nodeUtil$1 = nodeUtil;

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  var isTypedArray$1 = isTypedArray;

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$2.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$3.call(object, key) && eq(objValue, value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$2 = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$2 : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$1.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray$4(value),
        isArg = !isArr && isArguments$1(value),
        isBuff = !isArr && !isArg && isBuffer$1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$2.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject$8(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$1.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key),
        srcValue = safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray$4(srcValue),
          isBuff = !isArr && isBuffer$1(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray$4(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject(srcValue) || isArguments$1(srcValue)) {
        newValue = objValue;
        if (isArguments$1(objValue)) {
          newValue = toPlainObject(objValue);
        }
        else if (!isObject$8(objValue) || isFunction(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor$1(source, function(srcValue, key) {
      stack || (stack = new Stack);
      if (isObject$8(srcValue)) {
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      }
      else {
        var newValue = customizer
          ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !defineProperty$6 ? identity : function(func, string) {
    return defineProperty$6(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(string),
      'writable': true
    });
  };

  var baseSetToString$1 = baseSetToString;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = shortOut(baseSetToString$1);

  var setToString$1 = setToString;

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return setToString$1(overRest(func, start, identity), func + '');
  }

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject$8(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
          ? (isArrayLike(object) && isIndex(index, object.length))
          : (type == 'string' && index in object)
        ) {
      return eq(object[index], value);
    }
    return false;
  }

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = (assigner.length > 3 && typeof customizer == 'function')
        ? (length--, customizer)
        : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  /**
   * This method is like `_.assign` except that it recursively merges own and
   * inherited enumerable string keyed properties of source objects into the
   * destination object. Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * _.merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */
  var merge = createAssigner(function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });

  var _merge = merge;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike(value) && baseGetTag(value) == symbolTag);
  }

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray$4(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache);
    return memoized;
  }

  // Expose `MapCache`.
  memoize.Cache = MapCache;

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  var stringToPath$1 = stringToPath;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = Symbol$3 ? Symbol$3.prototype : undefined,
      symbolToString$1 = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray$4(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return arrayMap(value, baseToString) + '';
    }
    if (isSymbol(value)) {
      return symbolToString$1 ? symbolToString$1.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
  }

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString$3(value) {
    return value == null ? '' : baseToString(value);
  }

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray$4(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath$1(toString$3(value));
  }

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = castPath(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  /**
   * The base implementation of `_.set`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */
  function baseSet(object, path, value, customizer) {
    if (!isObject$8(object)) {
      return object;
    }
    path = castPath(path, object);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = toKey(path[index]),
          newValue = value;

      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return object;
      }

      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = isObject$8(objValue)
            ? objValue
            : (isIndex(path[index + 1]) ? [] : {});
        }
      }
      assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }

  /**
   * The base implementation of  `_.pickBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} paths The property paths to pick.
   * @param {Function} predicate The function invoked per property.
   * @returns {Object} Returns the new object.
   */
  function basePickBy(object, paths, predicate) {
    var index = -1,
        length = paths.length,
        result = {};

    while (++index < length) {
      var path = paths[index],
          value = baseGet(object, path);

      if (predicate(value, path)) {
        baseSet(result, castPath(path, object), value);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = castPath(path, object);

    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) &&
      (isArray$4(object) || isArguments$1(object));
  }

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */
  function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }

  /**
   * The base implementation of `_.pick` without support for individual
   * property identifiers.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} paths The property paths to pick.
   * @returns {Object} Returns the new object.
   */
  function basePick(object, paths) {
    return basePickBy(object, paths, function(value, path) {
      return hasIn(object, path);
    });
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /** Built-in value references. */
  var spreadableSymbol = Symbol$3 ? Symbol$3.isConcatSpreadable : undefined;

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable(value) {
    return isArray$4(value) || isArguments$1(value) ||
      !!(spreadableSymbol && value && value[spreadableSymbol]);
  }

  /**
   * The base implementation of `_.flatten` with support for restricting flattening.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {number} depth The maximum recursion depth.
   * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
   * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
   * @param {Array} [result=[]] The initial result value.
   * @returns {Array} Returns the new flattened array.
   */
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1,
        length = array.length;

    predicate || (predicate = isFlattenable);
    result || (result = []);

    while (++index < length) {
      var value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }

  /**
   * Flattens `array` a single level deep.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2, [3, [4]], 5]]);
   * // => [1, 2, [3, [4]], 5]
   */
  function flatten(array) {
    var length = array == null ? 0 : array.length;
    return length ? baseFlatten(array, 1) : [];
  }

  /**
   * A specialized version of `baseRest` which flattens the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @returns {Function} Returns the new function.
   */
  function flatRest(func) {
    return setToString$1(overRest(func, undefined, flatten), func + '');
  }

  /**
   * Creates an object composed of the picked `object` properties.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {...(string|string[])} [paths] The property paths to pick.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * _.pick(object, ['a', 'c']);
   * // => { 'a': 1, 'c': 3 }
   */
  var pick = flatRest(function(object, paths) {
    return object == null ? {} : basePick(object, paths);
  });

  var _pick = pick;

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * @param {object}    options
   * @param {string}    options.type
   * @param {string[]}  options.classNames
   * @param {object}    options.attributes
   * @param {Element}   options.parent
   * @param {?string}   options.innerHtml
   * @param {?string}   options.innerText
   * @return {HTMLElement}
   */
  var createDomElement = function createDomElement(_ref) {
    var _ref$type = _ref.type,
        type = _ref$type === void 0 ? 'DIV' : _ref$type,
        _ref$classNames = _ref.classNames,
        classNames = _ref$classNames === void 0 ? [] : _ref$classNames,
        _ref$attributes = _ref.attributes,
        attributes = _ref$attributes === void 0 ? {} : _ref$attributes,
        parent = _ref.parent,
        _ref$innerHtml = _ref.innerHtml,
        innerHtml = _ref$innerHtml === void 0 ? null : _ref$innerHtml,
        _ref$innerText = _ref.innerText,
        innerText = _ref$innerText === void 0 ? null : _ref$innerText;
    var element = document.createElement(type);

    if (classNames && classNames.length) {
      var _element$classList;

      (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(classNames));
    }

    for (var attributeName in attributes) {
      element.setAttribute(attributeName, attributes[attributeName]);
    }

    if (innerHtml) {
      element.innerHTML = innerHtml;
    }

    if (innerText) {
      element.innerText = innerText;
    }

    if (parent) {
      parent.appendChild(element);
    }

    return element;
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$c =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$7 = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$6 = fails$7;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$6(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$1(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$1;

  var createPropertyDescriptor$3 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString$2 = {}.toString;

  var classofRaw = function (it) {
    return toString$2.call(it).slice(8, -1);
  };

  var fails$5 = fails$7;
  var classof$1 = classofRaw;

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$5(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$1(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$2 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject = indexedObject;
  var requireObjectCoercible$1 = requireObjectCoercible$2;

  var toIndexedObject$3 = function (it) {
    return IndexedObject(requireObjectCoercible$1(it));
  };

  var isObject$7 = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var isObject$6 = isObject$7;

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive$3 = function (input, PREFERRED_STRING) {
    if (!isObject$6(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$6(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject$6(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$6(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var requireObjectCoercible = requireObjectCoercible$2;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$2 = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var toObject$1 = toObject$2;

  var hasOwnProperty = {}.hasOwnProperty;

  var has$6 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$1(it), key);
  };

  var global$b = global$c;
  var isObject$5 = isObject$7;

  var document$1$1 = global$b.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$5(document$1$1) && isObject$5(document$1$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1$1.createElement(it) : {};
  };

  var DESCRIPTORS$3 = descriptors;
  var fails$4 = fails$7;
  var createElement = documentCreateElement;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$3 && !fails$4(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$2 = descriptors;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$2 = createPropertyDescriptor$3;
  var toIndexedObject$2 = toIndexedObject$3;
  var toPrimitive$2 = toPrimitive$3;
  var has$5 = has$6;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$2 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$2(O);
    P = toPrimitive$2(P, true);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (has$5(O, P)) return createPropertyDescriptor$2(!propertyIsEnumerableModule.f.call(O, P), O[P]);
  };

  var objectDefineProperty = {};

  var isObject$4 = isObject$7;

  var anObject$2 = function (it) {
    if (!isObject$4(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var DESCRIPTORS$1 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var anObject$1 = anObject$2;
  var toPrimitive$1 = toPrimitive$3;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty$1 = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$1 ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$1(O);
    P = toPrimitive$1(P, true);
    anObject$1(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS = descriptors;
  var definePropertyModule$2 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$3;

  var createNonEnumerableProperty$4 = DESCRIPTORS ? function (object, key, value) {
    return definePropertyModule$2.f(object, key, createPropertyDescriptor$1(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$1 = {exports: {}};

  var global$a = global$c;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$4;

  var setGlobal$3 = function (key, value) {
    try {
      createNonEnumerableProperty$3(global$a, key, value);
    } catch (error) {
      global$a[key] = value;
    } return value;
  };

  var global$9 = global$c;
  var setGlobal$2 = setGlobal$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$9[SHARED] || setGlobal$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  var functionToString = Function.toString;

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof store$2.inspectSource != 'function') {
    store$2.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$2 = store$2.inspectSource;

  var global$8 = global$c;
  var inspectSource$1 = inspectSource$2;

  var WeakMap$1 = global$8.WeakMap;

  var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$1(WeakMap$1));

  var shared$3 = {exports: {}};

  var store$1 = sharedStore;

  (shared$3.exports = function (key, value) {
    return store$1[key] || (store$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.15.2',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var id = 0;
  var postfix = Math.random();

  var uid$2 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var shared$2 = shared$3.exports;
  var uid$1 = uid$2;

  var keys$1 = shared$2('keys');

  var sharedKey$1 = function (key) {
    return keys$1[key] || (keys$1[key] = uid$1(key));
  };

  var hiddenKeys$3 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$7 = global$c;
  var isObject$3 = isObject$7;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$4;
  var objectHas = has$6;
  var shared$1 = sharedStore;
  var sharedKey = sharedKey$1;
  var hiddenKeys$2 = hiddenKeys$3;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap = global$7.WeakMap;
  var set$1, get, has$4;

  var enforce = function (it) {
    return has$4(it) ? get(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$1.state) {
    var store = shared$1.state || (shared$1.state = new WeakMap());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set$1 = function (it, metadata) {
      if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has$4 = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys$2[STATE] = true;
    set$1 = function (it, metadata) {
      if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$2(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return objectHas(it, STATE) ? it[STATE] : {};
    };
    has$4 = function (it) {
      return objectHas(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get,
    has: has$4,
    enforce: enforce,
    getterFor: getterFor
  };

  var global$6 = global$c;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$4;
  var has$3 = has$6;
  var setGlobal$1 = setGlobal$3;
  var inspectSource = inspectSource$2;
  var InternalStateModule = internalState;

  var getInternalState$3 = InternalStateModule.get;
  var enforceInternalState$1 = InternalStateModule.enforce;
  var TEMPLATE = String(String).split('String');

  (redefine$1.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$3(value, 'name')) {
        createNonEnumerableProperty$1(value, 'name', key);
      }
      state = enforceInternalState$1(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }
    if (O === global$6) {
      if (simple) O[key] = value;
      else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$1(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState$3(this).source || inspectSource(this);
  });

  var global$5 = global$c;

  var path$1 = global$5;

  var path$2 = path$1;
  var global$4 = global$c;

  var aFunction$2 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$2 = function (namespace, method) {
    return arguments.length < 2 ? aFunction$2(path$2[namespace]) || aFunction$2(global$4[namespace])
      : path$2[namespace] && path$2[namespace][method] || global$4[namespace] && global$4[namespace][method];
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$1 = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger$2 = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
  };

  var toInteger$1 = toInteger$2;

  var min$1 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$2 = function (argument) {
    return argument > 0 ? min$1(toInteger$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toInteger = toInteger$2;

  var max$1 = Math.max;
  var min$2 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$1 = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
  };

  var toIndexedObject$1 = toIndexedObject$3;
  var toLength$1 = toLength$2;
  var toAbsoluteIndex = toAbsoluteIndex$1;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$1 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$1($this);
      var length = toLength$1(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$1(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$1(false)
  };

  var has$2 = has$6;
  var toIndexedObject = toIndexedObject$3;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$1 = hiddenKeys$3;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has$2(hiddenKeys$1, key) && has$2(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has$2(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$1 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys = enumBugKeys$1;

  var hiddenKeys = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$1 = getBuiltIn$2;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject = anObject$2;

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var has$1 = has$6;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$1 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$1.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has$1(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$3 = fails$7;

  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails$3(detection)
      : !!detection;
  };

  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';

  var isForced_1 = isForced$1;

  var global$3 = global$c;
  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty = createNonEnumerableProperty$4;
  var redefine = redefine$1.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced = isForced_1;

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$3;
    } else if (STATIC) {
      target = global$3[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$3[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$2(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  var aFunction = aFunction$1;
  var isObject$2 = isObject$7;

  var slice$1 = [].slice;
  var factories = {};

  var construct = function (C, argsLength, args) {
    if (!(argsLength in factories)) {
      for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
      // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
      factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
    } return factories[argsLength](C, args);
  };

  // `Function.prototype.bind` method implementation
  // https://tc39.es/ecma262/#sec-function.prototype.bind
  var functionBind = Function.bind || function bind(that /* , ...args */) {
    var fn = aFunction(this);
    var partArgs = slice$1.call(arguments, 1);
    var boundFunction = function bound(/* args... */) {
      var args = partArgs.concat(slice$1.call(arguments));
      return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
    };
    if (isObject$2(fn.prototype)) boundFunction.prototype = fn.prototype;
    return boundFunction;
  };

  var $$2 = _export;
  var bind$1 = functionBind;

  // `Function.prototype.bind` method
  // https://tc39.es/ecma262/#sec-function.prototype.bind
  $$2({ target: 'Function', proto: true }, {
    bind: bind$1
  });

  var classof = classofRaw;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$2 = Array.isArray || function isArray(arg) {
    return classof(arg) == 'Array';
  };

  var toPrimitive = toPrimitive$3;
  var definePropertyModule = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$3;

  var createProperty$1 = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var getBuiltIn = getBuiltIn$2;

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var global$2 = global$c;
  var userAgent = engineUserAgent;

  var process$4 = global$2.process;
  var versions = process$4 && process$4.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] < 4 ? 1 : match[0] + match[1];
  } else if (userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  /* eslint-disable es/no-symbol -- required for testing */

  var V8_VERSION$2 = engineV8Version;
  var fails$2 = fails$7;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol$1 = !!Object.getOwnPropertySymbols && !fails$2(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = nativeSymbol$1;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var global$1 = global$c;
  var shared = shared$3.exports;
  var has = has$6;
  var uid = uid$2;
  var NATIVE_SYMBOL = nativeSymbol$1;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var WellKnownSymbolsStore$1 = shared('wks');
  var Symbol$1 = global$1.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol$3 = function (name) {
    if (!has(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      if (NATIVE_SYMBOL && has(Symbol$1, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
      }
    } return WellKnownSymbolsStore$1[name];
  };

  var isObject$1 = isObject$7;
  var isArray$1 = isArray$2;
  var wellKnownSymbol$2 = wellKnownSymbol$3;

  var SPECIES$1$1 = wellKnownSymbol$2('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$1 = function (originalArray, length) {
    var C;
    if (isArray$1(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray$1(C.prototype))) C = undefined;
      else if (isObject$1(C)) {
        C = C[SPECIES$1$1];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var fails$1 = fails$7;
  var wellKnownSymbol$1 = wellKnownSymbol$3;
  var V8_VERSION$1 = engineV8Version;

  var SPECIES$5 = wellKnownSymbol$1('species');

  var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$1(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$5] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$1 = _export;
  var fails = fails$7;
  var isArray = isArray$2;
  var isObject = isObject$7;
  var toObject = toObject$2;
  var toLength = toLength$2;
  var createProperty$2 = createProperty$1;
  var arraySpeciesCreate = arraySpeciesCreate$1;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$1;
  var wellKnownSymbol = wellKnownSymbol$3;
  var V8_VERSION = engineV8Version;

  var IS_CONCAT_SPREADABLE$1 = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED$1 = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT$1 = V8_VERSION >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE$1] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('concat');

  var isConcatSpreadable$1 = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE$1];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT$1 || !SPECIES_SUPPORT$1;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $$1({ target: 'Array', proto: true, forced: FORCED$2 }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable$1(E)) {
          len = toLength(E.length);
          if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED$1);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty$2(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED$1);
          createProperty$2(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var Debuggable = /*#__PURE__*/function () {
    function Debuggable() {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      _classCallCheck(this, Debuggable);

      this.prefix = prefix;
      this.globalJsDebug = Debuggable.prototype.globalJsDebug;
    }

    _createClass(Debuggable, [{
      key: "debug",
      get: function get() {
        var _this$options;

        if (this.globalJsDebug || (this === null || this === void 0 ? void 0 : (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.debug) === true) {
          if (this.prefix) {
            return {
              log: this._wrappedLog.bind(this),
              warn: this._wrappedWarn.bind(this),
              error: this._wrappedError.bind(this)
            };
          } else {
            return console;
          }
        } else {
          return {
            log: function log() {},
            warn: function warn() {},
            error: function error() {}
          };
        }
      }
    }, {
      key: "_wrappedLog",
      value: function _wrappedLog() {
        var _console;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_console = console).log.apply(_console, ["[".concat(this.prefix, "]")].concat(args));
      }
    }, {
      key: "_wrappedWarn",
      value: function _wrappedWarn() {
        var _console2;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        (_console2 = console).warn.apply(_console2, ["[".concat(this.prefix, "]")].concat(args));
      }
    }, {
      key: "_wrappedError",
      value: function _wrappedError() {
        var _console3;

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        (_console3 = console).error.apply(_console3, ["[".concat(this.prefix, "]")].concat(args));
      }
      /**
       * Toggle global JS debug output on or off.
       *
       * @param {boolean} toggle
       */

    }, {
      key: "setGlobalDebug",
      value: function setGlobalDebug(toggle) {
        Debuggable.prototype.globalJsDebug = toggle;
      }
    }]);

    return Debuggable;
  }();
  Debuggable.prototype.globalJsDebug = false;

  var $ = function $() {
    var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.document;
    return function () {
      if (typeof parent.querySelector !== 'undefined') {
        var _parent$querySelector;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_parent$querySelector = parent.querySelector).call.apply(_parent$querySelector, [parent].concat(args));
      }
    };
  };
  var $$ = function $$() {
    var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.document;
    return function () {
      if (typeof parent.querySelectorAll !== 'undefined') {
        var _parent$querySelector2;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return (_parent$querySelector2 = parent.querySelectorAll).call.apply(_parent$querySelector2, [parent].concat(args));
      }
    };
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) objectDefineProperty$1.f(object, propertyKey, createPropertyDescriptor$4(0, value));
    else object[propertyKey] = value;
  };

  var SPECIES$4 = wellKnownSymbol$4('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version$1 >= 51 || !fails$8(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$4] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var IS_CONCAT_SPREADABLE = wellKnownSymbol$4('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version$1 >= 51 || !fails$8(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject$9(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray$5(O);
  };

  var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export$1({ target: 'Array', proto: true, forced: FORCED$1 }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$3(this);
      var A = arraySpeciesCreate$2(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength$3(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  createCommonjsModule(function (module) {
  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    define(Gp, toStringTagSymbol, "Generator");

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
      return this;
    });

    define(Gp, "toString", function() {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
  });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal$1(O, enumBugKeys$2);
  };

  // eslint-disable-next-line es/no-object-assign -- safe
  var $assign = Object.assign;
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  var defineProperty$4 = Object.defineProperty;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign = !$assign || fails$8(function () {
    // should have correct order of operations (Edge bug)
    if (descriptors$1 && $assign({ b: 1 }, $assign(defineProperty$4({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$4(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), { b: 2 })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es/no-symbol -- safe
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject$3(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols$1.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable$1.f;
    while (argumentsLength > index) {
      var S = indexedObject$1(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!descriptors$1 || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    } return T;
  } : $assign;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es/no-object-assign -- required for testing
  _export$1({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
    assign: objectAssign
  });

  var Usercentrics = /*#__PURE__*/function () {
    function Usercentrics() {
      _classCallCheck$1(this, Usercentrics);
    }

    _createClass$1(Usercentrics, null, [{
      key: "listen",
      value: function listen() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (selector) {
          var triggers = $$()(selector);
          triggers.forEach(function (trigger) {
            trigger.addEventListener('click', Usercentrics.onClick, true);
          });
        }
      }
    }, {
      key: "load",
      value: function load(type) {
        var _embedsConfig$types$t;

        var embedsConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        {
          console.log('Loading UC service', type);
        }

        var templateId = (_embedsConfig$types$t = embedsConfig.types[type]) === null || _embedsConfig$types$t === void 0 ? void 0 : _embedsConfig$types$t.ucTemplateId;

        if (templateId && window.UC_UI) {
          window.UC_UI.acceptService(templateId);
        }
      }
    }, {
      key: "onClick",
      value: function onClick(e) {
        var _window$UC_UI;

        e.preventDefault();
        (_window$UC_UI = window.UC_UI) === null || _window$UC_UI === void 0 ? void 0 : _window$UC_UI.showSecondLayer();
      }
    }, {
      key: "showModalAtService",
      value: function showModalAtService(serviceName) {
        var _embedsConfig$types$s;

        var embedsConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        {
          console.log('Opening modal at service', serviceName);
        }

        var templateId = (_embedsConfig$types$s = embedsConfig.types[serviceName]) === null || _embedsConfig$types$s === void 0 ? void 0 : _embedsConfig$types$s.ucTemplateId;

        if (templateId && window.UC_UI) {
          var _window$UC_UI2;

          (_window$UC_UI2 = window.UC_UI) === null || _window$UC_UI2 === void 0 ? void 0 : _window$UC_UI2.showSecondLayer(templateId);
        }
      }
    }]);

    return Usercentrics;
  }();

  var toString$1 = function (argument) {
    if (classof$2(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String(argument);
  };

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = descriptors$1 ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$3(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty$1.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html = getBuiltIn$3('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */

  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey$2('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement$1('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys$2.length;
    while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$2[length]];
    return NullProtoObject();
  };

  hiddenKeys$5[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject$3(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  /* eslint-disable es/no-object-getownpropertynames -- safe */

  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames$1.f;

  var toString = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return windowNames.slice();
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var f$2 = function getOwnPropertyNames(it) {
    return windowNames && toString.call(it) == '[object Window]'
      ? getWindowNames(it)
      : $getOwnPropertyNames$1(toIndexedObject$4(it));
  };

  var objectGetOwnPropertyNamesExternal = {
  	f: f$2
  };

  var f$1 = wellKnownSymbol$4;

  var wellKnownSymbolWrapped = {
  	f: f$1
  };

  var path = global$d;

  var defineProperty$3 = objectDefineProperty$1.f;

  var defineWellKnownSymbol = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!has$8(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
      value: wellKnownSymbolWrapped.f(NAME)
    });
  };

  var defineProperty$2 = objectDefineProperty$1.f;



  var TO_STRING_TAG = wellKnownSymbol$4('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has$8(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
      defineProperty$2(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var $forEach = arrayIteration.forEach;

  var HIDDEN = sharedKey$2('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol$4('toPrimitive');
  var setInternalState$1 = internalState$1.set;
  var getInternalState$2 = internalState$1.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$d.Symbol;
  var $stringify = getBuiltIn$3('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;
  var nativeDefineProperty = objectDefineProperty$1.f;
  var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = objectPropertyIsEnumerable$1.f;
  var AllSymbols = shared$4('symbols');
  var ObjectPrototypeSymbols = shared$4('op-symbols');
  var StringToSymbolRegistry = shared$4('string-to-symbol-registry');
  var SymbolToStringRegistry = shared$4('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared$4('wks');
  var QObject = global$d.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = descriptors$1 && fails$8(function () {
    return objectCreate(nativeDefineProperty({}, 'a', {
      get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
    nativeDefineProperty(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
      nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty;

  var wrap$1 = function (tag, description) {
    var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE]);
    setInternalState$1(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!descriptors$1) symbol.description = description;
    return symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject$3(O);
    var key = toPropertyKey(P);
    anObject$3(Attributes);
    if (has$8(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has$8(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$4(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has$8(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor$4(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject$3(O);
    var properties = toIndexedObject$4(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys, function (key) {
      if (!descriptors$1 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPropertyKey(V);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (this === ObjectPrototype && has$8(AllSymbols, P) && !has$8(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has$8(this, P) || !has$8(AllSymbols, P) || has$8(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject$4(O);
    var key = toPropertyKey(P);
    if (it === ObjectPrototype && has$8(AllSymbols, key) && !has$8(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);
    if (descriptor && has$8(AllSymbols, key) && !(has$8(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject$4(O));
    var result = [];
    $forEach(names, function (key) {
      if (!has$8(AllSymbols, key) && !has$8(hiddenKeys$5, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$4(O));
    var result = [];
    $forEach(names, function (key) {
      if (has$8(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$8(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if (!nativeSymbol$2) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : toString$1(arguments[0]);
      var tag = uid$3(description);
      var setter = function (value) {
        if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
        if (has$8(this, HIDDEN) && has$8(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor$4(1, value));
      };
      if (descriptors$1 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
      return wrap$1(tag, description);
    };

    redefine$2($Symbol[PROTOTYPE], 'toString', function toString() {
      return getInternalState$2(this).tag;
    });

    redefine$2($Symbol, 'withoutSetter', function (description) {
      return wrap$1(uid$3(description), description);
    });

    objectPropertyIsEnumerable$1.f = $propertyIsEnumerable;
    objectDefineProperty$1.f = $defineProperty;
    objectGetOwnPropertyDescriptor$1.f = $getOwnPropertyDescriptor;
    objectGetOwnPropertyNames$1.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    objectGetOwnPropertySymbols$1.f = $getOwnPropertySymbols;

    wellKnownSymbolWrapped.f = function (name) {
      return wrap$1(wellKnownSymbol$4(name), name);
    };

    if (descriptors$1) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState$2(this).description;
        }
      });
      {
        redefine$2(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
      }
    }
  }

  _export$1({ global: true, wrap: true, forced: !nativeSymbol$2, sham: !nativeSymbol$2 }, {
    Symbol: $Symbol
  });

  $forEach(objectKeys(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol(name);
  });

  _export$1({ target: SYMBOL, stat: true, forced: !nativeSymbol$2 }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function (key) {
      var string = toString$1(key);
      if (has$8(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol$1(sym)) throw TypeError(sym + ' is not a symbol');
      if (has$8(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });

  _export$1({ target: 'Object', stat: true, forced: !nativeSymbol$2, sham: !descriptors$1 }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });

  _export$1({ target: 'Object', stat: true, forced: !nativeSymbol$2 }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  _export$1({ target: 'Object', stat: true, forced: fails$8(function () { objectGetOwnPropertySymbols$1.f(1); }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return objectGetOwnPropertySymbols$1.f(toObject$3(it));
    }
  });

  // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify
  if ($stringify) {
    var FORCED_JSON_STRINGIFY = !nativeSymbol$2 || fails$8(function () {
      var symbol = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      return $stringify([symbol]) != '[null]'
        // WebKit converts symbol values to JSON as null
        || $stringify({ a: symbol }) != '{}'
        // V8 throws on boxed symbols
        || $stringify(Object(symbol)) != '{}';
    });

    _export$1({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;
        while (arguments.length > index) args.push(arguments[index++]);
        $replacer = replacer;
        if (!isObject$9(replacer) && it === undefined || isSymbol$1(it)) return; // IE8 returns string on undefined
        if (!isArray$5(replacer)) replacer = function (key, value) {
          if (isCallable($replacer)) value = $replacer.call(this, key, value);
          if (!isSymbol$1(value)) return value;
        };
        args[1] = replacer;
        return $stringify.apply(null, args);
      }
    });
  }

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
    var valueOf = $Symbol[PROTOTYPE].valueOf;
    redefine$2($Symbol[PROTOTYPE], TO_PRIMITIVE, function () {
      return valueOf.apply(this, arguments);
    });
  }
  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag($Symbol, SYMBOL);

  hiddenKeys$5[HIDDEN] = true;

  var defineProperty$1 = objectDefineProperty$1.f;


  var NativeSymbol = global$d.Symbol;

  if (descriptors$1 && isCallable(NativeSymbol) && (!('description' in NativeSymbol.prototype) ||
    // Safari 12 bug
    NativeSymbol().description !== undefined
  )) {
    var EmptyStringDescriptionStore = {};
    // wrap Symbol constructor for correct work with undefined description
    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
      var result = this instanceof SymbolWrapper
        ? new NativeSymbol(description)
        // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
        : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };
    copyConstructorProperties$2(SymbolWrapper, NativeSymbol);
    var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
    symbolPrototype.constructor = SymbolWrapper;

    var symbolToString = symbolPrototype.toString;
    var nativeSymbol = String(NativeSymbol('test')) == 'Symbol(test)';
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    defineProperty$1(symbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        var symbol = isObject$9(this) ? this.valueOf() : this;
        var string = symbolToString.call(symbol);
        if (has$8(EmptyStringDescriptionStore, symbol)) return '';
        var desc = nativeSymbol ? string.slice(7, -1) : string.replace(regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });

    _export$1({ global: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject$3(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = global$d.RegExp;

  var UNSUPPORTED_Y$2 = fails$8(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  var BROKEN_CARET = fails$8(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var regexpStickyHelpers = {
  	UNSUPPORTED_Y: UNSUPPORTED_Y$2,
  	BROKEN_CARET: BROKEN_CARET
  };

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = global$d.RegExp;

  var regexpUnsupportedDotAll = fails$8(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = global$d.RegExp;

  var regexpUnsupportedNcg = fails$8(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */





  var getInternalState$1 = internalState$1.get;



  var nativeExec = RegExp.prototype.exec;
  var nativeReplace = shared$4('native-string-replace', String.prototype.replace);

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || regexpUnsupportedDotAll || regexpUnsupportedNcg;

  if (PATCH) {
    // eslint-disable-next-line max-statements -- TODO
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState$1(re);
      var str = toString$1(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = patchedExec.call(raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$1 && re.sticky;
      var flags = regexpFlags.call(re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = flags.replace('y', '');
        if (flags.indexOf('g') === -1) {
          flags += 'g';
        }

        strCopy = str.slice(re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && str.charAt(re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = objectCreate(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec = patchedExec;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  _export$1({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
    exec: regexpExec
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points







  var SPECIES$3 = wellKnownSymbol$4('species');
  var RegExpPrototype$2 = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$4(KEY);

    var DELEGATES_TO_SYMBOL = !fails$8(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$8(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$3] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      FORCED
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var $exec = regexp.exec;
        if ($exec === regexpExec || $exec === RegExpPrototype$2.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      });

      redefine$2(String.prototype, KEY, methods[0]);
      redefine$2(RegExpPrototype$2, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$5(RegExpPrototype$2[SYMBOL], 'sham', true);
  };

  // `String.prototype.codePointAt` methods implementation
  var createMethod = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$1(requireObjectCoercible$3($this));
      var position = toInteger$3(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true)
  };

  var charAt = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt(S, index).length : 1);
  };

  var floor = Math.floor;
  var replace = ''.replace;
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject$3(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable(exec)) {
      var result = exec.call(R, S);
      if (result !== null) anObject$3(result);
      return result;
    }
    if (classofRaw$1(R) === 'RegExp') return regexpExec.call(R, S);
    throw TypeError('RegExp#exec called on incompatible receiver');
  };

  var REPLACE = wellKnownSymbol$4('replace');
  var max = Math.max;
  var min = Math.min;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$8(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegexpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible$3(this);
        var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
        return replacer
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(toString$1(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject$3(this);
        var S = toString$1(string);

        if (
          typeof replaceValue === 'string' &&
          replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
          replaceValue.indexOf('$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable(replaceValue);
        if (!functionalReplace) replaceValue = toString$1(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regexpExecAbstract(rx, S);
          if (result === null) break;

          results.push(result);
          if (!global) break;

          var matchStr = toString$1(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$3(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString$1(result[0]);
          var position = max(min(toInteger$3(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = toString$1(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var GdprEmbedCheckbox = /*#__PURE__*/function () {
    function GdprEmbedCheckbox(parentElement, labelText, options) {
      _classCallCheck$1(this, GdprEmbedCheckbox);

      this.checkboxElement = null;
      this.options = options;
      this.createElements(parentElement, labelText);
    }

    _createClass$1(GdprEmbedCheckbox, [{
      key: "createElements",
      value: function createElements(parentElement, labelText) {
        var checkboxWrapper = createDomElement({
          classNames: ['form-check', 'form-check--small'],
          parent: parentElement
        });
        this.checkboxElement = createDomElement({
          type: 'INPUT',
          attributes: {
            type: 'checkbox',
            value: 'on'
          },
          parent: checkboxWrapper
        });

        if (this.options.defaultLoadAll) {
          this.checkboxElement.checked = true;
        }

        createDomElement({
          type: 'LABEL',
          innerText: labelText,
          parent: checkboxWrapper
        });
      }
    }, {
      key: "isChecked",
      value: function isChecked() {
        return this.checkboxElement.checked;
      }
    }]);

    return GdprEmbedCheckbox;
  }();

  var DEFAULT_OPTIONS$3 = {
    skipCheckbox: false,
    text: {
      button: '',
      description: '',
      checkbox: '',
      title: ''
    },
    providerDisplayName: '',
    checkboxProviderName: '',
    providerPrivacyPolicySection: '',
    privacyPolicyUrl: '',
    modalOpenerButton: false
  };
  var GdprConsentPlaceholder = /*#__PURE__*/function (_Debuggable) {
    _inherits(GdprConsentPlaceholder, _Debuggable);

    var _super = _createSuper(GdprConsentPlaceholder);

    function GdprConsentPlaceholder() {
      var _this;

      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'generic';
      var classnames = arguments.length > 1 ? arguments[1] : undefined;
      var options = arguments.length > 2 ? arguments[2] : undefined;

      _classCallCheck$1(this, GdprConsentPlaceholder);

      _this = _super.call(this, 'GdprConsentPlaceholder');
      _this.placeholder = null;
      _this.button = null;
      _this.modalOpenerButton = null;
      _this.type = type;
      _this.classnames = classnames;
      _this.options = _merge(DEFAULT_OPTIONS$3, options);

      _this.debug.log('Init with options', _this.options);

      _this._onPlaceholderHidden = _this._onPlaceholderHidden.bind(_assertThisInitialized(_this));
      _this._showModalForService = _this._showModalForService.bind(_assertThisInitialized(_this));

      _this._createElements();

      return _this;
    }

    _createClass$1(GdprConsentPlaceholder, [{
      key: "attach",
      value: function attach(container) {
        this.debug.log('Attach placeholder', container, this.placeholder);
        container.appendChild(this.placeholder);
      }
    }, {
      key: "onButtonClick",
      value: function onButtonClick(callback) {
        this.button.addEventListener('click', callback);
      }
    }, {
      key: "hideAndRemove",
      value: function hideAndRemove() {
        this.placeholder.addEventListener('transitionend', this._onPlaceholderHidden);
        this.placeholder.classList.add('hidden');
      }
    }, {
      key: "isCheckboxChecked",
      value: function isCheckboxChecked() {
        return this.checkbox && this.checkbox.isChecked();
      }
    }, {
      key: "setBusy",
      value: function setBusy() {
        this.button.classList.add('busy');
      }
    }, {
      key: "_createElements",
      value: function _createElements() {
        var placeHolderContentInnerHtml = this._getPlaceholderTextContent();

        this.placeholder = createDomElement({
          classNames: this.classnames
        });
        var placeholderContent = createDomElement({
          classNames: ['ghwp-embed-placeholder__content', 'ghwp-busy-button-wrap'],
          parent: this.placeholder
        });

        if (this.options.text.title) {
          createDomElement({
            type: 'H2',
            classNames: ['ghwp-embed-placeholder__title'],
            innerText: this.options.text.title,
            parent: placeholderContent
          });
        }

        createDomElement({
          innerHtml: placeHolderContentInnerHtml,
          parent: placeholderContent
        });

        if (this.type !== 'generic' && this.options.skipCheckbox !== true) {
          this.checkbox = new GdprEmbedCheckbox(placeholderContent, this._getCheckboxLabel(), this.options);
        }

        var buttonContainer = createDomElement({
          classNames: ['ghwp-embed-placeholder__buttons'],
          parent: placeholderContent
        });

        if (this.options.modalOpenerButton) {
          this.modalOpenerButton = createDomElement({
            type: 'BUTTON',
            classNames: ['ghwp-embed-placeholder__button', 'ghwp-embed-placeholder__button--secondary', 'button', 'is-style-secondary'],
            attributes: {
              type: 'button'
            },
            innerText: 'Mehr Informationen',
            parent: buttonContainer
          });
          this.modalOpenerButton.addEventListener('click', this._showModalForService);
        }

        this.button = createDomElement({
          type: 'BUTTON',
          classNames: ['ghwp-embed-placeholder__button', 'button', 'is-style-primary'],
          innerText: this._getButtonTextContent(),
          parent: buttonContainer,
          attributes: {
            type: 'button'
          }
        });
      }
    }, {
      key: "_getButtonTextContent",
      value: function _getButtonTextContent() {
        return this._parsePlaceholdersIntoTemplateString(this.options.text.button);
      }
    }, {
      key: "_getCheckboxLabel",
      value: function _getCheckboxLabel() {
        return this._parsePlaceholdersIntoTemplateString(this.options.text.checkbox);
      }
    }, {
      key: "_getPlaceholderTextContent",
      value: function _getPlaceholderTextContent() {
        return this._parsePlaceholdersIntoTemplateString(this.options.text.description);
      }
    }, {
      key: "_onPlaceholderHidden",
      value: function _onPlaceholderHidden() {
        this.placeholder.removeEventListener('transitionend', this._onPlaceholderHidden);
        this.placeholder.remove();
      }
      /**
       * @param {string} template
       */

    }, {
      key: "_parsePlaceholdersIntoTemplateString",
      value: function _parsePlaceholdersIntoTemplateString(template) {
        var parsed = '';
        parsed = template.replace('%privacyPolicyUrl%', this.options.privacyPolicyUrl);
        var privacyPolicySection = '';

        if (this.options.providerPrivacyPolicySection !== '') {
          privacyPolicySection = "#".concat(this.options.providerPrivacyPolicySection);
        }

        parsed = parsed.replace('%privacyPolicySection%', privacyPolicySection);
        parsed = parsed.replace('%checkboxContentProvider%', this.options.checkboxProviderName);
        var customProviderName = '';

        if (this.options.providerDisplayName !== '') {
          customProviderName += " ".concat(this.options.providerDisplayName);
        }

        parsed = parsed.replace('%contentProvider%', customProviderName);
        return parsed;
      }
    }, {
      key: "_showModalForService",
      value: function _showModalForService(e) {
        e.preventDefault();
        Usercentrics.showModalAtService(this.type, this.options.embeds);
      }
    }]);

    return GdprConsentPlaceholder;
  }(Debuggable);

  var DEFAULT_EMBED_OPTIONS = {
    debug: false,
    embeds: {
      defaultTextContent: 'Um diesen Inhalt anzuzeigen, müssen Sie ihn durch Klick auf den Button aktivieren. Dadurch werden Informationen an den Diensteanbieter übermittelt und dort gespeichert.',
      defaultButtonText: 'Inhalt laden',
      defaultCheckboxLabel: 'Für alle Inhalte dieser Art übernehmen',
      useUC: false,
      skipCheckbox: false,
      modalOpenerButton: false,
      additionalServices: []
    },
    defaultLoadAll: true,
    // Mostly only relevant for ModalGdprManager (so far)
    privacyPolicyUrl: '',
    reloadOnConsent: false,
    clickOnConsent: false
  };
  var AbstractGdprEmbed = /*#__PURE__*/function (_Debuggable) {
    _inherits(AbstractGdprEmbed, _Debuggable);

    var _super = _createSuper(AbstractGdprEmbed);

    /**
     * @param {Element} container
     * @param {object} userOptions
     * @param {ConsentManager} consentManager
     */
    function AbstractGdprEmbed(container) {
      var _this;

      var userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var consentManager = arguments.length > 2 ? arguments[2] : undefined;

      _classCallCheck$1(this, AbstractGdprEmbed);

      _this = _super.call(this, 'abstractGdprEmbed');
      _this.container = _this.getContainer(container);
      _this.consentManager = consentManager;
      _this.url = _this.container.dataset.ghwpSrc;
      _this.type = _this.getType(userOptions) || 'generic';
      /** @type GdprConsentPlaceholder | null */

      _this.placeholder = null;
      _this.options = {};
      _this.hasLoaded = false;
      _this.onEmbedPlaceholderButtonClicked = _this.onEmbedPlaceholderButtonClicked.bind(_assertThisInitialized(_this));
      _this.onConsentChanged = _this.onConsentChanged.bind(_assertThisInitialized(_this));

      if (_this.onModalOpenerClicked) {
        _this.onModalOpenerClicked = _this.onModalOpenerClicked.bind(_assertThisInitialized(_this));
      }

      _this.parseOptions(userOptions);

      _this.debug.log('Type', _this.type);

      return _this;
    }
    /* Abstract methods demanding implementation by extending class */
    // eslint-disable-next-line no-unused-vars


    _createClass$1(AbstractGdprEmbed, [{
      key: "loadEmbed",
      value: function loadEmbed() {
        this.hasLoaded = true;
      }
    }, {
      key: "onInit",
      value: function onInit() {}
    }, {
      key: "unloadEmbed",
      value: function unloadEmbed() {}
      /* "Concrete" methods */

    }, {
      key: "init",
      value: function init() {
        if (!this.container || !this.url) return false;
        this.placeholder = new GdprConsentPlaceholder(this.type, this.getPlaceholderClassNames(), this.options);
        this.attachPlaceholder();
        this.listen().then();
        this.onInit();
        return this;
      }
    }, {
      key: "attachPlaceholder",
      value: function attachPlaceholder() {
        this.placeholder.attach(this.container);
      }
    }, {
      key: "getContainer",
      value: function getContainer(container) {
        return container;
      }
    }, {
      key: "getPlaceholderClassNames",
      value: function getPlaceholderClassNames() {
        return ['ghwp-embed-placeholder'];
      }
    }, {
      key: "getType",
      value: function getType() {
        return this.container.dataset.ghwpType;
      }
    }, {
      key: "hideAndRemovePlaceholder",
      value: function hideAndRemovePlaceholder() {
        this.placeholder.hideAndRemove();
      }
    }, {
      key: "listen",
      value: function () {
        var _listen = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  /* Listen for the integrated button in the placeholder */
                  this.placeholder.onButtonClick(this.onEmbedPlaceholderButtonClicked);
                  _context.next = 3;
                  return this.consentManager.withConsentOrDenial(this.options.ucConsentName, this.onConsentChanged);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function listen() {
          return _listen.apply(this, arguments);
        }

        return listen;
      }()
    }, {
      key: "loadAll",
      value: function loadAll() {
        var _this2 = this;

        this.debug.log('Load all');

        if (this.options.embeds.useUC && this.options.ucConsentName) {
          var _this$options$additio;

          this.debug.log('UC load all');
          Usercentrics.load(this.type, this.options.embeds);

          if ((_this$options$additio = this.options.additionalServices) !== null && _this$options$additio !== void 0 && _this$options$additio.length) {
            this.options.additionalServices.forEach(function (service) {
              Usercentrics.load(service, _this2.options.embeds);
            });
          }
        } else {
          var _this$options$additio2;

          var eventProxy = this.consentManager.getEventProxy();
          eventProxy.emit(this.type);

          if ((_this$options$additio2 = this.options.additionalServices) !== null && _this$options$additio2 !== void 0 && _this$options$additio2.length) {
            this.options.additionalServices.forEach(function (service) {
              eventProxy.emit(service);
            });
          }
        }

        this.loadEmbed(true);
      }
    }, {
      key: "onConsentChanged",
      value: function onConsentChanged(hasConsent) {
        this.debug.log('UC consent changed', {
          hasConsent: hasConsent
        });

        if (hasConsent === true && !this.hasLoaded) {
          this.loadEmbed();
        } else if (hasConsent !== true && this.hasLoaded) {
          this.unloadEmbed();
        }
      }
    }, {
      key: "onEmbedPlaceholderButtonClicked",
      value: function onEmbedPlaceholderButtonClicked(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.placeholder.setBusy();

        if (this.options.skipCheckbox || this.placeholder.isCheckboxChecked()) {
          this.loadAll();
        } else {
          this.loadEmbed(true);
        }
      }
    }, {
      key: "parseOptions",
      value: function parseOptions(userOptions) {
        var _options$embeds, _window, _window$ghwp, _typeConfig;

        var defaultOptions = Object.assign({}, DEFAULT_EMBED_OPTIONS);

        var options = _merge(defaultOptions, userOptions);

        var typeConfig = false;

        if (this.type && (_options$embeds = options.embeds) !== null && _options$embeds !== void 0 && _options$embeds.types && options.embeds.types[this.type]) {
          typeConfig = options.embeds.types[this.type];
        }

        var text = {};
        text.description = typeConfig && typeConfig.customMessage || options.embeds.defaultTextContent;
        text.button = typeConfig && typeConfig.customButtonText || options.embeds.defaultButtonText;
        text.checkbox = typeConfig && typeConfig.customCheckboxLabel || options.embeds.defaultCheckboxLabel;
        text.title = typeConfig && typeConfig.titleText || '';
        options.text = text;
        options.defaultLoadAll = typeConfig && typeof typeConfig.defaultLoadAll !== 'undefined' ? typeConfig.defaultLoadAll : true;
        options.providerDisplayName = typeConfig && typeConfig.providerDisplayName || '';
        options.checkboxProviderName = typeConfig && typeConfig.checkboxProviderName || 'dieses Anbieters';
        options.ucConsentName = typeConfig && typeConfig.ucConsentName || '';
        options.ucTemplateId = typeConfig && typeConfig.ucTemplateId || '';
        options.modalOpenerButton = typeConfig && typeConfig.modalOpenerButton || options.embeds.modalOpenerButton;
        options.providerPrivacyPolicySection = typeConfig && typeConfig.privacyPolicySection || '';
        options.skipCheckbox = typeConfig && typeConfig.skipCheckbox || options.embeds.skipCheckbox;

        if ((_window = window) !== null && _window !== void 0 && (_window$ghwp = _window.ghwp) !== null && _window$ghwp !== void 0 && _window$ghwp.ppurl) {
          options.privacyPolicyUrl = window.ghwp.ppurl;
        } else if (options.embeds.privacyPolicyUrl) {
          options.privacyPolicyUrl = options.embeds.privacyPolicyUrl;
        }

        options.additionalServices = ((_typeConfig = typeConfig) === null || _typeConfig === void 0 ? void 0 : _typeConfig.additionalServices) || options.additionalServices;
        this.options = options;
        this.debug.log('Instance options parsed', {
          options: options,
          defaults: DEFAULT_EMBED_OPTIONS,
          userOptions: userOptions
        });
      }
    }]);

    return AbstractGdprEmbed;
  }(Debuggable);

  var GdprIframeEmbed = /*#__PURE__*/function (_AbstractGdprEmbed) {
    _inherits(GdprIframeEmbed, _AbstractGdprEmbed);

    var _super = _createSuper(GdprIframeEmbed);

    function GdprIframeEmbed() {
      var _this;

      _classCallCheck$1(this, GdprIframeEmbed);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      _this.iframe = null;
      _this.onIframeLoaded = _this.onIframeLoaded.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass$1(GdprIframeEmbed, [{
      key: "attachPlaceholder",
      value: function attachPlaceholder() {
        this.debug.log('attaching placeholder', {
          container: this.container,
          iframe: this.iframe
        });

        if (this.container.matches('iframe')) {
          this.placeholder.attach(this.container.parentNode);
        } else {
          _get(_getPrototypeOf(GdprIframeEmbed.prototype), "attachPlaceholder", this).call(this);
        }
      }
    }, {
      key: "createIframe",
      value: function createIframe() {
        var containerWidth = this.container.getBoundingClientRect().width;
        return createDomElement({
          type: 'IFRAME',
          classNames: ['ghwp-embed-frame'],
          parent: this.container,
          attributes: {
            width: containerWidth,
            height: containerWidth * 9 / 16
          }
        });
      }
    }, {
      key: "loadEmbed",
      value: function loadEmbed() {
        _get(_getPrototypeOf(GdprIframeEmbed.prototype), "loadEmbed", this).call(this);

        this.debug.log('load embed for iframe', {
          container: this.container,
          match: this.container.matches('iframe')
        });
        this.iframe = this.container.matches('iframe') ? this.container : this.createIframe();
        this.iframe.addEventListener('load', this.onIframeLoaded);
        this.iframe.src = this.url;
      }
    }, {
      key: "onIframeLoaded",
      value: function onIframeLoaded() {
        this.iframe.removeEventListener('load', this.onIframeLoaded);
        this.hideAndRemovePlaceholder();
      }
    }, {
      key: "unloadEmbed",
      value: function unloadEmbed() {
        _get(_getPrototypeOf(GdprIframeEmbed.prototype), "unloadEmbed", this).call(this);

        this.debug.log('unload embed');
        this.iframe.src = '';
        this.createPlaceholder();
        this.attachPlaceholder();
      }
    }]);

    return GdprIframeEmbed;
  }(AbstractGdprEmbed);

  var GdprLightboxEmbed = /*#__PURE__*/function (_AbstractGdprEmbed) {
    _inherits(GdprLightboxEmbed, _AbstractGdprEmbed);

    var _super = _createSuper(GdprLightboxEmbed);

    function GdprLightboxEmbed() {
      var _this;

      _classCallCheck$1(this, GdprLightboxEmbed);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      /** @type {LightboxFactory} */

      _this.lightboxFactory = _this.options.lightboxFactory;
      _this.lightbox = null;
      _this.onPlaceholderClick = _this.onPlaceholderClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass$1(GdprLightboxEmbed, [{
      key: "getPlaceholderClassNames",
      value: function getPlaceholderClassNames() {
        var defaultClassNames = _get(_getPrototypeOf(GdprLightboxEmbed.prototype), "getPlaceholderClassNames", this).call(this);

        return ['ghwp-embed-placeholder--lightbox'].concat(_toConsumableArray$1(defaultClassNames));
      }
    }, {
      key: "initLightbox",
      value: function initLightbox() {
        this.debug.log('init lightbox', {
          container: this.container
        });
        var selector = "a[href=\"".concat(this.container.href, "\"]");
        var lightboxCreated = this.lightboxFactory.create(selector);
        this.debug.log({
          lightboxCreated: lightboxCreated
        });
        this.lightbox = lightboxCreated;
      }
    }, {
      key: "listen",
      value: function () {
        var _listen = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _get(_getPrototypeOf(GdprLightboxEmbed.prototype), "listen", this).call(this);

                case 2:
                  this.placeholder.addEventListener('click', this.onPlaceholderClick);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function listen() {
          return _listen.apply(this, arguments);
        }

        return listen;
      }()
    }, {
      key: "loadAll",
      value: function loadAll() {
        _get(_getPrototypeOf(GdprLightboxEmbed.prototype), "loadAll", this).call(this);
      }
    }, {
      key: "loadEmbed",
      value: function loadEmbed() {
        var direct = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _get(_getPrototypeOf(GdprLightboxEmbed.prototype), "loadEmbed", this).call(this);

        if (direct && !(this.checkbox && this.checkbox.isChecked()) && !this.options.skipCheckbox && this.options.ucTemplateId) {
          var _window$uc;

          ((_window$uc = window.uc) === null || _window$uc === void 0 ? void 0 : _window$uc.deactivateBlocking) && window.uc.deactivateBlocking([this.options.ucTemplateId]);
        }

        this.container.href = this.url;
        this.initLightbox();
        this.hideAndRemovePlaceholder();

        if (direct && this.lightbox) {
          this.lightbox.open();
        }
      }
    }, {
      key: "onPlaceholderClick",
      value: function onPlaceholderClick(event) {
        event.stopImmediatePropagation();
      }
    }, {
      key: "unloadEmbed",
      value: function unloadEmbed() {
        _get(_getPrototypeOf(GdprLightboxEmbed.prototype), "unloadEmbed", this).call(this);

        this.debug.log('unload embed');
        this.container.target = '_blank';

        if (this.lightbox) {
          this.lightbox.destroy();
        }
      }
    }]);

    return GdprLightboxEmbed;
  }(AbstractGdprEmbed);

  var slice = [].slice;
  var MSIE = /MSIE .\./.test(engineUserAgent$1); // <- dirty ie9- check

  var wrap = function (scheduler) {
    return function (handler, timeout /* , ...arguments */) {
      var boundArgs = arguments.length > 2;
      var args = boundArgs ? slice.call(arguments, 2) : undefined;
      return scheduler(boundArgs ? function () {
        // eslint-disable-next-line no-new-func -- spec requirement
        (isCallable(handler) ? handler : Function(handler)).apply(this, args);
      } : handler, timeout);
    };
  };

  // ie9- setTimeout & setInterval additional parameters fix
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
  _export$1({ global: true, bind: true, forced: MSIE }, {
    // `setTimeout` method
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
    setTimeout: wrap(global$d.setTimeout),
    // `setInterval` method
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
    setInterval: wrap(global$d.setInterval)
  });

  var POST_LOAD_TIMEOUT = 2000;
  var GdprScriptEmbed = /*#__PURE__*/function (_AbstractGdprEmbed) {
    _inherits(GdprScriptEmbed, _AbstractGdprEmbed);

    var _super = _createSuper(GdprScriptEmbed);

    function GdprScriptEmbed() {
      var _this;

      _classCallCheck$1(this, GdprScriptEmbed);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      _this.script = _this.container;
      var containerSelect = _this.script.dataset.ghwpPlaceholder;
      _this.container = $()(containerSelect);

      if (!_this.container) {
        _this.container = createDomElement({
          classNames: ['ghwp-placeholder-container']
        });

        _this.script.parentElement.insertBefore(_this.container, _this.script);
      }

      _this.onScriptLoaded = _this.onScriptLoaded.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass$1(GdprScriptEmbed, [{
      key: "loadEmbed",
      value: function loadEmbed() {
        _get(_getPrototypeOf(GdprScriptEmbed.prototype), "loadEmbed", this).call(this);

        this.debug.log('load script', {
          container: this.container,
          script: this.script
        });
        this.script.addEventListener('load', this.onScriptLoaded);
        this.script.src = this.url;
      }
    }, {
      key: "loadRaceResult",
      value: function loadRaceResult() {
        this.debug.log('Loading inline scripts...');
        var inlineScripts = $$()('[data-ghwp-type="raceresult"]:not([src])');
        inlineScripts.forEach(function (scriptElement) {
          createDomElement({
            type: 'SCRIPT',
            attributes: {
              type: 'text/javascript'
            },
            innerText: scriptElement.innerText,
            parent: document.head
          });
          scriptElement.remove(); // document.head.appendChild(scriptElement);
        });
      }
    }, {
      key: "onScriptLoaded",
      value: function onScriptLoaded() {
        this.debug.log('Script has finished loading');
        this.script.removeEventListener('load', this.onScriptLoaded);
        this.hideAndRemovePlaceholder();

        if (this.type === 'raceresult') {
          setTimeout(this.loadRaceResult.bind(this), POST_LOAD_TIMEOUT);
        }
      }
    }, {
      key: "unloadEmbed",
      value: function unloadEmbed() {
        _get(_getPrototypeOf(GdprScriptEmbed.prototype), "unloadEmbed", this).call(this);

        this.debug.log('unload embed');
        this.script.src = '';
        this.createPlaceholder();
        this.attachPlaceholder();
      }
    }]);

    return GdprScriptEmbed;
  }(AbstractGdprEmbed);

  var DEFAULT_OPTIONS$2 = {
    selector: '[data-ghwp-src]',
    debug: false,
    embeds: {}
  };
  var GdprEmbedFactory = /*#__PURE__*/function (_Debuggable) {
    _inherits(GdprEmbedFactory, _Debuggable);

    var _super = _createSuper(GdprEmbedFactory);

    /**
     * @param {object}         useroptions
     * @param {ConsentManager} consentManager
     */
    function GdprEmbedFactory() {
      var _this;

      var useroptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var consentManager = arguments.length > 1 ? arguments[1] : undefined;

      _classCallCheck$1(this, GdprEmbedFactory);

      _this = _super.call(this, 'gdprEmbedFactory');
      _this.options = {};
      _this.embeds = [];
      _this.consentManager = consentManager;

      _this.parseOptions(useroptions);

      _this.debug.log('init', {
        options: _this.options,
        consentManager: consentManager
      });

      _this.findAndParseEmbedBlocks();

      return _this;
    }

    _createClass$1(GdprEmbedFactory, [{
      key: "findAndParseEmbedBlocks",
      value: function findAndParseEmbedBlocks() {
        var _this2 = this,
            _window$ghwp;

        var embedElements = $$()(this.options.selector);
        embedElements.forEach(function (el) {
          _this2.debug.log('Init: ', {
            el: el,
            isLB: el.matches('a')
          });

          var initialized = GdprEmbedFactory.initEmbedBlockContainer(el, _this2.getPassableOptions(), _this2.consentManager);

          if (initialized) {
            _this2.embeds.push(initialized);
          }
        });

        if (!((_window$ghwp = window.ghwp) !== null && _window$ghwp !== void 0 && _window$ghwp.ucEnabled)) {
          this.listen();
        }
      }
    }, {
      key: "getPassableOptions",
      value: function getPassableOptions() {
        return _pick(this.options, ['debug', 'embeds', 'lightboxFactory']);
      }
      /**
       * @param {Element}        container
       * @param {object}         passedOptions
       * @param {ConsentManager} consentManager
       */

    }, {
      key: "listen",
      value: function listen() {
        if (window.ghwpEmbedsAllowed && window.ghwpEmbedsAllowed === true) {
          /* GTM & Co were faster than us, so we should load right away */
          this.loadAllEmbeds();
        } else {
          /* Listen for GTM / Cookie banner via callback */
          window.ghwpEmbedsAllowed = this.loadAllEmbeds.bind(this);
        }
      }
    }, {
      key: "loadAllEmbeds",
      value: function loadAllEmbeds() {
        this.embeds.forEach(function (embed) {
          embed.loadEmbed();
        });
      }
    }, {
      key: "parseOptions",
      value: function parseOptions(useroptions) {
        this.options = _merge(DEFAULT_OPTIONS$2, useroptions);
      }
    }], [{
      key: "initEmbedBlockContainer",
      value: function initEmbedBlockContainer(container) {
        var passedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var consentManager = arguments.length > 2 ? arguments[2] : undefined;
        var GdprEmbedClass = null;
        var isLightboxTrigger = container.matches('a');
        var isScript = container.matches('script');
        if (isLightboxTrigger) GdprEmbedClass = GdprLightboxEmbed;else if (isScript) GdprEmbedClass = GdprScriptEmbed;else GdprEmbedClass = GdprIframeEmbed;
        var gdprEmbed = new GdprEmbedClass(container, passedOptions, consentManager);
        return gdprEmbed.init();
      }
    }]);

    return GdprEmbedFactory;
  }(Debuggable);

  var Modal = /*#__PURE__*/function () {
    /**
     * @param {Element[]|null} content
     */
    function Modal() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _classCallCheck$1(this, Modal);

      this.container = null;
      this.root = null;
      this.closeButton = null;
      this._onCloseClicked = this._onCloseClicked.bind(this);
      this._onKeyDown = this._onKeyDown.bind(this);

      this._createElements(content);
    }

    _createClass$1(Modal, [{
      key: "_createElements",
      value: function _createElements(content) {
        this.root = createDomElement({
          classNames: ['ghwp-modal', 'ghwp-modal--with-backdrop', 'ghwp-hide']
        });
        this.closeButton = createDomElement({
          type: 'BUTTON',
          classNames: ['ghwp-modal__close'],
          parent: this.root,
          attributes: {
            type: 'button'
          }
        });
        this.container = createDomElement({
          classNames: ['ghwp-modal__inner'],
          parent: this.root,
          innerHtml: content && content.outerHTML || ''
        });
        document.body.appendChild(this.root);

        this._listen();
      }
    }, {
      key: "_clearContent",
      value: function _clearContent() {
        var _this = this;

        var children = $$(this.container)('*');
        children && children.forEach(function (child) {
          _this.container.removeChild(child);
        });
      }
    }, {
      key: "_listen",
      value: function _listen() {
        this.closeButton.addEventListener('click', this._onCloseClicked);
      }
    }, {
      key: "_onCloseClicked",
      value: function _onCloseClicked() {
        this.hide();
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(e) {
        if (e.key === 'Escape') {
          this.hide();
        }
      }
    }, {
      key: "appendElement",
      value: function appendElement(element) {
        this.container.appendChild(element);
      }
    }, {
      key: "replaceContent",
      value: function replaceContent(element) {
        this._clearContent();

        this.appendElement(element);
      }
    }, {
      key: "getContainer",
      value: function getContainer() {
        return this.container;
      }
    }, {
      key: "show",
      value: function show() {
        this.root.classList.remove('ghwp-hide');
        document.body.classList.add('modal-active');
        window.addEventListener('keydown', this._onKeyDown);
      }
    }, {
      key: "hide",
      value: function hide() {
        this.root.classList.add('ghwp-hide');
        document.body.classList.remove('modal-active');
        window.removeEventListener('keydown', this._onKeyDown);
      }
    }]);

    return Modal;
  }();

  var ModalGdprManager = /*#__PURE__*/function (_AbstractGdprEmbed) {
    _inherits(ModalGdprManager, _AbstractGdprEmbed);

    var _super = _createSuper(ModalGdprManager);

    /**
     * @param {Element} container
     * @param {object} userOptions
     * @param {ConsentManager} consentManager
     */
    function ModalGdprManager(container) {
      var _this;

      var userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var consentManager = arguments.length > 2 ? arguments[2] : undefined;

      _classCallCheck$1(this, ModalGdprManager);

      _this = _super.call(this, container, userOptions, consentManager);
      _this.onModalOpenerClicked = _this.onModalOpenerClicked.bind(_assertThisInitialized(_this));
      _this.url = 'none';
      return _this;
    }

    _createClass$1(ModalGdprManager, [{
      key: "getContainer",
      value: function getContainer(container) {
        this.trigger = container;
        this.modal = new Modal();
        return this.modal.getContainer();
      }
    }, {
      key: "getType",
      value: function getType(userOptions) {
        return userOptions.consentType || 'generic';
      }
    }, {
      key: "listen",
      value: function () {
        var _listen = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _get(_getPrototypeOf(ModalGdprManager.prototype), "listen", this).call(this);

                case 2:
                  this.trigger.addEventListener('click', this.onModalOpenerClicked);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function listen() {
          return _listen.apply(this, arguments);
        }

        return listen;
      }()
    }, {
      key: "loadEmbed",
      value: function loadEmbed() {
        var direct = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.debug.log('Modal: load embed', this.options);

        _get(_getPrototypeOf(ModalGdprManager.prototype), "loadEmbed", this).call(this, direct);

        this.modal.hide();

        if (direct) {
          this.debug.log('Direct load: checking whether to reload page or simulate a click event on the trigger', this.options);

          if (this.options.reloadOnConsent) {
            window.history.go();
          }

          if (this.options.clickOnConsent) {
            this.trigger.click();
          }
        }
      }
    }, {
      key: "onModalOpenerClicked",
      value: function onModalOpenerClicked(e) {
        if (!this.hasLoaded) {
          e.preventDefault();
          e.stopImmediatePropagation();
          this.modal.show();
        }
      }
    }]);

    return ModalGdprManager;
  }(AbstractGdprEmbed);

  var aPossiblePrototype = function (argument) {
    if (typeof argument === 'object' || isCallable(argument)) return argument;
    throw TypeError("Can't set " + String(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject$3(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      objectSetPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      isCallable(NewTarget = dummy.constructor) &&
      NewTarget !== Wrapper &&
      isObject$9(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var MATCH$1 = wellKnownSymbol$4('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject$9(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classofRaw$1(it) == 'RegExp');
  };

  var SPECIES$2 = wellKnownSymbol$4('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty$1.f;

    if (descriptors$1 && Constructor && !Constructor[SPECIES$2]) {
      defineProperty(Constructor, SPECIES$2, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var defineProperty = objectDefineProperty$1.f;
  var getOwnPropertyNames = objectGetOwnPropertyNames$1.f;







  var enforceInternalState = internalState$1.enforce;





  var MATCH = wellKnownSymbol$4('match');
  var NativeRegExp = global$d.RegExp;
  var RegExpPrototype$1 = NativeRegExp.prototype;
  // TODO: Use only propper RegExpIdentifierName
  var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
  var re1 = /a/g;
  var re2 = /a/g;

  // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;

  var UNSUPPORTED_Y = regexpStickyHelpers.UNSUPPORTED_Y;

  var BASE_FORCED = descriptors$1 &&
    (!CORRECT_NEW || UNSUPPORTED_Y || regexpUnsupportedDotAll || regexpUnsupportedNcg || fails$8(function () {
      re2[MATCH] = false;
      // RegExp constructor can alter flags and IsRegExp works correct with @@match
      return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
    }));

  var handleDotAll = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var brackets = false;
    var chr;
    for (; index <= length; index++) {
      chr = string.charAt(index);
      if (chr === '\\') {
        result += chr + string.charAt(++index);
        continue;
      }
      if (!brackets && chr === '.') {
        result += '[\\s\\S]';
      } else {
        if (chr === '[') {
          brackets = true;
        } else if (chr === ']') {
          brackets = false;
        } result += chr;
      }
    } return result;
  };

  var handleNCG = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var named = [];
    var names = {};
    var brackets = false;
    var ncg = false;
    var groupid = 0;
    var groupname = '';
    var chr;
    for (; index <= length; index++) {
      chr = string.charAt(index);
      if (chr === '\\') {
        chr = chr + string.charAt(++index);
      } else if (chr === ']') {
        brackets = false;
      } else if (!brackets) switch (true) {
        case chr === '[':
          brackets = true;
          break;
        case chr === '(':
          if (IS_NCG.test(string.slice(index + 1))) {
            index += 2;
            ncg = true;
          }
          result += chr;
          groupid++;
          continue;
        case chr === '>' && ncg:
          if (groupname === '' || has$8(names, groupname)) {
            throw new SyntaxError('Invalid capture group name');
          }
          names[groupname] = true;
          named.push([groupname, groupid]);
          ncg = false;
          groupname = '';
          continue;
      }
      if (ncg) groupname += chr;
      else result += chr;
    } return [result, named];
  };

  // `RegExp` constructor
  // https://tc39.es/ecma262/#sec-regexp-constructor
  if (isForced_1$1('RegExp', BASE_FORCED)) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = this instanceof RegExpWrapper;
      var patternIsRegExp = isRegexp(pattern);
      var flagsAreUndefined = flags === undefined;
      var groups = [];
      var rawPattern = pattern;
      var rawFlags, dotAll, sticky, handled, result, state;

      if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
        return pattern;
      }

      if (patternIsRegExp || pattern instanceof RegExpWrapper) {
        pattern = pattern.source;
        if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : regexpFlags.call(rawPattern);
      }

      pattern = pattern === undefined ? '' : toString$1(pattern);
      flags = flags === undefined ? '' : toString$1(flags);
      rawPattern = pattern;

      if (regexpUnsupportedDotAll && 'dotAll' in re1) {
        dotAll = !!flags && flags.indexOf('s') > -1;
        if (dotAll) flags = flags.replace(/s/g, '');
      }

      rawFlags = flags;

      if (UNSUPPORTED_Y && 'sticky' in re1) {
        sticky = !!flags && flags.indexOf('y') > -1;
        if (sticky) flags = flags.replace(/y/g, '');
      }

      if (regexpUnsupportedNcg) {
        handled = handleNCG(pattern);
        pattern = handled[0];
        groups = handled[1];
      }

      result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$1, RegExpWrapper);

      if (dotAll || sticky || groups.length) {
        state = enforceInternalState(result);
        if (dotAll) {
          state.dotAll = true;
          state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
        }
        if (sticky) state.sticky = true;
        if (groups.length) state.groups = groups;
      }

      if (pattern !== rawPattern) try {
        // fails in old engines, but we have no alternatives for unsupported regex syntax
        createNonEnumerableProperty$5(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
      } catch (error) { /* empty */ }

      return result;
    };

    var proxy = function (key) {
      key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
        configurable: true,
        get: function () { return NativeRegExp[key]; },
        set: function (it) { NativeRegExp[key] = it; }
      });
    };

    for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
      proxy(keys[index++]);
    }

    RegExpPrototype$1.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype$1;
    redefine$2(global$d, 'RegExp', RegExpWrapper);
  }

  // https://tc39.es/ecma262/#sec-get-regexp-@@species
  setSpecies('RegExp');

  var PROPER_FUNCTION_NAME = functionName.PROPER;






  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING];

  var NOT_GENERIC = fails$8(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine$2(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject$3(this);
      var p = toString$1(R.source);
      var rf = R.flags;
      var f = toString$1(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof$2(this) + ']';
  };

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    redefine$2(Object.prototype, 'toString', objectToString, { unsafe: true });
  }

  var nativePromiseConstructor = global$d.Promise;

  var redefineAll = function (target, src, options) {
    for (var key in src) redefine$2(target, key, src[key], options);
    return target;
  };

  var anInstance = function (it, Constructor, name) {
    if (it instanceof Constructor) return it;
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  };

  var iterators = {};

  var ITERATOR$2 = wellKnownSymbol$4('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
  };

  var ITERATOR$1 = wellKnownSymbol$4('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return getMethod(it, ITERATOR$1)
      || getMethod(it, '@@iterator')
      || iterators[classof$2(it)];
  };

  var getIterator = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
    if (aCallable(iteratorMethod)) return anObject$3(iteratorMethod.call(argument));
    throw TypeError(String(argument) + ' is not iterable');
  };

  var iteratorClose = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$3(iterator);
    try {
      innerResult = getMethod(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = innerResult.call(iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$3(innerResult);
    return value;
  };

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$3(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (!iterFn) throw TypeError(String(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength$3(iterable.length); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && result instanceof Result) return result;
        } return new Result(false);
      }
      iterator = getIterator(iterable, iterFn);
    }

    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && result instanceof Result) return result;
    } return new Result(false);
  };

  var ITERATOR = wellKnownSymbol$4('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  // `Assert: IsConstructor(argument) is true`
  var aConstructor = function (argument) {
    if (isConstructor(argument)) return argument;
    throw TypeError(tryToString(argument) + ' is not a constructor');
  };

  var SPECIES$1 = wellKnownSymbol$4('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject$3(O).constructor;
    var S;
    return C === undefined || (S = anObject$3(C)[SPECIES$1]) == undefined ? defaultConstructor : aConstructor(S);
  };

  var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(engineUserAgent$1);

  var engineIsNode = classofRaw$1(global$d.process) == 'process';

  var set = global$d.setImmediate;
  var clear = global$d.clearImmediate;
  var process$3 = global$d.process;
  var MessageChannel = global$d.MessageChannel;
  var Dispatch = global$d.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var location, defer, channel, port;

  try {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    location = global$d.location;
  } catch (error) { /* empty */ }

  var run = function (id) {
    // eslint-disable-next-line no-prototype-builtins -- safe
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global$d.postMessage(String(id), location.protocol + '//' + location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set || !clear) {
    set = function setImmediate(fn) {
      var args = [];
      var argumentsLength = arguments.length;
      var i = 1;
      while (argumentsLength > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func -- spec requirement
        (isCallable(fn) ? fn : Function(fn)).apply(undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (engineIsNode) {
      defer = function (id) {
        process$3.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !engineIsIos) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = functionBindContext(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global$d.addEventListener &&
      isCallable(global$d.postMessage) &&
      !global$d.importScripts &&
      location && location.protocol !== 'file:' &&
      !fails$8(post)
    ) {
      defer = post;
      global$d.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in documentCreateElement$1('script')) {
      defer = function (id) {
        html.appendChild(documentCreateElement$1('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task$1 = {
    set: set,
    clear: clear
  };

  var engineIsIosPebble = /ipad|iphone|ipod/i.test(engineUserAgent$1) && global$d.Pebble !== undefined;

  var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent$1);

  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;
  var macrotask = task$1.set;





  var MutationObserver = global$d.MutationObserver || global$d.WebKitMutationObserver;
  var document$2 = global$d.document;
  var process$2 = global$d.process;
  var Promise$1 = global$d.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$d, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify$1, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (engineIsNode && (parent = process$2.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (error) {
          if (head) notify$1();
          else last = undefined;
          throw error;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (!engineIsIos && !engineIsNode && !engineIsWebosWebkit && MutationObserver && document$2) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify$1 = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (!engineIsIosPebble && Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise$1;
      then = promise.then;
      notify$1 = function () {
        then.call(promise, flush);
      };
    // Node.js without promises
    } else if (engineIsNode) {
      notify$1 = function () {
        process$2.nextTick(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
    } else {
      notify$1 = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(global$d, flush);
      };
    }
  }

  var microtask = queueMicrotask || function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify$1();
    } last = task;
  };

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aCallable(resolve);
    this.reject = aCallable(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  var f = function (C) {
    return new PromiseCapability(C);
  };

  var newPromiseCapability$1 = {
  	f: f
  };

  var promiseResolve = function (C, x) {
    anObject$3(C);
    if (isObject$9(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability$1.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var hostReportErrors = function (a, b) {
    var console = global$d.console;
    if (console && console.error) {
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var engineIsBrowser = typeof window == 'object';

  var task = task$1.set;












  var SPECIES = wellKnownSymbol$4('species');
  var PROMISE = 'Promise';
  var getInternalState = internalState$1.get;
  var setInternalState = internalState$1.set;
  var getInternalPromiseState = internalState$1.getterFor(PROMISE);
  var NativePromisePrototype = nativePromiseConstructor && nativePromiseConstructor.prototype;
  var PromiseConstructor = nativePromiseConstructor;
  var PromiseConstructorPrototype = NativePromisePrototype;
  var TypeError$1 = global$d.TypeError;
  var document$1 = global$d.document;
  var process$1 = global$d.process;
  var newPromiseCapability = newPromiseCapability$1.f;
  var newGenericPromiseCapability = newPromiseCapability;
  var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$d.dispatchEvent);
  var NATIVE_REJECTION_EVENT = isCallable(global$d.PromiseRejectionEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;
  var SUBCLASSING = false;
  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  var FORCED = isForced_1$1(PROMISE, function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource$3(PromiseConstructor);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && engineV8Version$1 === 66) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (engineV8Version$1 >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
    // Detect correctness of subclassing with @@species support
    var promise = new PromiseConstructor(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return !GLOBAL_CORE_JS_PROMISE && engineIsBrowser && !NATIVE_REJECTION_EVENT;
  });

  var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
    PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
  });

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject$9(it) && isCallable(then = it.then) ? then : false;
  };

  var notify = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    var chain = state.reactions;
    microtask(function () {
      var value = state.value;
      var ok = state.state == FULFILLED;
      var index = 0;
      // variable length - can't use forEach
      while (chain.length > index) {
        var reaction = chain[index++];
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (state.rejection === UNHANDLED) onHandleUnhandled(state);
              state.rejection = HANDLED;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // can throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (error) {
          if (domain && !exited) domain.exit();
          reject(error);
        }
      }
      state.reactions = [];
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$1.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global$d.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_REJECTION_EVENT && (handler = global$d['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    task.call(global$d, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (engineIsNode) {
            process$1.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    task.call(global$d, function () {
      var promise = state.facade;
      if (engineIsNode) {
        process$1.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            then.call(value,
              bind(internalResolve, wrapper, state),
              bind(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromiseConstructor, PROMISE);
      aCallable(executor);
      Internal.call(this);
      var state = getInternalState(this);
      try {
        executor(bind(internalResolve, state), bind(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };
    PromiseConstructorPrototype = PromiseConstructor.prototype;
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: [],
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };
    Internal.prototype = redefineAll(PromiseConstructorPrototype, {
      // `Promise.prototype.then` method
      // https://tc39.es/ecma262/#sec-promise.prototype.then
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
        reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
        reaction.fail = isCallable(onRejected) && onRejected;
        reaction.domain = engineIsNode ? process$1.domain : undefined;
        state.parent = true;
        state.reactions.push(reaction);
        if (state.state != PENDING) notify(state, false);
        return reaction.promise;
      },
      // `Promise.prototype.catch` method
      // https://tc39.es/ecma262/#sec-promise.prototype.catch
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalState(promise);
      this.promise = promise;
      this.resolve = bind(internalResolve, state);
      this.reject = bind(internalReject, state);
    };
    newPromiseCapability$1.f = newPromiseCapability = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    if (isCallable(nativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
      nativeThen = NativePromisePrototype.then;

      if (!SUBCLASSING) {
        // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
        redefine$2(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            nativeThen.call(that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });

        // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
        redefine$2(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
      }

      // make `.constructor === Promise` work for native promise-based APIs
      try {
        delete NativePromisePrototype.constructor;
      } catch (error) { /* empty */ }

      // make `instanceof Promise` work for native promise-based APIs
      if (objectSetPrototypeOf) {
        objectSetPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
      }
    }
  }

  _export$1({ global: true, wrap: true, forced: FORCED }, {
    Promise: PromiseConstructor
  });

  setToStringTag(PromiseConstructor, PROMISE, false);
  setSpecies(PROMISE);

  PromiseWrapper = getBuiltIn$3(PROMISE);

  // statics
  _export$1({ target: PROMISE, stat: true, forced: FORCED }, {
    // `Promise.reject` method
    // https://tc39.es/ecma262/#sec-promise.reject
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      capability.reject.call(undefined, r);
      return capability.promise;
    }
  });

  _export$1({ target: PROMISE, stat: true, forced: FORCED }, {
    // `Promise.resolve` method
    // https://tc39.es/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    }
  });

  _export$1({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
    // `Promise.all` method
    // https://tc39.es/ecma262/#sec-promise.all
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          $promiseResolve.call(C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    },
    // `Promise.race` method
    // https://tc39.es/ecma262/#sec-promise.race
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable(C.resolve);
        iterate(iterable, function (promise) {
          $promiseResolve.call(C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var $filter = arrayIteration.filter;


  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  _export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // @@match logic
  fixRegexpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible$3(this);
        var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
        return matcher ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](toString$1(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var rx = anObject$3(this);
        var S = toString$1(string);
        var res = maybeCallNative(nativeMatch, rx, S);

        if (res.done) return res.value;

        if (!rx.global) return regexpExecAbstract(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regexpExecAbstract(rx, S)) !== null) {
          var matchStr = toString$1(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$3(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  /*!
   * EventEmitter2
   * https://github.com/hij1nx/EventEmitter2
   *
   * Copyright (c) 2013 hij1nx
   * Licensed under the MIT license.
   */

  var eventemitter2 = createCommonjsModule(function (module, exports) {
  !function(undefined$1) {
    var hasOwnProperty= Object.hasOwnProperty;
    var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    };
    var defaultMaxListeners = 10;
    var nextTickSupported= typeof process=='object' && typeof process.nextTick=='function';
    var symbolsSupported= typeof Symbol==='function';
    var reflectSupported= typeof Reflect === 'object';
    var setImmediateSupported= typeof setImmediate === 'function';
    var _setImmediate= setImmediateSupported ? setImmediate : setTimeout;
    var ownKeys= symbolsSupported? (reflectSupported && typeof Reflect.ownKeys==='function'? Reflect.ownKeys : function(obj){
      var arr= Object.getOwnPropertyNames(obj);
      arr.push.apply(arr, Object.getOwnPropertySymbols(obj));
      return arr;
    }) : Object.keys;

    function init() {
      this._events = {};
      if (this._conf) {
        configure.call(this, this._conf);
      }
    }

    function configure(conf) {
      if (conf) {
        this._conf = conf;

        conf.delimiter && (this.delimiter = conf.delimiter);

        if(conf.maxListeners!==undefined$1){
            this._maxListeners= conf.maxListeners;
        }

        conf.wildcard && (this.wildcard = conf.wildcard);
        conf.newListener && (this._newListener = conf.newListener);
        conf.removeListener && (this._removeListener = conf.removeListener);
        conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);
        conf.ignoreErrors && (this.ignoreErrors = conf.ignoreErrors);

        if (this.wildcard) {
          this.listenerTree = {};
        }
      }
    }

    function logPossibleMemoryLeak(count, eventName) {
      var errorMsg = '(node) warning: possible EventEmitter memory ' +
          'leak detected. ' + count + ' listeners added. ' +
          'Use emitter.setMaxListeners() to increase limit.';

      if(this.verboseMemoryLeak){
        errorMsg += ' Event name: ' + eventName + '.';
      }

      if(typeof process !== 'undefined' && process.emitWarning){
        var e = new Error(errorMsg);
        e.name = 'MaxListenersExceededWarning';
        e.emitter = this;
        e.count = count;
        process.emitWarning(e);
      } else {
        console.error(errorMsg);

        if (console.trace){
          console.trace();
        }
      }
    }

    var toArray = function (a, b, c) {
      var n = arguments.length;
      switch (n) {
        case 0:
          return [];
        case 1:
          return [a];
        case 2:
          return [a, b];
        case 3:
          return [a, b, c];
        default:
          var arr = new Array(n);
          while (n--) {
            arr[n] = arguments[n];
          }
          return arr;
      }
    };

    function toObject(keys, values) {
      var obj = {};
      var key;
      var len = keys.length;
      var valuesCount = values ? value.length : 0;
      for (var i = 0; i < len; i++) {
        key = keys[i];
        obj[key] = i < valuesCount ? values[i] : undefined$1;
      }
      return obj;
    }

    function TargetObserver(emitter, target, options) {
      this._emitter = emitter;
      this._target = target;
      this._listeners = {};
      this._listenersCount = 0;

      var on, off;

      if (options.on || options.off) {
        on = options.on;
        off = options.off;
      }

      if (target.addEventListener) {
        on = target.addEventListener;
        off = target.removeEventListener;
      } else if (target.addListener) {
        on = target.addListener;
        off = target.removeListener;
      } else if (target.on) {
        on = target.on;
        off = target.off;
      }

      if (!on && !off) {
        throw Error('target does not implement any known event API');
      }

      if (typeof on !== 'function') {
        throw TypeError('on method must be a function');
      }

      if (typeof off !== 'function') {
        throw TypeError('off method must be a function');
      }

      this._on = on;
      this._off = off;

      var _observers= emitter._observers;
      if(_observers){
        _observers.push(this);
      }else {
        emitter._observers= [this];
      }
    }

    Object.assign(TargetObserver.prototype, {
      subscribe: function(event, localEvent, reducer){
        var observer= this;
        var target= this._target;
        var emitter= this._emitter;
        var listeners= this._listeners;
        var handler= function(){
          var args= toArray.apply(null, arguments);
          var eventObj= {
            data: args,
            name: localEvent,
            original: event
          };
          if(reducer){
            var result= reducer.call(target, eventObj);
            if(result!==false){
              emitter.emit.apply(emitter, [eventObj.name].concat(args));
            }
            return;
          }
          emitter.emit.apply(emitter, [localEvent].concat(args));
        };


        if(listeners[event]){
          throw Error('Event \'' + event + '\' is already listening');
        }

        this._listenersCount++;

        if(emitter._newListener && emitter._removeListener && !observer._onNewListener){

          this._onNewListener = function (_event) {
            if (_event === localEvent && listeners[event] === null) {
              listeners[event] = handler;
              observer._on.call(target, event, handler);
            }
          };

          emitter.on('newListener', this._onNewListener);

          this._onRemoveListener= function(_event){
            if(_event === localEvent && !emitter.hasListeners(_event) && listeners[event]){
              listeners[event]= null;
              observer._off.call(target, event, handler);
            }
          };

          listeners[event]= null;

          emitter.on('removeListener', this._onRemoveListener);
        }else {
          listeners[event]= handler;
          observer._on.call(target, event, handler);
        }
      },

      unsubscribe: function(event){
        var observer= this;
        var listeners= this._listeners;
        var emitter= this._emitter;
        var handler;
        var events;
        var off= this._off;
        var target= this._target;
        var i;

        if(event && typeof event!=='string'){
          throw TypeError('event must be a string');
        }

        function clearRefs(){
          if(observer._onNewListener){
            emitter.off('newListener', observer._onNewListener);
            emitter.off('removeListener', observer._onRemoveListener);
            observer._onNewListener= null;
            observer._onRemoveListener= null;
          }
          var index= findTargetIndex.call(emitter, observer);
          emitter._observers.splice(index, 1);
        }

        if(event){
          handler= listeners[event];
          if(!handler) return;
          off.call(target, event, handler);
          delete listeners[event];
          if(!--this._listenersCount){
            clearRefs();
          }
        }else {
          events= ownKeys(listeners);
          i= events.length;
          while(i-->0){
            event= events[i];
            off.call(target, event, listeners[event]);
          }
          this._listeners= {};
          this._listenersCount= 0;
          clearRefs();
        }
      }
    });

    function resolveOptions(options, schema, reducers, allowUnknown) {
      var computedOptions = Object.assign({}, schema);

      if (!options) return computedOptions;

      if (typeof options !== 'object') {
        throw TypeError('options must be an object')
      }

      var keys = Object.keys(options);
      var length = keys.length;
      var option, value;
      var reducer;

      function reject(reason) {
        throw Error('Invalid "' + option + '" option value' + (reason ? '. Reason: ' + reason : ''))
      }

      for (var i = 0; i < length; i++) {
        option = keys[i];
        if (!allowUnknown && !hasOwnProperty.call(schema, option)) {
          throw Error('Unknown "' + option + '" option');
        }
        value = options[option];
        if (value !== undefined$1) {
          reducer = reducers[option];
          computedOptions[option] = reducer ? reducer(value, reject) : value;
        }
      }
      return computedOptions;
    }

    function constructorReducer(value, reject) {
      if (typeof value !== 'function' || !value.hasOwnProperty('prototype')) {
        reject('value must be a constructor');
      }
      return value;
    }

    function makeTypeReducer(types) {
      var message= 'value must be type of ' + types.join('|');
      var len= types.length;
      var firstType= types[0];
      var secondType= types[1];

      if (len === 1) {
        return function (v, reject) {
          if (typeof v === firstType) {
            return v;
          }
          reject(message);
        }
      }

      if (len === 2) {
        return function (v, reject) {
          var kind= typeof v;
          if (kind === firstType || kind === secondType) return v;
          reject(message);
        }
      }

      return function (v, reject) {
        var kind = typeof v;
        var i = len;
        while (i-- > 0) {
          if (kind === types[i]) return v;
        }
        reject(message);
      }
    }

    var functionReducer= makeTypeReducer(['function']);

    var objectFunctionReducer= makeTypeReducer(['object', 'function']);

    function makeCancelablePromise(Promise, executor, options) {
      var isCancelable;
      var callbacks;
      var timer= 0;
      var subscriptionClosed;

      var promise = new Promise(function (resolve, reject, onCancel) {
        options= resolveOptions(options, {
          timeout: 0,
          overload: false
        }, {
          timeout: function(value, reject){
            value*= 1;
            if (typeof value !== 'number' || value < 0 || !Number.isFinite(value)) {
              reject('timeout must be a positive number');
            }
            return value;
          }
        });

        isCancelable = !options.overload && typeof Promise.prototype.cancel === 'function' && typeof onCancel === 'function';

        function cleanup() {
          if (callbacks) {
            callbacks = null;
          }
          if (timer) {
            clearTimeout(timer);
            timer = 0;
          }
        }

        var _resolve= function(value){
          cleanup();
          resolve(value);
        };

        var _reject= function(err){
          cleanup();
          reject(err);
        };

        if (isCancelable) {
          executor(_resolve, _reject, onCancel);
        } else {
          callbacks = [function(reason){
            _reject(reason || Error('canceled'));
          }];
          executor(_resolve, _reject, function (cb) {
            if (subscriptionClosed) {
              throw Error('Unable to subscribe on cancel event asynchronously')
            }
            if (typeof cb !== 'function') {
              throw TypeError('onCancel callback must be a function');
            }
            callbacks.push(cb);
          });
          subscriptionClosed= true;
        }

        if (options.timeout > 0) {
          timer= setTimeout(function(){
            var reason= Error('timeout');
            reason.code = 'ETIMEDOUT';
            timer= 0;
            promise.cancel(reason);
            reject(reason);
          }, options.timeout);
        }
      });

      if (!isCancelable) {
        promise.cancel = function (reason) {
          if (!callbacks) {
            return;
          }
          var length = callbacks.length;
          for (var i = 1; i < length; i++) {
            callbacks[i](reason);
          }
          // internal callback to reject the promise
          callbacks[0](reason);
          callbacks = null;
        };
      }

      return promise;
    }

    function findTargetIndex(observer) {
      var observers = this._observers;
      if(!observers){
        return -1;
      }
      var len = observers.length;
      for (var i = 0; i < len; i++) {
        if (observers[i]._target === observer) return i;
      }
      return -1;
    }

    // Attention, function return type now is array, always !
    // It has zero elements if no any matches found and one or more
    // elements (leafs) if there are matches
    //
    function searchListenerTree(handlers, type, tree, i, typeLength) {
      if (!tree) {
        return null;
      }

      if (i === 0) {
        var kind = typeof type;
        if (kind === 'string') {
          var ns, n, l = 0, j = 0, delimiter = this.delimiter, dl = delimiter.length;
          if ((n = type.indexOf(delimiter)) !== -1) {
            ns = new Array(5);
            do {
              ns[l++] = type.slice(j, n);
              j = n + dl;
            } while ((n = type.indexOf(delimiter, j)) !== -1);

            ns[l++] = type.slice(j);
            type = ns;
            typeLength = l;
          } else {
            type = [type];
            typeLength = 1;
          }
        } else if (kind === 'object') {
          typeLength = type.length;
        } else {
          type = [type];
          typeLength = 1;
        }
      }

      var listeners= null, branch, xTree, xxTree, isolatedBranch, endReached, currentType = type[i],
          nextType = type[i + 1], branches, _listeners;

      if (i === typeLength && tree._listeners) {
        //
        // If at the end of the event(s) list and the tree has listeners
        // invoke those listeners.
        //
        if (typeof tree._listeners === 'function') {
          handlers && handlers.push(tree._listeners);
          return [tree];
        } else {
          handlers && handlers.push.apply(handlers, tree._listeners);
          return [tree];
        }
      }

      if (currentType === '*') {
        //
        // If the event emitted is '*' at this part
        // or there is a concrete match at this patch
        //
        branches= ownKeys(tree);
        n= branches.length;
        while(n-->0){
          branch= branches[n];
          if (branch !== '_listeners') {
            _listeners = searchListenerTree(handlers, type, tree[branch], i + 1, typeLength);
            if(_listeners){
              if(listeners){
                listeners.push.apply(listeners, _listeners);
              }else {
                listeners = _listeners;
              }
            }
          }
        }
        return listeners;
      } else if (currentType === '**') {
        endReached = (i + 1 === typeLength || (i + 2 === typeLength && nextType === '*'));
        if (endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = searchListenerTree(handlers, type, tree, typeLength, typeLength);
        }

        branches= ownKeys(tree);
        n= branches.length;
        while(n-->0){
          branch= branches[n];
          if (branch !== '_listeners') {
            if (branch === '*' || branch === '**') {
              if (tree[branch]._listeners && !endReached) {
                _listeners = searchListenerTree(handlers, type, tree[branch], typeLength, typeLength);
                if(_listeners){
                  if(listeners){
                    listeners.push.apply(listeners, _listeners);
                  }else {
                    listeners = _listeners;
                  }
                }
              }
              _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
            } else if (branch === nextType) {
              _listeners = searchListenerTree(handlers, type, tree[branch], i + 2, typeLength);
            } else {
              // No match on this one, shift into the tree but not in the type array.
              _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
            }
            if(_listeners){
              if(listeners){
                listeners.push.apply(listeners, _listeners);
              }else {
                listeners = _listeners;
              }
            }
          }
        }
        return listeners;
      }else if (tree[currentType]) {
        listeners= searchListenerTree(handlers, type, tree[currentType], i + 1, typeLength);
      }

        xTree = tree['*'];
      if (xTree) {
        //
        // If the listener tree will allow any match for this part,
        // then recursively explore all branches of the tree
        //
        searchListenerTree(handlers, type, xTree, i + 1, typeLength);
      }

      xxTree = tree['**'];
      if (xxTree) {
        if (i < typeLength) {
          if (xxTree._listeners) {
            // If we have a listener on a '**', it will catch all, so add its handler.
            searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
          }

          // Build arrays of matching next branches and others.
          branches= ownKeys(xxTree);
          n= branches.length;
          while(n-->0){
            branch= branches[n];
            if (branch !== '_listeners') {
              if (branch === nextType) {
                // We know the next element will match, so jump twice.
                searchListenerTree(handlers, type, xxTree[branch], i + 2, typeLength);
              } else if (branch === currentType) {
                // Current node matches, move into the tree.
                searchListenerTree(handlers, type, xxTree[branch], i + 1, typeLength);
              } else {
                isolatedBranch = {};
                isolatedBranch[branch] = xxTree[branch];
                searchListenerTree(handlers, type, {'**': isolatedBranch}, i + 1, typeLength);
              }
            }
          }
        } else if (xxTree._listeners) {
          // We have reached the end and still on a '**'
          searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
        } else if (xxTree['*'] && xxTree['*']._listeners) {
          searchListenerTree(handlers, type, xxTree['*'], typeLength, typeLength);
        }
      }

      return listeners;
    }

    function growListenerTree(type, listener, prepend) {
      var len = 0, j = 0, i, delimiter = this.delimiter, dl= delimiter.length, ns;

      if(typeof type==='string') {
        if ((i = type.indexOf(delimiter)) !== -1) {
          ns = new Array(5);
          do {
            ns[len++] = type.slice(j, i);
            j = i + dl;
          } while ((i = type.indexOf(delimiter, j)) !== -1);

          ns[len++] = type.slice(j);
        }else {
          ns= [type];
          len= 1;
        }
      }else {
        ns= type;
        len= type.length;
      }

      //
      // Looks for two consecutive '**', if so, don't add the event at all.
      //
      if (len > 1) {
        for (i = 0; i + 1 < len; i++) {
          if (ns[i] === '**' && ns[i + 1] === '**') {
            return;
          }
        }
      }



      var tree = this.listenerTree, name;

      for (i = 0; i < len; i++) {
        name = ns[i];

        tree = tree[name] || (tree[name] = {});

        if (i === len - 1) {
          if (!tree._listeners) {
            tree._listeners = listener;
          } else {
            if (typeof tree._listeners === 'function') {
              tree._listeners = [tree._listeners];
            }

            if (prepend) {
              tree._listeners.unshift(listener);
            } else {
              tree._listeners.push(listener);
            }

            if (
                !tree._listeners.warned &&
                this._maxListeners > 0 &&
                tree._listeners.length > this._maxListeners
            ) {
              tree._listeners.warned = true;
              logPossibleMemoryLeak.call(this, tree._listeners.length, name);
            }
          }
          return true;
        }
      }

      return true;
    }

    function collectTreeEvents(tree, events, root, asArray){
       var branches= ownKeys(tree);
       var i= branches.length;
       var branch, branchName, path;
       var hasListeners= tree['_listeners'];
       var isArrayPath;

       while(i-->0){
           branchName= branches[i];

           branch= tree[branchName];

           if(branchName==='_listeners'){
               path= root;
           }else {
               path = root ? root.concat(branchName) : [branchName];
           }

           isArrayPath= asArray || typeof branchName==='symbol';

           hasListeners && events.push(isArrayPath? path : path.join(this.delimiter));

           if(typeof branch==='object'){
               collectTreeEvents.call(this, branch, events, path, isArrayPath);
           }
       }

       return events;
    }

    function recursivelyGarbageCollect(root) {
      var keys = ownKeys(root);
      var i= keys.length;
      var obj, key, flag;
      while(i-->0){
        key = keys[i];
        obj = root[key];

        if(obj){
            flag= true;
            if(key !== '_listeners' && !recursivelyGarbageCollect(obj)){
               delete root[key];
            }
        }
      }

      return flag;
    }

    function Listener(emitter, event, listener){
      this.emitter= emitter;
      this.event= event;
      this.listener= listener;
    }

    Listener.prototype.off= function(){
      this.emitter.off(this.event, this.listener);
      return this;
    };

    function setupListener(event, listener, options){
        if (options === true) {
          promisify = true;
        } else if (options === false) {
          async = true;
        } else {
          if (!options || typeof options !== 'object') {
            throw TypeError('options should be an object or true');
          }
          var async = options.async;
          var promisify = options.promisify;
          var nextTick = options.nextTick;
          var objectify = options.objectify;
        }

        if (async || nextTick || promisify) {
          var _listener = listener;
          var _origin = listener._origin || listener;

          if (nextTick && !nextTickSupported) {
            throw Error('process.nextTick is not supported');
          }

          if (promisify === undefined$1) {
            promisify = listener.constructor.name === 'AsyncFunction';
          }

          listener = function () {
            var args = arguments;
            var context = this;
            var event = this.event;

            return promisify ? (nextTick ? Promise.resolve() : new Promise(function (resolve) {
              _setImmediate(resolve);
            }).then(function () {
              context.event = event;
              return _listener.apply(context, args)
            })) : (nextTick ? process.nextTick : _setImmediate)(function () {
              context.event = event;
              _listener.apply(context, args);
            });
          };

          listener._async = true;
          listener._origin = _origin;
        }

      return [listener, objectify? new Listener(this, event, listener): this];
    }

    function EventEmitter(conf) {
      this._events = {};
      this._newListener = false;
      this._removeListener = false;
      this.verboseMemoryLeak = false;
      configure.call(this, conf);
    }

    EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

    EventEmitter.prototype.listenTo= function(target, events, options){
      if(typeof target!=='object'){
        throw TypeError('target musts be an object');
      }

      var emitter= this;

      options = resolveOptions(options, {
        on: undefined$1,
        off: undefined$1,
        reducers: undefined$1
      }, {
        on: functionReducer,
        off: functionReducer,
        reducers: objectFunctionReducer
      });

      function listen(events){
        if(typeof events!=='object'){
          throw TypeError('events must be an object');
        }

        var reducers= options.reducers;
        var index= findTargetIndex.call(emitter, target);
        var observer;

        if(index===-1){
          observer= new TargetObserver(emitter, target, options);
        }else {
          observer= emitter._observers[index];
        }

        var keys= ownKeys(events);
        var len= keys.length;
        var event;
        var isSingleReducer= typeof reducers==='function';

        for(var i=0; i<len; i++){
          event= keys[i];
          observer.subscribe(
              event,
              events[event] || event,
              isSingleReducer ? reducers : reducers && reducers[event]
          );
        }
      }

      isArray(events)?
          listen(toObject(events)) :
          (typeof events==='string'? listen(toObject(events.split(/\s+/))): listen(events));

      return this;
    };

    EventEmitter.prototype.stopListeningTo = function (target, event) {
      var observers = this._observers;

      if(!observers){
        return false;
      }

      var i = observers.length;
      var observer;
      var matched= false;

      if(target && typeof target!=='object'){
        throw TypeError('target should be an object');
      }

      while (i-- > 0) {
        observer = observers[i];
        if (!target || observer._target === target) {
          observer.unsubscribe(event);
          matched= true;
        }
      }

      return matched;
    };

    // By default EventEmitters will print a warning if more than
    // 10 listeners are added to it. This is a useful default which
    // helps finding memory leaks.
    //
    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.

    EventEmitter.prototype.delimiter = '.';

    EventEmitter.prototype.setMaxListeners = function(n) {
      if (n !== undefined$1) {
        this._maxListeners = n;
        if (!this._conf) this._conf = {};
        this._conf.maxListeners = n;
      }
    };

    EventEmitter.prototype.getMaxListeners = function() {
      return this._maxListeners;
    };

    EventEmitter.prototype.event = '';

    EventEmitter.prototype.once = function(event, fn, options) {
      return this._once(event, fn, false, options);
    };

    EventEmitter.prototype.prependOnceListener = function(event, fn, options) {
      return this._once(event, fn, true, options);
    };

    EventEmitter.prototype._once = function(event, fn, prepend, options) {
      return this._many(event, 1, fn, prepend, options);
    };

    EventEmitter.prototype.many = function(event, ttl, fn, options) {
      return this._many(event, ttl, fn, false, options);
    };

    EventEmitter.prototype.prependMany = function(event, ttl, fn, options) {
      return this._many(event, ttl, fn, true, options);
    };

    EventEmitter.prototype._many = function(event, ttl, fn, prepend, options) {
      var self = this;

      if (typeof fn !== 'function') {
        throw new Error('many only accepts instances of Function');
      }

      function listener() {
        if (--ttl === 0) {
          self.off(event, listener);
        }
        return fn.apply(this, arguments);
      }

      listener._origin = fn;

      return this._on(event, listener, prepend, options);
    };

    EventEmitter.prototype.emit = function() {
      if (!this._events && !this._all) {
        return false;
      }

      this._events || init.call(this);

      var type = arguments[0], ns, wildcard= this.wildcard;
      var args,l,i,j, containsSymbol;

      if (type === 'newListener' && !this._newListener) {
        if (!this._events.newListener) {
          return false;
        }
      }

      if (wildcard) {
        ns= type;
        if(type!=='newListener' && type!=='removeListener'){
          if (typeof type === 'object') {
            l = type.length;
            if (symbolsSupported) {
              for (i = 0; i < l; i++) {
                if (typeof type[i] === 'symbol') {
                  containsSymbol = true;
                  break;
                }
              }
            }
            if (!containsSymbol) {
              type = type.join(this.delimiter);
            }
          }
        }
      }

      var al = arguments.length;
      var handler;

      if (this._all && this._all.length) {
        handler = this._all.slice();

        for (i = 0, l = handler.length; i < l; i++) {
          this.event = type;
          switch (al) {
          case 1:
            handler[i].call(this, type);
            break;
          case 2:
            handler[i].call(this, type, arguments[1]);
            break;
          case 3:
            handler[i].call(this, type, arguments[1], arguments[2]);
            break;
          default:
            handler[i].apply(this, arguments);
          }
        }
      }

      if (wildcard) {
        handler = [];
        searchListenerTree.call(this, handler, ns, this.listenerTree, 0, l);
      } else {
        handler = this._events[type];
        if (typeof handler === 'function') {
          this.event = type;
          switch (al) {
          case 1:
            handler.call(this);
            break;
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          default:
            args = new Array(al - 1);
            for (j = 1; j < al; j++) args[j - 1] = arguments[j];
            handler.apply(this, args);
          }
          return true;
        } else if (handler) {
          // need to make copy of handlers because list can change in the middle
          // of emit call
          handler = handler.slice();
        }
      }

      if (handler && handler.length) {
        if (al > 3) {
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        }
        for (i = 0, l = handler.length; i < l; i++) {
          this.event = type;
          switch (al) {
          case 1:
            handler[i].call(this);
            break;
          case 2:
            handler[i].call(this, arguments[1]);
            break;
          case 3:
            handler[i].call(this, arguments[1], arguments[2]);
            break;
          default:
            handler[i].apply(this, args);
          }
        }
        return true;
      } else if (!this.ignoreErrors && !this._all && type === 'error') {
        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
      }

      return !!this._all;
    };

    EventEmitter.prototype.emitAsync = function() {
      if (!this._events && !this._all) {
        return false;
      }

      this._events || init.call(this);

      var type = arguments[0], wildcard= this.wildcard, ns, containsSymbol;
      var args,l,i,j;

      if (type === 'newListener' && !this._newListener) {
          if (!this._events.newListener) { return Promise.resolve([false]); }
      }

      if (wildcard) {
        ns= type;
        if(type!=='newListener' && type!=='removeListener'){
          if (typeof type === 'object') {
            l = type.length;
            if (symbolsSupported) {
              for (i = 0; i < l; i++) {
                if (typeof type[i] === 'symbol') {
                  containsSymbol = true;
                  break;
                }
              }
            }
            if (!containsSymbol) {
              type = type.join(this.delimiter);
            }
          }
        }
      }

      var promises= [];

      var al = arguments.length;
      var handler;

      if (this._all) {
        for (i = 0, l = this._all.length; i < l; i++) {
          this.event = type;
          switch (al) {
          case 1:
            promises.push(this._all[i].call(this, type));
            break;
          case 2:
            promises.push(this._all[i].call(this, type, arguments[1]));
            break;
          case 3:
            promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
            break;
          default:
            promises.push(this._all[i].apply(this, arguments));
          }
        }
      }

      if (wildcard) {
        handler = [];
        searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
      } else {
        handler = this._events[type];
      }

      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(handler.call(this));
          break;
        case 2:
          promises.push(handler.call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler.call(this, arguments[1], arguments[2]));
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          promises.push(handler.apply(this, args));
        }
      } else if (handler && handler.length) {
        handler = handler.slice();
        if (al > 3) {
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        }
        for (i = 0, l = handler.length; i < l; i++) {
          this.event = type;
          switch (al) {
          case 1:
            promises.push(handler[i].call(this));
            break;
          case 2:
            promises.push(handler[i].call(this, arguments[1]));
            break;
          case 3:
            promises.push(handler[i].call(this, arguments[1], arguments[2]));
            break;
          default:
            promises.push(handler[i].apply(this, args));
          }
        }
      } else if (!this.ignoreErrors && !this._all && type === 'error') {
        if (arguments[1] instanceof Error) {
          return Promise.reject(arguments[1]); // Unhandled 'error' event
        } else {
          return Promise.reject("Uncaught, unspecified 'error' event.");
        }
      }

      return Promise.all(promises);
    };

    EventEmitter.prototype.on = function(type, listener, options) {
      return this._on(type, listener, false, options);
    };

    EventEmitter.prototype.prependListener = function(type, listener, options) {
      return this._on(type, listener, true, options);
    };

    EventEmitter.prototype.onAny = function(fn) {
      return this._onAny(fn, false);
    };

    EventEmitter.prototype.prependAny = function(fn) {
      return this._onAny(fn, true);
    };

    EventEmitter.prototype.addListener = EventEmitter.prototype.on;

    EventEmitter.prototype._onAny = function(fn, prepend){
      if (typeof fn !== 'function') {
        throw new Error('onAny only accepts instances of Function');
      }

      if (!this._all) {
        this._all = [];
      }

      // Add the function to the event listener collection.
      if(prepend){
        this._all.unshift(fn);
      }else {
        this._all.push(fn);
      }

      return this;
    };

    EventEmitter.prototype._on = function(type, listener, prepend, options) {
      if (typeof type === 'function') {
        this._onAny(type, listener);
        return this;
      }

      if (typeof listener !== 'function') {
        throw new Error('on only accepts instances of Function');
      }
      this._events || init.call(this);

      var returnValue= this, temp;

      if (options !== undefined$1) {
        temp = setupListener.call(this, type, listener, options);
        listener = temp[0];
        returnValue = temp[1];
      }

      // To avoid recursion in the case that type == "newListeners"! Before
      // adding it to the listeners, first emit "newListeners".
      if (this._newListener) {
        this.emit('newListener', type, listener);
      }

      if (this.wildcard) {
        growListenerTree.call(this, type, listener, prepend);
        return returnValue;
      }

      if (!this._events[type]) {
        // Optimize the case of one listener. Don't need the extra array object.
        this._events[type] = listener;
      } else {
        if (typeof this._events[type] === 'function') {
          // Change to array.
          this._events[type] = [this._events[type]];
        }

        // If we've already got an array, just add
        if(prepend){
          this._events[type].unshift(listener);
        }else {
          this._events[type].push(listener);
        }

        // Check for listener leak
        if (
          !this._events[type].warned &&
          this._maxListeners > 0 &&
          this._events[type].length > this._maxListeners
        ) {
          this._events[type].warned = true;
          logPossibleMemoryLeak.call(this, this._events[type].length, type);
        }
      }

      return returnValue;
    };

    EventEmitter.prototype.off = function(type, listener) {
      if (typeof listener !== 'function') {
        throw new Error('removeListener only takes instances of Function');
      }

      var handlers,leafs=[];

      if(this.wildcard) {
        var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
        leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
        if(!leafs) return this;
      } else {
        // does not use listeners(), so no side effect of creating _events[type]
        if (!this._events[type]) return this;
        handlers = this._events[type];
        leafs.push({_listeners:handlers});
      }

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        handlers = leaf._listeners;
        if (isArray(handlers)) {

          var position = -1;

          for (var i = 0, length = handlers.length; i < length; i++) {
            if (handlers[i] === listener ||
              (handlers[i].listener && handlers[i].listener === listener) ||
              (handlers[i]._origin && handlers[i]._origin === listener)) {
              position = i;
              break;
            }
          }

          if (position < 0) {
            continue;
          }

          if(this.wildcard) {
            leaf._listeners.splice(position, 1);
          }
          else {
            this._events[type].splice(position, 1);
          }

          if (handlers.length === 0) {
            if(this.wildcard) {
              delete leaf._listeners;
            }
            else {
              delete this._events[type];
            }
          }
          if (this._removeListener)
            this.emit("removeListener", type, listener);

          return this;
        }
        else if (handlers === listener ||
          (handlers.listener && handlers.listener === listener) ||
          (handlers._origin && handlers._origin === listener)) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
          if (this._removeListener)
            this.emit("removeListener", type, listener);
        }
      }

      this.listenerTree && recursivelyGarbageCollect(this.listenerTree);

      return this;
    };

    EventEmitter.prototype.offAny = function(fn) {
      var i = 0, l = 0, fns;
      if (fn && this._all && this._all.length > 0) {
        fns = this._all;
        for(i = 0, l = fns.length; i < l; i++) {
          if(fn === fns[i]) {
            fns.splice(i, 1);
            if (this._removeListener)
              this.emit("removeListenerAny", fn);
            return this;
          }
        }
      } else {
        fns = this._all;
        if (this._removeListener) {
          for(i = 0, l = fns.length; i < l; i++)
            this.emit("removeListenerAny", fns[i]);
        }
        this._all = [];
      }
      return this;
    };

    EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

    EventEmitter.prototype.removeAllListeners = function (type) {
      if (type === undefined$1) {
        !this._events || init.call(this);
        return this;
      }

      if (this.wildcard) {
        var leafs = searchListenerTree.call(this, null, type, this.listenerTree, 0), leaf, i;
        if (!leafs) return this;
        for (i = 0; i < leafs.length; i++) {
          leaf = leafs[i];
          leaf._listeners = null;
        }
        this.listenerTree && recursivelyGarbageCollect(this.listenerTree);
      } else if (this._events) {
        this._events[type] = null;
      }
      return this;
    };

    EventEmitter.prototype.listeners = function (type) {
      var _events = this._events;
      var keys, listeners, allListeners;
      var i;
      var listenerTree;

      if (type === undefined$1) {
        if (this.wildcard) {
          throw Error('event name required for wildcard emitter');
        }

        if (!_events) {
          return [];
        }

        keys = ownKeys(_events);
        i = keys.length;
        allListeners = [];
        while (i-- > 0) {
          listeners = _events[keys[i]];
          if (typeof listeners === 'function') {
            allListeners.push(listeners);
          } else {
            allListeners.push.apply(allListeners, listeners);
          }
        }
        return allListeners;
      } else {
        if (this.wildcard) {
          listenerTree= this.listenerTree;
          if(!listenerTree) return [];
          var handlers = [];
          var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
          searchListenerTree.call(this, handlers, ns, listenerTree, 0);
          return handlers;
        }

        if (!_events) {
          return [];
        }

        listeners = _events[type];

        if (!listeners) {
          return [];
        }
        return typeof listeners === 'function' ? [listeners] : listeners;
      }
    };

    EventEmitter.prototype.eventNames = function(nsAsArray){
      var _events= this._events;
      return this.wildcard? collectTreeEvents.call(this, this.listenerTree, [], null, nsAsArray) : (_events? ownKeys(_events) : []);
    };

    EventEmitter.prototype.listenerCount = function(type) {
      return this.listeners(type).length;
    };

    EventEmitter.prototype.hasListeners = function (type) {
      if (this.wildcard) {
        var handlers = [];
        var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
        searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
        return handlers.length > 0;
      }

      var _events = this._events;
      var _all = this._all;

      return !!(_all && _all.length || _events && (type === undefined$1 ? ownKeys(_events).length : _events[type]));
    };

    EventEmitter.prototype.listenersAny = function() {

      if(this._all) {
        return this._all;
      }
      else {
        return [];
      }

    };

    EventEmitter.prototype.waitFor = function (event, options) {
      var self = this;
      var type = typeof options;
      if (type === 'number') {
        options = {timeout: options};
      } else if (type === 'function') {
        options = {filter: options};
      }

      options= resolveOptions(options, {
        timeout: 0,
        filter: undefined$1,
        handleError: false,
        Promise: Promise,
        overload: false
      }, {
        filter: functionReducer,
        Promise: constructorReducer
      });

      return makeCancelablePromise(options.Promise, function (resolve, reject, onCancel) {
        function listener() {
          var filter= options.filter;
          if (filter && !filter.apply(self, arguments)) {
            return;
          }
          self.off(event, listener);
          if (options.handleError) {
            var err = arguments[0];
            err ? reject(err) : resolve(toArray.apply(null, arguments).slice(1));
          } else {
            resolve(toArray.apply(null, arguments));
          }
        }

        onCancel(function(){
          self.off(event, listener);
        });

        self._on(event, listener, false);
      }, {
        timeout: options.timeout,
        overload: options.overload
      })
    };

    function once(emitter, name, options) {
      options= resolveOptions(options, {
        Promise: Promise,
        timeout: 0,
        overload: false
      }, {
        Promise: constructorReducer
      });

      var _Promise= options.Promise;

      return makeCancelablePromise(_Promise, function(resolve, reject, onCancel){
        var handler;
        if (typeof emitter.addEventListener === 'function') {
          handler=  function () {
            resolve(toArray.apply(null, arguments));
          };

          onCancel(function(){
            emitter.removeEventListener(name, handler);
          });

          emitter.addEventListener(
              name,
              handler,
              {once: true}
          );
          return;
        }

        var eventListener = function(){
          errorListener && emitter.removeListener('error', errorListener);
          resolve(toArray.apply(null, arguments));
        };

        var errorListener;

        if (name !== 'error') {
          errorListener = function (err){
            emitter.removeListener(name, eventListener);
            reject(err);
          };

          emitter.once('error', errorListener);
        }

        onCancel(function(){
          errorListener && emitter.removeListener('error', errorListener);
          emitter.removeListener(name, eventListener);
        });

        emitter.once(name, eventListener);
      }, {
        timeout: options.timeout,
        overload: options.overload
      });
    }

    var prototype= EventEmitter.prototype;

    Object.defineProperties(EventEmitter, {
      defaultMaxListeners: {
        get: function () {
          return prototype._maxListeners;
        },
        set: function (n) {
          if (typeof n !== 'number' || n < 0 || Number.isNaN(n)) {
            throw TypeError('n must be a non-negative number')
          }
          prototype._maxListeners = n;
        },
        enumerable: true
      },
      once: {
        value: once,
        writable: true,
        configurable: true
      }
    });

    Object.defineProperties(prototype, {
        _maxListeners: {
            value: defaultMaxListeners,
            writable: true,
            configurable: true
        },
        _observers: {value: null, writable: true, configurable: true}
    });

    if (typeof undefined$1 === 'function' && undefined$1.amd) {
       // AMD. Register as an anonymous module.
      undefined$1(function() {
        return EventEmitter;
      });
    } else {
      // CommonJS
      module.exports = EventEmitter;
    }
  }();
  });

  var WrappedGtm = /*#__PURE__*/function (_Debuggable2) {
    _inherits(WrappedGtm, _Debuggable2);

    var _super2 = _createSuper(WrappedGtm);

    function WrappedGtm() {
      var _this4;

      var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$1(this, WrappedGtm);

      _this4 = _super2.call(this, 'wrappedGtm');
      if (!window.dataLayer) return _possibleConstructorReturn(_this4);
      _this4.originalPushFunction = null;
      _this4.options = userOptions;
      _this4.onPush = _this4.onPush.bind(_assertThisInitialized(_this4));
      _this4.eventProxy = new eventemitter2.EventEmitter2();
      _this4.dataLayerClone = [];

      _this4.wrapDataLayer();

      return _this4;
    }
    /**
     * @param {string|RegExp} eventName
     * @return {*}
     */


    _createClass$1(WrappedGtm, [{
      key: "getEventData",
      value: function getEventData(eventName) {
        this.debug.log("getting event data for ".concat(eventName), {
          dataLayer: this.dataLayerClone
        });
        return this.dataLayerClone.filter(function (item) {
          return item.event && item.event.match(eventName) !== null;
        });
      }
    }, {
      key: "onPush",
      value: function onPush() {
        var _this$debug, _this$eventProxy, _this$dataLayerClone;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_this$debug = this.debug).log.apply(_this$debug, ['Data layer push event!'].concat(args));

        (_this$eventProxy = this.eventProxy).emit.apply(_this$eventProxy, ['push'].concat(args));

        if (args[0].event) {
          var _this$eventProxy2;

          (_this$eventProxy2 = this.eventProxy).emit.apply(_this$eventProxy2, [args[0].event].concat(args));
        }

        (_this$dataLayerClone = this.dataLayerClone).push.apply(_this$dataLayerClone, args);

        this.originalPushFunction.apply(this, args);
      }
    }, {
      key: "subscribeAll",
      value: function subscribeAll(callback) {
        this.eventProxy.on('push', callback);
      }
    }, {
      key: "subscribe",
      value: function subscribe(eventName, callback, options) {
        this.eventProxy.on(eventName, callback, options);
      }
    }, {
      key: "wrapDataLayer",
      value: function wrapDataLayer() {
        this.debug.log('Wrapping data layer push function');
        this.originalPushFunction = window.dataLayer.push;
        window.dataLayer.push = this.onPush;
        this.dataLayerClone = _toConsumableArray$1(window.dataLayer);
      }
    }]);

    return WrappedGtm;
  }(Debuggable);

  var DEFAULT_OPTIONS$1 = {
    embeds: {
      useUC: false
    },
    debug: false
  };
  var ConsentManager = /*#__PURE__*/function (_Debuggable) {
    _inherits(ConsentManager, _Debuggable);

    var _super = _createSuper(ConsentManager);

    /**
     * @param {object} userOptions
     * @param {WrappedGtm} gtm
     * @param {EventEmitter2} eventProxy
     */
    function ConsentManager(userOptions, gtm, eventProxy) {
      var _this;

      _classCallCheck$1(this, ConsentManager);

      _this = _super.call(this, 'ConsentManager');
      _this.gtm = gtm;
      _this.eventProxy = eventProxy;
      _this.options = {};

      _this._parseOptions(userOptions);

      _this.withConsent = _this.withConsent.bind(_assertThisInitialized(_this));
      return _this;
    }
    /**
     * @param {WrappedGtm} gtm
     * @param {string} serviceName
     *
     * @todo: move to uc class in new cmp interface along with the GTM instance
     *        and the service- / cmp- specific parts of withConsent()
     */


    _createClass$1(ConsentManager, [{
      key: "getExistingUcConsentStatus",
      value: function () {
        var _getExistingUcConsentStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(serviceName) {
          var gtm,
              relevantEvent,
              hasConsent,
              genericEvents,
              specificEvents,
              _args = arguments;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  gtm = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;

                  if (gtm) {
                    _context.next = 5;
                    break;
                  }

                  _context.next = 4;
                  return this.gtm;

                case 4:
                  gtm = _context.sent;

                case 5:
                  relevantEvent = null;
                  hasConsent = false;
                  genericEvents = gtm.getEventData('consent_status');
                  specificEvents = gtm.getEventData(new RegExp("".concat(serviceName, " .*")));
                  this.debug.log("checking events for ".concat(serviceName), {
                    genericEvents: genericEvents,
                    specificEvents: specificEvents
                  });

                  if (specificEvents.length) {
                    relevantEvent = specificEvents.pop();
                  } else if (genericEvents.length) {
                    relevantEvent = genericEvents.pop();
                  }

                  if (relevantEvent) {
                    hasConsent = relevantEvent[serviceName] || false;
                  }

                  return _context.abrupt("return", hasConsent);

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getExistingUcConsentStatus(_x) {
          return _getExistingUcConsentStatus.apply(this, arguments);
        }

        return getExistingUcConsentStatus;
      }()
      /**
       * @return {EventEmitter2}
       */

    }, {
      key: "getEventProxy",
      value: function getEventProxy() {
        return this.eventProxy;
      }
      /**
       * @return {WrappedGtm}
       */

    }, {
      key: "getGtm",
      value: function getGtm() {
        return this.gtm;
      }
      /**
       * Executes the given {callback} with {args} if and when there is user consent
       * for service {serviceName}.
       *
       * @param {string} serviceName
       * @param {function} callback
       * @param args
       *
       * @return {Promise<void>}
       */

    }, {
      key: "withConsent",
      value: function () {
        var _withConsent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(serviceName, callback) {
          var _len,
              args,
              _key,
              gtm,
              hasConsent,
              onConsentUpdate,
              _args2 = arguments;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  for (_len = _args2.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                    args[_key - 2] = _args2[_key];
                  }

                  this.debug.log('Init with consent', {
                    options: this.options,
                    serviceName: serviceName
                  });

                  if (!(this.options.embeds.useUC && serviceName)) {
                    _context2.next = 23;
                    break;
                  }

                  _context2.next = 5;
                  return this.gtm;

                case 5:
                  gtm = _context2.sent;

                  if (!(gtm && gtm instanceof WrappedGtm)) {
                    _context2.next = 20;
                    break;
                  }

                  _context2.next = 9;
                  return this.getExistingUcConsentStatus(serviceName, gtm);

                case 9:
                  hasConsent = _context2.sent;
                  this.debug.log("UC mode: service ".concat(serviceName, " has consent:"), hasConsent);

                  if (!hasConsent) {
                    _context2.next = 15;
                    break;
                  }

                  return _context2.abrupt("return", callback.apply(void 0, args));

                case 15:
                  onConsentUpdate = this._getOnConsentUpdate.apply(this, [serviceName, callback].concat(args));
                  gtm.subscribe('consent_status', onConsentUpdate);
                  gtm.subscribe("".concat(serviceName), onConsentUpdate);

                case 18:
                  _context2.next = 21;
                  break;

                case 20:
                  this.debug.error('No GTM data layer found for consent management!');

                case 21:
                  _context2.next = 24;
                  break;

                case 23:
                  this.eventProxy.on(serviceName, function () {
                    callback.apply(void 0, args);
                  });

                case 24:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function withConsent(_x2, _x3) {
          return _withConsent.apply(this, arguments);
        }

        return withConsent;
      }()
    }, {
      key: "withConsentOrDenial",
      value: function () {
        var _withConsentOrDenial = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(serviceName, callback) {
          var _len2,
              args,
              _key2,
              gtm,
              hasConsent,
              onUpdate,
              _args3 = arguments;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  for (_len2 = _args3.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                    args[_key2 - 2] = _args3[_key2];
                  }

                  this.debug.log('Init with consent or denial', {
                    options: this.options,
                    serviceName: serviceName
                  });

                  if (!(this.options.embeds.useUC && serviceName)) {
                    _context3.next = 20;
                    break;
                  }

                  _context3.next = 5;
                  return this.gtm;

                case 5:
                  gtm = _context3.sent;

                  if (!(gtm && gtm instanceof WrappedGtm)) {
                    _context3.next = 17;
                    break;
                  }

                  _context3.next = 9;
                  return this.getExistingUcConsentStatus(serviceName, gtm);

                case 9:
                  hasConsent = _context3.sent;
                  this.debug.log("UC mode: service ".concat(serviceName, " has consent:"), hasConsent);
                  callback.apply(void 0, [hasConsent].concat(args));
                  onUpdate = this._getOnUpdate(serviceName, callback);
                  gtm.subscribe('consent_status', onUpdate);
                  gtm.subscribe("".concat(serviceName), onUpdate);
                  _context3.next = 18;
                  break;

                case 17:
                  this.debug.error('No GTM data layer found for consent management!');

                case 18:
                  _context3.next = 21;
                  break;

                case 20:
                  this.eventProxy.on(serviceName, function () {
                    callback.apply(void 0, [true].concat(args));
                  });

                case 21:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function withConsentOrDenial(_x4, _x5) {
          return _withConsentOrDenial.apply(this, arguments);
        }

        return withConsentOrDenial;
      }()
    }, {
      key: "_getOnConsentUpdate",
      value: function _getOnConsentUpdate(serviceName, callback) {
        for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          args[_key3 - 2] = arguments[_key3];
        }

        return function (event) {
          if (event[serviceName]) {
            callback.apply(void 0, args);
          }
        };
      }
    }, {
      key: "_getOnUpdate",
      value: function _getOnUpdate(serviceName, callback) {
        var _this2 = this;

        for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
          args[_key4 - 2] = arguments[_key4];
        }

        return function (event) {
          _this2.debug.log('consent update!', {
            event: event,
            serviceName: serviceName
          });

          var hasConsent = !!event[serviceName];
          callback.apply(void 0, [hasConsent].concat(args));
        };
      }
    }, {
      key: "_parseOptions",
      value: function _parseOptions(userOptions) {
        this.options = _merge(DEFAULT_OPTIONS$1, userOptions);
      }
    }]);

    return ConsentManager;
  }(Debuggable);

  var DEFAULT_OPTIONS = {
    debug: false,
    selector: '[data-ghwp-uc-service]',
    hasConsentClassName: 'has-consent',
    embeds: DEFAULT_EMBED_OPTIONS.embeds,
    reloadOnConsent: false,
    clickOnConsent: false
  };
  var ElementsConsentManager = /*#__PURE__*/function (_Debuggable) {
    _inherits(ElementsConsentManager, _Debuggable);

    var _super = _createSuper(ElementsConsentManager);

    /**
     * @param {ConsentManager} consentManager
     * @param {object}         userOptions
     */
    function ElementsConsentManager(consentManager) {
      var _this;

      var userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck$1(this, ElementsConsentManager);

      _this = _super.call(this, 'ElementsConsentManager');
      _this.consentManager = consentManager;
      _this.options = {};
      _this.elements = [];
      _this.showElement = _this.showElement.bind(_assertThisInitialized(_this));

      _this.parseOptions(userOptions);

      _this.elements = $$()(_this.options.selector);

      _this.debug.log('Init:', _this.elements);

      _this.initElements();

      return _this;
    }

    _createClass$1(ElementsConsentManager, [{
      key: "initElements",
      value: function initElements() {
        var _this2 = this;

        if (!(this.elements && this.elements.length)) return;
        this.elements.forEach(function (element) {
          var _element$dataset, _element$dataset2;

          var serviceName = ((_element$dataset = element.dataset) === null || _element$dataset === void 0 ? void 0 : _element$dataset.ghwpUcService) || null;

          _this2.debug.log('Initializing element with service', {
            element: element,
            serviceName: serviceName
          });

          if (serviceName === null) return;

          _this2.consentManager.withConsent(serviceName, _this2.showElement, element).then();

          if ((_element$dataset2 = element.dataset) !== null && _element$dataset2 !== void 0 && _element$dataset2.ghwpUcModal) {
            var modalManager = new ModalGdprManager(element, {
              embeds: _this2.options.embeds,
              debug: _this2.options.debug,
              reloadOnConsent: _this2.options.reloadOnConsent,
              clickOnConsent: _this2.options.clickOnConsent,
              consentType: serviceName
            }, _this2.consentManager);
            modalManager.init();
          }
        });
      }
    }, {
      key: "parseOptions",
      value: function parseOptions(userOptions) {
        this.options = _merge(DEFAULT_OPTIONS, userOptions);
      }
    }, {
      key: "showElement",
      value: function showElement(element) {
        element.classList.add(this.options.hasConsentClassName);
      }
    }]);

    return ElementsConsentManager;
  }(Debuggable);

  exports.ConsentManager = ConsentManager;
  exports.ElementsConsentManager = ElementsConsentManager;
  exports.GdprEmbedFactory = GdprEmbedFactory;
  exports.GdprIframeEmbed = GdprIframeEmbed;
  exports.GdprLightboxEmbed = GdprLightboxEmbed;
  exports.ModalGdprManager = ModalGdprManager;
  exports.Usercentrics = Usercentrics;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
