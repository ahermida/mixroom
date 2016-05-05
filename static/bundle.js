(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":15}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":16}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":17}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":18}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":19}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":20}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":21}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":22}],9:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
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
          return _promise2.default.resolve(value).then(function (value) {
            return step("next", value);
          }, function (err) {
            return step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};
},{"babel-runtime/core-js/promise":6}],10:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],11:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"babel-runtime/core-js/object/define-property":3}],12:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("babel-runtime/core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"babel-runtime/core-js/symbol":7,"babel-runtime/core-js/symbol/iterator":8}],13:[function(require,module,exports){
(function (global){
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

module.exports = { "default": module.exports, __esModule: true };

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./runtime":14}],14:[function(require,module,exports){
(function (process,global){
"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _iterator = require("babel-runtime/core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!function (global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol = typeof _symbol2.default === "function" && _iterator2.default || "@@iterator";

  var inModule = (typeof module === "undefined" ? "undefined" : (0, _typeof3.default)(module)) === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = (0, _create2.default)((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

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

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (_setPrototypeOf2.default) {
      (0, _setPrototypeOf2.default)(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
    }
    genFun.prototype = (0, _create2.default)(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function (arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument ? _promise2.default.resolve(value.arg).then(invokeNext, invokeThrow) : _promise2.default.resolve(value).then(function (unwrapped) {
        // When a yielded Promise is resolved, its final value becomes
        // the .value of the Promise<{value,done}> result for the
        // current iteration. If the Promise is rejected, however, the
        // result for this iteration will be rejected with the same
        // reason. Note that rejections of yielded Promises are not
        // thrown back into the generator function, as is the case
        // when an awaited Promise is rejected. This difference in
        // behavior between yield and await is important, because it
        // allows the consumer to decide what to do with the yielded
        // rejection (swallow it and continue, manually .throw it back
        // into the generator, abandon iteration, whatever). With
        // await, by contrast, there is no opportunity to examine the
        // rejection reason outside the generator function, so the
        // only option is to throw it from the await expression, and
        // let the generator function handle the exception.
        result.value = unwrapped;
        return result;
      });
    }

    if ((typeof process === "undefined" ? "undefined" : (0, _typeof3.default)(process)) === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return invoke(method, arg);
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
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : new _promise2.default(function (resolve) {
        resolve(callInvokeWithMethodAndArg());
      });
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
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

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          context._sent = arg;

          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }
        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

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

  runtime.keys = function (object) {
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
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
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

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
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

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
}(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
(typeof global === "undefined" ? "undefined" : (0, _typeof3.default)(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : (0, _typeof3.default)(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : (0, _typeof3.default)(self)) === "object" ? self : undefined);
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":104,"babel-runtime/core-js/object/create":2,"babel-runtime/core-js/object/set-prototype-of":5,"babel-runtime/core-js/promise":6,"babel-runtime/core-js/symbol":7,"babel-runtime/core-js/symbol/iterator":8,"babel-runtime/helpers/typeof":12}],15:[function(require,module,exports){
var core  = require('../../modules/_core')
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};
},{"../../modules/_core":30}],16:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":30,"../../modules/es6.object.create":93}],17:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":30,"../../modules/es6.object.define-property":94}],18:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;
},{"../../modules/_core":30,"../../modules/es6.object.keys":95}],19:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":30,"../../modules/es6.object.set-prototype-of":96}],20:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/_core').Promise;
},{"../modules/_core":30,"../modules/es6.object.to-string":97,"../modules/es6.promise":98,"../modules/es6.string.iterator":99,"../modules/web.dom.iterable":101}],21:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":30,"../../modules/es6.object.to-string":97,"../../modules/es6.symbol":100}],22:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks')('iterator');
},{"../../modules/_wks":90,"../../modules/es6.string.iterator":99,"../../modules/web.dom.iterable":101}],23:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],24:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],25:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],26:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":49}],27:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":83,"./_to-iobject":85,"./_to-length":86}],28:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":29,"./_wks":90}],29:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],30:[function(require,module,exports){
var core = module.exports = {version: '2.2.2'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],31:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":23}],32:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],33:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":38}],34:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":40,"./_is-object":49}],35:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],36:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":66,"./_object-keys":69,"./_object-pie":70}],37:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":30,"./_ctx":31,"./_global":40,"./_hide":42}],38:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],39:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./_an-object":26,"./_ctx":31,"./_is-array-iter":47,"./_iter-call":50,"./_to-length":86,"./core.get-iterator-method":91}],40:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],41:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],42:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":33,"./_object-dp":61,"./_property-desc":72}],43:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":40}],44:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":33,"./_dom-create":34,"./_fails":38}],45:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],46:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":29}],47:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":55,"./_wks":90}],48:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":29}],49:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],50:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":26}],51:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":42,"./_object-create":60,"./_property-desc":72,"./_set-to-string-tag":77,"./_wks":90}],52:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":37,"./_has":41,"./_hide":42,"./_iter-create":51,"./_iterators":55,"./_library":57,"./_object-gpo":67,"./_redefine":74,"./_set-to-string-tag":77,"./_wks":90}],53:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":90}],54:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],55:[function(require,module,exports){
module.exports = {};
},{}],56:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":69,"./_to-iobject":85}],57:[function(require,module,exports){
module.exports = true;
},{}],58:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":38,"./_has":41,"./_is-object":49,"./_object-dp":61,"./_uid":89}],59:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, fn;
  if(isNode && (parent = process.domain))parent.exit();
  while(head){
    fn = head.fn;
    fn(); // <- currently we use it only for Promise - try / catch not required
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = true
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = !toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function(fn){
  var task = {fn: fn, next: undefined};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./_cof":29,"./_global":40,"./_task":82}],60:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};
},{"./_an-object":26,"./_dom-create":34,"./_enum-bug-keys":35,"./_html":43,"./_object-dps":62,"./_shared-key":78}],61:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":26,"./_descriptors":33,"./_ie8-dom-define":44,"./_to-primitive":88}],62:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":26,"./_descriptors":33,"./_object-dp":61,"./_object-keys":69}],63:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":33,"./_has":41,"./_ie8-dom-define":44,"./_object-pie":70,"./_property-desc":72,"./_to-iobject":85,"./_to-primitive":88}],64:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":65,"./_to-iobject":85}],65:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":35,"./_object-keys-internal":68}],66:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],67:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":41,"./_shared-key":78,"./_to-object":87}],68:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":27,"./_has":41,"./_shared-key":78,"./_to-iobject":85}],69:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":35,"./_object-keys-internal":68}],70:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],71:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":30,"./_export":37,"./_fails":38}],72:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],73:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":42}],74:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":42}],75:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":26,"./_ctx":31,"./_is-object":49,"./_object-gopd":63}],76:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , core        = require('./_core')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":30,"./_descriptors":33,"./_global":40,"./_object-dp":61,"./_wks":90}],77:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":41,"./_object-dp":61,"./_wks":90}],78:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":79,"./_uid":89}],79:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":40}],80:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":23,"./_an-object":26,"./_wks":90}],81:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":32,"./_to-integer":84}],82:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":29,"./_ctx":31,"./_dom-create":34,"./_global":40,"./_html":43,"./_invoke":45}],83:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":84}],84:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],85:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":32,"./_iobject":46}],86:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":84}],87:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":32}],88:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":49}],89:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],90:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';
module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};
},{"./_global":40,"./_shared":79,"./_uid":89}],91:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":28,"./_core":30,"./_iterators":55,"./_wks":90}],92:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":24,"./_iter-define":52,"./_iter-step":54,"./_iterators":55,"./_to-iobject":85}],93:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":37,"./_object-create":60}],94:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":33,"./_export":37,"./_object-dp":61}],95:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":69,"./_object-sap":71,"./_to-object":87}],96:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":37,"./_set-proto":75}],97:[function(require,module,exports){

},{}],98:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , anObject           = require('./_an-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , setProto           = require('./_set-proto').set
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":23,"./_an-instance":25,"./_an-object":26,"./_classof":28,"./_core":30,"./_ctx":31,"./_export":37,"./_for-of":39,"./_global":40,"./_is-object":49,"./_iter-detect":53,"./_library":57,"./_microtask":59,"./_redefine-all":73,"./_set-proto":75,"./_set-species":76,"./_set-to-string-tag":77,"./_species-constructor":80,"./_task":82,"./_wks":90}],99:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":52,"./_string-at":81}],100:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , core           = require('./_core')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = gOPD(it = toIObject(it), key = toPrimitive(key, true));
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , replacer, $replacer;
  while(arguments.length > i)args.push(arguments[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var BUGGY_JSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
for(var symbols = (
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; ){
  var key     = symbols[i++]
    , Wrapper = core.Symbol
    , sym     = wks(key);
  if(!(key in Wrapper))dP(Wrapper, key, {value: USE_NATIVE ? sym : wrap(sym)});
};

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
if(!QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild)setter = true;

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || BUGGY_JSON), 'JSON', {stringify: $stringify});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":26,"./_core":30,"./_descriptors":33,"./_enum-keys":36,"./_export":37,"./_fails":38,"./_global":40,"./_has":41,"./_hide":42,"./_is-array":48,"./_keyof":56,"./_library":57,"./_meta":58,"./_object-create":60,"./_object-dp":61,"./_object-gopd":63,"./_object-gopn":65,"./_object-gopn-ext":64,"./_object-gops":66,"./_object-pie":70,"./_property-desc":72,"./_redefine":74,"./_set-to-string-tag":77,"./_shared":79,"./_to-iobject":85,"./_to-primitive":88,"./_uid":89,"./_wks":90}],101:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":40,"./_hide":42,"./_iterators":55,"./_wks":90,"./es6.array.iterator":92}],102:[function(require,module,exports){
;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());

},{}],103:[function(require,module,exports){
// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
module.exports = self.fetch.bind(self);

},{"whatwg-fetch":105}],104:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],105:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function Body() {
    this.bodyUsed = false


    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return;
      }

      xhr.onload = function() {
        var status = (xhr.status === 1223) ? 204 : xhr.status
        if (status < 100 || status > 599) {
          reject(new TypeError('Network request failed'))
          return
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}],106:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require("../config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//just in case our context is unavailable
var that = that || {};

//check if we're in a browser or not
var isNode = _config2.default.isNode;

//get cookie passed in by config
function getCookie(cname) {

  //cookie string from source
  var cookie = "";
  if (isNode) {
    if (that && that.headers && that.headers.cookie) {
      cookie = that.headers.cookie;
    }
  } else {
    cookie = document.cookie;
  }

  var name = cname + "=";
  var ca = cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return cookie;
}

//get access_token from cookie
var token = getCookie('access_token');

exports.default = token;

},{"../config.js":110}],107:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.getGroup = getGroup;
exports.getGroupInfo = getGroupInfo;
exports.getPopular = getPopular;
exports.createGroup = createGroup;
exports.deleteGroup = deleteGroup;
exports.getAuth = getAuth;
exports.addAdmin = addAdmin;
exports.rmAdmin = rmAdmin;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _cookie = require('./cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//check if we're in a browser or not
var isNode = _config2.default.isNode;

//default expects api to be running on localhost:8000
/*
  groups ajax utility functions #touchtips -- all are async functions
*/
var apihost = _config2.default.api;

//=============================================================================
//                              /group/ Routes
//=============================================================================

//make header for request
function makeHeaders(token, json) {
  var headers = {};
  if (token) {
    headers['access_token'] = token;
  }
  if (json) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

/**
 * [Async] -- Get Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getGroup('group', 0);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function getGroup(grp, pg) {
  var endpoint = "/group/";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({
      group: grp,
      page: pg
    })
  });
}

/**
 * [Async] -- Get Group Info
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getGroup('group', 0);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function getGroupInfo(grp) {
  var endpoint = "/group/info";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({
      group: grp
    })
  });
}

/**
 * [Async] -- Get Popular Threads
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getGroup('group', 0);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function getPopular(pg) {
  var endpoint = "/group/popular";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({
      skip: pg
    })
  });
}

/**
 * [Async] -- Make Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await createGroup('group', false);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function createGroup(grp, anon) {
  var endpoint = "/group/modify";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({
      group: grp,
      anonymous: anon
    })
  });
}

/**
 * [Async] -- Delete Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await deleteGroup('group');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function deleteGroup(grp) {
  var endpoint = "/group/modify";
  //Send Request
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'DELETE',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({ group: grp })
  });
}

/**
 * [Async] -- Get User Auth for Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await deleteGroup('group');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function getAuth(grp) {
  var endpoint = "/group/auth";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({ 'group': grp })
  });
}

/**
 * [Async] -- Add Admin to Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await addAdmin('group', 'userid');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function addAdmin(grp, usr) {
  var endpoint = "/group/modify";
  //Send Request
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({ group: grp, user: usr })
  });
}

/**
 * [Async] -- Remove Admin from Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await rmAdmin('group', 'userid');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function rmAdmin(grp, usr) {
  var endpoint = "/group/modify";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'PUT',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({ group: grp, user: usr })
  });
}

},{"../config.js":110,"./cookie.js":106,"babel-runtime/core-js/json/stringify":1,"isomorphic-fetch":103}],108:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.getThread = getThread;
exports.createThread = createThread;
exports.rmThread = rmThread;
exports.threadLength = threadLength;
exports.post = post;
exports.editPost = editPost;
exports.rmPost = rmPost;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _cookie = require('./cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//check if we're in a browser or not
var isNode = _config2.default.isNode;

//default expects api to be running on localhost:8000
/*
  thread and post functions -- ajax utility functions #touchtips -- all are async functions
*/
var apihost = _config2.default.api;

//=============================================================================
//                              /thread/ Routes
//=============================================================================

//make header for request
function makeHeaders(token, json) {
  var headers = {};
  if (token) {
    headers['access_token'] = token;
  }
  if (json) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

/**
 * [Async] -- Get Thread
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getThread('thread');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function getThread(thrd) {
  var endpoint = "/thread/";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({
      thread: thrd
    })
  });
}

/**
 * [Async] -- make thread
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await createThread("test","hello","test","linkhere",false);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function createThread(grp, bdy, authr, cont, contType, anon) {
  var endpoint = "/thread/modify";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({
      group: grp,
      body: bdy,
      author: authr,
      content: cont,
      contentType: contType,
      anonymous: anon
    })
  });
}

/**
 * [Async] -- remove thread
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     await rmThread("thread");
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function rmThread(thrd, id) {
  var endpoint = "/thread/modify";
  if (!id) {
    //Send Request
    return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
      method: 'DELETE',
      mode: 'cors',
      redirect: 'error',
      headers: new Headers(makeHeaders(_cookie2.default, true)),
      body: (0, _stringify2.default)({
        thread: thrd
      })
    });
  } else {
    //Send Request
    return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
      method: 'DELETE',
      mode: 'cors',
      redirect: 'error',
      headers: new Headers(makeHeaders(_cookie2.default, true)),
      body: (0, _stringify2.default)({
        thread: thrd,
        id: id
      })
    });
  }
}

/**
 * [Async] -- Get Thread's length
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     await threadLength("thread");
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function threadLength(thrd) {
  var endpoint = "/thread/length";
  //Send Request
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({
      thread: thrd
    })
  });
}

/**
 * [Async] -- Post to thread
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await post("thread","bdy", "cont", respTo, false, ".mp4");
 *     console.log(data);
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function post(thrd, identity, bdy, cont, respTo, anon, contType) {
  var endpoint = "/thread/post";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({
      thread: thrd,
      body: bdy,
      author: identity,
      content: cont,
      responseTo: respTo,
      anonymous: anon,
      contentType: contType
    })
  });
}

/**
 * [Async] -- Edit post in thread
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await editPost("pstid1", "this is a cool new post");
 *     console.log(data);
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function editPost(pst, bdy) {
  var endpoint = "/thread/post";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'PUT',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({
      post: pst,
      body: bdy
    })
  });
}

/**
 * [Async] -- Delete post in thread
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     await rmPost("pstid1");
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function rmPost(pst) {
  var endpoint = "/thread/post";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'DELETE',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({
      post: pst
    })
  });
}

},{"../config.js":110,"./cookie.js":106,"babel-runtime/core-js/json/stringify":1,"isomorphic-fetch":103}],109:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.getUser = getUser;
exports.getSaved = getSaved;
exports.addName = addName;
exports.saveThread = saveThread;
exports.unsaveThread = unsaveThread;
exports.getUserThreads = getUserThreads;
exports.addUsername = addUsername;
exports.changeUsername = changeUsername;
exports.rmUsername = rmUsername;
exports.getNotifications = getNotifications;
exports.getFriends = getFriends;
exports.addFriend = addFriend;
exports.acceptFriend = acceptFriend;
exports.unfriend = unfriend;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _cookie = require('./cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//check if we're in a browser or not
var isNode = _config2.default.isNode;

//default expects api to be running on localhost:8000
/*
  user functions -- ajax utility functions #touchtips -- all are async functions
*/
var apihost = _config2.default.api;

//=============================================================================
//                              /user/ Routes
//=============================================================================

/**
 * [Async] -- gets a user's data
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getUser();
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function getUser() {
  var endpoint = "/user/";
  if (!_cookie2.default) {
    return;
  } else {
    return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
      method: 'GET',
      mode: 'no-cors',
      redirect: 'error',
      headers: new Headers({
        'access_token': _cookie2.default
      })
    });
  }
}

/**
 * [Async] -- gets a user's saved threads
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getSaved();
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function getSaved() {
  var endpoint = "/user/saved";
  if (!_cookie2.default) {
    return;
  } else {
    return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
      method: 'GET',
      mode: 'no-cors',
      redirect: 'error',
      headers: new Headers({
        'access_token': _cookie2.default
      })
    });
  }
}

/**
 * [Async] -- add a name to a user's account
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await addName('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function addName(nm) {
  if (!_cookie2.default) {
    return;
  }
  var endpoint = "/user/name";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': _cookie2.default
    }),
    body: (0, _stringify2.default)({
      name: nm
    })
  });
}

/**
 * [Async] -- save a thread for a given user
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await saveThread('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function saveThread(mthread) {
  if (!_cookie2.default) {
    return;
  }
  var endpoint = "/user/saved";

  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': _cookie2.default
    }),
    body: (0, _stringify2.default)({
      thread: mthread
    })
  });
}

/**
 * [Async] -- unsave a thread for a given user
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await unsaveThread('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function unsaveThread(mthread) {
  if (!_cookie2.default) {
    return;
  }
  var endpoint = "/user/saved";

  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'PUT',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': _cookie2.default
    }),
    body: (0, _stringify2.default)({
      thread: mthread
    })
  });
}

/**
 * [Async] -- Get a user's 'feed' (reluctant to use this word)
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getUserThreads('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function getUserThreads(page) {
  if (!_cookie2.default) {
    return;
  }
  var endpoint = "/user/saved";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': _cookie2.default
    }),
    body: (0, _stringify2.default)({
      page: page
    })
  });
}

/**
 * [Async] -- Add a username for a given user id
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await addUsername('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function addUsername(usrname) {
  if (!_cookie2.default) {
    return;
  }
  var endpoint = "/user/username";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': _cookie2.default
    }),
    body: (0, _stringify2.default)({
      username: usrname
    })
  });
}

/**
 * [Async] -- change username for a given user id to another username
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await addUsername('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function changeUsername(usrname) {
  if (!_cookie2.default) {
    return;
  }
  var endpoint = "/user/username";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'PUT',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': _cookie2.default
    }),
    body: (0, _stringify2.default)({
      username: usrname
    })
  });
}

/**
 * [Async] -- delete username for a given user id
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await rmUsername('dingdong');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function rmUsername(usrname) {
  if (!_cookie2.default) {
    return;
  }
  var endpoint = "/user/username";

  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'DELETE',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': _cookie2.default
    }),
    body: (0, _stringify2.default)({
      username: usrname
    })
  });
}

/**
 * [Async] -- get notifications for a given user id
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getNotifications();
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function getNotifications() {
  if (!_cookie2.default) {
    return;
  }
  var endpoint = "/user/notifications";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'GET',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'access_token': _cookie2.default
    })
  });
}

/**
 * [Async] -- get all friends for a given user id
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getFriends();
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function getFriends() {
  if (!_cookie2.default) {
    return;
  }
  var endpoint = "/user/friends";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'GET',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'access_token': _cookie2.default
    })
  });
}

/**
  * [Async] -- add a friend
  * @example
  * async function doStuffWithThisFunc() {
  *   try {
  *     let data = await addFriend('friendname');
  *     console.log(data)
  *   } catch(error) {
  *     console.log(error);
  *   }
  * }
  */
function addFriend(username, frnd) {
  if (!_cookie2.default) {
    return;
  }
  var endpoint = "/user/username";

  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': _cookie2.default
    }),
    body: (0, _stringify2.default)({
      username: usrname,
      friend: frnd
    })
  });
}

/**
 * [Async] -- accept a friend request
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await acceptFriend('friendname');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function acceptFriend(username, frnd) {
  if (!_cookie2.default) {
    return;
  }
  var endpoint = "/user/username";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'PUT',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': _cookie2.default
    }),
    body: (0, _stringify2.default)({
      username: usrname,
      friend: frnd
    })
  });
}

/**
 * [Async] -- unfriend
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await unfriend('friendname');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
function unfriend(username, frnd) {
  if (!_cookie2.default) {
    return;
  }
  var endpoint = "/user/username";

  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'DELETE',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': _cookie2.default
    }),
    body: (0, _stringify2.default)({
      username: usrname,
      friend: frnd
    })
  });
}

},{"../config.js":110,"./cookie.js":106,"babel-runtime/core-js/json/stringify":1,"isomorphic-fetch":103}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  api: window.location.host + '/api',
  isNode: typeof window === 'undefined'
};

},{}],111:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nav = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
  AJAX Handlers passed in as view actions
 */

/*  Handle File Upload   */
/**
 * core.js is pretty much the controller for the nav & basic app functionality
 */

var handleUpload = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(file) {
    var uploadFile, res, resp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            uploadFile = function uploadFile(file) {
              var data = new FormData();
              data.append('file', file);

              return (0, _isomorphicFetch2.default)('/upload', {
                method: 'POST',
                body: data
              });
            };

            //send request


            _context.prev = 1;
            _context.next = 4;
            return uploadFile(file);

          case 4:
            res = _context.sent;
            _context.next = 7;
            return res.json();

          case 7:
            resp = _context.sent;


            //grab response & set it in store
            _store2.default.upload = {
              content: resp.url,
              contentType: file.type
            };
            return _context.abrupt('return', true);

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](1);

            //log error, should only happen if invalid upload - type or large file
            console.log(_context.t0);
            return _context.abrupt('return', false);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 12]]);
  }));
  return function handleUpload(_x) {
    return ref.apply(this, arguments);
  };
}();

/*  Handle Form Submission  */


var handleSubmit = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var link = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var body = arguments[1];
    var to = arguments[2];
    var identity = arguments.length <= 3 || arguments[3] === undefined ? 'Anonymous' : arguments[3];

    var anon, cont, contentType, isgrp, res, resp, getPath, path, thread, responseTo, _res, _resp;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            anon = identity === 'Anonymous' ? true : false;

            //if there's no content, shove the link in there and set upload to link

            if (!_store2.default.upload.content && link) {
              if ((0, _oembed.validate)(link)) {
                _store2.default.upload = {
                  content: link,
                  contentType: 'link'
                };
              } else {
                _store2.default.upload = {
                  content: link,
                  contentType: 'text'
                };
              }
            }

            cont = _store2.default.upload.content;
            contentType = _store2.default.upload.contentType;

            //sendMentions() --> WS stuff

            isgrp = _store2.default.groups.includes(to);

            if (!isgrp) {
              _context2.next = 23;
              break;
            }

            _context2.prev = 6;
            _context2.next = 9;
            return (0, _threads.createThread)(to, body, identity, cont, contentType, anon);

          case 9:
            res = _context2.sent;
            _context2.next = 12;
            return res.json();

          case 12:
            resp = _context2.sent;


            //send this on delete or edit if we do so
            _store2.default.owned = {
              postId: resp.postId,
              id: resp.id
            };

            //clear upload in store
            _store2.default.upload = false;

            return _context2.abrupt('return');

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2['catch'](6);


            //if something went wrong, let ourselves know
            console.log(_context2.t0);

          case 21:
            _context2.next = 41;
            break;

          case 23:
            //is thread

            //get path (thread id)

            getPath = function getPath() {
              return location.pathname.split('/');
            };

            path = getPath();
            thread = to === 'this thread' ? path[path.length - 1] : to;

            //get references in body

            responseTo = getReferences(body);

            //try to send post to thread

            _context2.prev = 27;
            _context2.next = 30;
            return (0, _threads.post)(thread, identity, body, cont, responseTo, anon, contentType);

          case 30:
            _res = _context2.sent;
            _context2.next = 33;
            return _res.json();

          case 33:
            _resp = _context2.sent;


            //send this on delete or edit if we do so
            _store2.default.owned = {
              postId: _resp.postId,
              id: _resp.id
            };

            //clear upload in store
            _store2.default.upload = false;

            _context2.next = 41;
            break;

          case 38:
            _context2.prev = 38;
            _context2.t1 = _context2['catch'](27);


            //if something went wrong in trying to post it, let ourselves know
            console.log(_context2.t1);

          case 41:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[6, 18], [27, 38]]);
  }));
  return function handleSubmit(_x2, _x3, _x4, _x5) {
    return ref.apply(this, arguments);
  };
}();

//options are functions passed into view handlers


exports.getReferences = getReferences;
exports.default = start;

var _navv = require('./navv.js');

var _navv2 = _interopRequireDefault(_navv);

var _store = require('./store.js');

var _store2 = _interopRequireDefault(_store);

var _threads = require('../ajax/threads.js');

var _fastclick = require('fastclick');

var _fastclick2 = _interopRequireDefault(_fastclick);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _oembed = require('./oembed.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  'handleUpload': handleUpload,
  'handleSubmit': handleSubmit
};

//create view obj
var nav = exports.nav = new _navv2.default(_store2.default.groups, _store2.default.user, options);;

//export extract references function
function getReferences(body) {
  //regex for reference (post: 12312)
  var ref = /\(post:(.*?)\)/g;
  var idrefs = void 0;
  var matches = body.match(ref);
  if (matches) {
    idrefs = matches.map(function (match) {
      return match.slice(6, -1).trim();
    });
  }
  return idrefs || [];
}

//initialize the core app
function start() {

  //adjust click events for mobile taps
  (0, _fastclick2.default)(document.body);

  //bind handlers for base app
  nav.bind();
}

},{"../ajax/threads.js":108,"./navv.js":113,"./oembed.js":114,"./store.js":116,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13,"fastclick":102,"isomorphic-fetch":103}],112:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$id = $id;
exports.qs = qs;
exports.qsa = qsa;
exports.$on = $on;
exports.getContext = getContext;

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Don't run into any naming issues with node
if (!_config2.default.isNode) {

  // Foreach on node list
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// Get element by id
/**
 * helper functions for client side events
 */
function $id(id) {
  return document.getElementById(id);
}

// Get elements by selector
function qs(selector) {
  return document.querySelector(selector);
}

// Get all with a given id
function qsa(selector) {
  return document.querySelectorAll(selector);
}

// addEventListener wrapped
function $on(target, type, callback, useCapture) {
  target.addEventListener(type, callback, !!useCapture);
}

//get context in writer
function getContext() {

  //if the route equals search, user, or '' --> set writer target to /random/
  var defaultRandom = ['search', 'user', ''];
  var loc = location.pathname.substring(1).split('/');
  defaultRandom.forEach(function (item) {
    if (loc[0] === item) {
      return '/random/';
    }
  });

  //checks for /group/t/:here <=
  if (loc[2]) {
    return 'this thread';
  } else if (loc[0]) {
    return '/' + loc[0] + '/';
  }

  //if none of the above, default to /random/
  return '/random/';
}

},{"../config.js":110}],113:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _helpers = require('./helpers.js');

var _router = require('../router/router.js');

var _router2 = _interopRequireDefault(_router);

var _template = require('./template.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View = function () {

		//pass in top groups and user -- with username, id, notifications

		function View(groups, user, options) {
				var _this = this;

				(0, _classCallCheck3.default)(this, View);


				//get functions from options
				this.handleUpload = options.handleUpload;
				this.handleSubmit = options.handleSubmit;

				//set data
				this.groups = groups;
				this.user = user;

				//set base view data -- core to component
				this._openMenu = false;
				this._openWriter = false;
				this._hiddenWriter = false;
				this._openSearch = false;

				//event.keyCode code for enter is 13
				var ENTER_KEY = 13;

				//get a reference to DOM elements we need
				this.$nav = (0, _helpers.$id)('navbar');
				this.$pencil = (0, _helpers.$id)('TopNav-post');
				this.$search = (0, _helpers.$id)('TopNav-search');
				this.$menu = (0, _helpers.$id)('TopNav-menu');
				this.$menuicon = (0, _helpers.$id)('TopNav-menu-icon');
				this.$searchbox = (0, _helpers.$id)('TopNav-searchbox-box');
				this.$searchboxBg = (0, _helpers.$id)('TopNav-searchbox-bg');
				this.$searchboxExit = (0, _helpers.$id)('TopNav-searchbox-exit');
				this.$searchboxClear = (0, _helpers.$id)('TopNav-searchbox-clear');

				//account for references to later objects
				this.$writermount = null;
				this.$savebutton = null;
				this.$cancelbutton = null;
				this.$fileSubmit = null;
				this.$submitIcon = null;
				this.$submit = null;
				this.$group = null;
				this.$identity = null;
				this.$body = null;
				this.$link = null;
				this.$writerhead = null;
				this.$menubg = null;

				//setup commands for view actions
				this.viewCommands = {
						openWriter: function openWriter(to) {
								_this._showWriter(groups, user, _this.handleUpload, _this.handleSubmit, to);
						},
						showWriter: function showWriter(e) {
								e.preventDefault();
								_this._showWriter(groups, user, _this.handleUpload, _this.handleSubmit);
						},
						removeWriter: function removeWriter(e) {
								_this._unsetActiveBody();
								e.preventDefault();
								_this._removeWriter();
						},
						showSearch: function showSearch(e) {
								_this._setActiveBody();
								e.preventDefault();
								_this._showSearch();
						},
						clearSearch: function clearSearch(e) {
								e.stopPropagation();
								_this._clearSearch();
						},
						hideSearch: function hideSearch(e) {
								_this._unsetActiveBody();
								_this._hideSearch(e);
						},
						submitSearch: function submitSearch(e) {
								return _this._submitSearch(e);
						},
						showMenu: function showMenu(e) {
								//use this so we can see when the writer is open as opposed to menu (desktop view stuff)
								_this._setActiveBody();
								_this._showMenu(user);
						},
						removeMenu: function removeMenu(e) {
								_this._unsetActiveBody();
								_this._removeMenu();
						}
				};
		}

		//body handlers --> this is so Mobile isn't allowed to scroll while Menu items are active


		(0, _createClass3.default)(View, [{
				key: '_setActiveBody',
				value: function _setActiveBody(type) {
						document.body.className = 'menu-active ' + (type ? type : '');
				}

				//unset body class which prevents scroll (only on mobile)

		}, {
				key: '_unsetActiveBody',
				value: function _unsetActiveBody() {
						document.body.className = '';
				}

				//bind all handlers --> we bind them to the 'this' context because that references the class

		}, {
				key: 'bind',
				value: function bind() {

						//search
						(0, _helpers.$on)(this.$search, 'click', this.viewCommands.showSearch.bind(this), false);

						//hide search on outside click
						(0, _helpers.$on)(this.$searchboxBg, 'click', this.viewCommands.hideSearch.bind(this), false);

						//do nothing on touchmove
						(0, _helpers.$on)(this.$searchboxBg, 'touchmove', function (e) {
								return e.preventDefault();
						}, false);

						//do nothing on searchbox click
						(0, _helpers.$on)(this.$searchbox, 'click', function (e) {
								return e.stopPropagation();
						}, false);

						//hide search from button
						(0, _helpers.$on)(this.$searchboxExit, 'click', this.viewCommands.hideSearch.bind(this), false);

						//clear search
						(0, _helpers.$on)(this.$searchboxClear, 'click', this.viewCommands.clearSearch.bind(this), false);

						//keyup for search (send on enter)
						(0, _helpers.$on)(this.$searchbox, 'keyup', this._handleSearch.bind(this), false);

						//show writer
						(0, _helpers.$on)(this.$pencil, 'click', this.viewCommands.showWriter.bind(this), false);

						//show menu
						(0, _helpers.$on)(this.$menu, 'click', this.viewCommands.showMenu.bind(this), false);
				}

				//Exposes the writer-opening action -- allowing target to be dynamically set

		}, {
				key: 'openWriter',
				value: function openWriter(to) {

						//set target to 'to'
						this._showWriter(this.groups, this.user, this.handleUpload, this.handleSubmit, to);
				}

				//Exposes the writer and adds target post

		}, {
				key: 'openWriterRef',
				value: function openWriterRef(id) {
						//make sure writer is open
						if (!this._openWriter) this.openWriter();

						//now since it's open, we append the content (presumably an id)
						this.$body.value += this.$body.value ? '\n>(post: ' + id + ')\n' : '>(post: ' + id + ')\n';
				}

				//show the searchbox

		}, {
				key: '_showSearch',
				value: function _showSearch() {
						var _this2 = this;

						//set search to open
						this._openSearch = true;

						//remove menu
						if (this._openMenu) this._removeMenu();

						//allows smooth scrolling to top
						var sleep = function sleep() {
								var ms = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

								return new _promise2.default(function (resolve) {
										return setTimeout(resolve, ms);
								});
						};

						//calls the scroll-to-top action
						(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
								var Break;
								return _regenerator2.default.wrap(function _callee$(_context) {
										while (1) {
												switch (_context.prev = _context.next) {
														case 0:
																if (!(window.scrollY <= 5)) {
																		_context.next = 2;
																		break;
																}

																return _context.abrupt('return');

														case 2:
																if (!(window.scrollY > 6)) {
																		_context.next = 9;
																		break;
																}

																Break = -20 - window.scrollY / 5;

																window.scrollBy(0, Break);
																_context.next = 7;
																return sleep();

														case 7:
																_context.next = 2;
																break;

														case 9:
														case 'end':
																return _context.stop();
												}
										}
								}, _callee, _this2);
						}))();

						//remove hide from element's classname --> show searchbox
						this.$searchboxBg.className = '';

						//focus searchbox after opening it
						this.$searchbox.focus();
				}

				//submit search on enter key hit

		}, {
				key: '_handleSearch',
				value: function _handleSearch(e) {
						if (e.keyCode === this.ENTER_KEY) {
								//transition to search view
								//router.doSearch(e.target.value)

						}
				}

				//clears searchbox on click

		}, {
				key: '_clearSearch',
				value: function _clearSearch() {

						//clears the searchbox
						this.$searchbox.value = '';
				}

				//hide the searchbox once more

		}, {
				key: '_hideSearch',
				value: function _hideSearch(e) {

						//set unset openSearch
						this._openSearch = false;

						/*
       since we don't have an event that we can stop from propating to close form,
       we'll just cut it if the id of the click event target is the box
      */
						//if (e.target.id === 'TopNav-searchbox-box') return;

						//add hide to element's class (back to normal)
						this.$searchboxBg.className = "hide";
				}

				//show the writer box, created dynamically

		}, {
				key: '_showWriter',
				value: function _showWriter(groups, user, handleUpload, handleSubmit) {
						var _this3 = this;

						var to = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];


						//remove menu if it's open
						if (this._openMenu) this._removeMenu();

						//if writer isn't in the DOM
						if (!this._openWriter && !this._hiddenWriter) {
								(function () {

										//handle sending the form -- slightly wrapped AJAX version

										var handleSend = function handleSend() {

												//no empty posts
												if (!this.$body.value.length && !this.$link.value) return;

												//set the targeted group to the full 'to' value, as opposed to the cutoff version
												var grp = this.$group.value === (0, _template.cutoff)(to) ? to : this.$group.value;

												//send request
												handleSubmit(this.$link.value, this.$body.value, grp, this.$identity.value);

												//remove writer from view entirely
												this._removeWriter();

												//reload the location --> feels more like it's doing something IMO
												_router2.default.check();
										};

										//handle hiding the writer


										var handleHide = function handleHide() {
												this._hiddenWriter = true;
												this._openWriter = false;
												writerMount.className = 'hide';
												this._unsetActiveBody();
										};

										//let ourselves know that we uploaded a file successfully


										var handleContent = function handleContent(e) {
												var _this4 = this;

												var res = handleUpload(this.$fileSubmit.files[0]);
												res.then(function (success) {
														if (success) return _this4.$submitIcon.className = 'icon icon-check';

														//else set icon to icon x -- set
														_this4.$submitIcon.className = 'icon icon-cancel';
														_this4.$submitIcon.style.color = 'red';

														window.setTimeout(function () {
																_this4.$submitIcon.className = 'icon icon-camera';
																_this4.$submitIcon.style.color = '';
														}, 3000);
												});
										};

										//handle hover event for fullscreen writer


										var onTitleClick = function onTitleClick(e) {
												this.$writermount.classList.contains('originalWriter') ? this.$writermount.classList.remove('originalWriter') : this.$writermount.classList.add('originalWriter');
										};

										//set writer to open
										_this3._openWriter = true;

										//stop scroll on body
										_this3._setActiveBody('writemode');

										//element that we'll use to get the writer
										var writerMount = document.createElement('div');

										//set new element's id
										writerMount.id = "TopNav-writer-mount";

										//generate writer from the template
										var writer = (0, _template.generateWriter)(groups, user.usernames, to);

										//set div's contents to the above
										writerMount.innerHTML = writer;

										//append writer
										_this3.$nav.appendChild(writerMount);

										//set reference
										_this3.$writermount = writerMount;

										//set references to DOM elements generated by writer
										_this3.$savebutton = (0, _helpers.$id)('TopNav-writer-save');
										_this3.$cancelbutton = (0, _helpers.$id)('TopNav-writer-cancel');
										_this3.$fileSubmit = (0, _helpers.$id)('TopNav-writer-content-submit');
										_this3.$submitIcon = (0, _helpers.$id)('TopNav-writer-submit-icon');
										_this3.$submit = (0, _helpers.$id)('TopNav-writer-send');
										_this3.$group = (0, _helpers.$id)('TopNav-writer-select');
										_this3.$identity = (0, _helpers.$id)('TopNav-writer-identity-select');
										_this3.$body = (0, _helpers.$id)('TopNav-writer-input');
										_this3.$link = (0, _helpers.$id)('TopNav-writer-link-box');
										_this3.$writerhead = (0, _helpers.$id)('TopNav-writer-head');

										(0, _helpers.$on)(_this3.$cancelbutton, 'click', _this3._removeWriter.bind(_this3), false);
										(0, _helpers.$on)(_this3.$savebutton, 'click', handleHide.bind(_this3), false);
										(0, _helpers.$on)(_this3.$fileSubmit, 'change', handleContent.bind(_this3), false);
										(0, _helpers.$on)(_this3.$submit, 'click', handleSend.bind(_this3), false);
										(0, _helpers.$on)(_this3.$writermount, 'touchmove', function (e) {
												return e.preventDefault();
										}, false);
										(0, _helpers.$on)(_this3.$writerhead, 'click', onTitleClick.bind(_this3), false);
								})();
						} else {
								if (this._hiddenWriter) {
										this._hiddenWriter = false;
										this._openWriter = true;
										this._setActiveBody('writemode');
										this.$writermount.className = '';
								} else {
										this._hiddenWriter = true;
										this.$writermount.className = 'hide';
										this._unsetActiveBody();
								}
						}
				}
		}, {
				key: '_removeWriter',
				value: function _removeWriter() {
						this._openWriter = false;
						this._unsetActiveBody();

						//remove writer from view
						var writer = this.$writermount;
						if (writer) writer.parentNode.removeChild(writer);

						//reset references to writer components
						this.$writermount = null;
						this.$savebutton = null;
						this.$cancelbutton = null;
						this.$fileSubmit = null;
						this.$submitIcon = null;
						this.$submit = null;
						this.$group = null;
						this.$identity = null;
						this.$body = null;
						this.$link = null;
						this.$writerhead = null;
				}

				//this opens & closes menu!

		}, {
				key: '_showMenu',
				value: function _showMenu(user) {

						//check if menu exists --> remove it if it exists
						if (this._openMenu) {
								this.$menuicon.classList.remove('active');
								this._removeMenu();
								return;
						}

						//element that we'll use to get the menu
						var menuMount = document.createElement('nav');
						menuMount.id = "TopNav-menu-bg";

						this.$menuicon.classList.add('active');

						var menu = (0, _template.generateMenu)(user);

						//set div's contents to the above
						menuMount.innerHTML = menu;

						//append menu
						this.$nav.appendChild(menuMount);

						//get important dom elements
						var $dropdownBg = (0, _helpers.$id)('TopNav-menu-bg');
						var $dropdown = (0, _helpers.$id)('TopNav-menu-list');
						var $down = (0, _helpers.$id)('TopNav-dropdown-down');
						var $secret = (0, _helpers.$id)('TopNav-menu-secretmenu');

						//handle dropdown click
						var handleDropdown = function handleDropdown(e) {
								e.stopPropagation();
								var el = e.target.id ? e.target.id : e.target.parentNode.id;
								switch (el) {
										case 'TopNav-menu-about':
												console.log('About Hit');
												break;
										case 'TopNav-menu-username':
												console.log('Hit username');
												break;
										case 'TopNav-menu-signup':
												console.log('Hit signup');
												break;
										case 'TopNav-menu-login':
												console.log('Hit login');
												break;
										case 'TopNav-menu-faq':
												console.log('Hit faq');
												break;
										case 'TopNav-dropdown-down':
										case 'TopNav-menu-secret':
												console.log('Hit Secret');
												var hidden = $secret.className === "dropdown hide";
												hidden ? $secret.className = "dropdown" : $secret.className = "dropdown hide";
												hidden ? $down.className = "icon icon-up-open-big" : $down.className = "icon icon-down-open-big";
												break;
										case 'TopNav-menu-dragons':
												console.log('Hit dragons');
												break;
										case 'TopNav-menu-privacy':
												console.log('Hit privacy');
												break;
										case 'TopNav-menu-relevant':
												console.log('Hit relevant');
												break;
								}
						};

						//bind events here
						(0, _helpers.$on)($dropdown, 'click', handleDropdown, false);
						(0, _helpers.$on)($dropdownBg, 'click', this._removeMenu.bind(this), false);
						(0, _helpers.$on)($dropdownBg, 'touchmove', function (e) {
								return e.preventDefault();
						}, false);

						//set reference to menubg and set menu to open
						this.$menubg = menuMount;
						this._openMenu = true;
				}
		}, {
				key: '_removeMenu',
				value: function _removeMenu() {
						//unset color of menu button & remove menu
						if (this._openMenu) {
								//get $menuicon which is here too deep to reference by class
								this._unsetActiveBody();
								this._openMenu = false;
								this.$menuicon.className = "icon icon-menu";
								this.$menubg.className = "";
								this.$menubg.parentNode.removeChild(this.$menubg);
								this.$menubg = null;
						}
				}
		}]);
		return View;
}(); /**
      * navv.js is the view for the navbar and app-container
      */

exports.default = View;

},{"../router/router.js":121,"./helpers.js":112,"./template.js":117,"babel-runtime/core-js/promise":6,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/helpers/classCallCheck":10,"babel-runtime/helpers/createClass":11,"babel-runtime/regenerator":13}],114:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 oembed module -- a hacky (free) solution to oembed content
 modded for imgur links -- iframe for albums
 ex. oembed(url) -> html
*/

var isNode = _config2.default.isNode;
var apihost = isNode ? "localhost/" : window.location.host;
var endpoint = '/embed';

var validate = exports.validate = function validate(url) {
  var pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
  return pattern.test(url);
};

var extract = function extract(str) {
  var oembedUrl = void 0,
      patternMatch = void 0;

  //tried not to touch this block
  var urls = (0, _keys2.default)(providers);
  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];
    patternMatch = false;
    var ref = providers[url];
    for (var j = 0; j < ref.length; j++) {
      var re = new RegExp(ref[j]);
      if (re.test(str)) {
        patternMatch = true;
        break;
      }
    }
    if (patternMatch) {
      var estr = encodeURI(str);
      oembedUrl = url + '?url=' + estr + '&format=json';
      break;
    }
  }

  if (!oembedUrl) {
    //still a legitimate url, so let's fetch the title
    return {
      oembed: false,
      html: '<a href="' + str + '">' + str + '</a>'
    };
  } else {

    return {
      oembed: true,
      embed: function embed() {
        return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: (0, _stringify2.default)({ url: oembedUrl })
        });
      }
    };
  }
};

//whietlisted oembed providers
var providers = {
  "https://www.youtube.com/oembed": ["^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/watch.+$", "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/v/.+$", "^http(?:s)?://youtu\\.be/.+$", "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/user/.+$", "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/[^#?/]+#[^#?/]+/.+$", "^http(?:s)?://m\\.youtube\\.com/index.+$", "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/profile.+$", "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/view_play_list.+$", "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/playlist.+$"],
  "http://backend.deviantart.com/oembed": ["^http://(?:[-\\w]+\\.)?deviantart\\.com/art/.+$", "^http://fav\\.me/.+$", "^http://sta\\.sh/.+$", "^http://(?:[-\\w]+\\.)?deviantart\\.com/[^#?/]+#/d.+$"],
  "http://www.dailymotion.com/api/oembed/": ["^http://[-\\w]+\\.dailymotion\\.com/.+$"],
  "http://www.flickr.com/services/oembed/": ["^http://[-\\w]+\\.flickr\\.com/photos/.+$", "^http://flic\\.kr\\.com/.+$"],
  "http://www.vimeo.com/api/oembed.json": ["^http(?:s)?://(?:www\\.)?vimeo\\.com/.+$", "^http(?:s)?://player\\.vimeo\\.com/.+$"],
  "https://photobucket.com/oembed": ["^http://(?:[-\\w]+\\.)?photobucket\\.com/albums/.+$", "^http://(?:[-\\w]+\\.)?photobucket\\.com/groups/.+$"],
  "https://www.slideshare.net/api/oembed/2": ["^http://www\\.slideshare\\.net/.+$"],
  "https://api.twitter.com/1/statuses/oembed.json": ["^http(?:s)?://twitter\\.com/(?:#!)?[^#?/]+/status/.+$"],
  "https://soundcloud.com/oembed": ["^https://soundcloud\\.com/[^#?/]+/.+$"],
  "https://embed.spotify.com/oembed/": ["^http(?:s)?://open\\.spotify\\.com/.+$", "^http(?:s)?://spoti\\.fi/.+$"],
  "http://api.imgur.com/oembed": ["^http(?:s)?://(?:i\\.)?imgur\\.com/gallery/([^#?/]+)(?:.+)?$"]
};

//get html
var oembed = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(url) {
    var html, match, embed;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            html = void 0;
            match = void 0;

            //send request to get oembed html

            embed = function () {
              var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(url) {
                var extracted, followEmbed, content, resp, jresp;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        extracted = extract(url);

                        if (extracted.oembed) {
                          _context.next = 3;
                          break;
                        }

                        return _context.abrupt('return', extracted.html);

                      case 3:
                        _context.prev = 3;
                        followEmbed = extracted.embed;
                        //attempt to get user

                        _context.next = 7;
                        return followEmbed(url);

                      case 7:
                        content = _context.sent;
                        _context.next = 10;
                        return content.json();

                      case 10:
                        resp = _context.sent;
                        jresp = JSON.parse(resp.embed);
                        return _context.abrupt('return', jresp.html || '<a href="' + url + '">\n                              <iframe style="background-image: url(' + jresp.url + '); min-height: 400px; min-width: 100%; background-size: contain; background-size: cover;">\n                              </iframe>\n                            </a>');

                      case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](3);

                        console.log(_context.t0);

                      case 18:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined, [[3, 15]]);
              }));
              return function embed(_x2) {
                return ref.apply(this, arguments);
              };
            }();

            _context2.next = 5;
            return embed(url);

          case 5:
            return _context2.abrupt('return', _context2.sent);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));
  return function oembed(_x) {
    return ref.apply(this, arguments);
  };
}();

exports.default = oembed;

},{"../config.js":110,"babel-runtime/core-js/json/stringify":1,"babel-runtime/core-js/object/keys":4,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13,"isomorphic-fetch":103}],115:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//important for when considering DOM methods
var isNode = _config2.default.isNode;

//regex for bold text
/*
  parser.js is a function which replaces strings with markup by our particular styles

  >this would be greentext
  #this would be a title line (big text / bold)
  *bold*
  __underline__
  (post:1231231) -- ref another post (automatic on hit reply)
  @username -- mention a user by username (only)
  ~italics~
  [code]code![/code]
*/
var bold = /\*(\S*?)\*/g;
//regex for underline
var underline = /__(\S*?)__/g;
//regex for italics
var italics = /~(\S*?)~/g;
//regex for code
var code = /\[code](.*?)\[\/code]/g;
//regex for reference
var ref = /\(post:(\S*?)\)/g;
//regex for mentions
var mention = /@(\S*?)\s/g;
//regex for getting links back into place
var links = /`l`i`n`k`/g;
//regex for links ('holy grail' via Matthew O'Riordan)
var url = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;

//returns html for a given body
function parse(body) {
  //array of links that we'll keep for later
  var matches = [];
  //set urls -- fails for javascript protocol (important) --> this way links won't be broken
  body = body.replace(url, function (match, $1) {
    matches.push('<a class="Body-url" href="' + $1 + '">' + $1 + '</a>');
    return '`l`i`n`k`';
  });

  //clean body before we even parse
  body = escapeHTML(body);

  /*remove newlines between mutiline
  body.replace(code, (match) => {
    match.indexO
  });*/

  //split by newlines
  var text = body.split(/\r\n|\r|\n/);

  //don't generate title or greentext inside of code
  var wait = false;

  //deliver styles for whole-line styles -- each newline should be a p
  for (var i = 0; i < text.length; i++) {
    var txt = text[i].trim();
    if (txt.indexOf('[code]') != -1) {
      wait = !wait;
    }

    if (txt[0] === '#' && !wait) {
      text[i] = '<p class="Body-title">' + text[i] + '</p>';
    } else if (txt.indexOf('&gt;') === 0 && !wait) {
      text[i] = '<p class="Body-green">' + text[i] + '</p>';
    } else {
      text[i] = '<p>' + text[i];
    }

    if (txt.indexOf('[/code]') != -1) {
      wait = !wait;
    }
  }

  //join into one string
  var htmlbody = text.join('');

  //get safe htmlbody before we transform any other markup
  var safe = htmlbody;

  //set bold text
  htmlbody = htmlbody.replace(bold, '<b class="Body-bold">$1</b>');

  //set underline text
  htmlbody = htmlbody.replace(underline, '<em class="Body-underline">$1</em>');

  //set underline text
  htmlbody = htmlbody.replace(italics, '<i class="Body-italics">$1</i>');

  //set underline text
  htmlbody = htmlbody.replace(code, '<code class="Body-code">$1</code>');

  //set refs
  htmlbody = htmlbody.replace(ref, '<span class="Body-ref">$1</span>');

  //set mentions
  htmlbody = htmlbody.replace(mention, '<span class="Body-mention">$1</span>');

  //set links
  htmlbody = htmlbody.replace(links, function (match) {
    var mat = matches.shift();
    var rematch = mat ? mat : '';
    return rematch;
  });

  //return html wrapped in parent div
  return '<div class="Body-content">' + htmlbody + '</div>';
}

//precompile regex
var amp = /&/g;
var lt = /</g;
var gt = />/g;
var sq = /'/g;
var dq = /"/g;
var sl = /\//g;

//escape unhealthy characters in html -- SO ftw
function escapeHTML(html) {
  if (isNode) {

    //filter out bad chars
    return html.replace(amp, '&amp;').replace(lt, '&lt;').replace(gt, '&gt;').replace(sq, '&#x27').replace(dq, '&quot').replace(sl, '&#x2F');
  } else {
    var element = document.createElement('textarea');
    element.textContent = html;
    return element.innerHTML;
  }
}

},{"../config.js":110}],116:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNode = _config2.default.isNode;

//export appStore, handles general user data
/**
 * Store for core actions (particularly those caused by nav)
 */

exports.default = {
  //initialize user as anon
  _user: { anonymous: true, username: '', usernames: [] },

  //initialize groups
  _groups: ['/cs/', '/music/', '/vid/', '/bored/', '/random/'],

  //initialized owned data -- by id -- ONLY HEAD POSTS & POSTS
  _owned: function () {
    var owned = window.localStorage.getItem('_owned');
    if (owned) return JSON.parse(owned);
    return {};
  }(),

  //initialize upload data
  _uploadData: {
    contentType: "",
    content: ''
  },

  //set user data
  set user(user) {
    if (user.anonymous) {
      this._user = {
        anonymous: true,
        username: '',
        usernames: [],
        notifications: 0
      };
    } else {
      this._user = {
        username: user.username,
        anonymous: user.anonymous,
        usernames: user.usernames,
        notifications: user.notifications,
        saved: user.saved
      };
    }
  },

  //get user data
  get user() {
    return this._user;
  },

  //get groups
  set groups(groups) {
    var _this = this;

    //loop through array of groups & push them to our internal list
    groups.forEach(function (grp) {
      return _this._groups.push();
    });
  },

  //get all groups that have been added so far
  get groups() {

    //get groups from internal store
    return this._groups;
  },

  //push data to owned ids
  set owned(opts) {
    this._owned[opts.postId] = opts.id;

    if (!isNode) {
      //set owned in localStorage (the cheap way)
      window.localStorage._owned = (0, _stringify2.default)(this._owned);
    }
  },

  //retrieve owned ids
  get owned() {

    //get owned ids
    return this._owned;
  },

  set upload(c) {
    if (!c) {
      this._uploadData.content = '';
      this._uploadData.contentType = '';
    } else {
      this._uploadData.content = c.content;
      this._uploadData.contentType = c.contentType;
    }
  },

  get upload() {
    return this._uploadData;
  }
};

},{"../config.js":110,"babel-runtime/core-js/json/stringify":1}],117:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateHeadPost = exports.generatePopularPost = exports.generatePost = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 *  Group View Templates
 */

//creates a post's html

var generatePost = exports.generatePost = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(group, post, user) {
    var timestamp, postID, owned, filledpost;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            timestamp = post.created;
            postID = post.id;
            owned = (0, _keys2.default)(user.owned);
            _context.t0 = '\n    <div id="' + postID + '" class="Post">\n      <header class="Header">\n      ' + generatePostHeader(group, post.author, timestamp) + '\n      </header>\n      <div class="Content">\n      ';
            _context.next = 6;
            return generateContent(post.content, post.contentType);

          case 6:
            _context.t1 = _context.sent;
            _context.t2 = _context.t0 + _context.t1;
            _context.t3 = _context.t2 + '\n      </div>\n      <div class="Body">\n      ';
            _context.t4 = generateBody(post.body);
            _context.t5 = _context.t3 + _context.t4;
            _context.t6 = _context.t5 + '\n      </div>\n      <footer class="Footer">\n      ';
            _context.t7 = generatePostFooter(post, owned);
            _context.t8 = _context.t6 + _context.t7;
            filledpost = _context.t8 + '\n      </footer>\n    </div>\n  ';
            return _context.abrupt('return', filledpost);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function generatePost(_x, _x2, _x3) {
    return ref.apply(this, arguments);
  };
}();

//generate a *popular* section post


var generatePopularPost = exports.generatePopularPost = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(post, user) {
    var timestamp, postID, owned, poppost;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            timestamp = post.created;
            postID = post.id;
            owned = (0, _keys2.default)(user.owned);
            _context2.t0 = '\n    <div id="' + postID + '" class="PopularPost">\n      <header class="Header">\n      ' + generatePopularPostHeader(post.group, post.author, timestamp) + '\n      </header>\n      <div class="Content">\n      ';
            _context2.next = 6;
            return generateContent(post.content, post.contentType);

          case 6:
            _context2.t1 = _context2.sent;
            _context2.t2 = _context2.t0 + _context2.t1;
            _context2.t3 = _context2.t2 + '\n      </div>\n      <div class="Body">\n      ';
            _context2.t4 = generateBody(post.body);
            _context2.t5 = _context2.t3 + _context2.t4;
            _context2.t6 = _context2.t5 + '\n      </div>\n      <footer class="Footer">\n      ';
            _context2.t7 = generatePopFooter(post.size, post.thread, postID, user.user.anonymous, owned);
            _context2.t8 = _context2.t6 + _context2.t7;
            poppost = _context2.t8 + '\n      </footer>\n    </div>\n  ';
            return _context2.abrupt('return', poppost);

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return function generatePopularPost(_x4, _x5) {
    return ref.apply(this, arguments);
  };
}();

//creates a head post's html given we have the data


var generateHeadPost = exports.generateHeadPost = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(thread, user) {
    var post, threadID, timestamp, postID, ownedThreads, headpost;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            post = thread.head;
            threadID = thread.thread;
            timestamp = thread.created;
            postID = post.id;
            ownedThreads = (0, _keys2.default)(user.owned);
            _context3.t0 = '\n    <div id="' + threadID + '" class="HeadPost">\n      <header class="Header">\n      ' + generatePostHeader(thread.group, post.author, timestamp) + '\n      </header>\n      <div class="Content">\n      ';
            _context3.next = 8;
            return generateContent(post.content, post.contentType);

          case 8:
            _context3.t1 = _context3.sent;
            _context3.t2 = _context3.t0 + _context3.t1;
            _context3.t3 = _context3.t2 + '\n      </div>\n      <div class="Body">\n      ';
            _context3.t4 = generateBody(post.body);
            _context3.t5 = _context3.t3 + _context3.t4;
            _context3.t6 = _context3.t5 + '\n      </div>\n      <footer class="Footer">\n      ';
            _context3.next = 16;
            return generatePostHeadFooter(thread.size, threadID, postID, user.user.anonymous, ownedThreads);

          case 16:
            _context3.t7 = _context3.sent;
            _context3.t8 = _context3.t6 + _context3.t7;
            headpost = _context3.t8 + '\n      </footer>\n    </div>\n  ';
            return _context3.abrupt('return', headpost);

          case 20:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return function generateHeadPost(_x6, _x7) {
    return ref.apply(this, arguments);
  };
}();

//return html content section --> video or img

var generateContent = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(content, contentType) {
    var html;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(!content || contentType == "")) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt('return', "");

          case 2:
            html = void 0;

            if (!(contentType === 'link')) {
              _context4.next = 11;
              break;
            }

            _context4.next = 6;
            return (0, _oembed2.default)(content);

          case 6:
            _context4.t0 = _context4.sent;
            _context4.t1 = '<div class="Content-frame">' + _context4.t0;
            html = _context4.t1 + '</div>';
            _context4.next = 12;
            break;

          case 11:
            //treat video and images differently
            if (contentType.split('/')[0] === 'video') {
              html = '\n      <video controls="controls" muted class="Content-iv">\n        <source src="' + content + '" type="' + contentType + '">\n      </video>';
            } else if (contentType == "text") {
              html = '<h4 class="Content-text">' + content + '</h4>';
            } else {
              html = '<img class="Content-img" src="' + content + '">';
            }

          case 12:
            return _context4.abrupt('return', '<div class="Content-wrapper">' + html + '</div>');

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return function generateContent(_x8, _x9) {
    return ref.apply(this, arguments);
  };
}();

//handle body of post


//handle footer of thread post (head)

var generatePostHeadFooter = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(size, threadid, postid, anonymous, owned) {
    var length, footer;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            length = size;
            footer = '\n  <div class="Footer-content">\n    <span class="Footer-left">\n      <span class="icon-chat Footer-left-icon"></span>\n      <span class="Footer-left-size">' + (length || 0) + ' ' + (length != 1 ? 'posts' : 'post') + '</span>\n    </span>\n    <span class="Footer-right" data-post="' + postid + '" data-thread="' + threadid + '">\n      ' + (anonymous ? '' : '<span class="Footer-right-save">save</span>') + '\n      ' + generateDelete(postid, owned) + '\n      <span class="Footer-right-reply space">reply</span>\n      <span class="Footer-open space">open</span>\n    </span>\n  </div>\n  ';
            return _context5.abrupt('return', footer);

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return function generatePostHeadFooter(_x10, _x11, _x12, _x13, _x14) {
    return ref.apply(this, arguments);
  };
}();

//handle footer of thread post (head)


exports.generateMenu = generateMenu;
exports.cutoff = cutoff;
exports.generateWriter = generateWriter;
exports.generateTimestamp = generateTimestamp;

var _threads = require('../ajax/threads.js');

var _oembed = require('./oembed.js');

var _oembed2 = _interopRequireDefault(_oembed);

var _helpers = require('./helpers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Nav View Templates
 */

//get template for either user logged in or not logged in
function getUserMenu(user) {
  if (user.anonymous) {
    return '\n      <li id="TopNav-menu-signup" class="TopNav-menu-dropdown-row ddtop">\n        <span id="dd-icon-signup" class="icon icon-book ddicon">\n        </span>\n        <span class="ddtext">Signup for an account</span>\n      </li>\n      <li id="TopNav-menu-login" class="TopNav-menu-dropdown-row">\n        <span id="dd-icon-login" class="icon icon-book-open ddicon">\n        </span>\n        <span class="ddtext">Log in to your account</span>\n      </li>';
  } else {
    return '\n       <li id="TopNav-menu-username" class="TopNav-menu-dropdown-row ddtop">\n         <span id="dd-icon-user" class="icon icon-cog ddicon">\n         </span>\n         <span class="ddtext">' + user.username + '</span>\n       </li>\n       <span id="TopNav-dropdown-logout">logout</span>\n       ';
  }
}

//generate Menu
/**
 * dom template helpers
 */

function generateMenu(user) {
  //show menu -- submenu simply has class hide
  return '\n    <ul id="TopNav-menu-list" class="dropdown">\n\t\t\t' + getUserMenu(user) + '\n      <li id="TopNav-menu-about" class="TopNav-menu-dropdown-row">\n        <span id="dd-icon-about" class="icon icon-info ddicon"></span>\n        <span class="ddtext">About</span>\n      </li>\n      <li id="TopNav-menu-privacy" class="TopNav-menu-dropdown-row">\n        <span id="dd-icon-privacy" class="icon icon-chat ddicon"></span>\n        <span class="ddtext">Privacy</span>\n      </li>\n\t\t\t<li id="TopNav-menu-secret" class="TopNav-menu-dropdown-row">\n\t\t\t\t<span id="dd-icon-secret" class="icon icon-comment ddicon"></span>\n\t\t\t\t<span class="ddtext">Secret Menu</span>\n\t\t\t\t<span id="TopNav-dropdown-down" class="icon icon-down-open-big"></span>\n\t\t\t</li>\n\t\t\t<ul id="TopNav-menu-secretmenu" class="dropdown hide">\n\t\t\t\t<li id="TopNav-menu-faq" class="TopNav-menu-dropdown-row ddnested">\n\t\t\t\t\t<span id="dd-icon-faq" class="icon icon-help ddicon">\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class="ddtext">How do I use this?</span>\n\t\t\t\t</li>\n\t\t\t\t<li id="TopNav-menu-dragons" class="TopNav-menu-dropdown-row ddnested">\n\t\t\t\t\t<span id="dd-icon-dragons" class="icon icon-plus-squared ddicon">\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class="ddtext">Dragon or Wyvern?</span>\n\t\t\t\t</li>\n\t\t\t</ul>\n      <li id="TopNav-menu-relevant" class="TopNav-menu-dropdown-row">\n        <span id="dd-icon-relevant" class="icon icon-check ddicon"></span>\n        <span class="ddtext">Rules for Posting</span>\n      </li>\n    </ul>\n  ';
}

//cut off the lenght of thread id so it doesn't cover the whole screen
function cutoff(sendTo) {
  if (sendTo.length > 10) {
    return sendTo.substring(0, 12) + '...';
  }
}

function generateWriter(groups, usernames, to) {
  //set all of the groups as options
  var getTopOptions = function getTopOptions(groups) {
    return groups.map(function (grp) {
      return '<option>' + grp + '</option>';
    }).join(" ");
  };

  //set usernames as options
  var getUsernames = function getUsernames(usernames) {
    return usernames.map(function (username) {
      return '<option>' + username + '</option>';
    }).join(" ");
  };

  //show post submission form
  var writer = '\n    <div id="TopNav-writer-top">\n      <span id="TopNav-writer-save" class="icon icon-left-open-big DTReaction"></span>\n      <span id="TopNav-writer-head">new post</span>\n      <span id="TopNav-writer-cancel" class="icon icon-cancel DTReaction"></span>\n    </div>\n    <div id="TopNav-writer-link">\n      <input placeholder="submit a link (or don\'t)" id="TopNav-writer-link-box"/>\n      <span id="TopNav-writer-content">\n        <label id="TopNav-writer-submit-label" for="TopNav-writer-content-submit">\n          <span id="TopNav-writer-submit-icon" class="icon icon-camera"></span>\n          <input id="TopNav-writer-content-submit" type="file"/>\n        </label>\n      </span>\n    </div>\n    <div id="TopNav-writer-main">\n      <textarea id="TopNav-writer-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Write something here"></textarea>\n    </div>\n    <div id="TopNav-writer-identity">\n      <span>posting as</span>\n      <select id="TopNav-writer-identity-select"><option>Anonymous</option>' + getUsernames(usernames) + '</select></span>\n    </div>\n    <div id="TopNav-writer-foot">\n      <span id="TopNav-writer-group">Posting to:\n        <select id="TopNav-writer-select">\n        <option>' + (to != '' ? cutoff(to) : (0, _helpers.getContext)()) + '\n        </option>' + getTopOptions(groups) + '\n        </select></span>\n      <span id="TopNav-writer-send">send</span>\n    </div>\n  ';

  return writer;
}function generateTimestamp(timestamp) {
  //create & format timestampstring
  var ampm = '';
  var time = new Date(timestamp); // timestamp in minutes
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var minutesString = minutes < 10 ? '0' + minutes : '' + minutes;
  var hour = hours % 12 == 0 ? 12 : hours % 12;
  hours <= 12 ? ampm = 'am' : ampm = 'pm';
  var now = new Date();
  var date = '';
  if (time.getDate() != now.getDate()) {
    date = [time.getMonth() + 1, time.getDate()].join('/');
  }
  var yr = time.getFullYear();
  var fullyr = now.getFullYear() === yr ? "" : ('' + yr).slice(2, 4);
  //formatted timestamp
  return hour + ':' + minutesString + ampm + ' ' + date + ' ' + fullyr;
}

//generate the header for a post --> don't show replies if head
function generatePostHeader(group, author, created) {
  //title for each of the posts, replies should be overflow-x
  return '\n    <div class="Head-content">\n      <span class="Head-left">\n        <span class="Head-author">' + author + '</span>\n        -\n        <a class="Head-group">' + group + '</a>\n        -\n        <span class="Head-created">' + generateTimestamp(created) + '</span>\n      </span>\n      <span class="Head-rm">\n        <span class="icon-down-open-big"></span>\n      </span>\n    </div>\n  ';
}

//generate the header for a post --> don't show replies if head
function generatePopularPostHeader(group, author) {
  //title for each of the posts, replies should be overflow-x
  return '\n    <div class="Head-content">\n      <span class="Head-left">\n        <a class="Head-group">' + group + '</a>\n      </span>\n      <span class="Head-right">\n        <span class="Head-author">' + author + '</span>\n      </span>\n    </div>\n  ';
}function generateBody(str) {
  if (str) {
    return parser(str);
  } else {
    return '';
  }
}

function generateDelete(postId, owned) {
  for (var i = 0; i < owned.length; i++) {
    if (postId === owned[i]) {
      return '<span class="Footer-right-delete space">delete</span>';
    }
  }
  return '<span class="report space">report</span>';
}function generatePopFooter(size, threadid, postid, anonymous, owned) {
  var length = size;
  var footer = '\n  <div class="Footer-content">\n    <span class="Footer-left">\n      <span class="icon-chat Footer-left-icon"></span>\n      <span class="Footer-left-size">' + (length || 0) + ' ' + (length != 1 ? 'posts' : 'post') + '</span>\n    </span>\n    <span class="Footer-right" data-post="' + postid + '" data-thread="' + threadid + '">\n      <span class="Footer-right-reply space">reply</span>\n      <span class="Footer-open space">open</span>\n    </span>\n  </div>\n  ';
  return footer;
}

//handle footer of thread post (head)
function generatePostFooter(post, owned) {
  var replies = post.replies.length;
  var postid = post.id;

  //might make calls in here later -> that's why it's a function
  var footer = '\n  <div class="Footer-content">\n    <span class="Footer-left">\n      <span class="icon-chat Footer-left-icon"></span>\n      <span class="Footer-left-size">' + replies + ' replies</span>\n    </span>\n    <span class="Footer-right" data-post="' + postid + '">\n      ' + generateDelete(postid, owned) + '\n      <span class="Footer-right-reply space">reply</span>\n    </span>\n  </div>\n  ';
  return footer;
}

},{"../ajax/threads.js":108,"./helpers.js":112,"./oembed.js":114,"babel-runtime/core-js/object/keys":4,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13}],118:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var deleteThread = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(threadId, id) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _threads.rmThread)(threadId, id);

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 5]]);
  }));
  return function deleteThread(_x, _x2) {
    return ref.apply(this, arguments);
  };
}(); /**
      * group.js is a controller for group (kinda)
      */

var save = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(threadId) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _user.saveThread)(threadId);

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 5]]);
  }));
  return function save(_x3) {
    return ref.apply(this, arguments);
  };
}();

var unsave = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(threadId) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _user.unsaveThread)(threadId);

          case 3:
            _context3.next = 8;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 5]]);
  }));
  return function unsave(_x4) {
    return ref.apply(this, arguments);
  };
}();

//init for group controller (or whatever you'd like to call it)


var _groups = require('../ajax/groups.js');

var _user = require('../ajax/user.js');

var _threads = require('../ajax/threads.js');

var _store = require('../core/store.js');

var _store2 = _interopRequireDefault(_store);

var _groupv = require('./groupv.js');

var _groupv2 = _interopRequireDefault(_groupv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(group, page, auth) {
    var threads, res, jres, popular, _res, _jres, info, _res2, _jres2, user, utils, data, grp;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            threads = void 0;
            _context4.prev = 1;
            _context4.next = 4;
            return (0, _groups.getGroup)(group, page);

          case 4:
            res = _context4.sent;
            _context4.next = 7;
            return res.json();

          case 7:
            jres = _context4.sent;

            //get array of threads
            threads = jres.threads;
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](1);

            console.log(_context4.t0);

          case 14:
            popular = void 0;
            _context4.prev = 15;
            _context4.next = 18;
            return (0, _groups.getPopular)(0);

          case 18:
            _res = _context4.sent;
            _context4.next = 21;
            return _res.json();

          case 21:
            _jres = _context4.sent;

            //get array of threads
            popular = _jres.posts;
            _context4.next = 28;
            break;

          case 25:
            _context4.prev = 25;
            _context4.t1 = _context4['catch'](15);

            console.log(_context4.t1);

          case 28:
            info = void 0;
            _context4.prev = 29;
            _context4.next = 32;
            return (0, _groups.getGroupInfo)(group);

          case 32:
            _res2 = _context4.sent;
            _context4.next = 35;
            return _res2.json();

          case 35:
            _jres2 = _context4.sent;

            info = _jres2;
            _context4.next = 42;
            break;

          case 39:
            _context4.prev = 39;
            _context4.t2 = _context4['catch'](29);

            console.log(_context4.t2);

          case 42:

            //setup user so we can determine which buttons to render on each post
            user = {
              owned: _store2.default.owned,
              user: _store2.default.user,
              auth: auth
            };
            utils = {
              deleteThread: deleteThread,
              saveThread: save,
              unsaveThread: unsave
            };
            data = {
              info: info,
              popular: popular,
              threads: threads
            };

            //group administrator ? -> group settings link
            //pass threads, along with thread actions
            //thread actions: save thread, delete ?, nav to thread

            grp = new _groupv2.default(group, data, user, page, utils);

            grp.render();
            return _context4.abrupt('return', grp);

          case 48:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[1, 11], [15, 25], [29, 39]]);
  }));

  function start(_x5, _x6, _x7) {
    return ref.apply(this, arguments);
  }

  return start;
}();

},{"../ajax/groups.js":107,"../ajax/threads.js":108,"../ajax/user.js":109,"../core/store.js":116,"./groupv.js":119,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13}],119:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _helpers = require('../core/helpers.js');

var _oembed = require('../core/oembed.js');

var _oembed2 = _interopRequireDefault(_oembed);

var _template = require('../core/template.js');

var _core = require('../core/core.js');

var _router = require('../router/router.js');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//view for posts & threads

var View = function () {

  //pass in top groups and user -- with username, id, notifications

  function View(group, data, user, page, options) {
    var _this = this;

    (0, _classCallCheck3.default)(this, View);


    //set group
    this.group = group;

    //set threads --> catch null threads (like when the page is empty)
    this.threads = data.threads || [];

    //set group info
    this.info = data.info;

    //set threads
    this.popular = data.popular || [];

    //set user data
    this.user = user;

    //set page
    this.page = page;

    //utility functions for thread operations
    this.saveThread = options.saveThread;
    this.unsaveThread = options.unsaveThread;
    this.deleteThread = options.deleteThread;

    //setup commands for view actions
    this.viewCommands = {
      reply: function reply(e) {
        return _this._reply(e);
      },
      open: function open(e) {
        return _this._open(e);
      },
      group: function group(e) {
        return _this._goToGroup(e);
      },
      user: function user(e) {
        return _this._goToUser(e);
      },
      savePost: function savePost(e) {
        return _this._savePost(e);
      },
      hidePost: function hidePost(e) {
        return _this._hidePost(e);
      },
      showPost: function showPost(e) {
        return _this._showPost(e);
      },
      report: function report(e) {
        return _this._reportPost(e);
      },
      toggleBody: function toggleBody(e) {
        return _this._toggleBody(e);
      },
      nextPage: function nextPage(e) {
        return _this._nextPage(e);
      },
      prevPage: function prevPage(e) {
        return _this._prevPage(e);
      },
      delete: function _delete(e) {
        return _this._deletePost(e);
      }
    };
  }

  //binds events --> mostly delegated events up in here


  (0, _createClass3.default)(View, [{
    key: 'bind',
    value: function bind() {
      var _this2 = this;

      //get references (as elements are dynamically rendered)
      var $listing = (0, _helpers.$id)('List');
      var $prev = (0, _helpers.$id)('prevpage');
      var $next = (0, _helpers.$id)('nextpage');
      var $popular = (0, _helpers.$id)('Main-desktop-group');
      var $author = (0, _helpers.$id)('Main-desktop-author');

      //clicks on listing sections --> reuses _onPostClick for convenience
      (0, _helpers.$on)($listing, 'click', this._onPostClick.bind(this), false);
      (0, _helpers.$on)($popular, 'click', this._onPostClick.bind(this), false);
      (0, _helpers.$on)($author, 'click', function () {
        return _this2._goToUser(_this2.info.author);
      }.bind(this), false);

      //set up handlers for pagination
      if ($prev) (0, _helpers.$on)($prev, 'click', this.viewCommands.prevPage.bind(this), false);
      if ($next) (0, _helpers.$on)($next, 'click', this.viewCommands.nextPage.bind(this), false);
    }
  }, {
    key: '_postOwned',
    value: function _postOwned(id) {
      //checks if we own post (so we can add delete when we render)
      if (this.user.auth.mod) return true;
      this.user.owned.forEach(function (currId) {
        if (currId === id) return;
      });
    }
  }, {
    key: '_hidePost',
    value: function _hidePost(e) {
      e.target.className = 'icon-up-open-big';
      var target = e.target.parentNode;
      while (target.className != 'HeadPost') {
        //get headpost & remove the children we want
        target = target.parentNode;
      }
      Array.prototype.forEach.call(target.childNodes, function (node) {
        if (node.className === 'Body' || node.className === 'Content') {
          node.style.display = 'none';
        }
      });
    }
  }, {
    key: '_showPost',
    value: function _showPost(e) {
      e.target.className = 'icon-down-open-big';
      var target = e.target.parentNode;
      while (target.className != 'HeadPost') {
        target = target.parentNode;
      }
      //get headpost & show the children we want
      Array.prototype.forEach.call(target.childNodes, function (node) {
        if (node.className === 'Body' || node.className === 'Content') {
          node.style.display = 'block';
        }
      });
    }
  }, {
    key: '_prevPage',
    value: function _prevPage(e) {
      if (this.page <= 1) return _router2.default.navigate(this.group);
      _router2.default.navigate('' + this.group + --this.page);
    }
  }, {
    key: '_nextPage',
    value: function _nextPage(e) {
      _router2.default.navigate('' + this.group + ++this.page);
    }

    //handle post clicks

  }, {
    key: '_onPostClick',
    value: function _onPostClick(e) {
      var target = e.target;
      switch (target.className) {
        case 'Head-author':
          this._goToUser(target.textContent);
          break;
        case 'Head-group':
          this.viewCommands.group(e);
          break;
        case 'icon-down-open-big':
          //hacky solution to delegation tactics
          this.viewCommands.hidePost(e);
          break;
        case 'icon-up-open-big':
          //hacky solution to delegation tactics
          this.viewCommands.showPost(e);
          break;
        case 'Body':
          this.viewCommands.toggleBody(e);
          break;
        case 'report space':
          //sends request off to dev server
          this.viewCommands.report(e);
          break;
        case 'Footer-right-save space':
          //saves and unsaves posts
          this.viewCommands.savePost(e);
          break;
        case 'Footer-right-reply space':
          //opens writer with thread as target
          this.viewCommands.reply(e);
          break;
        case 'Footer-open space':
          //opens thread
          this.viewCommands.open(e);
          break;
        case 'Footer-right-delete space':
          //deletes thread
          this.viewCommands.delete(e);
          break;
        default:
          this._cancelDelete(e);
      }
    }

    //reply to post

  }, {
    key: '_reply',
    value: function _reply(e) {
      _core.nav.openWriter(e.target.parentNode.dataset.thread);
    }

    //open thread

  }, {
    key: '_open',
    value: function _open(e) {
      _router2.default.navigate(this.group + 't/' + e.target.parentNode.dataset.thread);
    }

    //go to group

  }, {
    key: '_goToGroup',
    value: function _goToGroup(e) {
      _router2.default.navigate(e.target.textContent);
    }

    //go to user

  }, {
    key: '_goToUser',
    value: function _goToUser(username) {
      if (username !== 'Anonymous') _router2.default.navigate('/user/${username}');
    }

    //save post

  }, {
    key: '_savePost',
    value: function _savePost(e) {
      if (e.target.style.color === '#6879FF') {
        //unlike
        e.target.style.color = '#3b5998';
        var thread = e.target.parentNode.dataset.thread;
        unsavePost(thread);
      } else {
        //like
        e.target.style.color = '#6879FF';
        var _thread = e.target.parentNode.dataset.thread;
        savePost(_thread);
      }
    }

    //report post

  }, {
    key: '_reportPost',
    value: function _reportPost(e) {

      //TODO: set up dev server and shoot off requests here
      if (e.target.textContent === 'report') return e.target.innerHTML = 'unreport';
      e.target.innerHTML = 'report';
    }

    //cancel delete

  }, {
    key: '_cancelDelete',
    value: function _cancelDelete() {
      //only one deleteable at a time
      var pending = (0, _helpers.$id)('delete-pending');
      if (pending) {
        pending.innerHTML = 'delete';
        pending.id = '';
      }
    }

    //delete post

  }, {
    key: '_deletePost',
    value: function _deletePost(e) {
      var content = e.target.innerHTML;
      if (content === 'delete') {
        this._cancelDelete();
        e.target.innerHTML = "sure?";
        e.target.id = 'delete-pending';
        return;
      }
      var thread = e.target.parentNode.dataset.thread;
      var post = e.target.parentNode.dataset.post;
      console.log(thread);
      var match = void 0;
      var owned = (0, _keys2.default)(this.user.owned);
      for (var i = 0; i < owned.length; i++) {
        if (post === owned[i]) {
          match = owned[i];
        }
      }
      console.log(match);
      if (match) this.deleteThread(thread, this.user.owned[match]);

      //reload this page (but not refresh)
      _router2.default.check();
    }
  }, {
    key: '_toggleBody',
    value: function _toggleBody(e) {
      e.target.maxHeight = e.target.maxHeight === '400px' ? '1000px' : '400px';
    }

    //generate html

  }, {
    key: 'generateStaticView',
    value: function generateStaticView(threads, info, popular, user) {
      var _this3 = this;

      var getposts = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var promises, results;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  promises = threads.map(function (thread) {
                    return (0, _template.generateHeadPost)(thread, user);
                  });
                  _context.next = 3;
                  return _promise2.default.all(promises);

                case 3:
                  results = _context.sent;
                  return _context.abrupt('return', results.join(''));

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this3);
        }));
        return function getposts() {
          return ref.apply(this, arguments);
        };
      }();

      var getpopularposts = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          var promises, results;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  promises = popular.map(function (post) {
                    return (0, _template.generatePopularPost)(post, user);
                  });
                  _context2.next = 3;
                  return _promise2.default.all(promises);

                case 3:
                  results = _context2.sent;
                  return _context2.abrupt('return', results.join(''));

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this3);
        }));
        return function getpopularposts() {
          return ref.apply(this, arguments);
        };
      }();

      var buildView = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
          var header, list, footer, desktopright, desktopleft;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  //main header
                  header = '\n        <div id="Main-Header">\n\n        </div>\n      ';
                  //wrapper for listing

                  _context3.next = 3;
                  return getposts();

                case 3:
                  _context3.t0 = _context3.sent;
                  _context3.t1 = '\n      <div id="List" class="List">\n      ' + _context3.t0;
                  list = _context3.t1 + '\n      </div>\n      ';


                  //pagination controls
                  footer = '\n      <div class="Main-Footer">\n      ' + (_this3.page > 0 ? '<a class="Main-Footer-btn" id="prevpage" href="javascript:;">prev</a>' : '') + '\n      ' + (_this3.threads.length === 30 ? '<a class="Main-Footer-btn" id="nextpage" href="javascript:;">next</a>' : '') + '\n      </div>\n      ';

                  //desktop view information

                  _context3.next = 9;
                  return getpopularposts();

                case 9:
                  _context3.t2 = _context3.sent;
                  _context3.t3 = '\n        <div id="Main-desktop-group" class="desktop">\n          <div class="PopularList">\n            <span id="Main-desktop-title">\n              <span id="Main-desktop-title-text">Popular</span>\n            </span>\n            ' + _context3.t2;
                  desktopright = _context3.t3 + '\n          </div>\n        </div>\n      ';
                  desktopleft = '\n        <div id="Main-desktop-info" class="desktop">\n          <div class="GroupName">' + info.name + '</div>\n          <div class="GroupAuthor">\n            <p class="GroupAuthor-title">Made by:</p>\n            <p id="Main-desktop-author" class="GroupAuthor-name">' + info.author + '</p>\n          </div>\n          <div class="GroupPage">\n            <p class="GroupPage-page">Page:</p>\n            <p class="GroupPage-num">' + _this3.page + '</p>\n          </div>\n          <div class="Created">\n            <p>Created</p>\n            <p>' + (0, _template.generateTimestamp)(info.created) + '</p>\n          </div>\n        </div>\n      ';

                  //final template for section

                  return _context3.abrupt('return', '\n        <div id="Main-container">\n          ' + header + '\n          ' + desktopleft + '\n          ' + desktopright + '\n          ' + list + '\n          ' + footer + '\n        </div>\n        ');

                case 14:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this3);
        }));
        return function buildView() {
          return ref.apply(this, arguments);
        };
      }();

      return buildView();
    }

    //bake html into view

  }, {
    key: 'render',
    value: function render() {
      var that = this;
      var tmp = this.generateStaticView(this.threads, this.info, this.popular, this.user);
      tmp.then(function (tmp) {
        (0, _helpers.$id)('main').innerHTML = tmp;
        that.bind();
      });
    }
  }]);
  return View;
}(); /**
      * groupv.js is the view for the group
      */


exports.default = View;

},{"../core/core.js":111,"../core/helpers.js":112,"../core/oembed.js":114,"../core/template.js":117,"../router/router.js":121,"babel-runtime/core-js/object/keys":4,"babel-runtime/core-js/promise":6,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/helpers/classCallCheck":10,"babel-runtime/helpers/createClass":11,"babel-runtime/regenerator":13}],120:[function(require,module,exports){
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _core = require('./core/core.js');

var _core2 = _interopRequireDefault(_core);

var _store = require('./core/store.js');

var _store2 = _interopRequireDefault(_store);

var _router = require('./router/router.js');

var _router2 = _interopRequireDefault(_router);

var _user = require('./ajax/user.js');

var _oembed = require('./core/oembed.js');

var _oembed2 = _interopRequireDefault(_oembed);

var _parser = require('./core/parser.js');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  main.js -- entry point for the application
*/

window.parser = _parser2.default;
//init
//handle getting user (usernames, username) data via ajax
{
  //first order of business, get user data and store it
  (function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var usr;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _user.getUser)();

            case 3:
              usr = _context.sent;

              if (usr) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return');

            case 6:
              _context.next = 8;
              return usr.json();

            case 8:
              _store2.default.user = _context.sent;
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](0);


              //let ourselves know if there was an error getting the user
              console.log(_context.t0);

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 11]]);
    }));

    function user() {
      return ref.apply(this, arguments);
    }

    return user;
  })()();

  //bind basic UI
  (0, _core2.default)();

  //bind view for route
  _router2.default.start();
}

},{"./ajax/user.js":109,"./core/core.js":111,"./core/oembed.js":114,"./core/parser.js":115,"./core/store.js":116,"./router/router.js":121,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13}],121:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes.js');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * router.js helps handle clients-side routing (particularly, resolving routes)
 * --only supporting the history api
 * mostly from 'A modern JavaScript router in 100 lines' by Krasimir Tsonev
 * modded so I could use it server side & only uses history api -- it's cool
 * because it only uses regex matches to get paths
 */

var isNode = _config2.default.isNode;

//this will be used server side for resolving routes
if (!isNode && !(window.history && history.pushState)) {
  throw new Error('History API not available');
}

//patch history api to trigger events on route change
if (!isNode) {
  var pushState = history.pushState;
  window.history.pushState = function (state) {
    if (typeof window.history.onpushstate == "function") {
      window.history.onpushstate({ state: state });
    }
    //create 'route' event
    var event = new CustomEvent('route');
    var applied = pushState.apply(window.history, arguments);
    document.dispatchEvent(event);
    return applied;
  };
}

function clearSlashes(path) {
  return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

var location = isNode ? { pathname: '' } : location;

//router object, a singleton
var router = {
  root: '/',
  rootfn: null,
  routes: [],
  callbacks: [],
  getPath: function getPath() {
    var fragment = '';
    fragment = clearSlashes(decodeURI(window.location.pathname + window.location.search));
    fragment = fragment.replace(/\?(.*)$/, '');
    fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
    return clearSlashes(fragment);
  },
  add: function add(re, handler) {
    if (typeof re == 'function') {
      handler = re;
      re = '';
    }
    this.routes.push({ re: re, handler: handler });
    return this;
  },
  onRoot: function onRoot(callback) {
    this.rootfn = callback;
  },
  check: function check(f) {
    if (window.location.pathname === '/') return this.rootfn();
    var fragment = f || this.getPath();
    for (var i = 0; i < this.routes.length; i++) {
      var match = fragment.match(this.routes[i].re);
      if (match) {
        match.shift();
        this.routes[i].handler.apply({}, match);
        return this;
      }
    }
    return this;
  },
  back: function back() {
    window.history.back();
  },

  start: function start() {
    var _this = this;

    if (isNode) return;
    // Add an event listener for 'route', navigates on route event
    this.check();
    var check = function check() {
      return _this.check();
    };
    document.addEventListener("route", check);
    window.addEventListener("popstate", check);
    return this;
  },

  navigate: function navigate(path) {
    //call registered callbacks
    this.callbacks.forEach(function (fn) {
      return fn(path);
    });
    path = path ? path : '';
    history.pushState(null, null, '' + this.root + clearSlashes(path));
    return this;
  },

  onNavigate: function onNavigate(callback) {
    this.callbacks.push(callback);
  }
};

//initialize routes in router
(0, _routes2.default)(router);

exports.default = router;

window.router = router;

},{"../config.js":110,"./routes.js":122}],122:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = setup;

var _groups = require('../ajax/groups.js');

var _group = require('../group/group.js');

var _group2 = _interopRequireDefault(_group);

var _thread = require('../thread/thread.js');

var _thread2 = _interopRequireDefault(_thread);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//this is where views are set up
function setup(router) {
  var _this = this;

  //middleware for routing
  router.onNavigate(function (path) {

    //clear view on route change
    document.getElementById('main').innerHTML = "";
  });

  //set up root handler '/'
  router.onRoot((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var res, resp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _groups.getAuth)('/random/');

          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();

          case 5:
            resp = _context.sent;

            (0, _group2.default)('/random/', 0, resp);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  //route for user view and settings '/user/:username'
  router.add(/user\/(.*)/, function (username) {

    //user view
    console.log('user');
  });

  //search '/search/:search'
  router.add(/search\/(.*)/, function (search) {

    //search view
    console.log('search');
  });

  //route for pagination on groups '/:group/:page'
  router.add(/(.*)\/t\/(.*)/, function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(group, thread) {
      var res, resp;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              group = group ? group : '/';
              _context2.next = 3;
              return (0, _groups.getAuth)('/' + group + '/');

            case 3:
              res = _context2.sent;
              _context2.next = 6;
              return res.json();

            case 6:
              resp = _context2.sent;

              if (!(!resp.allowed && group != "/404/")) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt('return', router.navigate('/404'));

            case 9:
              //setup thread view
              (0, _thread2.default)(thread);

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));
    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  }());

  //route for pagination on groups '/:group/:page'
  router.add(/(.*)\/(.*)/, function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(group, page) {
      var res, resp;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              group = '/' + group + '/';
              _context3.next = 3;
              return (0, _groups.getAuth)(group);

            case 3:
              res = _context3.sent;
              _context3.next = 6;
              return res.json();

            case 6:
              resp = _context3.sent;

              if (!(!resp.allowed && group != "/404/")) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt('return', router.navigate('/404'));

            case 9:
              //setup group once again
              (0, _group2.default)(group, ~ ~page, resp);

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));
    return function (_x3, _x4) {
      return ref.apply(this, arguments);
    };
  }());

  //route for group (page:0) '/:group' || if integer --> pagination for FP
  router.add(/(.*)/, function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(group) {
      var res, resp;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              group = '/' + group + '/';
              _context4.next = 3;
              return (0, _groups.getAuth)(group);

            case 3:
              res = _context4.sent;
              _context4.next = 6;
              return res.json();

            case 6:
              resp = _context4.sent;

              if (!(!resp.allowed && group != "/404/")) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt('return', router.navigate('/404'));

            case 9:
              //setup group
              (0, _group2.default)(group, 0, resp);

            case 10:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));
    return function (_x5) {
      return ref.apply(this, arguments);
    };
  }());
} /**
    Router init function (sets up routes)
  
    layout:
            / --> home (pg 0 for /random/)
            /:group --> grp
            /t/:thread --> front page threads
            /:group/:page --> group view for page
            /:group/t/:thread --> thread view for group
  */

},{"../ajax/groups.js":107,"../group/group.js":118,"../thread/thread.js":123,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13}],123:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _threads = require('../ajax/threads.js');

var _store = require('../core/store.js');

var _store2 = _interopRequireDefault(_store);

var _threadv = require('./threadv.js');

var _threadv2 = _interopRequireDefault(_threadv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//init for group controller (or whatever you'd like to call it)

exports.default = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(threadid) {
    var res, jres, thread, user, thrd;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _threads.getThread)(threadid);

          case 3:
            res = _context.sent;
            _context.next = 6;
            return res.json();

          case 6:
            jres = _context.sent;

            //get array of threads
            thread = jres;
            user = {
              owned: _store2.default.owned,
              user: _store2.default.user
            };

            //in thread actions

            thrd = new _threadv2.default(thread, user);

            thrd.render();
            return _context.abrupt('return', thrd);

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 14]]);
  }));

  function start(_x) {
    return ref.apply(this, arguments);
  }

  return start;
}(); /**
      * group.js is a controller for group (kinda)
      */

},{"../ajax/threads.js":108,"../core/store.js":116,"./threadv.js":124,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13}],124:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _helpers = require('../core/helpers.js');

var _oembed = require('../core/oembed.js');

var _oembed2 = _interopRequireDefault(_oembed);

var _template = require('../core/template.js');

var _core = require('../core/core.js');

var _router = require('../router/router.js');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//view for posts & threads

var View = function () {

  //pass in top groups and user -- with username, id, notifications

  function View(thread, user) {
    var _this = this;

    (0, _classCallCheck3.default)(this, View);


    console.log(thread);
    //set group
    this.thread = thread;

    //set auth
    this.user = user;

    //setup commands for view actions
    this.viewCommands = {
      reply: function reply(e) {
        return _this._reply(e);
      },
      group: function group(e) {
        return _this._goToGroup(e);
      },
      user: function user(e) {
        return _this._goToUser(e);
      },
      hidePost: function hidePost(e) {
        return _this._hidePost(e);
      },
      showPost: function showPost(e) {
        return _this._showPost(e);
      },
      report: function report(e) {
        return _this._reportPost(e);
      },
      toggleBody: function toggleBody(e) {
        return _this._toggleBody(e);
      },
      peek: function peek(e) {
        return _this._peek(e);
      }
    };
  }

  //binds events --> mostly delegated events up in here


  (0, _createClass3.default)(View, [{
    key: 'bind',
    value: function bind() {

      //get references (as elements are dynamically rendered)
      var $listing = (0, _helpers.$id)('List');
      var $prev = (0, _helpers.$id)('prevpage');

      //clicks on listing section
      (0, _helpers.$on)($listing, 'click', this._onPostClick.bind(this), false);
      (0, _helpers.$on)($prev, 'click', this._back.bind(this), false);
    }
  }, {
    key: '_back',
    value: function _back() {
      _router2.default.back();
    }
  }, {
    key: '_hidePost',
    value: function _hidePost(e) {
      e.target.className = 'icon-up-open-big';
      var target = e.target.parentNode;
      while (target.className != 'Post') {
        //get post & remove the children we want
        target = target.parentNode;
      }
      Array.prototype.forEach.call(target.childNodes, function (node) {
        if (node.className === 'Body' || node.className === 'Content') {
          node.style.display = 'none';
        }
      });
    }
  }, {
    key: '_showPost',
    value: function _showPost(e) {
      e.target.className = 'icon-down-open-big';
      var target = e.target.parentNode;
      while (target.className != 'Post') {
        target = target.parentNode;
      }
      //get post & show the children we want
      Array.prototype.forEach.call(target.childNodes, function (node) {
        if (node.className === 'Body' || node.className === 'Content') {
          node.style.display = 'block';
        }
      });
    }
  }, {
    key: '_prevPage',
    value: function _prevPage(e) {
      if (page <= 1) _router2.default.navigate(this.group);
      _router2.default.navigate('' + this.group + --page);
    }
  }, {
    key: '_nextPage',
    value: function _nextPage(e) {
      _router2.default.navigate('' + this.group + ++page);
    }

    //handle post clicks

  }, {
    key: '_onPostClick',
    value: function _onPostClick(e) {
      var target = e.target;
      switch (target.className) {
        case 'Head-author':
          if (target.textContent !== 'Anonymous') _router2.default.navigate('/user/${target.textContent}');
          break;
        case 'Head-group':
          this.viewCommands.group(e);
          break;
        case 'icon-down-open-big':
          //hacky solution to delegation tactics
          this.viewCommands.hidePost(e);
          break;
        case 'icon-up-open-big':
          //hacky solution to delegation tactics
          this.viewCommands.showPost(e);
          break;
        case 'Body':
          this.viewCommands.toggleBody(e);
          break;
        case 'report space':
          this.viewCommands.report(e);
          break;
        case 'Footer-right-save space':
          this.viewCommands.savePost(e);
          break;
        case 'Footer-right-reply space':
          this.viewCommands.reply(e);
          break;
        case 'Footer-open space':
          this.viewCommands.open(e);
          break;

      }
    }

    //reply to post

  }, {
    key: '_reply',
    value: function _reply(e) {
      _core.nav.openWriterRef(e.target.parentNode.dataset.post);
    }

    //open thread

  }, {
    key: '_open',
    value: function _open(e) {
      _router2.default.navigate(this.group + 't/' + e.target.parentNode.dataset.thread);
    }

    //go to group

  }, {
    key: '_goToGroup',
    value: function _goToGroup(e) {
      _router2.default.navigate(e.target.textContent);
    }

    //go to user

  }, {
    key: '_goToUser',
    value: function _goToUser(e) {
      if (e.target.textContent !== 'Anonymous') _router2.default.navigate('/user/${e.target.textContent}');
    }

    //save post

  }, {
    key: '_savePost',
    value: function _savePost(e) {
      e.target.style.color = e.target.style.color === '#6879FF' ? '#6879FF' : '#3b5998';
    }

    //report post

  }, {
    key: '_reportPost',
    value: function _reportPost(e) {
      if (e.target.textContent === 'report') return e.target.innerHTML = 'unreport';
      e.target.innerHTML = 'report';
    }
  }, {
    key: '_toggleBody',
    value: function _toggleBody(e) {
      e.target.maxHeight = e.target.maxHeight === '400px' ? '1000px' : '400px';
    }

    //generate html

  }, {
    key: 'generateStaticView',
    value: function generateStaticView(thread) {
      var _this2 = this;

      var getposts = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var promises, results;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  promises = thread.posts.map(function (post) {
                    return (0, _template.generatePost)(thread.group, post, _this2.user);
                  });
                  _context.next = 3;
                  return _promise2.default.all(promises);

                case 3:
                  results = _context.sent;
                  return _context.abrupt('return', results.join(''));

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));
        return function getposts() {
          return ref.apply(this, arguments);
        };
      }();

      var buildView = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          var header, list, footer;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  //main header
                  header = '\n        <div id="Main-Header">\n\n        </div>\n      ';
                  //wrapper for listing

                  _context2.next = 3;
                  return getposts();

                case 3:
                  _context2.t0 = _context2.sent;
                  _context2.t1 = '\n      <div id="List" class="List Thread">\n      ' + _context2.t0;
                  list = _context2.t1 + '\n      </div>\n      ';


                  //pagination controls
                  footer = '\n      <div class="Main-Footer">\n       <a class="Main-Footer-btn" id="prevpage" href="javascript:;">back</a>\n      </div>\n      ';

                  //final template for section

                  return _context2.abrupt('return', '\n        <div id="Main-container">\n          ' + header + '\n          ' + list + '\n          ' + footer + '\n        </div>\n        ');

                case 8:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));
        return function buildView() {
          return ref.apply(this, arguments);
        };
      }();

      return buildView();
    }

    //bake html into view

  }, {
    key: 'render',
    value: function render() {
      var that = this;
      var tmp = this.generateStaticView(this.thread);
      tmp.then(function (tmp) {
        (0, _helpers.$id)('main').innerHTML = tmp;
        that.bind();
      });
    }
  }]);
  return View;
}(); /**
      * groupv.js is the view for the group
      */


exports.default = View;

},{"../core/core.js":111,"../core/helpers.js":112,"../core/oembed.js":114,"../core/template.js":117,"../router/router.js":121,"babel-runtime/core-js/promise":6,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/helpers/classCallCheck":10,"babel-runtime/helpers/createClass":11,"babel-runtime/regenerator":13}]},{},[120]);
