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
(function (__dirname){
/**
 * xterm.js: xterm, in the browser
 * Copyright (c) 2014, sourceLair Limited (www.sourcelair.com (MIT License)
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 * https://github.com/chjj/term.js
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Originally forked from (with the author's permission):
 *   Fabrice Bellard's javascript vt100 for jslinux:
 *   http://bellard.org/jslinux/
 *   Copyright (c) 2011 Fabrice Bellard
 *   The original design remains. The terminal itself
 *   has been extended to include xterm CSI codes, among
 *   other features.
 */

(function (xterm) {
    if (typeof exports === 'object' && typeof module === 'object') {
        /*
         * CommonJS environment
         */
        module.exports = xterm.call(this);
    } else if (typeof define == 'function') {
        /*
         * Require.js is available
         */
        define([], xterm.bind(window));
    } else {
        /*
         * Plain browser environment
         */
        this.Xterm = xterm.call(this);
        this.Terminal = this.Xterm; /* Backwards compatibility with term.js */
    }
})(function() {
    /**
     * Terminal Emulation References:
     *   http://vt100.net/
     *   http://invisible-island.net/xterm/ctlseqs/ctlseqs.txt
     *   http://invisible-island.net/xterm/ctlseqs/ctlseqs.html
     *   http://invisible-island.net/vttest/
     *   http://www.inwap.com/pdp10/ansicode.txt
     *   http://linux.die.net/man/4/console_codes
     *   http://linux.die.net/man/7/urxvt
     */

    'use strict';

    /**
     * Shared
     */

    var window = this, document = this.document;

    /**
     * EventEmitter
     */

    function EventEmitter() {
      this._events = this._events || {};
    }

    EventEmitter.prototype.addListener = function(type, listener) {
      this._events[type] = this._events[type] || [];
      this._events[type].push(listener);
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.removeListener = function(type, listener) {
      if (!this._events[type]) return;

      var obj = this._events[type]
        , i = obj.length;

      while (i--) {
        if (obj[i] === listener || obj[i].listener === listener) {
          obj.splice(i, 1);
          return;
        }
      }
    };

    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

    EventEmitter.prototype.removeAllListeners = function(type) {
      if (this._events[type]) delete this._events[type];
    };

    EventEmitter.prototype.once = function(type, listener) {
      var self = this;
      function on() {
        var args = Array.prototype.slice.call(arguments);
        this.removeListener(type, on);
        return listener.apply(this, args);
      }
      on.listener = listener;
      return this.on(type, on);
    };

    EventEmitter.prototype.emit = function(type) {
      if (!this._events[type]) return;

      var args = Array.prototype.slice.call(arguments, 1)
        , obj = this._events[type]
        , l = obj.length
        , i = 0;

      for (; i < l; i++) {
        obj[i].apply(this, args);
      }
    };

    EventEmitter.prototype.listeners = function(type) {
      return this._events[type] = this._events[type] || [];
    };


    /**
     * Encapsulates the logic for handling compositionstart, compositionupdate and compositionend
     * events, displaying the in-progress composition to the UI and forwarding the final composition
     * to the handler.
     * @param {HTMLTextAreaElement} textarea The textarea that xterm uses for input.
     * @param {HTMLElement} compositionView The element to display the in-progress composition in.
     * @param {Terminal} terminal The Terminal to forward the finished composition to.
     */
    function CompositionHelper(textarea, compositionView, terminal) {
      this.textarea = textarea;
      this.compositionView = compositionView;
      this.terminal = terminal;

      // Whether input composition is currently happening, eg. via a mobile keyboard, speech input
      // or IME. This variable determines whether the compositionText should be displayed on the UI.
      this.isComposing = false;

      // The input currently being composed, eg. via a mobile keyboard, speech input or IME.
      this.compositionText = null;

      // The position within the input textarea's value of the current composition.
      this.compositionPosition = { start: null, end: null };

      // Whether a composition is in the process of being sent, setting this to false will cancel
      // any in-progress composition.
      this.isSendingComposition = false;
    }

    /**
     * Handles the compositionstart event, activating the composition view.
     */
    CompositionHelper.prototype.compositionstart = function() {
      this.isComposing = true;
      this.compositionPosition.start = this.textarea.value.length;
      this.compositionView.textContent = '';
      this.compositionView.classList.add('active');
    };

    /**
     * Handles the compositionupdate event, updating the composition view.
     * @param {CompositionEvent} ev The event.
     */
    CompositionHelper.prototype.compositionupdate = function(ev) {
      this.compositionView.textContent = ev.data;
      this.updateCompositionElements();
      var self = this;
      setTimeout(function() {
        self.compositionPosition.end = self.textarea.value.length;
      }, 0);
    };

    /**
     * Handles the compositionend event, hiding the composition view and sending the composition to
     * the handler.
     */
    CompositionHelper.prototype.compositionend = function() {
      this.finalizeComposition(true);
    };

    /**
     * Handles the keydown event, routing any necessary events to the CompositionHelper functions.
     * @return Whether the Terminal should continue processing the keydown event.
     */
    CompositionHelper.prototype.keydown = function(ev) {
      if (this.isComposing || this.isSendingComposition) {
        if (ev.keyCode === 229) {
          // Continue composing if the keyCode is the "composition character"
          return false;
        } else if (ev.keyCode === 16 || ev.keyCode === 17 || ev.keyCode === 18) {
          // Continue composing if the keyCode is a modifier key
          return false;
        } else {
          // Finish composition immediately. This is mainly here for the case where enter is
          // pressed and the handler needs to be triggered before the command is executed.
          this.finalizeComposition(false);
        }
      }

      if (ev.keyCode === 229) {
        // If the "composition character" is used but gets to this point it means a non-composition
        // character (eg. numbers and punctuation) was pressed when the IME was active.
        this.handleAnyTextareaChanges();
        return false;
      }

      return true;
    };

    /**
     * Finalizes the composition, resuming regular input actions. This is called when a composition
     * is ending.
     * @param {boolean} waitForPropogation Whether to wait for events to propogate before sending
     *   the input. This should be false if a non-composition keystroke is entered before the
     *   compositionend event is triggered, such as enter, so that the composition is send before
     *   the command is executed.
     */
    CompositionHelper.prototype.finalizeComposition = function(waitForPropogation) {
      this.compositionView.classList.remove('active');
      this.isComposing = false;
      this.clearTextareaPosition();

      if (!waitForPropogation) {
        // Cancel any delayed composition send requests and send the input immediately.
        this.isSendingComposition = false;
        var input = this.textarea.value.substring(this.compositionPosition.start, this.compositionPosition.end);
        this.terminal.handler(input);
      } else {
        // Make a deep copy of the composition position here as a new compositionstart event may
        // fire before the setTimeout executes.
        var currentCompositionPosition = {
          start: this.compositionPosition.start,
          end: this.compositionPosition.end,
        }

        // Since composition* events happen before the changes take place in the textarea on most
        // browsers, use a setTimeout with 0ms time to allow the native compositionend event to
        // complete. This ensures the correct character is retrieved, this solution was used
        // because:
        // - The compositionend event's data property is unreliable, at least on Chromium
        // - The last compositionupdate event's data property does not always accurately describe
        //   the character, a counter example being Korean where an ending consonsant can move to
        //   the following character if the following input is a vowel.
        var self = this;
        this.isSendingComposition = true;
        setTimeout(function () {
          // Ensure that the input has not already been sent
          if (self.isSendingComposition) {
            self.isSendingComposition = false;
            var input;
            if (self.isComposing) {
              // Use the end position to get the string if a new composition has started.
              input = self.textarea.value.substring(currentCompositionPosition.start, currentCompositionPosition.end);
            } else {
              // Don't use the end position here in order to pick up any characters after the
              // composition has finished, for example when typing a non-composition character
              // (eg. 2) after a composition character.
              input = self.textarea.value.substring(currentCompositionPosition.start);
            }
            self.terminal.handler(input);
          }
        }, 0);
      }
    };

    /**
     * Apply any changes made to the textarea after the current event chain is allowed to complete.
     * This should be called when not currently composing but a keydown event with the "composition
     * character" (229) is triggered, in order to allow non-composition text to be entered when an
     * IME is active.
     */
    CompositionHelper.prototype.handleAnyTextareaChanges = function() {
      var oldValue = this.textarea.value;
      var self = this;
      setTimeout(function() {
        // Ignore if a composition has started since the timeout
        if (!self.isComposing) {
          var newValue = self.textarea.value;
          var diff = newValue.replace(oldValue, '');
          if (diff.length > 0) {
            self.terminal.handler(diff);
          }
        }
      }, 0);
    };

    /**
     * Positions the composition view on top of the cursor and the textarea just below it (so the
     * IME helper dialog is positioned correctly).
     */
    CompositionHelper.prototype.updateCompositionElements = function(dontRecurse) {
      if (!this.isComposing) {
        return;
      }
      var cursor = this.terminal.element.querySelector('.terminal-cursor');
      if (cursor) {
        this.compositionView.style.left = cursor.offsetLeft + 'px';
        this.compositionView.style.top = cursor.offsetTop + 'px';
        var compositionViewBounds = this.compositionView.getBoundingClientRect();
        this.textarea.style.left = cursor.offsetLeft + compositionViewBounds.width + 'px';
        this.textarea.style.top = (cursor.offsetTop + cursor.offsetHeight) + 'px';
      }
      if (!dontRecurse) {
        setTimeout(this.updateCompositionElements.bind(this, true), 0);
      }
    };

    /**
     * Clears the textarea's position so that the cursor does not blink on IE.
     * @private
     */
    CompositionHelper.prototype.clearTextareaPosition = function() {
      this.textarea.style.left = '';
      this.textarea.style.top = '';
    };

    /**
     * Represents the viewport of a terminal, the visible area within the larger buffer of output.
     * Logic for the virtual scroll bar is included in this object.
     * @param {Terminal} terminal The Terminal object.
     * @param {HTMLElement} viewportElement The DOM element acting as the viewport
     * @param {HTMLElement} charMeasureElement A DOM element used to measure the character size of
     *   the terminal.
     */
    function Viewport(terminal, viewportElement, scrollArea, charMeasureElement) {
      this.terminal = terminal;
      this.viewportElement = viewportElement;
      this.scrollArea = scrollArea;
      this.charMeasureElement = charMeasureElement;
      this.currentRowHeight = 0;
      this.lastRecordedBufferLength = 0;
      this.lastRecordedViewportHeight = 0;

      this.terminal.on('scroll', this.syncScrollArea.bind(this));
      this.terminal.on('resize', this.syncScrollArea.bind(this));
      this.viewportElement.addEventListener('scroll', this.onScroll.bind(this));

      this.syncScrollArea();
    }

    /**
     * Refreshes row height, setting line-height, viewport height and scroll area height if
     * necessary.
     * @param {number|undefined} charSize A character size measurement bounding rect object, if it
     *   doesn't exist it will be created.
     */
    Viewport.prototype.refresh = function(charSize) {
      var size = charSize || this.charMeasureElement.getBoundingClientRect();
      if (size.height > 0) {
        var rowHeightChanged = size.height !== this.currentRowHeight;
        if (rowHeightChanged) {
          this.currentRowHeight = size.height;
          this.viewportElement.style.lineHeight = size.height + 'px';
          this.terminal.rowContainer.style.lineHeight = size.height + 'px';
        }
        var viewportHeightChanged = this.lastRecordedViewportHeight !== this.terminal.rows;
        if (rowHeightChanged || viewportHeightChanged) {
          this.lastRecordedViewportHeight = this.terminal.rows;
          this.viewportElement.style.height = size.height * this.terminal.rows + 'px';
        }
        this.scrollArea.style.height = (size.height * this.lastRecordedBufferLength) + 'px';
      }
    };

    /**
     * Updates dimensions and synchronizes the scroll area if necessary.
     */
    Viewport.prototype.syncScrollArea = function() {
      if (this.isApplicationMode) {
        // Fix scroll bar in application mode
        this.lastRecordedBufferLength = this.terminal.rows;
        this.refresh();
        return;
      }

      if (this.lastRecordedBufferLength !== this.terminal.lines.length) {
        // If buffer height changed
        this.lastRecordedBufferLength = this.terminal.lines.length;
        this.refresh();
      } else if (this.lastRecordedViewportHeight !== this.terminal.rows) {
        // If viewport height changed
        this.refresh();
      } else {
        // If size has changed, refresh viewport
        var size = this.charMeasureElement.getBoundingClientRect();
        if (size.height !== this.currentRowHeight) {
          this.refresh(size);
        }
      }

      // Sync scrollTop
      var scrollTop = this.terminal.ydisp * this.currentRowHeight;
      if (this.viewportElement.scrollTop !== scrollTop) {
        this.viewportElement.scrollTop = scrollTop;
      }
    };

    /**
     * Sets the application mode of the viewport.
     * @param {boolean} isApplicationMode Sets whether the terminal is in application mode. true
     * for application mode (DECKPAM) and false for normal mode (DECKPNM).
     */
    Viewport.prototype.setApplicationMode = function(isApplicationMode) {
      this.isApplicationMode = isApplicationMode;
      this.syncScrollArea();
    };

    /**
     * Handles scroll events on the viewport, calculating the new viewport and requesting the
     * terminal to scroll to it.
     * @param {Event} ev The scroll event.
     */
    Viewport.prototype.onScroll = function(ev) {
      if (this.isApplicationMode) {
        // Scrolling via the scroll bar is disabled during application mode
        return;
      }
      var newRow = Math.round(this.viewportElement.scrollTop / this.currentRowHeight);
      var diff = newRow - this.terminal.ydisp;
      this.terminal.scrollDisp(diff, true);
    };

    /**
     * Handles mouse wheel events by adjusting the viewport's scrollTop and delegating the actual
     * scrolling to `onScroll`, this event needs to be attached manually by the consumer of
     * `Viewport`.
     * @param {WheelEvent} ev The mouse wheel event.
     */
    Viewport.prototype.onWheel = function(ev) {
      if (ev.deltaY === 0) {
        // Do nothing if it's not a vertical scroll event
        return;
      }
      // Fallback to WheelEvent.DOM_DELTA_PIXEL
      var multiplier = 1;
      if (ev.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        multiplier = this.currentRowHeight;
      } else if (ev.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        multiplier = this.currentRowHeight * this.terminal.rows;
      }
      this.viewportElement.scrollTop += ev.deltaY * multiplier;
      // Prevent the page from scrolling when the terminal scrolls
      ev.preventDefault();
    };

    /**
     * States
     */
    var normal = 0, escaped = 1, csi = 2, osc = 3, charset = 4, dcs = 5, ignore = 6;

    /**
     * Terminal
     */

    /**
     * Creates a new `Terminal` object.
     *
     * @param {object} options An object containing a set of options, the available options are:
     *   - cursorBlink (boolean): Whether the terminal cursor blinks
     *
     * @public
     * @class Xterm Xterm
     * @alias module:xterm/src/xterm
     */
    function Terminal(options) {
      var self = this;

      if (!(this instanceof Terminal)) {
        return new Terminal(arguments[0], arguments[1], arguments[2]);
      }

      self.cancel = Terminal.cancel;

      EventEmitter.call(this);

      if (typeof options === 'number') {
        options = {
          cols: arguments[0],
          rows: arguments[1],
          handler: arguments[2]
        };
      }

      options = options || {};


      Object.keys(Terminal.defaults).forEach(function(key) {
        if (options[key] == null) {
          options[key] = Terminal.options[key];

          if (Terminal[key] !== Terminal.defaults[key]) {
            options[key] = Terminal[key];
          }
        }
        self[key] = options[key];
      });

      if (options.colors.length === 8) {
        options.colors = options.colors.concat(Terminal._colors.slice(8));
      } else if (options.colors.length === 16) {
        options.colors = options.colors.concat(Terminal._colors.slice(16));
      } else if (options.colors.length === 10) {
        options.colors = options.colors.slice(0, -2).concat(
          Terminal._colors.slice(8, -2), options.colors.slice(-2));
      } else if (options.colors.length === 18) {
        options.colors = options.colors.concat(
          Terminal._colors.slice(16, -2), options.colors.slice(-2));
      }
      this.colors = options.colors;

      this.options = options;

      // this.context = options.context || window;
      // this.document = options.document || document;
      this.parent = options.body || options.parent
        || (document ? document.getElementsByTagName('body')[0] : null);

      this.cols = options.cols || options.geometry[0];
      this.rows = options.rows || options.geometry[1];

      if (options.handler) {
        this.on('data', options.handler);
      }

      /**
       * The scroll position of the y cursor, ie. ybase + y = the y position within the entire
       * buffer
       */
      this.ybase = 0;

      /**
       * The scroll position of the viewport
       */
      this.ydisp = 0;

      /**
       * The cursor's x position after ybase
       */
      this.x = 0;

      /**
       * The cursor's y position after ybase
       */
      this.y = 0;

      /**
       * Used to debounce the refresh function
       */
      this.isRefreshing = false;

      /**
       * Whether there is a full terminal refresh queued
       */

      this.cursorState = 0;
      this.cursorHidden = false;
      this.convertEol;
      this.state = 0;
      this.queue = '';
      this.scrollTop = 0;
      this.scrollBottom = this.rows - 1;
      this.customKeydownHandler = null;

      // modes
      this.applicationKeypad = false;
      this.applicationCursor = false;
      this.originMode = false;
      this.insertMode = false;
      this.wraparoundMode = true; // defaults: xterm - true, vt100 - false
      this.normal = null;

      // charset
      this.charset = null;
      this.gcharset = null;
      this.glevel = 0;
      this.charsets = [null];

      // mouse properties
      this.decLocator;
      this.x10Mouse;
      this.vt200Mouse;
      this.vt300Mouse;
      this.normalMouse;
      this.mouseEvents;
      this.sendFocus;
      this.utfMouse;
      this.sgrMouse;
      this.urxvtMouse;

      // misc
      this.element;
      this.children;
      this.refreshStart;
      this.refreshEnd;
      this.savedX;
      this.savedY;
      this.savedCols;

      // stream
      this.readable = true;
      this.writable = true;

      this.defAttr = (0 << 18) | (257 << 9) | (256 << 0);
      this.curAttr = this.defAttr;

      this.params = [];
      this.currentParam = 0;
      this.prefix = '';
      this.postfix = '';

      // leftover surrogate high from previous write invocation
      this.surrogate_high = '';

      /**
       * An array of all lines in the entire buffer, including the prompt. The lines are array of
       * characters which are 2-length arrays where [0] is an attribute and [1] is the character.
       */
      this.lines = [];
      var i = this.rows;
      while (i--) {
        this.lines.push(this.blankLine());
      }

      this.tabs;
      this.setupStops();
    }

    inherits(Terminal, EventEmitter);

		/**
		 * back_color_erase feature for xterm.
		 */
    Terminal.prototype.eraseAttr = function() {
      // if (this.is('screen')) return this.defAttr;
      return (this.defAttr & ~0x1ff) | (this.curAttr & 0x1ff);
    };

    /**
     * Colors
     */

    // Colors 0-15
    Terminal.tangoColors = [
      // dark:
      '#2e3436',
      '#cc0000',
      '#4e9a06',
      '#c4a000',
      '#3465a4',
      '#75507b',
      '#06989a',
      '#d3d7cf',
      // bright:
      '#555753',
      '#ef2929',
      '#8ae234',
      '#fce94f',
      '#729fcf',
      '#ad7fa8',
      '#34e2e2',
      '#eeeeec'
    ];

    // Colors 0-15 + 16-255
    // Much thanks to TooTallNate for writing this.
    Terminal.colors = (function() {
      var colors = Terminal.tangoColors.slice()
        , r = [0x00, 0x5f, 0x87, 0xaf, 0xd7, 0xff]
        , i;

      // 16-231
      i = 0;
      for (; i < 216; i++) {
        out(r[(i / 36) % 6 | 0], r[(i / 6) % 6 | 0], r[i % 6]);
      }

      // 232-255 (grey)
      i = 0;
      for (; i < 24; i++) {
        r = 8 + i * 10;
        out(r, r, r);
      }

      function out(r, g, b) {
        colors.push('#' + hex(r) + hex(g) + hex(b));
      }

      function hex(c) {
        c = c.toString(16);
        return c.length < 2 ? '0' + c : c;
      }

      return colors;
    })();

    Terminal._colors = Terminal.colors.slice();

    Terminal.vcolors = (function() {
      var out = []
        , colors = Terminal.colors
        , i = 0
        , color;

      for (; i < 256; i++) {
        color = parseInt(colors[i].substring(1), 16);
        out.push([
          (color >> 16) & 0xff,
          (color >> 8) & 0xff,
          color & 0xff
        ]);
      }

      return out;
    })();

    /**
     * Options
     */

    Terminal.defaults = {
      colors: Terminal.colors,
      theme: 'default',
      convertEol: false,
      termName: 'xterm',
      geometry: [80, 24],
      cursorBlink: false,
      visualBell: false,
      popOnBell: false,
      scrollback: 1000,
      screenKeys: false,
      debug: false,
      cancelEvents: false
      // programFeatures: false,
      // focusKeys: false,
    };

    Terminal.options = {};

    Terminal.focus = null;

    each(keys(Terminal.defaults), function(key) {
      Terminal[key] = Terminal.defaults[key];
      Terminal.options[key] = Terminal.defaults[key];
    });

    /**
     * Focus the terminal. Delegates focus handling to the terminal's DOM element.
     */
    Terminal.prototype.focus = function() {
      return this.textarea.focus();
    };

    /**
     * Binds the desired focus behavior on a given terminal object.
     *
     * @static
     */
    Terminal.bindFocus = function (term) {
      on(term.textarea, 'focus', function (ev) {
        if (term.sendFocus) {
          term.send('\x1b[I');
        }
        term.element.classList.add('focus');
        term.showCursor();
        Terminal.focus = term;
        term.emit('focus', {terminal: term});
      });
    };

    /**
     * Blur the terminal. Delegates blur handling to the terminal's DOM element.
     */
    Terminal.prototype.blur = function() {
      return this.textarea.blur();
    };

    /**
     * Binds the desired blur behavior on a given terminal object.
     *
     * @static
     */
    Terminal.bindBlur = function (term) {
      on(term.textarea, 'blur', function (ev) {
        term.refresh(term.y, term.y);
        if (term.sendFocus) {
          term.send('\x1b[O');
        }
        term.element.classList.remove('focus');
        Terminal.focus = null;
        term.emit('blur', {terminal: term});
      });
    };

    /**
     * Initialize default behavior
     */
    Terminal.prototype.initGlobal = function() {
      Terminal.bindPaste(this);
      Terminal.bindKeys(this);
      Terminal.bindCopy(this);
      Terminal.bindFocus(this);
      Terminal.bindBlur(this);
    };

    /**
     * Bind to paste event and allow both keyboard and right-click pasting, without having the
     * contentEditable value set to true.
     */
    Terminal.bindPaste = function(term) {
      on([term.textarea, term.element], 'paste', function(ev) {
        ev.stopPropagation();
        if (ev.clipboardData) {
          var text = ev.clipboardData.getData('text/plain');
          term.handler(text);
          term.textarea.value = '';
          return term.cancel(ev);
        }
      });
    };

    /**
     * Prepares text copied from terminal selection, to be saved in the clipboard by:
     *   1. stripping all trailing white spaces
     *   2. converting all non-breaking spaces to regular spaces
     * @param {string} text The copied text that needs processing for storing in clipboard
     * @returns {string}
     * @static
     */
    Terminal.prepareCopiedTextForClipboard = function (text) {
      var space = String.fromCharCode(32),
          nonBreakingSpace = String.fromCharCode(160),
          allNonBreakingSpaces = new RegExp(nonBreakingSpace, 'g'),
          processedText = text.split('\n').map(function (line) {
            /**
             * Strip all trailing white spaces and convert all non-breaking spaces to regular
             * spaces.
             */
            var processedLine = line.replace(/\s+$/g, '').replace(allNonBreakingSpaces, space);

            return processedLine;
          }).join('\n');

      return processedText;
    };

    /**
     * Apply key handling to the terminal
     */
    Terminal.bindKeys = function(term) {
      on(term.element, 'keydown', function(ev) {
        if (document.activeElement != this) {
          return;
         }
         term.keyDown(ev);
      }, true);

      on(term.element, 'keypress', function(ev) {
        if (document.activeElement != this) {
          return;
        }
        term.keyPress(ev);
      }, true);

      on(term.element, 'keyup', term.focus.bind(term));

      on(term.textarea, 'keydown', function(ev) {
        term.keyDown(ev);
      }, true);

      on(term.textarea, 'keypress', function(ev) {
        term.keyPress(ev);
        // Truncate the textarea's value, since it is not needed
        this.value = '';
      }, true);

      on(term.textarea, 'compositionstart', term.compositionHelper.compositionstart.bind(term.compositionHelper));
      on(term.textarea, 'compositionupdate', term.compositionHelper.compositionupdate.bind(term.compositionHelper));
      on(term.textarea, 'compositionend', term.compositionHelper.compositionend.bind(term.compositionHelper));
      term.on('refresh', term.compositionHelper.updateCompositionElements.bind(term.compositionHelper));
    };

    /**
     * Binds copy functionality to the given terminal.
     * @static
     */
    Terminal.bindCopy = function(term) {
      on(term.element, 'copy', function(ev) {
        return; // temporary
      });
    };


    /**
     * Insert the given row to the terminal or produce a new one
     * if no row argument is passed. Return the inserted row.
     * @param {HTMLElement} row (optional) The row to append to the terminal.
     */
    Terminal.prototype.insertRow = function (row) {
      if (typeof row != 'object') {
        row = document.createElement('div');
      }

      this.rowContainer.appendChild(row);
      this.children.push(row);

      return row;
    };

    /**
     * Opens the terminal within an element.
     *
     * @param {HTMLElement} parent The element to create the terminal within.
     */
    Terminal.prototype.open = function(parent) {
      var self=this, i=0, div;

      this.parent = parent || this.parent;

      if (!this.parent) {
        throw new Error('Terminal requires a parent element.');
      }

      /*
      * Grab global elements
      */
      this.context = this.parent.ownerDocument.defaultView;
      this.document = this.parent.ownerDocument;
      this.body = this.document.getElementsByTagName('body')[0];

      /*
      * Parse User-Agent
      */
      if (this.context.navigator && this.context.navigator.userAgent) {
        this.isMSIE = !!~this.context.navigator.userAgent.indexOf('MSIE');
      }

      /*
      * Find the users platform. We use this to interpret the meta key
      * and ISO third level shifts.
      * http://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today
      */
      if (this.context.navigator && this.context.navigator.platform) {
        this.isMac = contains(
          this.context.navigator.platform,
          ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
        );
        this.isIpad = this.context.navigator.platform === 'iPad';
        this.isIphone = this.context.navigator.platform === 'iPhone';
        this.isMSWindows = contains(
          this.context.navigator.platform,
          ['Windows', 'Win16', 'Win32', 'WinCE']
        );
      }

      /*
      * Create main element container
      */
      this.element = this.document.createElement('div');
      this.element.classList.add('terminal');
      this.element.classList.add('xterm');
      this.element.classList.add('xterm-theme-' + this.theme);

      this.element.style.height
      this.element.setAttribute('tabindex', 0);

      this.viewportElement = document.createElement('div');
      this.viewportElement.classList.add('xterm-viewport');
      this.element.appendChild(this.viewportElement);
      this.viewportScrollArea = document.createElement('div');
      this.viewportScrollArea.classList.add('xterm-scroll-area');
      this.viewportElement.appendChild(this.viewportScrollArea);

      /*
      * Create the container that will hold the lines of the terminal and then
      * produce the lines the lines.
      */
      this.rowContainer = document.createElement('div');
      this.rowContainer.classList.add('xterm-rows');
      this.element.appendChild(this.rowContainer);
      this.children = [];

      /*
      * Create the container that will hold helpers like the textarea for
      * capturing DOM Events. Then produce the helpers.
      */
      this.helperContainer = document.createElement('div');
      this.helperContainer.classList.add('xterm-helpers');
      // TODO: This should probably be inserted once it's filled to prevent an additional layout
      this.element.appendChild(this.helperContainer);
      this.textarea = document.createElement('textarea');
      this.textarea.classList.add('xterm-helper-textarea');
      this.textarea.setAttribute('autocorrect', 'off');
      this.textarea.setAttribute('autocapitalize', 'off');
      this.textarea.setAttribute('spellcheck', 'false');
      this.textarea.tabIndex = 0;
      this.textarea.addEventListener('focus', function() {
        self.emit('focus', {terminal: self});
      });
      this.textarea.addEventListener('blur', function() {
        self.emit('blur', {terminal: self});
      });
      this.helperContainer.appendChild(this.textarea);

      this.compositionView = document.createElement('div');
      this.compositionView.classList.add('composition-view');
      this.compositionHelper = new CompositionHelper(this.textarea, this.compositionView, this);
      this.helperContainer.appendChild(this.compositionView);

      this.charMeasureElement = document.createElement('div');
      this.charMeasureElement.classList.add('xterm-char-measure-element');
      this.charMeasureElement.innerHTML = 'W';
      this.helperContainer.appendChild(this.charMeasureElement);

      for (; i < this.rows; i++) {
        this.insertRow();
      }
      this.parent.appendChild(this.element);

      this.viewport = new Viewport(this, this.viewportElement, this.viewportScrollArea, this.charMeasureElement);

      // Draw the screen.
      this.refresh(0, this.rows - 1);

      // Initialize global actions that
      // need to be taken on the document.
      this.initGlobal();

      // Ensure there is a Terminal.focus.
      this.focus();

      on(this.element, 'mouseup', function() {
        var selection = document.getSelection(),
            collapsed = selection.isCollapsed,
            isRange = typeof collapsed == 'boolean' ? !collapsed : selection.type == 'Range';
        if (!isRange) {
          self.focus();
        }
      });

      // Listen for mouse events and translate
      // them into terminal mouse protocols.
      this.bindMouse();

      // Figure out whether boldness affects
      // the character width of monospace fonts.
      if (Terminal.brokenBold == null) {
        Terminal.brokenBold = isBoldBroken(this.document);
      }

      this.emit('open');
    };


    /**
     * Attempts to load an add-on using CommonJS or RequireJS (whichever is available).
     * @param {string} addon The name of the addon to load
     * @static
     */
    Terminal.loadAddon = function(addon, callback) {
      if (typeof exports === 'object' && typeof module === 'object') {
        // CommonJS
        return require(__dirname + '/../addons/' + addon);
      } else if (typeof define == 'function') {
        // RequireJS
        return require(['../addons/' + addon + '/' + addon], callback);
      } else {
        console.error('Cannot load a module without a CommonJS or RequireJS environment.');
        return false;
      }
    };


    /**
     * XTerm mouse events
     * http://invisible-island.net/xterm/ctlseqs/ctlseqs.html#Mouse%20Tracking
     * To better understand these
     * the xterm code is very helpful:
     * Relevant files:
     *   button.c, charproc.c, misc.c
     * Relevant functions in xterm/button.c:
     *   BtnCode, EmitButtonCode, EditorButton, SendMousePosition
     */
    Terminal.prototype.bindMouse = function() {
      var el = this.element, self = this, pressed = 32;

      // mouseup, mousedown, wheel
      // left click: ^[[M 3<^[[M#3<
      // wheel up: ^[[M`3>
      function sendButton(ev) {
        var button
          , pos;

        // get the xterm-style button
        button = getButton(ev);

        // get mouse coordinates
        pos = getCoords(ev);
        if (!pos) return;

        sendEvent(button, pos);

        switch (ev.overrideType || ev.type) {
          case 'mousedown':
            pressed = button;
            break;
          case 'mouseup':
            // keep it at the left
            // button, just in case.
            pressed = 32;
            break;
          case 'wheel':
            // nothing. don't
            // interfere with
            // `pressed`.
            break;
        }
      }

      // motion example of a left click:
      // ^[[M 3<^[[M@4<^[[M@5<^[[M@6<^[[M@7<^[[M#7<
      function sendMove(ev) {
        var button = pressed
          , pos;

        pos = getCoords(ev);
        if (!pos) return;

        // buttons marked as motions
        // are incremented by 32
        button += 32;

        sendEvent(button, pos);
      }

      // encode button and
      // position to characters
      function encode(data, ch) {
        if (!self.utfMouse) {
          if (ch === 255) return data.push(0);
          if (ch > 127) ch = 127;
          data.push(ch);
        } else {
          if (ch === 2047) return data.push(0);
          if (ch < 127) {
            data.push(ch);
          } else {
            if (ch > 2047) ch = 2047;
            data.push(0xC0 | (ch >> 6));
            data.push(0x80 | (ch & 0x3F));
          }
        }
      }

      // send a mouse event:
      // regular/utf8: ^[[M Cb Cx Cy
      // urxvt: ^[[ Cb ; Cx ; Cy M
      // sgr: ^[[ Cb ; Cx ; Cy M/m
      // vt300: ^[[ 24(1/3/5)~ [ Cx , Cy ] \r
      // locator: CSI P e ; P b ; P r ; P c ; P p & w
      function sendEvent(button, pos) {
        // self.emit('mouse', {
        //   x: pos.x - 32,
        //   y: pos.x - 32,
        //   button: button
        // });

        if (self.vt300Mouse) {
          // NOTE: Unstable.
          // http://www.vt100.net/docs/vt3xx-gp/chapter15.html
          button &= 3;
          pos.x -= 32;
          pos.y -= 32;
          var data = '\x1b[24';
          if (button === 0) data += '1';
          else if (button === 1) data += '3';
          else if (button === 2) data += '5';
          else if (button === 3) return;
          else data += '0';
          data += '~[' + pos.x + ',' + pos.y + ']\r';
          self.send(data);
          return;
        }

        if (self.decLocator) {
          // NOTE: Unstable.
          button &= 3;
          pos.x -= 32;
          pos.y -= 32;
          if (button === 0) button = 2;
          else if (button === 1) button = 4;
          else if (button === 2) button = 6;
          else if (button === 3) button = 3;
          self.send('\x1b['
            + button
            + ';'
            + (button === 3 ? 4 : 0)
            + ';'
            + pos.y
            + ';'
            + pos.x
            + ';'
            + (pos.page || 0)
            + '&w');
          return;
        }

        if (self.urxvtMouse) {
          pos.x -= 32;
          pos.y -= 32;
          pos.x++;
          pos.y++;
          self.send('\x1b[' + button + ';' + pos.x + ';' + pos.y + 'M');
          return;
        }

        if (self.sgrMouse) {
          pos.x -= 32;
          pos.y -= 32;
          self.send('\x1b[<'
            + ((button & 3) === 3 ? button & ~3 : button)
            + ';'
            + pos.x
            + ';'
            + pos.y
            + ((button & 3) === 3 ? 'm' : 'M'));
          return;
        }

        var data = [];

        encode(data, button);
        encode(data, pos.x);
        encode(data, pos.y);

        self.send('\x1b[M' + String.fromCharCode.apply(String, data));
      }

      function getButton(ev) {
        var button
          , shift
          , meta
          , ctrl
          , mod;

        // two low bits:
        // 0 = left
        // 1 = middle
        // 2 = right
        // 3 = release
        // wheel up/down:
        // 1, and 2 - with 64 added
        switch (ev.overrideType || ev.type) {
          case 'mousedown':
            button = ev.button != null
              ? +ev.button
              : ev.which != null
                ? ev.which - 1
                : null;

            if (self.isMSIE) {
              button = button === 1 ? 0 : button === 4 ? 1 : button;
            }
            break;
          case 'mouseup':
            button = 3;
            break;
          case 'DOMMouseScroll':
            button = ev.detail < 0
              ? 64
              : 65;
            break;
          case 'wheel':
            button = ev.wheelDeltaY > 0
              ? 64
              : 65;
            break;
        }

        // next three bits are the modifiers:
        // 4 = shift, 8 = meta, 16 = control
        shift = ev.shiftKey ? 4 : 0;
        meta = ev.metaKey ? 8 : 0;
        ctrl = ev.ctrlKey ? 16 : 0;
        mod = shift | meta | ctrl;

        // no mods
        if (self.vt200Mouse) {
          // ctrl only
          mod &= ctrl;
        } else if (!self.normalMouse) {
          mod = 0;
        }

        // increment to SP
        button = (32 + (mod << 2)) + button;

        return button;
      }

      // mouse coordinates measured in cols/rows
      function getCoords(ev) {
        var x, y, w, h, el;

        // ignore browsers without pageX for now
        if (ev.pageX == null) return;

        x = ev.pageX;
        y = ev.pageY;
        el = self.element;

        // should probably check offsetParent
        // but this is more portable
        while (el && el !== self.document.documentElement) {
          x -= el.offsetLeft;
          y -= el.offsetTop;
          el = 'offsetParent' in el
            ? el.offsetParent
            : el.parentNode;
        }

        // convert to cols/rows
        w = self.element.clientWidth;
        h = self.element.clientHeight;
        x = Math.ceil((x / w) * self.cols);
        y = Math.ceil((y / h) * self.rows);

        // be sure to avoid sending
        // bad positions to the program
        if (x < 0) x = 0;
        if (x > self.cols) x = self.cols;
        if (y < 0) y = 0;
        if (y > self.rows) y = self.rows;

        // xterm sends raw bytes and
        // starts at 32 (SP) for each.
        x += 32;
        y += 32;

        return {
          x: x,
          y: y,
          type: 'wheel'
        };
      }

      on(el, 'mousedown', function(ev) {
        if (!self.mouseEvents) return;

        // send the button
        sendButton(ev);

        // ensure focus
        self.focus();

        // fix for odd bug
        //if (self.vt200Mouse && !self.normalMouse) {
        if (self.vt200Mouse) {
          ev.overrideType = 'mouseup';
          sendButton(ev);
          return self.cancel(ev);
        }

        // bind events
        if (self.normalMouse) on(self.document, 'mousemove', sendMove);

        // x10 compatibility mode can't send button releases
        if (!self.x10Mouse) {
          on(self.document, 'mouseup', function up(ev) {
            sendButton(ev);
            if (self.normalMouse) off(self.document, 'mousemove', sendMove);
            off(self.document, 'mouseup', up);
            return self.cancel(ev);
          });
        }

        return self.cancel(ev);
      });

      //if (self.normalMouse) {
      //  on(self.document, 'mousemove', sendMove);
      //}

      on(el, 'wheel', function(ev) {
        if (!self.mouseEvents) return;
        if (self.x10Mouse
            || self.vt300Mouse
            || self.decLocator) return;
        sendButton(ev);
        return self.cancel(ev);
      });

      // allow wheel scrolling in
      // the shell for example
      on(el, 'wheel', function(ev) {
        if (self.mouseEvents) return;
        if (self.applicationKeypad) return;
        self.viewport.onWheel(ev);
        return self.cancel(ev);
      });
    };

    /**
     * Destroys the terminal.
     */
    Terminal.prototype.destroy = function() {
      this.readable = false;
      this.writable = false;
      this._events = {};
      this.handler = function() {};
      this.write = function() {};
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      //this.emit('close');
    };


    /**
     * Flags used to render terminal text properly
     */
    Terminal.flags = {
      BOLD: 1,
      UNDERLINE: 2,
      BLINK: 4,
      INVERSE: 8,
      INVISIBLE: 16
    }

    /**
     * Refreshes (re-renders) terminal content within two rows (inclusive)
     *
     * Rendering Engine:
     *
     * In the screen buffer, each character is stored as a an array with a character
     * and a 32-bit integer:
     *   - First value: a utf-16 character.
     *   - Second value:
     *   - Next 9 bits: background color (0-511).
     *   - Next 9 bits: foreground color (0-511).
     *   - Next 14 bits: a mask for misc. flags:
     *     - 1=bold
     *     - 2=underline
     *     - 4=blink
     *     - 8=inverse
     *     - 16=invisible
     *
     * @param {number} start The row to start from (between 0 and terminal's height terminal - 1)
     * @param {number} end The row to end at (between fromRow and terminal's height terminal - 1)
     * @param {boolean} queue Whether the refresh should ran right now or be queued
     */
    Terminal.prototype.refresh = function(start, end, queue) {
      var self = this;

      // queue defaults to true
      queue = (typeof queue == 'undefined') ? true : queue;

      /**
       * The refresh queue allows refresh to execute only approximately 30 times a second. For
       * commands that pass a significant amount of output to the write function, this prevents the
       * terminal from maxing out the CPU and making the UI unresponsive. While commands can still
       * run beyond what they do on the terminal, it is far better with a debounce in place as
       * every single terminal manipulation does not need to be constructed in the DOM.
       *
       * A side-effect of this is that it makes ^C to interrupt a process seem more responsive.
       */
      if (queue) {
        // If refresh should be queued, order the refresh and return.
        if (this._refreshIsQueued) {
          // If a refresh has already been queued, just order a full refresh next
          this._fullRefreshNext = true;
        } else {
          setTimeout(function () {
            self.refresh(start, end, false);
          }, 34)
          this._refreshIsQueued = true;
        }
        return;
      }

      // If refresh should be run right now (not be queued), release the lock
      this._refreshIsQueued = false;

      // If multiple refreshes were requested, make a full refresh.
      if (this._fullRefreshNext) {
        start = 0;
        end = this.rows - 1;
        this._fullRefreshNext = false // reset lock
      }

      var x, y, i, line, out, ch, ch_width, width, data, attr, bg, fg, flags, row, parent, focused = document.activeElement;

      // If this is a big refresh, remove the terminal rows from the DOM for faster calculations
      if (end - start >= this.rows / 2) {
        parent = this.element.parentNode;
        if (parent) {
          this.element.removeChild(this.rowContainer);
        }
      }

      width = this.cols;
      y = start;

      if (end >= this.rows.length) {
        this.log('`end` is too large. Most likely a bad CSR.');
        end = this.rows.length - 1;
      }

      for (; y <= end; y++) {
        row = y + this.ydisp;

        line = this.lines[row];
        out = '';

        if (this.y === y - (this.ybase - this.ydisp)
            && this.cursorState
            && !this.cursorHidden) {
          x = this.x;
        } else {
          x = -1;
        }

        attr = this.defAttr;
        i = 0;

        for (; i < width; i++) {
          data = line[i][0];
          ch = line[i][1];
          ch_width = line[i][2];
          if (!ch_width)
            continue;

          if (i === x) data = -1;

          if (data !== attr) {
            if (attr !== this.defAttr) {
              out += '</span>';
            }
            if (data !== this.defAttr) {
              if (data === -1) {
                out += '<span class="reverse-video terminal-cursor';
                if (this.cursorBlink) {
                  out += ' blinking';
                }
                out += '">';
              } else {
                var classNames = [];

                bg = data & 0x1ff;
                fg = (data >> 9) & 0x1ff;
                flags = data >> 18;

                if (flags & Terminal.flags.BOLD) {
                  if (!Terminal.brokenBold) {
                    classNames.push('xterm-bold');
                  }
                  // See: XTerm*boldColors
                  if (fg < 8) fg += 8;
                }

                if (flags & Terminal.flags.UNDERLINE) {
                  classNames.push('xterm-underline');
                }

                if (flags & Terminal.flags.BLINK) {
                  classNames.push('xterm-blink');
                }

                /**
                 * If inverse flag is on, then swap the foreground and background variables.
                 */
                if (flags & Terminal.flags.INVERSE) {
                    /* One-line variable swap in JavaScript: http://stackoverflow.com/a/16201730 */
                    bg = [fg, fg = bg][0];
                    // Should inverse just be before the
                    // above boldColors effect instead?
                    if ((flags & 1) && fg < 8) fg += 8;
                }

                if (flags & Terminal.flags.INVISIBLE) {
                  classNames.push('xterm-hidden');
                }

                /**
                 * Weird situation: Invert flag used black foreground and white background results
                 * in invalid background color, positioned at the 256 index of the 256 terminal
                 * color map. Pin the colors manually in such a case.
                 *
                 * Source: https://github.com/sourcelair/xterm.js/issues/57
                 */
                if (flags & Terminal.flags.INVERSE) {
                  if (bg == 257) {
                    bg = 15;
                  }
                  if (fg == 256) {
                    fg = 0;
                  }
                }

                if (bg < 256) {
                  classNames.push('xterm-bg-color-' + bg);
                }

                if (fg < 256) {
                  classNames.push('xterm-color-' + fg);
                }

                out += '<span';
                if (classNames.length) {
                  out += ' class="' + classNames.join(' ') + '"';
                }
                out += '>';
              }
            }
          }

          switch (ch) {
            case '&':
              out += '&amp;';
              break;
            case '<':
              out += '&lt;';
              break;
            case '>':
              out += '&gt;';
              break;
            default:
              if (ch <= ' ') {
                out += '&nbsp;';
              } else {
                out += ch;
              }
              break;
          }

          attr = data;
        }

        if (attr !== this.defAttr) {
          out += '</span>';
        }

        this.children[y].innerHTML = out;
      }

      if (parent) {
        this.element.appendChild(this.rowContainer);
      }

      this.emit('refresh', {element: this.element, start: start, end: end});
    };

    /**
     * Display the cursor element
     */
    Terminal.prototype.showCursor = function() {
      if (!this.cursorState) {
        this.cursorState = 1;
        this.refresh(this.y, this.y);
      }
    };

    /**
     * Scroll the terminal
     */
    Terminal.prototype.scroll = function() {
      var row;

      if (++this.ybase === this.scrollback) {
        this.ybase = this.ybase / 2 | 0;
        this.lines = this.lines.slice(-(this.ybase + this.rows) + 1);
      }

      this.ydisp = this.ybase;

      // last line
      row = this.ybase + this.rows - 1;

      // subtract the bottom scroll region
      row -= this.rows - 1 - this.scrollBottom;

      if (row === this.lines.length) {
        // potential optimization:
        // pushing is faster than splicing
        // when they amount to the same
        // behavior.
        this.lines.push(this.blankLine());
      } else {
        // add our new line
        this.lines.splice(row, 0, this.blankLine());
      }

      if (this.scrollTop !== 0) {
        if (this.ybase !== 0) {
          this.ybase--;
          this.ydisp = this.ybase;
        }
        this.lines.splice(this.ybase + this.scrollTop, 1);
      }

      // this.maxRange();
      this.updateRange(this.scrollTop);
      this.updateRange(this.scrollBottom);

      this.emit('scroll', this.ydisp);
    };

    /**
     * Scroll the display of the terminal
     * @param {number} disp The number of lines to scroll down (negatives scroll up).
     * @param {boolean} suppressScrollEvent Don't emit the scroll event as scrollDisp. This is used
     * to avoid unwanted events being handled by the veiwport when the event was triggered from the
     * viewport originally.
     */
    Terminal.prototype.scrollDisp = function(disp, suppressScrollEvent) {
      this.ydisp += disp;

      if (this.ydisp > this.ybase) {
        this.ydisp = this.ybase;
      } else if (this.ydisp < 0) {
        this.ydisp = 0;
      }

      if (!suppressScrollEvent) {
        this.emit('scroll', this.ydisp);
      }

      this.refresh(0, this.rows - 1);
    };

    /**
     * Writes text to the terminal.
     * @param {string} text The text to write to the terminal.
     */
    Terminal.prototype.write = function(data) {
      var l = data.length, i = 0, j, cs, ch, code, low, ch_width, row;

      this.refreshStart = this.y;
      this.refreshEnd = this.y;

      if (this.ybase !== this.ydisp) {
        this.ydisp = this.ybase;
        this.emit('scroll', this.ydisp);
        this.maxRange();
      }

      // apply leftover surrogate high from last write
      if (this.surrogate_high) {
        data = this.surrogate_high + data;
        this.surrogate_high = '';
      }

      for (; i < l; i++) {
        ch = data[i];

        // FIXME: higher chars than 0xa0 are not allowed in escape sequences
        //        --> maybe move to default
        code = data.charCodeAt(i);
        if (0xD800 <= code && code <= 0xDBFF) {
          // we got a surrogate high
          // get surrogate low (next 2 bytes)
          low = data.charCodeAt(i+1);
          if (isNaN(low)) {
            // end of data stream, save surrogate high
            this.surrogate_high = ch;
            continue;
          }
          code = ((code - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
          ch += data.charAt(i+1);
        }
        // surrogate low - already handled above
        if (0xDC00 <= code && code <= 0xDFFF)
          continue;

        switch (this.state) {
          case normal:
            switch (ch) {
              case '\x07':
                this.bell();
                break;

              // '\n', '\v', '\f'
              case '\n':
              case '\x0b':
              case '\x0c':
                if (this.convertEol) {
                  this.x = 0;
                }
                this.y++;
                if (this.y > this.scrollBottom) {
                  this.y--;
                  this.scroll();
                }
                break;

              // '\r'
              case '\r':
                this.x = 0;
                break;

              // '\b'
              case '\x08':
                if (this.x > 0) {
                  this.x--;
                }
                break;

              // '\t'
              case '\t':
                this.x = this.nextStop();
                break;

              // shift out
              case '\x0e':
                this.setgLevel(1);
                break;

              // shift in
              case '\x0f':
                this.setgLevel(0);
                break;

              // '\e'
              case '\x1b':
                this.state = escaped;
                break;

              default:
                // ' '
                // calculate print space
                // expensive call, therefore we save width in line buffer
                ch_width = wcwidth(code);

                if (ch >= ' ') {
                  if (this.charset && this.charset[ch]) {
                    ch = this.charset[ch];
                  }

                  row = this.y + this.ybase;

                  // insert combining char in last cell
                  // FIXME: needs handling after cursor jumps
                  if (!ch_width && this.x) {

                    // dont overflow left
                    if (this.lines[row][this.x-1]) {
                      if (!this.lines[row][this.x-1][2]) {

                        // found empty cell after fullwidth, need to go 2 cells back
                        if (this.lines[row][this.x-2])
                          this.lines[row][this.x-2][1] += ch;

                      } else {
                        this.lines[row][this.x-1][1] += ch;
                      }
                      this.updateRange(this.y);
                    }
                    break;
                  }

                  // goto next line if ch would overflow
                  // TODO: needs a global min terminal width of 2
                  if (this.x+ch_width-1 >= this.cols) {
                    // autowrap - DECAWM
                    if (this.wraparoundMode) {
                      this.x = 0;
                      this.y++;
                      if (this.y > this.scrollBottom) {
                        this.y--;
                        this.scroll();
                      }
                    } else {
                      this.x = this.cols-1;
                      if(ch_width===2)  // FIXME: check for xterm behavior
                        continue;
                    }
                  }
                  row = this.y + this.ybase;

                  // insert mode: move characters to right
                  if (this.insertMode) {
                    // do this twice for a fullwidth char
                    for (var moves=0; moves<ch_width; ++moves) {
                      // remove last cell, if it's width is 0
                      // we have to adjust the second last cell as well
                      var removed = this.lines[this.y + this.ybase].pop();
                      if (removed[2]===0
                          && this.lines[row][this.cols-2]
                          && this.lines[row][this.cols-2][2]===2)
                        this.lines[row][this.cols-2] = [this.curAttr, ' ', 1];

                      // insert empty cell at cursor
                      this.lines[row].splice(this.x, 0, [this.curAttr, ' ', 1]);
                    }
                  }

                  this.lines[row][this.x] = [this.curAttr, ch, ch_width];
                  this.x++;
                  this.updateRange(this.y);

                  // fullwidth char - set next cell width to zero and advance cursor
                  if (ch_width===2) {
                    this.lines[row][this.x] = [this.curAttr, '', 0];
                    this.x++;
                  }
                }
                break;
            }
            break;
          case escaped:
            switch (ch) {
              // ESC [ Control Sequence Introducer ( CSI is 0x9b).
              case '[':
                this.params = [];
                this.currentParam = 0;
                this.state = csi;
                break;

              // ESC ] Operating System Command ( OSC is 0x9d).
              case ']':
                this.params = [];
                this.currentParam = 0;
                this.state = osc;
                break;

              // ESC P Device Control String ( DCS is 0x90).
              case 'P':
                this.params = [];
                this.currentParam = 0;
                this.state = dcs;
                break;

              // ESC _ Application Program Command ( APC is 0x9f).
              case '_':
                this.state = ignore;
                break;

              // ESC ^ Privacy Message ( PM is 0x9e).
              case '^':
                this.state = ignore;
                break;

              // ESC c Full Reset (RIS).
              case 'c':
                this.reset();
                break;

              // ESC E Next Line ( NEL is 0x85).
              // ESC D Index ( IND is 0x84).
              case 'E':
                this.x = 0;
                ;
              case 'D':
                this.index();
                break;

              // ESC M Reverse Index ( RI is 0x8d).
              case 'M':
                this.reverseIndex();
                break;

              // ESC % Select default/utf-8 character set.
              // @ = default, G = utf-8
              case '%':
                //this.charset = null;
                this.setgLevel(0);
                this.setgCharset(0, Terminal.charsets.US);
                this.state = normal;
                i++;
                break;

              // ESC (,),*,+,-,. Designate G0-G2 Character Set.
              case '(': // <-- this seems to get all the attention
              case ')':
              case '*':
              case '+':
              case '-':
              case '.':
                switch (ch) {
                  case '(':
                    this.gcharset = 0;
                    break;
                  case ')':
                    this.gcharset = 1;
                    break;
                  case '*':
                    this.gcharset = 2;
                    break;
                  case '+':
                    this.gcharset = 3;
                    break;
                  case '-':
                    this.gcharset = 1;
                    break;
                  case '.':
                    this.gcharset = 2;
                    break;
                }
                this.state = charset;
                break;

              // Designate G3 Character Set (VT300).
              // A = ISO Latin-1 Supplemental.
              // Not implemented.
              case '/':
                this.gcharset = 3;
                this.state = charset;
                i--;
                break;

              // ESC N
              // Single Shift Select of G2 Character Set
              // ( SS2 is 0x8e). This affects next character only.
              case 'N':
                break;
              // ESC O
              // Single Shift Select of G3 Character Set
              // ( SS3 is 0x8f). This affects next character only.
              case 'O':
                break;
              // ESC n
              // Invoke the G2 Character Set as GL (LS2).
              case 'n':
                this.setgLevel(2);
                break;
              // ESC o
              // Invoke the G3 Character Set as GL (LS3).
              case 'o':
                this.setgLevel(3);
                break;
              // ESC |
              // Invoke the G3 Character Set as GR (LS3R).
              case '|':
                this.setgLevel(3);
                break;
              // ESC }
              // Invoke the G2 Character Set as GR (LS2R).
              case '}':
                this.setgLevel(2);
                break;
              // ESC ~
              // Invoke the G1 Character Set as GR (LS1R).
              case '~':
                this.setgLevel(1);
                break;

              // ESC 7 Save Cursor (DECSC).
              case '7':
                this.saveCursor();
                this.state = normal;
                break;

              // ESC 8 Restore Cursor (DECRC).
              case '8':
                this.restoreCursor();
                this.state = normal;
                break;

              // ESC # 3 DEC line height/width
              case '#':
                this.state = normal;
                i++;
                break;

              // ESC H Tab Set (HTS is 0x88).
              case 'H':
                this.tabSet();
                break;

              // ESC = Application Keypad (DECKPAM).
              case '=':
                this.log('Serial port requested application keypad.');
                this.applicationKeypad = true;
                this.viewport.setApplicationMode(true);
                this.state = normal;
                break;

              // ESC > Normal Keypad (DECKPNM).
              case '>':
                this.log('Switching back to normal keypad.');
                this.applicationKeypad = false;
                this.viewport.setApplicationMode(false);
                this.state = normal;
                break;

              default:
                this.state = normal;
                this.error('Unknown ESC control: %s.', ch);
                break;
            }
            break;

          case charset:
            switch (ch) {
              case '0': // DEC Special Character and Line Drawing Set.
                cs = Terminal.charsets.SCLD;
                break;
              case 'A': // UK
                cs = Terminal.charsets.UK;
                break;
              case 'B': // United States (USASCII).
                cs = Terminal.charsets.US;
                break;
              case '4': // Dutch
                cs = Terminal.charsets.Dutch;
                break;
              case 'C': // Finnish
              case '5':
                cs = Terminal.charsets.Finnish;
                break;
              case 'R': // French
                cs = Terminal.charsets.French;
                break;
              case 'Q': // FrenchCanadian
                cs = Terminal.charsets.FrenchCanadian;
                break;
              case 'K': // German
                cs = Terminal.charsets.German;
                break;
              case 'Y': // Italian
                cs = Terminal.charsets.Italian;
                break;
              case 'E': // NorwegianDanish
              case '6':
                cs = Terminal.charsets.NorwegianDanish;
                break;
              case 'Z': // Spanish
                cs = Terminal.charsets.Spanish;
                break;
              case 'H': // Swedish
              case '7':
                cs = Terminal.charsets.Swedish;
                break;
              case '=': // Swiss
                cs = Terminal.charsets.Swiss;
                break;
              case '/': // ISOLatin (actually /A)
                cs = Terminal.charsets.ISOLatin;
                i++;
                break;
              default: // Default
                cs = Terminal.charsets.US;
                break;
            }
            this.setgCharset(this.gcharset, cs);
            this.gcharset = null;
            this.state = normal;
            break;

          case osc:
            // OSC Ps ; Pt ST
            // OSC Ps ; Pt BEL
            //   Set Text Parameters.
            if (ch === '\x1b' || ch === '\x07') {
              if (ch === '\x1b') i++;

              this.params.push(this.currentParam);

              switch (this.params[0]) {
                case 0:
                case 1:
                case 2:
                  if (this.params[1]) {
                    this.title = this.params[1];
                    this.handleTitle(this.title);
                  }
                  break;
                case 3:
                  // set X property
                  break;
                case 4:
                case 5:
                  // change dynamic colors
                  break;
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                  // change dynamic ui colors
                  break;
                case 46:
                  // change log file
                  break;
                case 50:
                  // dynamic font
                  break;
                case 51:
                  // emacs shell
                  break;
                case 52:
                  // manipulate selection data
                  break;
                case 104:
                case 105:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 117:
                case 118:
                  // reset colors
                  break;
              }

              this.params = [];
              this.currentParam = 0;
              this.state = normal;
            } else {
              if (!this.params.length) {
                if (ch >= '0' && ch <= '9') {
                  this.currentParam =
                    this.currentParam * 10 + ch.charCodeAt(0) - 48;
                } else if (ch === ';') {
                  this.params.push(this.currentParam);
                  this.currentParam = '';
                }
              } else {
                this.currentParam += ch;
              }
            }
            break;

          case csi:
            // '?', '>', '!'
            if (ch === '?' || ch === '>' || ch === '!') {
              this.prefix = ch;
              break;
            }

            // 0 - 9
            if (ch >= '0' && ch <= '9') {
              this.currentParam = this.currentParam * 10 + ch.charCodeAt(0) - 48;
              break;
            }

            // '$', '"', ' ', '\''
            if (ch === '$' || ch === '"' || ch === ' ' || ch === '\'') {
              this.postfix = ch;
              break;
            }

            this.params.push(this.currentParam);
            this.currentParam = 0;

            // ';'
            if (ch === ';') break;

            this.state = normal;

            switch (ch) {
              // CSI Ps A
              // Cursor Up Ps Times (default = 1) (CUU).
              case 'A':
                this.cursorUp(this.params);
                break;

              // CSI Ps B
              // Cursor Down Ps Times (default = 1) (CUD).
              case 'B':
                this.cursorDown(this.params);
                break;

              // CSI Ps C
              // Cursor Forward Ps Times (default = 1) (CUF).
              case 'C':
                this.cursorForward(this.params);
                break;

              // CSI Ps D
              // Cursor Backward Ps Times (default = 1) (CUB).
              case 'D':
                this.cursorBackward(this.params);
                break;

              // CSI Ps ; Ps H
              // Cursor Position [row;column] (default = [1,1]) (CUP).
              case 'H':
                this.cursorPos(this.params);
                break;

              // CSI Ps J  Erase in Display (ED).
              case 'J':
                this.eraseInDisplay(this.params);
                break;

              // CSI Ps K  Erase in Line (EL).
              case 'K':
                this.eraseInLine(this.params);
                break;

              // CSI Pm m  Character Attributes (SGR).
              case 'm':
                if (!this.prefix) {
                  this.charAttributes(this.params);
                }
                break;

              // CSI Ps n  Device Status Report (DSR).
              case 'n':
                if (!this.prefix) {
                  this.deviceStatus(this.params);
                }
                break;

              /**
               * Additions
               */

              // CSI Ps @
              // Insert Ps (Blank) Character(s) (default = 1) (ICH).
              case '@':
                this.insertChars(this.params);
                break;

              // CSI Ps E
              // Cursor Next Line Ps Times (default = 1) (CNL).
              case 'E':
                this.cursorNextLine(this.params);
                break;

              // CSI Ps F
              // Cursor Preceding Line Ps Times (default = 1) (CNL).
              case 'F':
                this.cursorPrecedingLine(this.params);
                break;

              // CSI Ps G
              // Cursor Character Absolute  [column] (default = [row,1]) (CHA).
              case 'G':
                this.cursorCharAbsolute(this.params);
                break;

              // CSI Ps L
              // Insert Ps Line(s) (default = 1) (IL).
              case 'L':
                this.insertLines(this.params);
                break;

              // CSI Ps M
              // Delete Ps Line(s) (default = 1) (DL).
              case 'M':
                this.deleteLines(this.params);
                break;

              // CSI Ps P
              // Delete Ps Character(s) (default = 1) (DCH).
              case 'P':
                this.deleteChars(this.params);
                break;

              // CSI Ps X
              // Erase Ps Character(s) (default = 1) (ECH).
              case 'X':
                this.eraseChars(this.params);
                break;

              // CSI Pm `  Character Position Absolute
              //   [column] (default = [row,1]) (HPA).
              case '`':
                this.charPosAbsolute(this.params);
                break;

              // 141 61 a * HPR -
              // Horizontal Position Relative
              case 'a':
                this.HPositionRelative(this.params);
                break;

              // CSI P s c
              // Send Device Attributes (Primary DA).
              // CSI > P s c
              // Send Device Attributes (Secondary DA)
              case 'c':
                this.sendDeviceAttributes(this.params);
                break;

              // CSI Pm d
              // Line Position Absolute  [row] (default = [1,column]) (VPA).
              case 'd':
                this.linePosAbsolute(this.params);
                break;

              // 145 65 e * VPR - Vertical Position Relative
              case 'e':
                this.VPositionRelative(this.params);
                break;

              // CSI Ps ; Ps f
              //   Horizontal and Vertical Position [row;column] (default =
              //   [1,1]) (HVP).
              case 'f':
                this.HVPosition(this.params);
                break;

              // CSI Pm h  Set Mode (SM).
              // CSI ? Pm h - mouse escape codes, cursor escape codes
              case 'h':
                this.setMode(this.params);
                break;

              // CSI Pm l  Reset Mode (RM).
              // CSI ? Pm l
              case 'l':
                this.resetMode(this.params);
                break;

              // CSI Ps ; Ps r
              //   Set Scrolling Region [top;bottom] (default = full size of win-
              //   dow) (DECSTBM).
              // CSI ? Pm r
              case 'r':
                this.setScrollRegion(this.params);
                break;

              // CSI s
              //   Save cursor (ANSI.SYS).
              case 's':
                this.saveCursor(this.params);
                break;

              // CSI u
              //   Restore cursor (ANSI.SYS).
              case 'u':
                this.restoreCursor(this.params);
                break;

              /**
               * Lesser Used
               */

              // CSI Ps I
              // Cursor Forward Tabulation Ps tab stops (default = 1) (CHT).
              case 'I':
                this.cursorForwardTab(this.params);
                break;

              // CSI Ps S  Scroll up Ps lines (default = 1) (SU).
              case 'S':
                this.scrollUp(this.params);
                break;

              // CSI Ps T  Scroll down Ps lines (default = 1) (SD).
              // CSI Ps ; Ps ; Ps ; Ps ; Ps T
              // CSI > Ps; Ps T
              case 'T':
                // if (this.prefix === '>') {
                //   this.resetTitleModes(this.params);
                //   break;
                // }
                // if (this.params.length > 2) {
                //   this.initMouseTracking(this.params);
                //   break;
                // }
                if (this.params.length < 2 && !this.prefix) {
                  this.scrollDown(this.params);
                }
                break;

              // CSI Ps Z
              // Cursor Backward Tabulation Ps tab stops (default = 1) (CBT).
              case 'Z':
                this.cursorBackwardTab(this.params);
                break;

              // CSI Ps b  Repeat the preceding graphic character Ps times (REP).
              case 'b':
                this.repeatPrecedingCharacter(this.params);
                break;

              // CSI Ps g  Tab Clear (TBC).
              case 'g':
                this.tabClear(this.params);
                break;

              // CSI Pm i  Media Copy (MC).
              // CSI ? Pm i
              // case 'i':
              //   this.mediaCopy(this.params);
              //   break;

              // CSI Pm m  Character Attributes (SGR).
              // CSI > Ps; Ps m
              // case 'm': // duplicate
              //   if (this.prefix === '>') {
              //     this.setResources(this.params);
              //   } else {
              //     this.charAttributes(this.params);
              //   }
              //   break;

              // CSI Ps n  Device Status Report (DSR).
              // CSI > Ps n
              // case 'n': // duplicate
              //   if (this.prefix === '>') {
              //     this.disableModifiers(this.params);
              //   } else {
              //     this.deviceStatus(this.params);
              //   }
              //   break;

              // CSI > Ps p  Set pointer mode.
              // CSI ! p   Soft terminal reset (DECSTR).
              // CSI Ps$ p
              //   Request ANSI mode (DECRQM).
              // CSI ? Ps$ p
              //   Request DEC private mode (DECRQM).
              // CSI Ps ; Ps " p
              case 'p':
                switch (this.prefix) {
                  // case '>':
                  //   this.setPointerMode(this.params);
                  //   break;
                  case '!':
                    this.softReset(this.params);
                    break;
                  // case '?':
                  //   if (this.postfix === '$') {
                  //     this.requestPrivateMode(this.params);
                  //   }
                  //   break;
                  // default:
                  //   if (this.postfix === '"') {
                  //     this.setConformanceLevel(this.params);
                  //   } else if (this.postfix === '$') {
                  //     this.requestAnsiMode(this.params);
                  //   }
                  //   break;
                }
                break;

              // CSI Ps q  Load LEDs (DECLL).
              // CSI Ps SP q
              // CSI Ps " q
              // case 'q':
              //   if (this.postfix === ' ') {
              //     this.setCursorStyle(this.params);
              //     break;
              //   }
              //   if (this.postfix === '"') {
              //     this.setCharProtectionAttr(this.params);
              //     break;
              //   }
              //   this.loadLEDs(this.params);
              //   break;

              // CSI Ps ; Ps r
              //   Set Scrolling Region [top;bottom] (default = full size of win-
              //   dow) (DECSTBM).
              // CSI ? Pm r
              // CSI Pt; Pl; Pb; Pr; Ps$ r
              // case 'r': // duplicate
              //   if (this.prefix === '?') {
              //     this.restorePrivateValues(this.params);
              //   } else if (this.postfix === '$') {
              //     this.setAttrInRectangle(this.params);
              //   } else {
              //     this.setScrollRegion(this.params);
              //   }
              //   break;

              // CSI s     Save cursor (ANSI.SYS).
              // CSI ? Pm s
              // case 's': // duplicate
              //   if (this.prefix === '?') {
              //     this.savePrivateValues(this.params);
              //   } else {
              //     this.saveCursor(this.params);
              //   }
              //   break;

              // CSI Ps ; Ps ; Ps t
              // CSI Pt; Pl; Pb; Pr; Ps$ t
              // CSI > Ps; Ps t
              // CSI Ps SP t
              // case 't':
              //   if (this.postfix === '$') {
              //     this.reverseAttrInRectangle(this.params);
              //   } else if (this.postfix === ' ') {
              //     this.setWarningBellVolume(this.params);
              //   } else {
              //     if (this.prefix === '>') {
              //       this.setTitleModeFeature(this.params);
              //     } else {
              //       this.manipulateWindow(this.params);
              //     }
              //   }
              //   break;

              // CSI u     Restore cursor (ANSI.SYS).
              // CSI Ps SP u
              // case 'u': // duplicate
              //   if (this.postfix === ' ') {
              //     this.setMarginBellVolume(this.params);
              //   } else {
              //     this.restoreCursor(this.params);
              //   }
              //   break;

              // CSI Pt; Pl; Pb; Pr; Pp; Pt; Pl; Pp$ v
              // case 'v':
              //   if (this.postfix === '$') {
              //     this.copyRectagle(this.params);
              //   }
              //   break;

              // CSI Pt ; Pl ; Pb ; Pr ' w
              // case 'w':
              //   if (this.postfix === '\'') {
              //     this.enableFilterRectangle(this.params);
              //   }
              //   break;

              // CSI Ps x  Request Terminal Parameters (DECREQTPARM).
              // CSI Ps x  Select Attribute Change Extent (DECSACE).
              // CSI Pc; Pt; Pl; Pb; Pr$ x
              // case 'x':
              //   if (this.postfix === '$') {
              //     this.fillRectangle(this.params);
              //   } else {
              //     this.requestParameters(this.params);
              //     //this.__(this.params);
              //   }
              //   break;

              // CSI Ps ; Pu ' z
              // CSI Pt; Pl; Pb; Pr$ z
              // case 'z':
              //   if (this.postfix === '\'') {
              //     this.enableLocatorReporting(this.params);
              //   } else if (this.postfix === '$') {
              //     this.eraseRectangle(this.params);
              //   }
              //   break;

              // CSI Pm ' {
              // CSI Pt; Pl; Pb; Pr$ {
              // case '{':
              //   if (this.postfix === '\'') {
              //     this.setLocatorEvents(this.params);
              //   } else if (this.postfix === '$') {
              //     this.selectiveEraseRectangle(this.params);
              //   }
              //   break;

              // CSI Ps ' |
              // case '|':
              //   if (this.postfix === '\'') {
              //     this.requestLocatorPosition(this.params);
              //   }
              //   break;

              // CSI P m SP }
              // Insert P s Column(s) (default = 1) (DECIC), VT420 and up.
              // case '}':
              //   if (this.postfix === ' ') {
              //     this.insertColumns(this.params);
              //   }
              //   break;

              // CSI P m SP ~
              // Delete P s Column(s) (default = 1) (DECDC), VT420 and up
              // case '~':
              //   if (this.postfix === ' ') {
              //     this.deleteColumns(this.params);
              //   }
              //   break;

              default:
                this.error('Unknown CSI code: %s.', ch);
                break;
            }

            this.prefix = '';
            this.postfix = '';
            break;

          case dcs:
            if (ch === '\x1b' || ch === '\x07') {
              if (ch === '\x1b') i++;

              switch (this.prefix) {
                // User-Defined Keys (DECUDK).
                case '':
                  break;

                // Request Status String (DECRQSS).
                // test: echo -e '\eP$q"p\e\\'
                case '$q':
                  var pt = this.currentParam
                    , valid = false;

                  switch (pt) {
                    // DECSCA
                    case '"q':
                      pt = '0"q';
                      break;

                    // DECSCL
                    case '"p':
                      pt = '61"p';
                      break;

                    // DECSTBM
                    case 'r':
                      pt = ''
                        + (this.scrollTop + 1)
                        + ';'
                        + (this.scrollBottom + 1)
                        + 'r';
                      break;

                    // SGR
                    case 'm':
                      pt = '0m';
                      break;

                    default:
                      this.error('Unknown DCS Pt: %s.', pt);
                      pt = '';
                      break;
                  }

                  this.send('\x1bP' + +valid + '$r' + pt + '\x1b\\');
                  break;

                // Set Termcap/Terminfo Data (xterm, experimental).
                case '+p':
                  break;

                // Request Termcap/Terminfo String (xterm, experimental)
                // Regular xterm does not even respond to this sequence.
                // This can cause a small glitch in vim.
                // test: echo -ne '\eP+q6b64\e\\'
                case '+q':
                  var pt = this.currentParam
                    , valid = false;

                  this.send('\x1bP' + +valid + '+r' + pt + '\x1b\\');
                  break;

                default:
                  this.error('Unknown DCS prefix: %s.', this.prefix);
                  break;
              }

              this.currentParam = 0;
              this.prefix = '';
              this.state = normal;
            } else if (!this.currentParam) {
              if (!this.prefix && ch !== '$' && ch !== '+') {
                this.currentParam = ch;
              } else if (this.prefix.length === 2) {
                this.currentParam = ch;
              } else {
                this.prefix += ch;
              }
            } else {
              this.currentParam += ch;
            }
            break;

          case ignore:
            // For PM and APC.
            if (ch === '\x1b' || ch === '\x07') {
              if (ch === '\x1b') i++;
              this.state = normal;
            }
            break;
        }
      }

      this.updateRange(this.y);
      this.refresh(this.refreshStart, this.refreshEnd);
    };

    /**
     * Writes text to the terminal, followed by a break line character (\n).
     * @param {string} text The text to write to the terminal.
     */
    Terminal.prototype.writeln = function(data) {
      this.write(data + '\r\n');
    };

    /**
     * Attaches a custom keydown handler which is run before keys are processed, giving consumers of
     * xterm.js ultimate control as to what keys should be processed by the terminal and what keys
     * should not.
     * @param {function} customKeydownHandler The custom KeyboardEvent handler to attach. This is a
     *   function that takes a KeyboardEvent, allowing consumers to stop propogation and/or prevent
     *   the default action. The function returns whether the event should be processed by xterm.js.
     */
    Terminal.prototype.attachCustomKeydownHandler = function(customKeydownHandler) {
      this.customKeydownHandler = customKeydownHandler;
    }

    /**
     * Handle a keydown event
     * Key Resources:
     *   - https://developer.mozilla.org/en-US/docs/DOM/KeyboardEvent
     * @param {KeyboardEvent} ev The keydown event to be handled.
     */
    Terminal.prototype.keyDown = function(ev) {
      if (this.customKeydownHandler && this.customKeydownHandler(ev) === false) {
        return false;
      }

      if (!this.compositionHelper.keydown.bind(this.compositionHelper)(ev)) {
        return false;
      }

      var self = this;
      var result = this.evaluateKeyEscapeSequence(ev);

      if (result.scrollDisp) {
        this.scrollDisp(result.scrollDisp);
        return this.cancel(ev);
      }

      if (isThirdLevelShift(this, ev)) {
        return true;
      }

      if (result.cancel ) {
        // The event is canceled at the end already, is this necessary?
        this.cancel(ev, true);
      }

      if (!result.key) {
        return true;
      }

      this.emit('keydown', ev);
      this.emit('key', result.key, ev);
      this.showCursor();
      this.handler(result.key);

      return this.cancel(ev, true);
    };

    /**
     * Returns an object that determines how a KeyboardEvent should be handled. The key of the
     * returned value is the new key code to pass to the PTY.
     *
     * Reference: http://invisible-island.net/xterm/ctlseqs/ctlseqs.html
     * @param {KeyboardEvent} ev The keyboard event to be translated to key escape sequence.
     */
    Terminal.prototype.evaluateKeyEscapeSequence = function(ev) {
      var result = {
        // Whether to cancel event propogation (NOTE: this may not be needed since the event is
        // canceled at the end of keyDown
        cancel: false,
        // The new key even to emit
        key: undefined,
        // The number of characters to scroll, if this is defined it will cancel the event
        scrollDisp: undefined
      };
      var modifiers = ev.shiftKey << 0 | ev.altKey << 1 | ev.ctrlKey << 2 | ev.metaKey << 3;
      switch (ev.keyCode) {
        // backspace
        case 8:
          if (ev.shiftKey) {
            result.key = '\x08'; // ^H
            break;
          }
          result.key = '\x7f'; // ^?
          break;
        // tab
        case 9:
          if (ev.shiftKey) {
            result.key = '\x1b[Z';
            break;
          }
          result.key = '\t';
          result.cancel = true;
          break;
        // return/enter
        case 13:
          result.key = '\r';
          result.cancel = true;
          break;
        // escape
        case 27:
          result.key = '\x1b';
          result.cancel = true;
          break;
        // left-arrow
        case 37:
          if (modifiers) {
            result.key = '\x1b[1;' + (modifiers + 1) + 'D';
            // HACK: Make Alt + left-arrow behave like Ctrl + left-arrow: move one word backwards
            // http://unix.stackexchange.com/a/108106
            if (result.key == '\x1b[1;3D') {
              result.key = '\x1b[1;5D';
            }
          } else if (this.applicationCursor) {
            result.key = '\x1bOD';
          } else {
            result.key = '\x1b[D';
          }
          break;
        // right-arrow
        case 39:
          if (modifiers) {
            result.key = '\x1b[1;' + (modifiers + 1) + 'C';
            // HACK: Make Alt + right-arrow behave like Ctrl + right-arrow: move one word forward
            // http://unix.stackexchange.com/a/108106
            if (result.key == '\x1b[1;3C') {
              result.key = '\x1b[1;5C';
            }
          } else if (this.applicationCursor) {
            result.key = '\x1bOC';
          } else {
            result.key = '\x1b[C';
          }
          break;
        // up-arrow
        case 38:
          if (modifiers) {
            result.key = '\x1b[1;' + (modifiers + 1) + 'A';
            // HACK: Make Alt + up-arrow behave like Ctrl + up-arrow
            // http://unix.stackexchange.com/a/108106
            if (result.key == '\x1b[1;3A') {
              result.key = '\x1b[1;5A';
            }
          } else if (this.applicationCursor) {
            result.key = '\x1bOA';
          } else {
            result.key = '\x1b[A';
          }
          break;
        // down-arrow
        case 40:
          if (modifiers) {
            result.key = '\x1b[1;' + (modifiers + 1) + 'B';
            // HACK: Make Alt + down-arrow behave like Ctrl + down-arrow
            // http://unix.stackexchange.com/a/108106
            if (result.key == '\x1b[1;3B') {
              result.key = '\x1b[1;5B';
            }
          } else if (this.applicationCursor) {
            result.key = '\x1bOB';
          } else {
            result.key = '\x1b[B';
          }
          break;
        // insert
        case 45:
          if (!ev.shiftKey && !ev.ctrlKey) {
            // <Ctrl> or <Shift> + <Insert> are used to
            // copy-paste on some systems.
            result.key = '\x1b[2~';
          }
          break;
        // delete
        case 46: result.key = '\x1b[3~'; break;
        // home
        case 36:
          if (modifiers)
            result.key = '\x1b[1;' + (modifiers + 1) + 'H';
          else if (this.applicationCursor)
            result.key = '\x1bOH';
          else
            result.key = '\x1b[H';
          break;
        // end
        case 35:
          if (modifiers)
            result.key = '\x1b[1;' + (modifiers + 1) + 'F';
          else if (this.applicationCursor)
            result.key = '\x1bOF';
          else
            result.key = '\x1b[F';
          break;
        // page up
        case 33:
          if (ev.shiftKey) {
            result.scrollDisp = -(this.rows - 1);
          } else {
            result.key = '\x1b[5~';
          }
          break;
        // page down
        case 34:
          if (ev.shiftKey) {
            result.scrollDisp = this.rows - 1;
          } else {
            result.key = '\x1b[6~';
          }
          break;
        // F1-F12
        case 112: result.key = '\x1bOP'; break;
        case 113: result.key = '\x1bOQ'; break;
        case 114: result.key = '\x1bOR'; break;
        case 115: result.key = '\x1bOS'; break;
        case 116: result.key = '\x1b[15~'; break;
        case 117: result.key = '\x1b[17~'; break;
        case 118: result.key = '\x1b[18~'; break;
        case 119: result.key = '\x1b[19~'; break;
        case 120: result.key = '\x1b[20~'; break;
        case 121: result.key = '\x1b[21~'; break;
        case 122: result.key = '\x1b[23~'; break;
        case 123: result.key = '\x1b[24~'; break;
        default:
          // a-z and space
          if (ev.ctrlKey && !ev.shiftKey && !ev.altKey && !ev.metaKey) {
            if (ev.keyCode >= 65 && ev.keyCode <= 90) {
              result.key = String.fromCharCode(ev.keyCode - 64);
            } else if (ev.keyCode === 32) {
              // NUL
              result.key = String.fromCharCode(0);
            } else if (ev.keyCode >= 51 && ev.keyCode <= 55) {
              // escape, file sep, group sep, record sep, unit sep
              result.key = String.fromCharCode(ev.keyCode - 51 + 27);
            } else if (ev.keyCode === 56) {
              // delete
              result.key = String.fromCharCode(127);
            } else if (ev.keyCode === 219) {
              // ^[ - escape
              result.key = String.fromCharCode(27);
            } else if (ev.keyCode === 221) {
              // ^] - group sep
              result.key = String.fromCharCode(29);
            }
          } else if (!this.isMac && ev.altKey && !ev.ctrlKey && !ev.metaKey) {
            // On Mac this is a third level shift. Use <Esc> instead.
            if (ev.keyCode >= 65 && ev.keyCode <= 90) {
              result.key = '\x1b' + String.fromCharCode(ev.keyCode + 32);
            } else if (ev.keyCode === 192) {
              result.key = '\x1b`';
            } else if (ev.keyCode >= 48 && ev.keyCode <= 57) {
              result.key = '\x1b' + (ev.keyCode - 48);
            }
          }
          break;
      }
      return result;
    };

    /**
     * Set the G level of the terminal
     * @param g
     */
    Terminal.prototype.setgLevel = function(g) {
      this.glevel = g;
      this.charset = this.charsets[g];
    };

    /**
     * Set the charset for the given G level of the terminal
     * @param g
     * @param charset
     */
    Terminal.prototype.setgCharset = function(g, charset) {
      this.charsets[g] = charset;
      if (this.glevel === g) {
        this.charset = charset;
      }
    };

    /**
     * Handle a keypress event.
     * Key Resources:
     *   - https://developer.mozilla.org/en-US/docs/DOM/KeyboardEvent
     * @param {KeyboardEvent} ev The keypress event to be handled.
     */
    Terminal.prototype.keyPress = function(ev) {
      var key;

      this.cancel(ev);

      if (ev.charCode) {
        key = ev.charCode;
      } else if (ev.which == null) {
        key = ev.keyCode;
      } else if (ev.which !== 0 && ev.charCode !== 0) {
        key = ev.which;
      } else {
        return false;
      }

      if (!key || (
        (ev.altKey || ev.ctrlKey || ev.metaKey) && !isThirdLevelShift(this, ev)
      )) {
        return false;
      }

      key = String.fromCharCode(key);

      this.emit('keypress', key, ev);
      this.emit('key', key, ev);
      this.showCursor();
      this.handler(key);

      return false;
    };

    /**
     * Send data for handling to the terminal
     * @param {string} data
     */
    Terminal.prototype.send = function(data) {
      var self = this;

      if (!this.queue) {
        setTimeout(function() {
          self.handler(self.queue);
          self.queue = '';
        }, 1);
      }

      this.queue += data;
    };

    /**
     * Ring the bell.
     * Note: We could do sweet things with webaudio here
     */
    Terminal.prototype.bell = function() {
      if (!this.visualBell) return;
      var self = this;
      this.element.style.borderColor = 'white';
      setTimeout(function() {
        self.element.style.borderColor = '';
      }, 10);
      if (this.popOnBell) this.focus();
    };

    /**
     * Log the current state to the console.
     */
    Terminal.prototype.log = function() {
      if (!this.debug) return;
      if (!this.context.console || !this.context.console.log) return;
      var args = Array.prototype.slice.call(arguments);
      this.context.console.log.apply(this.context.console, args);
    };

    /**
     * Log the current state as error to the console.
     */
    Terminal.prototype.error = function() {
      if (!this.debug) return;
      if (!this.context.console || !this.context.console.error) return;
      var args = Array.prototype.slice.call(arguments);
      this.context.console.error.apply(this.context.console, args);
    };

    /**
     * Resizes the terminal.
     *
     * @param {number} x The number of columns to resize to.
     * @param {number} y The number of rows to resize to.
     */
    Terminal.prototype.resize = function(x, y) {
      var line
        , el
        , i
        , j
        , ch
        , addToY;

      if (x === this.cols && y === this.rows) {
        return;
      }

      if (x < 1) x = 1;
      if (y < 1) y = 1;

      // resize cols
      j = this.cols;
      if (j < x) {
        ch = [this.defAttr, ' ', 1]; // does xterm use the default attr?
        i = this.lines.length;
        while (i--) {
          while (this.lines[i].length < x) {
            this.lines[i].push(ch);
          }
        }
      } else { // (j > x)
        i = this.lines.length;
        while (i--) {
          while (this.lines[i].length > x) {
            this.lines[i].pop();
          }
        }
      }
      this.setupStops(j);
      this.cols = x;

      // resize rows
      j = this.rows;
      addToY = 0;
      if (j < y) {
        el = this.element;
        while (j++ < y) {
          // y is rows, not this.y
          if (this.lines.length < y + this.ybase) {
            if (this.ybase > 0 && this.lines.length <= this.ybase + this.y + addToY + 1) {
              // There is room above the buffer and there are no empty elements below the line,
              // scroll up
              this.ybase--;
              addToY++
              if (this.ydisp > 0) {
                // Viewport is at the top of the buffer, must increase downwards
                this.ydisp--;
              }
            } else {
              // Add a blank line if there is no buffer left at the top to scroll to, or if there
              // are blank lines after the cursor
              this.lines.push(this.blankLine());
            }
          }
          if (this.children.length < y) {
            this.insertRow();
          }
        }
      } else { // (j > y)
        while (j-- > y) {
          if (this.lines.length > y + this.ybase) {
            if (this.lines.length > this.ybase + this.y + 1) {
              // The line is a blank line below the cursor, remove it
              this.lines.pop();
            } else {
              // The line is the cursor, scroll down
              this.ybase++;
              this.ydisp++;
            }
          }
          if (this.children.length > y) {
            el = this.children.shift();
            if (!el) continue;
            el.parentNode.removeChild(el);
          }
        }
      }
      this.rows = y;

      /*
      *  Make sure that the cursor stays on screen
      */
      if (this.y >= y) {
        this.y = y - 1;
      }
      if (addToY) {
        this.y += addToY;
      }

      if (this.x >= x) {
        this.x = x - 1;
      }

      this.scrollTop = 0;
      this.scrollBottom = y - 1;

      this.refresh(0, this.rows - 1);

      this.normal = null;

      this.emit('resize', {terminal: this, cols: x, rows: y});
    };

    /**
     * Updates the range of rows to refresh
     * @param {number} y The number of rows to refresh next.
     */
    Terminal.prototype.updateRange = function(y) {
      if (y < this.refreshStart) this.refreshStart = y;
      if (y > this.refreshEnd) this.refreshEnd = y;
      // if (y > this.refreshEnd) {
      //   this.refreshEnd = y;
      //   if (y > this.rows - 1) {
      //     this.refreshEnd = this.rows - 1;
      //   }
      // }
    };

    /**
     * Set the range of refreshing to the maximyum value
     */
    Terminal.prototype.maxRange = function() {
      this.refreshStart = 0;
      this.refreshEnd = this.rows - 1;
    };



    /**
     * Setup the tab stops.
     * @param {number} i
     */
    Terminal.prototype.setupStops = function(i) {
      if (i != null) {
        if (!this.tabs[i]) {
          i = this.prevStop(i);
        }
      } else {
        this.tabs = {};
        i = 0;
      }

      for (; i < this.cols; i += 8) {
        this.tabs[i] = true;
      }
    };


    /**
     * Move the cursor to the previous tab stop from the given position (default is current).
     * @param {number} x The position to move the cursor to the previous tab stop.
     */
    Terminal.prototype.prevStop = function(x) {
      if (x == null) x = this.x;
      while (!this.tabs[--x] && x > 0);
      return x >= this.cols
        ? this.cols - 1
        : x < 0 ? 0 : x;
    };


    /**
     * Move the cursor one tab stop forward from the given position (default is current).
     * @param {number} x The position to move the cursor one tab stop forward.
     */
    Terminal.prototype.nextStop = function(x) {
      if (x == null) x = this.x;
      while (!this.tabs[++x] && x < this.cols);
      return x >= this.cols
        ? this.cols - 1
        : x < 0 ? 0 : x;
    };


    /**
     * Erase in the identified line everything from "x" to the end of the line (right).
     * @param {number} x The column from which to start erasing to the end of the line.
     * @param {number} y The line in which to operate.
     */
    Terminal.prototype.eraseRight = function(x, y) {
      var line = this.lines[this.ybase + y]
        , ch = [this.eraseAttr(), ' ', 1]; // xterm


      for (; x < this.cols; x++) {
        line[x] = ch;
      }

      this.updateRange(y);
    };



    /**
     * Erase in the identified line everything from "x" to the start of the line (left).
     * @param {number} x The column from which to start erasing to the start of the line.
     * @param {number} y The line in which to operate.
     */
    Terminal.prototype.eraseLeft = function(x, y) {
      var line = this.lines[this.ybase + y]
        , ch = [this.eraseAttr(), ' ', 1]; // xterm

      x++;
      while (x--) line[x] = ch;

      this.updateRange(y);
    };


    /**
     * Erase all content in the given line
     * @param {number} y The line to erase all of its contents.
     */
    Terminal.prototype.eraseLine = function(y) {
      this.eraseRight(0, y);
    };


    /**
     * Return the data array of a blank line/
     * @param {number} cur First bunch of data for each "blank" character.
     */
    Terminal.prototype.blankLine = function(cur) {
      var attr = cur
        ? this.eraseAttr()
        : this.defAttr;

      var ch = [attr, ' ', 1]  // width defaults to 1 halfwidth character
        , line = []
        , i = 0;

      for (; i < this.cols; i++) {
        line[i] = ch;
      }

      return line;
    };


    /**
     * If cur return the back color xterm feature attribute. Else return defAttr.
     * @param {object} cur
     */
    Terminal.prototype.ch = function(cur) {
      return cur
        ? [this.eraseAttr(), ' ', 1]
        : [this.defAttr, ' ', 1];
    };


    /**
     * Evaluate if the current erminal is the given argument.
     * @param {object} term The terminal to evaluate
     */
    Terminal.prototype.is = function(term) {
      var name = this.termName;
      return (name + '').indexOf(term) === 0;
    };


    /**
     * Emit the 'data' event and populate the given data.
     * @param {string} data The data to populate in the event.
     */
    Terminal.prototype.handler = function(data) {
      this.emit('data', data);
    };


    /**
     * Emit the 'title' event and populate the given title.
     * @param {string} title The title to populate in the event.
     */
    Terminal.prototype.handleTitle = function(title) {
      this.emit('title', title);
    };


    /**
     * ESC
     */

    /**
     * ESC D Index (IND is 0x84).
     */
    Terminal.prototype.index = function() {
      this.y++;
      if (this.y > this.scrollBottom) {
        this.y--;
        this.scroll();
      }
      this.state = normal;
    };


    /**
     * ESC M Reverse Index (RI is 0x8d).
     */
    Terminal.prototype.reverseIndex = function() {
      var j;
      this.y--;
      if (this.y < this.scrollTop) {
        this.y++;
        // possibly move the code below to term.reverseScroll();
        // test: echo -ne '\e[1;1H\e[44m\eM\e[0m'
        // blankLine(true) is xterm/linux behavior
        this.lines.splice(this.y + this.ybase, 0, this.blankLine(true));
        j = this.rows - 1 - this.scrollBottom;
        this.lines.splice(this.rows - 1 + this.ybase - j + 1, 1);
        // this.maxRange();
        this.updateRange(this.scrollTop);
        this.updateRange(this.scrollBottom);
      }
      this.state = normal;
    };


    /**
     * ESC c Full Reset (RIS).
     */
    Terminal.prototype.reset = function() {
      this.options.rows = this.rows;
      this.options.cols = this.cols;
      var customKeydownHandler = this.customKeydownHandler;
      Terminal.call(this, this.options);
      this.customKeydownHandler = customKeydownHandler;
      this.refresh(0, this.rows - 1);
    };


    /**
     * ESC H Tab Set (HTS is 0x88).
     */
    Terminal.prototype.tabSet = function() {
      this.tabs[this.x] = true;
      this.state = normal;
    };


    /**
     * CSI
     */

    /**
     * CSI Ps A
     * Cursor Up Ps Times (default = 1) (CUU).
     */
    Terminal.prototype.cursorUp = function(params) {
      var param = params[0];
      if (param < 1) param = 1;
      this.y -= param;
      if (this.y < 0) this.y = 0;
    };


    /**
     * CSI Ps B
     * Cursor Down Ps Times (default = 1) (CUD).
     */
    Terminal.prototype.cursorDown = function(params) {
      var param = params[0];
      if (param < 1) param = 1;
      this.y += param;
      if (this.y >= this.rows) {
        this.y = this.rows - 1;
      }
    };


    /**
     * CSI Ps C
     * Cursor Forward Ps Times (default = 1) (CUF).
     */
    Terminal.prototype.cursorForward = function(params) {
      var param = params[0];
      if (param < 1) param = 1;
      this.x += param;
      if (this.x >= this.cols) {
        this.x = this.cols - 1;
      }
    };


    /**
     * CSI Ps D
     * Cursor Backward Ps Times (default = 1) (CUB).
     */
    Terminal.prototype.cursorBackward = function(params) {
      var param = params[0];
      if (param < 1) param = 1;
      this.x -= param;
      if (this.x < 0) this.x = 0;
    };


    /**
     * CSI Ps ; Ps H
     * Cursor Position [row;column] (default = [1,1]) (CUP).
     */
    Terminal.prototype.cursorPos = function(params) {
      var row, col;

      row = params[0] - 1;

      if (params.length >= 2) {
        col = params[1] - 1;
      } else {
        col = 0;
      }

      if (row < 0) {
        row = 0;
      } else if (row >= this.rows) {
        row = this.rows - 1;
      }

      if (col < 0) {
        col = 0;
      } else if (col >= this.cols) {
        col = this.cols - 1;
      }

      this.x = col;
      this.y = row;
    };


    /**
     * CSI Ps J  Erase in Display (ED).
     *     Ps = 0  -> Erase Below (default).
     *     Ps = 1  -> Erase Above.
     *     Ps = 2  -> Erase All.
     *     Ps = 3  -> Erase Saved Lines (xterm).
     * CSI ? Ps J
     *   Erase in Display (DECSED).
     *     Ps = 0  -> Selective Erase Below (default).
     *     Ps = 1  -> Selective Erase Above.
     *     Ps = 2  -> Selective Erase All.
     */
    Terminal.prototype.eraseInDisplay = function(params) {
      var j;
      switch (params[0]) {
        case 0:
          this.eraseRight(this.x, this.y);
          j = this.y + 1;
          for (; j < this.rows; j++) {
            this.eraseLine(j);
          }
          break;
        case 1:
          this.eraseLeft(this.x, this.y);
          j = this.y;
          while (j--) {
            this.eraseLine(j);
          }
          break;
        case 2:
          j = this.rows;
          while (j--) this.eraseLine(j);
          break;
        case 3:
          ; // no saved lines
          break;
      }
    };


    /**
     * CSI Ps K  Erase in Line (EL).
     *     Ps = 0  -> Erase to Right (default).
     *     Ps = 1  -> Erase to Left.
     *     Ps = 2  -> Erase All.
     * CSI ? Ps K
     *   Erase in Line (DECSEL).
     *     Ps = 0  -> Selective Erase to Right (default).
     *     Ps = 1  -> Selective Erase to Left.
     *     Ps = 2  -> Selective Erase All.
     */
    Terminal.prototype.eraseInLine = function(params) {
      switch (params[0]) {
        case 0:
          this.eraseRight(this.x, this.y);
          break;
        case 1:
          this.eraseLeft(this.x, this.y);
          break;
        case 2:
          this.eraseLine(this.y);
          break;
      }
    };


   	/**
     * CSI Pm m  Character Attributes (SGR).
     *     Ps = 0  -> Normal (default).
     *     Ps = 1  -> Bold.
     *     Ps = 4  -> Underlined.
     *     Ps = 5  -> Blink (appears as Bold).
     *     Ps = 7  -> Inverse.
     *     Ps = 8  -> Invisible, i.e., hidden (VT300).
     *     Ps = 2 2  -> Normal (neither bold nor faint).
     *     Ps = 2 4  -> Not underlined.
     *     Ps = 2 5  -> Steady (not blinking).
     *     Ps = 2 7  -> Positive (not inverse).
     *     Ps = 2 8  -> Visible, i.e., not hidden (VT300).
     *     Ps = 3 0  -> Set foreground color to Black.
     *     Ps = 3 1  -> Set foreground color to Red.
     *     Ps = 3 2  -> Set foreground color to Green.
     *     Ps = 3 3  -> Set foreground color to Yellow.
     *     Ps = 3 4  -> Set foreground color to Blue.
     *     Ps = 3 5  -> Set foreground color to Magenta.
     *     Ps = 3 6  -> Set foreground color to Cyan.
     *     Ps = 3 7  -> Set foreground color to White.
     *     Ps = 3 9  -> Set foreground color to default (original).
     *     Ps = 4 0  -> Set background color to Black.
     *     Ps = 4 1  -> Set background color to Red.
     *     Ps = 4 2  -> Set background color to Green.
     *     Ps = 4 3  -> Set background color to Yellow.
     *     Ps = 4 4  -> Set background color to Blue.
     *     Ps = 4 5  -> Set background color to Magenta.
     *     Ps = 4 6  -> Set background color to Cyan.
     *     Ps = 4 7  -> Set background color to White.
     *     Ps = 4 9  -> Set background color to default (original).
		 *
     *   If 16-color support is compiled, the following apply.  Assume
     *   that xterm's resources are set so that the ISO color codes are
     *   the first 8 of a set of 16.  Then the aixterm colors are the
     *   bright versions of the ISO colors:
     *     Ps = 9 0  -> Set foreground color to Black.
     *     Ps = 9 1  -> Set foreground color to Red.
     *     Ps = 9 2  -> Set foreground color to Green.
     *     Ps = 9 3  -> Set foreground color to Yellow.
     *     Ps = 9 4  -> Set foreground color to Blue.
     *     Ps = 9 5  -> Set foreground color to Magenta.
     *     Ps = 9 6  -> Set foreground color to Cyan.
     *     Ps = 9 7  -> Set foreground color to White.
     *     Ps = 1 0 0  -> Set background color to Black.
     *     Ps = 1 0 1  -> Set background color to Red.
     *     Ps = 1 0 2  -> Set background color to Green.
     *     Ps = 1 0 3  -> Set background color to Yellow.
     *     Ps = 1 0 4  -> Set background color to Blue.
     *     Ps = 1 0 5  -> Set background color to Magenta.
     *     Ps = 1 0 6  -> Set background color to Cyan.
     *     Ps = 1 0 7  -> Set background color to White.
		 *
     *   If xterm is compiled with the 16-color support disabled, it
     *   supports the following, from rxvt:
     *     Ps = 1 0 0  -> Set foreground and background color to
     *     default.
		 *
     *   If 88- or 256-color support is compiled, the following apply.
     *     Ps = 3 8  ; 5  ; Ps -> Set foreground color to the second
     *     Ps.
     *     Ps = 4 8  ; 5  ; Ps -> Set background color to the second
     *     Ps.
     */
    Terminal.prototype.charAttributes = function(params) {
      // Optimize a single SGR0.
      if (params.length === 1 && params[0] === 0) {
        this.curAttr = this.defAttr;
        return;
      }

      var l = params.length
        , i = 0
        , flags = this.curAttr >> 18
        , fg = (this.curAttr >> 9) & 0x1ff
        , bg = this.curAttr & 0x1ff
        , p;

      for (; i < l; i++) {
        p = params[i];
        if (p >= 30 && p <= 37) {
          // fg color 8
          fg = p - 30;
        } else if (p >= 40 && p <= 47) {
          // bg color 8
          bg = p - 40;
        } else if (p >= 90 && p <= 97) {
          // fg color 16
          p += 8;
          fg = p - 90;
        } else if (p >= 100 && p <= 107) {
          // bg color 16
          p += 8;
          bg = p - 100;
        } else if (p === 0) {
          // default
          flags = this.defAttr >> 18;
          fg = (this.defAttr >> 9) & 0x1ff;
          bg = this.defAttr & 0x1ff;
          // flags = 0;
          // fg = 0x1ff;
          // bg = 0x1ff;
        } else if (p === 1) {
          // bold text
          flags |= 1;
        } else if (p === 4) {
          // underlined text
          flags |= 2;
        } else if (p === 5) {
          // blink
          flags |= 4;
        } else if (p === 7) {
          // inverse and positive
          // test with: echo -e '\e[31m\e[42mhello\e[7mworld\e[27mhi\e[m'
          flags |= 8;
        } else if (p === 8) {
          // invisible
          flags |= 16;
        } else if (p === 22) {
          // not bold
          flags &= ~1;
        } else if (p === 24) {
          // not underlined
          flags &= ~2;
        } else if (p === 25) {
          // not blink
          flags &= ~4;
        } else if (p === 27) {
          // not inverse
          flags &= ~8;
        } else if (p === 28) {
          // not invisible
          flags &= ~16;
        } else if (p === 39) {
          // reset fg
          fg = (this.defAttr >> 9) & 0x1ff;
        } else if (p === 49) {
          // reset bg
          bg = this.defAttr & 0x1ff;
        } else if (p === 38) {
          // fg color 256
          if (params[i + 1] === 2) {
            i += 2;
            fg = matchColor(
              params[i] & 0xff,
              params[i + 1] & 0xff,
              params[i + 2] & 0xff);
            if (fg === -1) fg = 0x1ff;
            i += 2;
          } else if (params[i + 1] === 5) {
            i += 2;
            p = params[i] & 0xff;
            fg = p;
          }
        } else if (p === 48) {
          // bg color 256
          if (params[i + 1] === 2) {
            i += 2;
            bg = matchColor(
              params[i] & 0xff,
              params[i + 1] & 0xff,
              params[i + 2] & 0xff);
            if (bg === -1) bg = 0x1ff;
            i += 2;
          } else if (params[i + 1] === 5) {
            i += 2;
            p = params[i] & 0xff;
            bg = p;
          }
        } else if (p === 100) {
          // reset fg/bg
          fg = (this.defAttr >> 9) & 0x1ff;
          bg = this.defAttr & 0x1ff;
        } else {
          this.error('Unknown SGR attribute: %d.', p);
        }
      }

      this.curAttr = (flags << 18) | (fg << 9) | bg;
    };


   	/**
     * CSI Ps n  Device Status Report (DSR).
     *     Ps = 5  -> Status Report.  Result (``OK'') is
     *   CSI 0 n
     *     Ps = 6  -> Report Cursor Position (CPR) [row;column].
     *   Result is
     *   CSI r ; c R
     * CSI ? Ps n
     *   Device Status Report (DSR, DEC-specific).
     *     Ps = 6  -> Report Cursor Position (CPR) [row;column] as CSI
     *     ? r ; c R (assumes page is zero).
     *     Ps = 1 5  -> Report Printer status as CSI ? 1 0  n  (ready).
     *     or CSI ? 1 1  n  (not ready).
     *     Ps = 2 5  -> Report UDK status as CSI ? 2 0  n  (unlocked)
     *     or CSI ? 2 1  n  (locked).
     *     Ps = 2 6  -> Report Keyboard status as
     *   CSI ? 2 7  ;  1  ;  0  ;  0  n  (North American).
     *   The last two parameters apply to VT400 & up, and denote key-
     *   board ready and LK01 respectively.
     *     Ps = 5 3  -> Report Locator status as
     *   CSI ? 5 3  n  Locator available, if compiled-in, or
     *   CSI ? 5 0  n  No Locator, if not.
     */
    Terminal.prototype.deviceStatus = function(params) {
      if (!this.prefix) {
        switch (params[0]) {
          case 5:
            // status report
            this.send('\x1b[0n');
            break;
          case 6:
            // cursor position
            this.send('\x1b['
              + (this.y + 1)
              + ';'
              + (this.x + 1)
              + 'R');
            break;
        }
      } else if (this.prefix === '?') {
        // modern xterm doesnt seem to
        // respond to any of these except ?6, 6, and 5
        switch (params[0]) {
          case 6:
            // cursor position
            this.send('\x1b[?'
              + (this.y + 1)
              + ';'
              + (this.x + 1)
              + 'R');
            break;
          case 15:
            // no printer
            // this.send('\x1b[?11n');
            break;
          case 25:
            // dont support user defined keys
            // this.send('\x1b[?21n');
            break;
          case 26:
            // north american keyboard
            // this.send('\x1b[?27;1;0;0n');
            break;
          case 53:
            // no dec locator/mouse
            // this.send('\x1b[?50n');
            break;
        }
      }
    };


    /**
     * Additions
     */

   	/**
     * CSI Ps @
     * Insert Ps (Blank) Character(s) (default = 1) (ICH).
     */
    Terminal.prototype.insertChars = function(params) {
      var param, row, j, ch;

      param = params[0];
      if (param < 1) param = 1;

      row = this.y + this.ybase;
      j = this.x;
      ch = [this.eraseAttr(), ' ', 1]; // xterm

      while (param-- && j < this.cols) {
        this.lines[row].splice(j++, 0, ch);
        this.lines[row].pop();
      }
    };

   	/**
     * CSI Ps E
     * Cursor Next Line Ps Times (default = 1) (CNL).
     * same as CSI Ps B ?
     */
    Terminal.prototype.cursorNextLine = function(params) {
      var param = params[0];
      if (param < 1) param = 1;
      this.y += param;
      if (this.y >= this.rows) {
        this.y = this.rows - 1;
      }
      this.x = 0;
    };


    /**
     * CSI Ps F
     * Cursor Preceding Line Ps Times (default = 1) (CNL).
     * reuse CSI Ps A ?
     */
    Terminal.prototype.cursorPrecedingLine = function(params) {
      var param = params[0];
      if (param < 1) param = 1;
      this.y -= param;
      if (this.y < 0) this.y = 0;
      this.x = 0;
    };


    /**
     * CSI Ps G
     * Cursor Character Absolute  [column] (default = [row,1]) (CHA).
     */
    Terminal.prototype.cursorCharAbsolute = function(params) {
      var param = params[0];
      if (param < 1) param = 1;
      this.x = param - 1;
    };


    /**
     * CSI Ps L
     * Insert Ps Line(s) (default = 1) (IL).
     */
    Terminal.prototype.insertLines = function(params) {
      var param, row, j;

      param = params[0];
      if (param < 1) param = 1;
      row = this.y + this.ybase;

      j = this.rows - 1 - this.scrollBottom;
      j = this.rows - 1 + this.ybase - j + 1;

      while (param--) {
        // test: echo -e '\e[44m\e[1L\e[0m'
        // blankLine(true) - xterm/linux behavior
        this.lines.splice(row, 0, this.blankLine(true));
        this.lines.splice(j, 1);
      }

      // this.maxRange();
      this.updateRange(this.y);
      this.updateRange(this.scrollBottom);
    };


    /**
     * CSI Ps M
     * Delete Ps Line(s) (default = 1) (DL).
     */
    Terminal.prototype.deleteLines = function(params) {
      var param, row, j;

      param = params[0];
      if (param < 1) param = 1;
      row = this.y + this.ybase;

      j = this.rows - 1 - this.scrollBottom;
      j = this.rows - 1 + this.ybase - j;

      while (param--) {
        // test: echo -e '\e[44m\e[1M\e[0m'
        // blankLine(true) - xterm/linux behavior
        this.lines.splice(j + 1, 0, this.blankLine(true));
        this.lines.splice(row, 1);
      }

      // this.maxRange();
      this.updateRange(this.y);
      this.updateRange(this.scrollBottom);
    };


    /**
     * CSI Ps P
     * Delete Ps Character(s) (default = 1) (DCH).
     */
    Terminal.prototype.deleteChars = function(params) {
      var param, row, ch;

      param = params[0];
      if (param < 1) param = 1;

      row = this.y + this.ybase;
      ch = [this.eraseAttr(), ' ', 1]; // xterm

      while (param--) {
        this.lines[row].splice(this.x, 1);
        this.lines[row].push(ch);
      }
    };

    /**
     * CSI Ps X
     * Erase Ps Character(s) (default = 1) (ECH).
     */
    Terminal.prototype.eraseChars = function(params) {
      var param, row, j, ch;

      param = params[0];
      if (param < 1) param = 1;

      row = this.y + this.ybase;
      j = this.x;
      ch = [this.eraseAttr(), ' ', 1]; // xterm

      while (param-- && j < this.cols) {
        this.lines[row][j++] = ch;
      }
    };

    /**
     * CSI Pm `  Character Position Absolute
     *   [column] (default = [row,1]) (HPA).
     */
    Terminal.prototype.charPosAbsolute = function(params) {
      var param = params[0];
      if (param < 1) param = 1;
      this.x = param - 1;
      if (this.x >= this.cols) {
        this.x = this.cols - 1;
      }
    };


    /**
     * 141 61 a * HPR -
     * Horizontal Position Relative
     * reuse CSI Ps C ?
     */
    Terminal.prototype.HPositionRelative = function(params) {
      var param = params[0];
      if (param < 1) param = 1;
      this.x += param;
      if (this.x >= this.cols) {
        this.x = this.cols - 1;
      }
    };


    /**
     * CSI Ps c  Send Device Attributes (Primary DA).
     *     Ps = 0  or omitted -> request attributes from terminal.  The
     *     response depends on the decTerminalID resource setting.
     *     -> CSI ? 1 ; 2 c  (``VT100 with Advanced Video Option'')
     *     -> CSI ? 1 ; 0 c  (``VT101 with No Options'')
     *     -> CSI ? 6 c  (``VT102'')
     *     -> CSI ? 6 0 ; 1 ; 2 ; 6 ; 8 ; 9 ; 1 5 ; c  (``VT220'')
     *   The VT100-style response parameters do not mean anything by
     *   themselves.  VT220 parameters do, telling the host what fea-
     *   tures the terminal supports:
     *     Ps = 1  -> 132-columns.
     *     Ps = 2  -> Printer.
     *     Ps = 6  -> Selective erase.
     *     Ps = 8  -> User-defined keys.
     *     Ps = 9  -> National replacement character sets.
     *     Ps = 1 5  -> Technical characters.
     *     Ps = 2 2  -> ANSI color, e.g., VT525.
     *     Ps = 2 9  -> ANSI text locator (i.e., DEC Locator mode).
     * CSI > Ps c
     *   Send Device Attributes (Secondary DA).
     *     Ps = 0  or omitted -> request the terminal's identification
     *     code.  The response depends on the decTerminalID resource set-
     *     ting.  It should apply only to VT220 and up, but xterm extends
     *     this to VT100.
     *     -> CSI  > Pp ; Pv ; Pc c
     *   where Pp denotes the terminal type
     *     Pp = 0  -> ``VT100''.
     *     Pp = 1  -> ``VT220''.
     *   and Pv is the firmware version (for xterm, this was originally
     *   the XFree86 patch number, starting with 95).  In a DEC termi-
     *   nal, Pc indicates the ROM cartridge registration number and is
     *   always zero.
     * More information:
     *   xterm/charproc.c - line 2012, for more information.
     *   vim responds with ^[[?0c or ^[[?1c after the terminal's response (?)
		 */
    Terminal.prototype.sendDeviceAttributes = function(params) {
      if (params[0] > 0) return;

      if (!this.prefix) {
        if (this.is('xterm')
            || this.is('rxvt-unicode')
            || this.is('screen')) {
          this.send('\x1b[?1;2c');
        } else if (this.is('linux')) {
          this.send('\x1b[?6c');
        }
      } else if (this.prefix === '>') {
        // xterm and urxvt
        // seem to spit this
        // out around ~370 times (?).
        if (this.is('xterm')) {
          this.send('\x1b[>0;276;0c');
        } else if (this.is('rxvt-unicode')) {
          this.send('\x1b[>85;95;0c');
        } else if (this.is('linux')) {
          // not supported by linux console.
          // linux console echoes parameters.
          this.send(params[0] + 'c');
        } else if (this.is('screen')) {
          this.send('\x1b[>83;40003;0c');
        }
      }
    };


    /**
     * CSI Pm d
     * Line Position Absolute  [row] (default = [1,column]) (VPA).
     */
    Terminal.prototype.linePosAbsolute = function(params) {
      var param = params[0];
      if (param < 1) param = 1;
      this.y = param - 1;
      if (this.y >= this.rows) {
        this.y = this.rows - 1;
      }
    };


    /**
     * 145 65 e * VPR - Vertical Position Relative
     * reuse CSI Ps B ?
     */
    Terminal.prototype.VPositionRelative = function(params) {
      var param = params[0];
      if (param < 1) param = 1;
      this.y += param;
      if (this.y >= this.rows) {
        this.y = this.rows - 1;
      }
    };


    /**
     * CSI Ps ; Ps f
     *   Horizontal and Vertical Position [row;column] (default =
     *   [1,1]) (HVP).
     */
    Terminal.prototype.HVPosition = function(params) {
      if (params[0] < 1) params[0] = 1;
      if (params[1] < 1) params[1] = 1;

      this.y = params[0] - 1;
      if (this.y >= this.rows) {
        this.y = this.rows - 1;
      }

      this.x = params[1] - 1;
      if (this.x >= this.cols) {
        this.x = this.cols - 1;
      }
    };


    /**
     * CSI Pm h  Set Mode (SM).
     *     Ps = 2  -> Keyboard Action Mode (AM).
     *     Ps = 4  -> Insert Mode (IRM).
     *     Ps = 1 2  -> Send/receive (SRM).
     *     Ps = 2 0  -> Automatic Newline (LNM).
     * CSI ? Pm h
     *   DEC Private Mode Set (DECSET).
     *     Ps = 1  -> Application Cursor Keys (DECCKM).
     *     Ps = 2  -> Designate USASCII for character sets G0-G3
     *     (DECANM), and set VT100 mode.
     *     Ps = 3  -> 132 Column Mode (DECCOLM).
     *     Ps = 4  -> Smooth (Slow) Scroll (DECSCLM).
     *     Ps = 5  -> Reverse Video (DECSCNM).
     *     Ps = 6  -> Origin Mode (DECOM).
     *     Ps = 7  -> Wraparound Mode (DECAWM).
     *     Ps = 8  -> Auto-repeat Keys (DECARM).
     *     Ps = 9  -> Send Mouse X & Y on button press.  See the sec-
     *     tion Mouse Tracking.
     *     Ps = 1 0  -> Show toolbar (rxvt).
     *     Ps = 1 2  -> Start Blinking Cursor (att610).
     *     Ps = 1 8  -> Print form feed (DECPFF).
     *     Ps = 1 9  -> Set print extent to full screen (DECPEX).
     *     Ps = 2 5  -> Show Cursor (DECTCEM).
     *     Ps = 3 0  -> Show scrollbar (rxvt).
     *     Ps = 3 5  -> Enable font-shifting functions (rxvt).
     *     Ps = 3 8  -> Enter Tektronix Mode (DECTEK).
     *     Ps = 4 0  -> Allow 80 -> 132 Mode.
     *     Ps = 4 1  -> more(1) fix (see curses resource).
     *     Ps = 4 2  -> Enable Nation Replacement Character sets (DECN-
     *     RCM).
     *     Ps = 4 4  -> Turn On Margin Bell.
     *     Ps = 4 5  -> Reverse-wraparound Mode.
     *     Ps = 4 6  -> Start Logging.  This is normally disabled by a
     *     compile-time option.
     *     Ps = 4 7  -> Use Alternate Screen Buffer.  (This may be dis-
     *     abled by the titeInhibit resource).
     *     Ps = 6 6  -> Application keypad (DECNKM).
     *     Ps = 6 7  -> Backarrow key sends backspace (DECBKM).
     *     Ps = 1 0 0 0  -> Send Mouse X & Y on button press and
     *     release.  See the section Mouse Tracking.
     *     Ps = 1 0 0 1  -> Use Hilite Mouse Tracking.
     *     Ps = 1 0 0 2  -> Use Cell Motion Mouse Tracking.
     *     Ps = 1 0 0 3  -> Use All Motion Mouse Tracking.
     *     Ps = 1 0 0 4  -> Send FocusIn/FocusOut events.
     *     Ps = 1 0 0 5  -> Enable Extended Mouse Mode.
     *     Ps = 1 0 1 0  -> Scroll to bottom on tty output (rxvt).
     *     Ps = 1 0 1 1  -> Scroll to bottom on key press (rxvt).
     *     Ps = 1 0 3 4  -> Interpret "meta" key, sets eighth bit.
     *     (enables the eightBitInput resource).
     *     Ps = 1 0 3 5  -> Enable special modifiers for Alt and Num-
     *     Lock keys.  (This enables the numLock resource).
     *     Ps = 1 0 3 6  -> Send ESC   when Meta modifies a key.  (This
     *     enables the metaSendsEscape resource).
     *     Ps = 1 0 3 7  -> Send DEL from the editing-keypad Delete
     *     key.
     *     Ps = 1 0 3 9  -> Send ESC  when Alt modifies a key.  (This
     *     enables the altSendsEscape resource).
     *     Ps = 1 0 4 0  -> Keep selection even if not highlighted.
     *     (This enables the keepSelection resource).
     *     Ps = 1 0 4 1  -> Use the CLIPBOARD selection.  (This enables
     *     the selectToClipboard resource).
     *     Ps = 1 0 4 2  -> Enable Urgency window manager hint when
     *     Control-G is received.  (This enables the bellIsUrgent
     *     resource).
     *     Ps = 1 0 4 3  -> Enable raising of the window when Control-G
     *     is received.  (enables the popOnBell resource).
     *     Ps = 1 0 4 7  -> Use Alternate Screen Buffer.  (This may be
     *     disabled by the titeInhibit resource).
     *     Ps = 1 0 4 8  -> Save cursor as in DECSC.  (This may be dis-
     *     abled by the titeInhibit resource).
     *     Ps = 1 0 4 9  -> Save cursor as in DECSC and use Alternate
     *     Screen Buffer, clearing it first.  (This may be disabled by
     *     the titeInhibit resource).  This combines the effects of the 1
     *     0 4 7  and 1 0 4 8  modes.  Use this with terminfo-based
     *     applications rather than the 4 7  mode.
     *     Ps = 1 0 5 0  -> Set terminfo/termcap function-key mode.
     *     Ps = 1 0 5 1  -> Set Sun function-key mode.
     *     Ps = 1 0 5 2  -> Set HP function-key mode.
     *     Ps = 1 0 5 3  -> Set SCO function-key mode.
     *     Ps = 1 0 6 0  -> Set legacy keyboard emulation (X11R6).
     *     Ps = 1 0 6 1  -> Set VT220 keyboard emulation.
     *     Ps = 2 0 0 4  -> Set bracketed paste mode.
     * Modes:
     *   http: *vt100.net/docs/vt220-rm/chapter4.html
     */
    Terminal.prototype.setMode = function(params) {
      if (typeof params === 'object') {
        var l = params.length
          , i = 0;

        for (; i < l; i++) {
          this.setMode(params[i]);
        }

        return;
      }

      if (!this.prefix) {
        switch (params) {
          case 4:
            this.insertMode = true;
            break;
          case 20:
            //this.convertEol = true;
            break;
        }
      } else if (this.prefix === '?') {
        switch (params) {
          case 1:
            this.applicationCursor = true;
            break;
          case 2:
            this.setgCharset(0, Terminal.charsets.US);
            this.setgCharset(1, Terminal.charsets.US);
            this.setgCharset(2, Terminal.charsets.US);
            this.setgCharset(3, Terminal.charsets.US);
            // set VT100 mode here
            break;
          case 3: // 132 col mode
            this.savedCols = this.cols;
            this.resize(132, this.rows);
            break;
          case 6:
            this.originMode = true;
            break;
          case 7:
            this.wraparoundMode = true;
            break;
          case 12:
            // this.cursorBlink = true;
            break;
          case 66:
            this.log('Serial port requested application keypad.');
            this.applicationKeypad = true;
            this.viewport.setApplicationMode(true);
            break;
          case 9: // X10 Mouse
            // no release, no motion, no wheel, no modifiers.
          case 1000: // vt200 mouse
            // no motion.
            // no modifiers, except control on the wheel.
          case 1002: // button event mouse
          case 1003: // any event mouse
            // any event - sends motion events,
            // even if there is no button held down.
            this.x10Mouse = params === 9;
            this.vt200Mouse = params === 1000;
            this.normalMouse = params > 1000;
            this.mouseEvents = true;
            this.element.style.cursor = 'default';
            this.log('Binding to mouse events.');
            break;
          case 1004: // send focusin/focusout events
            // focusin: ^[[I
            // focusout: ^[[O
            this.sendFocus = true;
            break;
          case 1005: // utf8 ext mode mouse
            this.utfMouse = true;
            // for wide terminals
            // simply encodes large values as utf8 characters
            break;
          case 1006: // sgr ext mode mouse
            this.sgrMouse = true;
            // for wide terminals
            // does not add 32 to fields
            // press: ^[[<b;x;yM
            // release: ^[[<b;x;ym
            break;
          case 1015: // urxvt ext mode mouse
            this.urxvtMouse = true;
            // for wide terminals
            // numbers for fields
            // press: ^[[b;x;yM
            // motion: ^[[b;x;yT
            break;
          case 25: // show cursor
            this.cursorHidden = false;
            break;
          case 1049: // alt screen buffer cursor
            //this.saveCursor();
            ; // FALL-THROUGH
          case 47: // alt screen buffer
          case 1047: // alt screen buffer
            if (!this.normal) {
              var normal = {
                lines: this.lines,
                ybase: this.ybase,
                ydisp: this.ydisp,
                x: this.x,
                y: this.y,
                scrollTop: this.scrollTop,
                scrollBottom: this.scrollBottom,
                tabs: this.tabs
                // XXX save charset(s) here?
                // charset: this.charset,
                // glevel: this.glevel,
                // charsets: this.charsets
              };
              this.reset();
              this.normal = normal;
              this.showCursor();
            }
            break;
        }
      }
    };

    /**
     * CSI Pm l  Reset Mode (RM).
     *     Ps = 2  -> Keyboard Action Mode (AM).
     *     Ps = 4  -> Replace Mode (IRM).
     *     Ps = 1 2  -> Send/receive (SRM).
     *     Ps = 2 0  -> Normal Linefeed (LNM).
     * CSI ? Pm l
     *   DEC Private Mode Reset (DECRST).
     *     Ps = 1  -> Normal Cursor Keys (DECCKM).
     *     Ps = 2  -> Designate VT52 mode (DECANM).
     *     Ps = 3  -> 80 Column Mode (DECCOLM).
     *     Ps = 4  -> Jump (Fast) Scroll (DECSCLM).
     *     Ps = 5  -> Normal Video (DECSCNM).
     *     Ps = 6  -> Normal Cursor Mode (DECOM).
     *     Ps = 7  -> No Wraparound Mode (DECAWM).
     *     Ps = 8  -> No Auto-repeat Keys (DECARM).
     *     Ps = 9  -> Don't send Mouse X & Y on button press.
     *     Ps = 1 0  -> Hide toolbar (rxvt).
     *     Ps = 1 2  -> Stop Blinking Cursor (att610).
     *     Ps = 1 8  -> Don't print form feed (DECPFF).
     *     Ps = 1 9  -> Limit print to scrolling region (DECPEX).
     *     Ps = 2 5  -> Hide Cursor (DECTCEM).
     *     Ps = 3 0  -> Don't show scrollbar (rxvt).
     *     Ps = 3 5  -> Disable font-shifting functions (rxvt).
     *     Ps = 4 0  -> Disallow 80 -> 132 Mode.
     *     Ps = 4 1  -> No more(1) fix (see curses resource).
     *     Ps = 4 2  -> Disable Nation Replacement Character sets (DEC-
     *     NRCM).
     *     Ps = 4 4  -> Turn Off Margin Bell.
     *     Ps = 4 5  -> No Reverse-wraparound Mode.
     *     Ps = 4 6  -> Stop Logging.  (This is normally disabled by a
     *     compile-time option).
     *     Ps = 4 7  -> Use Normal Screen Buffer.
     *     Ps = 6 6  -> Numeric keypad (DECNKM).
     *     Ps = 6 7  -> Backarrow key sends delete (DECBKM).
     *     Ps = 1 0 0 0  -> Don't send Mouse X & Y on button press and
     *     release.  See the section Mouse Tracking.
     *     Ps = 1 0 0 1  -> Don't use Hilite Mouse Tracking.
     *     Ps = 1 0 0 2  -> Don't use Cell Motion Mouse Tracking.
     *     Ps = 1 0 0 3  -> Don't use All Motion Mouse Tracking.
     *     Ps = 1 0 0 4  -> Don't send FocusIn/FocusOut events.
     *     Ps = 1 0 0 5  -> Disable Extended Mouse Mode.
     *     Ps = 1 0 1 0  -> Don't scroll to bottom on tty output
     *     (rxvt).
     *     Ps = 1 0 1 1  -> Don't scroll to bottom on key press (rxvt).
     *     Ps = 1 0 3 4  -> Don't interpret "meta" key.  (This disables
     *     the eightBitInput resource).
     *     Ps = 1 0 3 5  -> Disable special modifiers for Alt and Num-
     *     Lock keys.  (This disables the numLock resource).
     *     Ps = 1 0 3 6  -> Don't send ESC  when Meta modifies a key.
     *     (This disables the metaSendsEscape resource).
     *     Ps = 1 0 3 7  -> Send VT220 Remove from the editing-keypad
     *     Delete key.
     *     Ps = 1 0 3 9  -> Don't send ESC  when Alt modifies a key.
     *     (This disables the altSendsEscape resource).
     *     Ps = 1 0 4 0  -> Do not keep selection when not highlighted.
     *     (This disables the keepSelection resource).
     *     Ps = 1 0 4 1  -> Use the PRIMARY selection.  (This disables
     *     the selectToClipboard resource).
     *     Ps = 1 0 4 2  -> Disable Urgency window manager hint when
     *     Control-G is received.  (This disables the bellIsUrgent
     *     resource).
     *     Ps = 1 0 4 3  -> Disable raising of the window when Control-
     *     G is received.  (This disables the popOnBell resource).
     *     Ps = 1 0 4 7  -> Use Normal Screen Buffer, clearing screen
     *     first if in the Alternate Screen.  (This may be disabled by
     *     the titeInhibit resource).
     *     Ps = 1 0 4 8  -> Restore cursor as in DECRC.  (This may be
     *     disabled by the titeInhibit resource).
     *     Ps = 1 0 4 9  -> Use Normal Screen Buffer and restore cursor
     *     as in DECRC.  (This may be disabled by the titeInhibit
     *     resource).  This combines the effects of the 1 0 4 7  and 1 0
     *     4 8  modes.  Use this with terminfo-based applications rather
     *     than the 4 7  mode.
     *     Ps = 1 0 5 0  -> Reset terminfo/termcap function-key mode.
     *     Ps = 1 0 5 1  -> Reset Sun function-key mode.
     *     Ps = 1 0 5 2  -> Reset HP function-key mode.
     *     Ps = 1 0 5 3  -> Reset SCO function-key mode.
     *     Ps = 1 0 6 0  -> Reset legacy keyboard emulation (X11R6).
     *     Ps = 1 0 6 1  -> Reset keyboard emulation to Sun/PC style.
     *     Ps = 2 0 0 4  -> Reset bracketed paste mode.
     */
    Terminal.prototype.resetMode = function(params) {
      if (typeof params === 'object') {
        var l = params.length
          , i = 0;

        for (; i < l; i++) {
          this.resetMode(params[i]);
        }

        return;
      }

      if (!this.prefix) {
        switch (params) {
          case 4:
            this.insertMode = false;
            break;
          case 20:
            //this.convertEol = false;
            break;
        }
      } else if (this.prefix === '?') {
        switch (params) {
          case 1:
            this.applicationCursor = false;
            break;
          case 3:
            if (this.cols === 132 && this.savedCols) {
              this.resize(this.savedCols, this.rows);
            }
            delete this.savedCols;
            break;
          case 6:
            this.originMode = false;
            break;
          case 7:
            this.wraparoundMode = false;
            break;
          case 12:
            // this.cursorBlink = false;
            break;
          case 66:
            this.log('Switching back to normal keypad.');
            this.viewport.setApplicationMode(false);
            this.applicationKeypad = false;
            break;
          case 9: // X10 Mouse
          case 1000: // vt200 mouse
          case 1002: // button event mouse
          case 1003: // any event mouse
            this.x10Mouse = false;
            this.vt200Mouse = false;
            this.normalMouse = false;
            this.mouseEvents = false;
            this.element.style.cursor = '';
            break;
          case 1004: // send focusin/focusout events
            this.sendFocus = false;
            break;
          case 1005: // utf8 ext mode mouse
            this.utfMouse = false;
            break;
          case 1006: // sgr ext mode mouse
            this.sgrMouse = false;
            break;
          case 1015: // urxvt ext mode mouse
            this.urxvtMouse = false;
            break;
          case 25: // hide cursor
            this.cursorHidden = true;
            break;
          case 1049: // alt screen buffer cursor
            ; // FALL-THROUGH
          case 47: // normal screen buffer
          case 1047: // normal screen buffer - clearing it first
            if (this.normal) {
              this.lines = this.normal.lines;
              this.ybase = this.normal.ybase;
              this.ydisp = this.normal.ydisp;
              this.x = this.normal.x;
              this.y = this.normal.y;
              this.scrollTop = this.normal.scrollTop;
              this.scrollBottom = this.normal.scrollBottom;
              this.tabs = this.normal.tabs;
              this.normal = null;
              // if (params === 1049) {
              //   this.x = this.savedX;
              //   this.y = this.savedY;
              // }
              this.refresh(0, this.rows - 1);
              this.showCursor();
            }
            break;
        }
      }
    };


    /**
     * CSI Ps ; Ps r
     *   Set Scrolling Region [top;bottom] (default = full size of win-
     *   dow) (DECSTBM).
     * CSI ? Pm r
     */
    Terminal.prototype.setScrollRegion = function(params) {
      if (this.prefix) return;
      this.scrollTop = (params[0] || 1) - 1;
      this.scrollBottom = (params[1] || this.rows) - 1;
      this.x = 0;
      this.y = 0;
    };


    /**
     * CSI s
     *   Save cursor (ANSI.SYS).
     */
    Terminal.prototype.saveCursor = function(params) {
      this.savedX = this.x;
      this.savedY = this.y;
    };


    /**
     * CSI u
     *   Restore cursor (ANSI.SYS).
     */
    Terminal.prototype.restoreCursor = function(params) {
      this.x = this.savedX || 0;
      this.y = this.savedY || 0;
    };


    /**
     * Lesser Used
     */

    /**
     * CSI Ps I
     *   Cursor Forward Tabulation Ps tab stops (default = 1) (CHT).
     */
    Terminal.prototype.cursorForwardTab = function(params) {
      var param = params[0] || 1;
      while (param--) {
        this.x = this.nextStop();
      }
    };


    /**
     * CSI Ps S  Scroll up Ps lines (default = 1) (SU).
     */
    Terminal.prototype.scrollUp = function(params) {
      var param = params[0] || 1;
      while (param--) {
        this.lines.splice(this.ybase + this.scrollTop, 1);
        this.lines.splice(this.ybase + this.scrollBottom, 0, this.blankLine());
      }
      // this.maxRange();
      this.updateRange(this.scrollTop);
      this.updateRange(this.scrollBottom);
    };


    /**
     * CSI Ps T  Scroll down Ps lines (default = 1) (SD).
     */
    Terminal.prototype.scrollDown = function(params) {
      var param = params[0] || 1;
      while (param--) {
        this.lines.splice(this.ybase + this.scrollBottom, 1);
        this.lines.splice(this.ybase + this.scrollTop, 0, this.blankLine());
      }
      // this.maxRange();
      this.updateRange(this.scrollTop);
      this.updateRange(this.scrollBottom);
    };


    /**
     * CSI Ps ; Ps ; Ps ; Ps ; Ps T
     *   Initiate highlight mouse tracking.  Parameters are
     *   [func;startx;starty;firstrow;lastrow].  See the section Mouse
     *   Tracking.
     */
    Terminal.prototype.initMouseTracking = function(params) {
      // Relevant: DECSET 1001
    };


    /**
     * CSI > Ps; Ps T
     *   Reset one or more features of the title modes to the default
     *   value.  Normally, "reset" disables the feature.  It is possi-
     *   ble to disable the ability to reset features by compiling a
     *   different default for the title modes into xterm.
     *     Ps = 0  -> Do not set window/icon labels using hexadecimal.
     *     Ps = 1  -> Do not query window/icon labels using hexadeci-
     *     mal.
     *     Ps = 2  -> Do not set window/icon labels using UTF-8.
     *     Ps = 3  -> Do not query window/icon labels using UTF-8.
     *   (See discussion of "Title Modes").
     */
    Terminal.prototype.resetTitleModes = function(params) {
      ;
    };


    /**
     * CSI Ps Z  Cursor Backward Tabulation Ps tab stops (default = 1) (CBT).
     */
    Terminal.prototype.cursorBackwardTab = function(params) {
      var param = params[0] || 1;
      while (param--) {
        this.x = this.prevStop();
      }
    };


    /**
     * CSI Ps b  Repeat the preceding graphic character Ps times (REP).
     */
    Terminal.prototype.repeatPrecedingCharacter = function(params) {
      var param = params[0] || 1
        , line = this.lines[this.ybase + this.y]
        , ch = line[this.x - 1] || [this.defAttr, ' ', 1];

      while (param--) line[this.x++] = ch;
    };


    /**
     * CSI Ps g  Tab Clear (TBC).
     *     Ps = 0  -> Clear Current Column (default).
     *     Ps = 3  -> Clear All.
     * Potentially:
     *   Ps = 2  -> Clear Stops on Line.
     *   http://vt100.net/annarbor/aaa-ug/section6.html
     */
    Terminal.prototype.tabClear = function(params) {
      var param = params[0];
      if (param <= 0) {
        delete this.tabs[this.x];
      } else if (param === 3) {
        this.tabs = {};
      }
    };


    /**
     * CSI Pm i  Media Copy (MC).
     *     Ps = 0  -> Print screen (default).
     *     Ps = 4  -> Turn off printer controller mode.
     *     Ps = 5  -> Turn on printer controller mode.
     * CSI ? Pm i
     *   Media Copy (MC, DEC-specific).
     *     Ps = 1  -> Print line containing cursor.
     *     Ps = 4  -> Turn off autoprint mode.
     *     Ps = 5  -> Turn on autoprint mode.
     *     Ps = 1  0  -> Print composed display, ignores DECPEX.
     *     Ps = 1  1  -> Print all pages.
     */
    Terminal.prototype.mediaCopy = function(params) {
      ;
    };


    /**
     * CSI > Ps; Ps m
     *   Set or reset resource-values used by xterm to decide whether
     *   to construct escape sequences holding information about the
     *   modifiers pressed with a given key.  The first parameter iden-
     *   tifies the resource to set/reset.  The second parameter is the
     *   value to assign to the resource.  If the second parameter is
     *   omitted, the resource is reset to its initial value.
     *     Ps = 1  -> modifyCursorKeys.
     *     Ps = 2  -> modifyFunctionKeys.
     *     Ps = 4  -> modifyOtherKeys.
     *   If no parameters are given, all resources are reset to their
     *   initial values.
     */
    Terminal.prototype.setResources = function(params) {
      ;
    };


    /**
     * CSI > Ps n
     *   Disable modifiers which may be enabled via the CSI > Ps; Ps m
     *   sequence.  This corresponds to a resource value of "-1", which
     *   cannot be set with the other sequence.  The parameter identi-
     *   fies the resource to be disabled:
     *     Ps = 1  -> modifyCursorKeys.
     *     Ps = 2  -> modifyFunctionKeys.
     *     Ps = 4  -> modifyOtherKeys.
     *   If the parameter is omitted, modifyFunctionKeys is disabled.
     *   When modifyFunctionKeys is disabled, xterm uses the modifier
     *   keys to make an extended sequence of functions rather than
     *   adding a parameter to each function key to denote the modi-
     *   fiers.
     */
    Terminal.prototype.disableModifiers = function(params) {
      ;
    };


    /**
     * CSI > Ps p
     *   Set resource value pointerMode.  This is used by xterm to
     *   decide whether to hide the pointer cursor as the user types.
     *   Valid values for the parameter:
     *     Ps = 0  -> never hide the pointer.
     *     Ps = 1  -> hide if the mouse tracking mode is not enabled.
     *     Ps = 2  -> always hide the pointer.  If no parameter is
     *     given, xterm uses the default, which is 1 .
     */
    Terminal.prototype.setPointerMode = function(params) {
      ;
    };


		/**
     * CSI ! p   Soft terminal reset (DECSTR).
     * http://vt100.net/docs/vt220-rm/table4-10.html
     */
    Terminal.prototype.softReset = function(params) {
      this.cursorHidden = false;
      this.insertMode = false;
      this.originMode = false;
      this.wraparoundMode = false; // autowrap
      this.applicationKeypad = false; // ?
      this.applicationCursor = false;
      this.scrollTop = 0;
      this.scrollBottom = this.rows - 1;
      this.curAttr = this.defAttr;
      this.x = this.y = 0; // ?
      this.charset = null;
      this.glevel = 0; // ??
      this.charsets = [null]; // ??
    };


    /**
     * CSI Ps$ p
     *   Request ANSI mode (DECRQM).  For VT300 and up, reply is
     *     CSI Ps; Pm$ y
     *   where Ps is the mode number as in RM, and Pm is the mode
     *   value:
     *     0 - not recognized
     *     1 - set
     *     2 - reset
     *     3 - permanently set
     *     4 - permanently reset
     */
    Terminal.prototype.requestAnsiMode = function(params) {
      ;
    };


    /**
     * CSI ? Ps$ p
     *   Request DEC private mode (DECRQM).  For VT300 and up, reply is
     *     CSI ? Ps; Pm$ p
     *   where Ps is the mode number as in DECSET, Pm is the mode value
     *   as in the ANSI DECRQM.
     */
    Terminal.prototype.requestPrivateMode = function(params) {
      ;
    };


    /**
     * CSI Ps ; Ps " p
     *   Set conformance level (DECSCL).  Valid values for the first
     *   parameter:
     *     Ps = 6 1  -> VT100.
     *     Ps = 6 2  -> VT200.
     *     Ps = 6 3  -> VT300.
     *   Valid values for the second parameter:
     *     Ps = 0  -> 8-bit controls.
     *     Ps = 1  -> 7-bit controls (always set for VT100).
     *     Ps = 2  -> 8-bit controls.
     */
    Terminal.prototype.setConformanceLevel = function(params) {
      ;
    };


    /**
     * CSI Ps q  Load LEDs (DECLL).
     *     Ps = 0  -> Clear all LEDS (default).
     *     Ps = 1  -> Light Num Lock.
     *     Ps = 2  -> Light Caps Lock.
     *     Ps = 3  -> Light Scroll Lock.
     *     Ps = 2  1  -> Extinguish Num Lock.
     *     Ps = 2  2  -> Extinguish Caps Lock.
     *     Ps = 2  3  -> Extinguish Scroll Lock.
     */
    Terminal.prototype.loadLEDs = function(params) {
      ;
    };


    /**
     * CSI Ps SP q
     *   Set cursor style (DECSCUSR, VT520).
     *     Ps = 0  -> blinking block.
     *     Ps = 1  -> blinking block (default).
     *     Ps = 2  -> steady block.
     *     Ps = 3  -> blinking underline.
     *     Ps = 4  -> steady underline.
     */
    Terminal.prototype.setCursorStyle = function(params) {
      ;
    };


    /**
     * CSI Ps " q
     *   Select character protection attribute (DECSCA).  Valid values
     *   for the parameter:
     *     Ps = 0  -> DECSED and DECSEL can erase (default).
     *     Ps = 1  -> DECSED and DECSEL cannot erase.
     *     Ps = 2  -> DECSED and DECSEL can erase.
     */
    Terminal.prototype.setCharProtectionAttr = function(params) {
      ;
    };


    /**
     * CSI ? Pm r
     *   Restore DEC Private Mode Values.  The value of Ps previously
     *   saved is restored.  Ps values are the same as for DECSET.
     */
    Terminal.prototype.restorePrivateValues = function(params) {
      ;
    };


    /**
     * CSI Pt; Pl; Pb; Pr; Ps$ r
     *   Change Attributes in Rectangular Area (DECCARA), VT400 and up.
     *     Pt; Pl; Pb; Pr denotes the rectangle.
     *     Ps denotes the SGR attributes to change: 0, 1, 4, 5, 7.
     * NOTE: xterm doesn't enable this code by default.
     */
    Terminal.prototype.setAttrInRectangle = function(params) {
      var t = params[0]
        , l = params[1]
        , b = params[2]
        , r = params[3]
        , attr = params[4];

      var line
        , i;

      for (; t < b + 1; t++) {
        line = this.lines[this.ybase + t];
        for (i = l; i < r; i++) {
          line[i] = [attr, line[i][1]];
        }
      }

      // this.maxRange();
      this.updateRange(params[0]);
      this.updateRange(params[2]);
    };


    /**
     * CSI Pc; Pt; Pl; Pb; Pr$ x
     *   Fill Rectangular Area (DECFRA), VT420 and up.
     *     Pc is the character to use.
     *     Pt; Pl; Pb; Pr denotes the rectangle.
     * NOTE: xterm doesn't enable this code by default.
     */
    Terminal.prototype.fillRectangle = function(params) {
      var ch = params[0]
        , t = params[1]
        , l = params[2]
        , b = params[3]
        , r = params[4];

      var line
        , i;

      for (; t < b + 1; t++) {
        line = this.lines[this.ybase + t];
        for (i = l; i < r; i++) {
          line[i] = [line[i][0], String.fromCharCode(ch)];
        }
      }

      // this.maxRange();
      this.updateRange(params[1]);
      this.updateRange(params[3]);
    };


    /**
     * CSI Ps ; Pu ' z
     *   Enable Locator Reporting (DECELR).
     *   Valid values for the first parameter:
     *     Ps = 0  -> Locator disabled (default).
     *     Ps = 1  -> Locator enabled.
     *     Ps = 2  -> Locator enabled for one report, then disabled.
     *   The second parameter specifies the coordinate unit for locator
     *   reports.
     *   Valid values for the second parameter:
     *     Pu = 0  <- or omitted -> default to character cells.
     *     Pu = 1  <- device physical pixels.
     *     Pu = 2  <- character cells.
     */
    Terminal.prototype.enableLocatorReporting = function(params) {
      var val = params[0] > 0;
      //this.mouseEvents = val;
      //this.decLocator = val;
    };


    /**
     * CSI Pt; Pl; Pb; Pr$ z
     *   Erase Rectangular Area (DECERA), VT400 and up.
     *     Pt; Pl; Pb; Pr denotes the rectangle.
     * NOTE: xterm doesn't enable this code by default.
     */
    Terminal.prototype.eraseRectangle = function(params) {
      var t = params[0]
        , l = params[1]
        , b = params[2]
        , r = params[3];

      var line
        , i
        , ch;

      ch = [this.eraseAttr(), ' ', 1]; // xterm?

      for (; t < b + 1; t++) {
        line = this.lines[this.ybase + t];
        for (i = l; i < r; i++) {
          line[i] = ch;
        }
      }

      // this.maxRange();
      this.updateRange(params[0]);
      this.updateRange(params[2]);
    };


    /**
     * CSI P m SP }
     * Insert P s Column(s) (default = 1) (DECIC), VT420 and up.
     * NOTE: xterm doesn't enable this code by default.
     */
    Terminal.prototype.insertColumns = function() {
      var param = params[0]
        , l = this.ybase + this.rows
        , ch = [this.eraseAttr(), ' ', 1] // xterm?
        , i;

      while (param--) {
        for (i = this.ybase; i < l; i++) {
          this.lines[i].splice(this.x + 1, 0, ch);
          this.lines[i].pop();
        }
      }

      this.maxRange();
    };


    /**
     * CSI P m SP ~
     * Delete P s Column(s) (default = 1) (DECDC), VT420 and up
     * NOTE: xterm doesn't enable this code by default.
     */
    Terminal.prototype.deleteColumns = function() {
      var param = params[0]
        , l = this.ybase + this.rows
        , ch = [this.eraseAttr(), ' ', 1] // xterm?
        , i;

      while (param--) {
        for (i = this.ybase; i < l; i++) {
          this.lines[i].splice(this.x, 1);
          this.lines[i].push(ch);
        }
      }

      this.maxRange();
    };

    /**
     * Character Sets
     */

    Terminal.charsets = {};

    // DEC Special Character and Line Drawing Set.
    // http://vt100.net/docs/vt102-ug/table5-13.html
    // A lot of curses apps use this if they see TERM=xterm.
    // testing: echo -e '\e(0a\e(B'
    // The xterm output sometimes seems to conflict with the
    // reference above. xterm seems in line with the reference
    // when running vttest however.
    // The table below now uses xterm's output from vttest.
    Terminal.charsets.SCLD = { // (0
      '`': '\u25c6', // '◆'
      'a': '\u2592', // '▒'
      'b': '\u0009', // '\t'
      'c': '\u000c', // '\f'
      'd': '\u000d', // '\r'
      'e': '\u000a', // '\n'
      'f': '\u00b0', // '°'
      'g': '\u00b1', // '±'
      'h': '\u2424', // '\u2424' (NL)
      'i': '\u000b', // '\v'
      'j': '\u2518', // '┘'
      'k': '\u2510', // '┐'
      'l': '\u250c', // '┌'
      'm': '\u2514', // '└'
      'n': '\u253c', // '┼'
      'o': '\u23ba', // '⎺'
      'p': '\u23bb', // '⎻'
      'q': '\u2500', // '─'
      'r': '\u23bc', // '⎼'
      's': '\u23bd', // '⎽'
      't': '\u251c', // '├'
      'u': '\u2524', // '┤'
      'v': '\u2534', // '┴'
      'w': '\u252c', // '┬'
      'x': '\u2502', // '│'
      'y': '\u2264', // '≤'
      'z': '\u2265', // '≥'
      '{': '\u03c0', // 'π'
      '|': '\u2260', // '≠'
      '}': '\u00a3', // '£'
      '~': '\u00b7'  // '·'
    };

    Terminal.charsets.UK = null; // (A
    Terminal.charsets.US = null; // (B (USASCII)
    Terminal.charsets.Dutch = null; // (4
    Terminal.charsets.Finnish = null; // (C or (5
    Terminal.charsets.French = null; // (R
    Terminal.charsets.FrenchCanadian = null; // (Q
    Terminal.charsets.German = null; // (K
    Terminal.charsets.Italian = null; // (Y
    Terminal.charsets.NorwegianDanish = null; // (E or (6
    Terminal.charsets.Spanish = null; // (Z
    Terminal.charsets.Swedish = null; // (H or (7
    Terminal.charsets.Swiss = null; // (=
    Terminal.charsets.ISOLatin = null; // /A

    /**
     * Helpers
     */

    function contains(el, arr) {
      for (var i = 0; i < arr.length; i += 1) {
        if (el === arr[i]) {
          return true;
        }
      }
      return false;
    }

    function on(el, type, handler, capture) {
      if (!Array.isArray(el)) {
        el = [el];
      }
      el.forEach(function (element) {
        element.addEventListener(type, handler, capture || false);
      });
    }

    function off(el, type, handler, capture) {
      el.removeEventListener(type, handler, capture || false);
    }

    function cancel(ev, force) {
      if (!this.cancelEvents && !force) {
        return;
      }
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }

    function inherits(child, parent) {
      function f() {
        this.constructor = child;
      }
      f.prototype = parent.prototype;
      child.prototype = new f;
    }

    // if bold is broken, we can't
    // use it in the terminal.
    function isBoldBroken(document) {
      var body = document.getElementsByTagName('body')[0];
      var el = document.createElement('span');
      el.innerHTML = 'hello world';
      body.appendChild(el);
      var w1 = el.scrollWidth;
      el.style.fontWeight = 'bold';
      var w2 = el.scrollWidth;
      body.removeChild(el);
      return w1 !== w2;
    }

    var String = this.String;
    var setTimeout = this.setTimeout;
    var setInterval = this.setInterval;

    function indexOf(obj, el) {
      var i = obj.length;
      while (i--) {
        if (obj[i] === el) return i;
      }
      return -1;
    }

  function isThirdLevelShift(term, ev) {
      var thirdLevelKey =
          (term.isMac && ev.altKey && !ev.ctrlKey && !ev.metaKey) ||
          (term.isMSWindows && ev.altKey && ev.ctrlKey && !ev.metaKey);

    	if (ev.type == 'keypress') {
        return thirdLevelKey;
      }

      // Don't invoke for arrows, pageDown, home, backspace, etc. (on non-keypress events)
      return thirdLevelKey && (!ev.keyCode || ev.keyCode > 47);
    }

    function matchColor(r1, g1, b1) {
      var hash = (r1 << 16) | (g1 << 8) | b1;

      if (matchColor._cache[hash] != null) {
        return matchColor._cache[hash];
      }

      var ldiff = Infinity
        , li = -1
        , i = 0
        , c
        , r2
        , g2
        , b2
        , diff;

      for (; i < Terminal.vcolors.length; i++) {
        c = Terminal.vcolors[i];
        r2 = c[0];
        g2 = c[1];
        b2 = c[2];

        diff = matchColor.distance(r1, g1, b1, r2, g2, b2);

        if (diff === 0) {
          li = i;
          break;
        }

        if (diff < ldiff) {
          ldiff = diff;
          li = i;
        }
      }

      return matchColor._cache[hash] = li;
    }

    matchColor._cache = {};

    // http://stackoverflow.com/questions/1633828
    matchColor.distance = function(r1, g1, b1, r2, g2, b2) {
      return Math.pow(30 * (r1 - r2), 2)
        + Math.pow(59 * (g1 - g2), 2)
        + Math.pow(11 * (b1 - b2), 2);
    };

    function each(obj, iter, con) {
      if (obj.forEach) return obj.forEach(iter, con);
      for (var i = 0; i < obj.length; i++) {
        iter.call(con, obj[i], i, obj);
      }
    }

    function keys(obj) {
      if (Object.keys) return Object.keys(obj);
      var key, keys = [];
      for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          keys.push(key);
        }
      }
      return keys;
    }

    var wcwidth = (function(opts) {
      // extracted from https://www.cl.cam.ac.uk/%7Emgk25/ucs/wcwidth.c
      // combining characters
      var COMBINING = [
        [0x0300, 0x036F], [0x0483, 0x0486], [0x0488, 0x0489],
        [0x0591, 0x05BD], [0x05BF, 0x05BF], [0x05C1, 0x05C2],
        [0x05C4, 0x05C5], [0x05C7, 0x05C7], [0x0600, 0x0603],
        [0x0610, 0x0615], [0x064B, 0x065E], [0x0670, 0x0670],
        [0x06D6, 0x06E4], [0x06E7, 0x06E8], [0x06EA, 0x06ED],
        [0x070F, 0x070F], [0x0711, 0x0711], [0x0730, 0x074A],
        [0x07A6, 0x07B0], [0x07EB, 0x07F3], [0x0901, 0x0902],
        [0x093C, 0x093C], [0x0941, 0x0948], [0x094D, 0x094D],
        [0x0951, 0x0954], [0x0962, 0x0963], [0x0981, 0x0981],
        [0x09BC, 0x09BC], [0x09C1, 0x09C4], [0x09CD, 0x09CD],
        [0x09E2, 0x09E3], [0x0A01, 0x0A02], [0x0A3C, 0x0A3C],
        [0x0A41, 0x0A42], [0x0A47, 0x0A48], [0x0A4B, 0x0A4D],
        [0x0A70, 0x0A71], [0x0A81, 0x0A82], [0x0ABC, 0x0ABC],
        [0x0AC1, 0x0AC5], [0x0AC7, 0x0AC8], [0x0ACD, 0x0ACD],
        [0x0AE2, 0x0AE3], [0x0B01, 0x0B01], [0x0B3C, 0x0B3C],
        [0x0B3F, 0x0B3F], [0x0B41, 0x0B43], [0x0B4D, 0x0B4D],
        [0x0B56, 0x0B56], [0x0B82, 0x0B82], [0x0BC0, 0x0BC0],
        [0x0BCD, 0x0BCD], [0x0C3E, 0x0C40], [0x0C46, 0x0C48],
        [0x0C4A, 0x0C4D], [0x0C55, 0x0C56], [0x0CBC, 0x0CBC],
        [0x0CBF, 0x0CBF], [0x0CC6, 0x0CC6], [0x0CCC, 0x0CCD],
        [0x0CE2, 0x0CE3], [0x0D41, 0x0D43], [0x0D4D, 0x0D4D],
        [0x0DCA, 0x0DCA], [0x0DD2, 0x0DD4], [0x0DD6, 0x0DD6],
        [0x0E31, 0x0E31], [0x0E34, 0x0E3A], [0x0E47, 0x0E4E],
        [0x0EB1, 0x0EB1], [0x0EB4, 0x0EB9], [0x0EBB, 0x0EBC],
        [0x0EC8, 0x0ECD], [0x0F18, 0x0F19], [0x0F35, 0x0F35],
        [0x0F37, 0x0F37], [0x0F39, 0x0F39], [0x0F71, 0x0F7E],
        [0x0F80, 0x0F84], [0x0F86, 0x0F87], [0x0F90, 0x0F97],
        [0x0F99, 0x0FBC], [0x0FC6, 0x0FC6], [0x102D, 0x1030],
        [0x1032, 0x1032], [0x1036, 0x1037], [0x1039, 0x1039],
        [0x1058, 0x1059], [0x1160, 0x11FF], [0x135F, 0x135F],
        [0x1712, 0x1714], [0x1732, 0x1734], [0x1752, 0x1753],
        [0x1772, 0x1773], [0x17B4, 0x17B5], [0x17B7, 0x17BD],
        [0x17C6, 0x17C6], [0x17C9, 0x17D3], [0x17DD, 0x17DD],
        [0x180B, 0x180D], [0x18A9, 0x18A9], [0x1920, 0x1922],
        [0x1927, 0x1928], [0x1932, 0x1932], [0x1939, 0x193B],
        [0x1A17, 0x1A18], [0x1B00, 0x1B03], [0x1B34, 0x1B34],
        [0x1B36, 0x1B3A], [0x1B3C, 0x1B3C], [0x1B42, 0x1B42],
        [0x1B6B, 0x1B73], [0x1DC0, 0x1DCA], [0x1DFE, 0x1DFF],
        [0x200B, 0x200F], [0x202A, 0x202E], [0x2060, 0x2063],
        [0x206A, 0x206F], [0x20D0, 0x20EF], [0x302A, 0x302F],
        [0x3099, 0x309A], [0xA806, 0xA806], [0xA80B, 0xA80B],
        [0xA825, 0xA826], [0xFB1E, 0xFB1E], [0xFE00, 0xFE0F],
        [0xFE20, 0xFE23], [0xFEFF, 0xFEFF], [0xFFF9, 0xFFFB],
        [0x10A01, 0x10A03], [0x10A05, 0x10A06], [0x10A0C, 0x10A0F],
        [0x10A38, 0x10A3A], [0x10A3F, 0x10A3F], [0x1D167, 0x1D169],
        [0x1D173, 0x1D182], [0x1D185, 0x1D18B], [0x1D1AA, 0x1D1AD],
        [0x1D242, 0x1D244], [0xE0001, 0xE0001], [0xE0020, 0xE007F],
        [0xE0100, 0xE01EF]
      ];
      // binary search
      function bisearch(ucs) {
        var min = 0;
        var max = COMBINING.length - 1;
        var mid;
        if (ucs < COMBINING[0][0] || ucs > COMBINING[max][1])
          return false;
        while (max >= min) {
          mid = Math.floor((min + max) / 2);
          if (ucs > COMBINING[mid][1])
            min = mid + 1;
          else if (ucs < COMBINING[mid][0])
            max = mid - 1;
          else
            return true;
        }
        return false;
      }
      function wcwidth(ucs) {
        // test for 8-bit control characters
        if (ucs === 0)
          return opts.nul;
        if (ucs < 32 || (ucs >= 0x7f && ucs < 0xa0))
          return opts.control;
        // binary search in table of non-spacing characters
        if (bisearch(ucs))
          return 0;
        // if we arrive here, ucs is not a combining or C0/C1 control character
        return 1 +
          (
            ucs >= 0x1100 &&
            (
              ucs <= 0x115f ||                // Hangul Jamo init. consonants
              ucs == 0x2329 ||
              ucs == 0x232a ||
              (ucs >= 0x2e80 && ucs <= 0xa4cf && ucs != 0x303f) ||  // CJK..Yi
              (ucs >= 0xac00 && ucs <= 0xd7a3) ||    // Hangul Syllables
              (ucs >= 0xf900 && ucs <= 0xfaff) ||    // CJK Compat Ideographs
              (ucs >= 0xfe10 && ucs <= 0xfe19) ||    // Vertical forms
              (ucs >= 0xfe30 && ucs <= 0xfe6f) ||    // CJK Compat Forms
              (ucs >= 0xff00 && ucs <= 0xff60) ||    // Fullwidth Forms
              (ucs >= 0xffe0 && ucs <= 0xffe6) ||
              (ucs >= 0x20000 && ucs <= 0x2fffd) ||
              (ucs >= 0x30000 && ucs <= 0x3fffd)
            )
          );
      }
      return wcwidth;
    })({nul: 0, control: 0});  // configurable options

    /**
     * Expose
     */

    Terminal.EventEmitter = EventEmitter;
    Terminal.CompositionHelper = CompositionHelper;
    Terminal.Viewport = Viewport;
    Terminal.inherits = inherits;

    /**
     * Adds an event listener to the terminal.
     *
     * @param {string} event The name of the event. TODO: Document all event types
     * @param {function} callback The function to call when the event is triggered.
     */
    Terminal.on = on;
    Terminal.off = off;
    Terminal.cancel = cancel;


    return Terminal;
});

}).call(this,"/node_modules/xterm/src")
},{}],107:[function(require,module,exports){
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

},{"../config.js":111}],108:[function(require,module,exports){
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

},{"../config.js":111,"./cookie.js":107,"babel-runtime/core-js/json/stringify":1,"isomorphic-fetch":103}],109:[function(require,module,exports){
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
function editPost(pst, bdy, id) {
  var endpoint = "/thread/post";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'PUT',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({
      post: pst,
      body: bdy,
      id: id
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
function rmPost(pst, id) {
  var endpoint = "/thread/post";
  return (0, _isomorphicFetch2.default)('http://' + apihost + endpoint, {
    method: 'DELETE',
    mode: 'cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(_cookie2.default, true)),
    body: (0, _stringify2.default)({
      post: pst,
      id: id
    })
  });
}

},{"../config.js":111,"./cookie.js":107,"babel-runtime/core-js/json/stringify":1,"isomorphic-fetch":103}],110:[function(require,module,exports){
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

},{"../config.js":111,"./cookie.js":107,"babel-runtime/core-js/json/stringify":1,"isomorphic-fetch":103}],111:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//outline groups
var groups = {
  '/cs/': 'computer science board',
  '/music/': 'music discussion',
  '/vid/': 'webms, gifs, and videos',
  '/bored/': 'entertainment',
  '/random/': 'random posts'
};

//for convenience, keep an array of group names
var auto = (0, _keys2.default)(groups);

//this is config
exports.default = {
  api: window.location.host + '/api',
  ws: 'ws:' + window.location.host + '/ws',
  isNode: typeof window === 'undefined',
  groups: {
    main: '/random/',
    descriptions: groups,

    //just for convenience
    auto: auto
  }
};

},{"babel-runtime/core-js/object/keys":4}],112:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nav = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
  AJAX Handlers passed in as view actions
 */

/*  Handle File Upload   */

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
/**
 * core.js is pretty much the controller for the nav & basic app functionality
 */

var handleSubmit = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var link = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var body = arguments[1];
    var to = arguments[2];
    var identity = arguments.length <= 3 || arguments[3] === undefined ? 'Anonymous' : arguments[3];

    var anon, cont, contentType, isgrp, res, resp, getPath, path, thread, responseTo, _res, _resp, peeking;

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
            _store2.default.addOwned({
              postId: resp.postId,
              id: resp.id
            });

            //clear upload in store
            _store2.default.upload = false;

            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2['catch'](6);


            //if something went wrong, let ourselves know
            console.log(_context2.t0);

          case 20:

            //reload page if were loading from group view
            _router2.default.check();

            _context2.next = 46;
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

            //clear upload in store

            _store2.default.upload = false;

            //try to send post to thread
            _context2.prev = 28;
            _context2.next = 31;
            return (0, _threads.post)(thread, identity, body, cont, responseTo, anon, contentType);

          case 31:
            _res = _context2.sent;
            _context2.next = 34;
            return _res.json();

          case 34:
            _resp = _context2.sent;


            //send this on delete or edit if we do so
            _store2.default.addOwned({
              postId: _resp.postId,
              id: _resp.id
            });

            //lets us know if we're peeking in a room to say something
            peeking = false;

            //check if we're peeking

            if (!_socket2.default.inRoom) {

              //if so, join room so we can say something
              _socket2.default.joinRoom(thread);

              //let us know we're peeking
              peeking = true;
            }

            //send the message to the group -- create date because our server usually does that
            _socket2.default.send((0, _stringify2.default)({
              thread: thread,
              body: body,
              id: _resp.postId,
              author: identity,
              content: cont,
              responseTo: responseTo,
              created: new Date(),
              replies: [],
              anonymous: anon,
              contentType: contentType
            }));

            //get outta there if we were just peeking
            if (peeking) {
              _socket2.default.leaveRoom();

              //reload page so we can see the nice reload
              _router2.default.check();
            }

            //clear upload in store
            _store2.default.upload = false;

            _context2.next = 46;
            break;

          case 43:
            _context2.prev = 43;
            _context2.t1 = _context2['catch'](28);


            //if something went wrong in trying to post it, let ourselves know
            console.log(_context2.t1);

          case 46:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[6, 17], [28, 43]]);
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

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _socket = require('../socket.js');

var _socket2 = _interopRequireDefault(_socket);

var _router = require('../router/router.js');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  'handleUpload': handleUpload,
  'handleSubmit': handleSubmit
};

//create view obj
var nav = exports.nav = new _navv2.default(_config2.default.groups, _store2.default.user, options);

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

},{"../ajax/threads.js":109,"../config.js":111,"../router/router.js":122,"../socket.js":124,"./navv.js":114,"./oembed.js":115,"./store.js":117,"babel-runtime/core-js/json/stringify":1,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13,"fastclick":102,"isomorphic-fetch":103}],113:[function(require,module,exports){
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

},{"../config.js":111}],114:[function(require,module,exports){
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
								_this._showWriter(_this.groups.auto, _this.user, _this.handleUpload, _this.handleSubmit, to);
						},
						showWriter: function showWriter(e) {
								e.preventDefault();
								_this._showWriter(_this.groups.auto, _this.user, _this.handleUpload, _this.handleSubmit);
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
								_this._showMenu(user, groups);
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
						//reset writer
						if (this._openWriter || this._hiddenWriter) this._removeWriter();

						//set target to 'to'
						this._showWriter(this.groups.auto, this.user, this.handleUpload, this.handleSubmit, to);
				}

				//Exposes the writer and adds target post

		}, {
				key: 'openWriterRef',
				value: function openWriterRef(id) {

						//make sure writer is open
						this.openWriter();

						//now since it's open, we append the content (presumably an id)
						this.$body.value += this.$body.value ? '\n(post: ' + id + ')\n' : '(post: ' + id + ')\n';
				}

				//navigate to group

		}, {
				key: '_goToGroup',
				value: function _goToGroup(group) {
						_router2.default.navigate(group);
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
																if (!(window.scrollY > 6)) {
																		_context.next = 7;
																		break;
																}

																Break = -10 - window.scrollY / 5;

																window.scrollBy(0, Break);
																_context.next = 5;
																return sleep();

														case 5:
																_context.next = 0;
																break;

														case 7:

																//remove hide from element's classname --> show searchbox
																_this2.$searchboxBg.className = '';

																//focus searchbox after opening it
																_this2.$searchbox.focus();

														case 9:
														case 'end':
																return _context.stop();
												}
										}
								}, _callee, _this2);
						}))();
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
						var to = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];


						//remove menu if it's open
						if (this._openMenu) this._removeMenu();

						//if writer isn't in the DOM
						if (!this._openWriter && !this._hiddenWriter) {

								//handle sending the form -- wrapped AJAX version

								var handleSend = function handleSend() {

										//no empty posts
										if (!this.$body.value.length && !this.$link.value) return;

										//set the targeted group to the full 'to' value, as opposed to the cutoff version
										var grp = this.$group.value === (0, _template.cutoff)(to) ? to : this.$group.value;

										//send request
										handleSubmit(this.$link.value, this.$body.value, grp, this.$identity.value);

										//remove writer from view entirely
										this._removeWriter();
								};

								//handle hiding the writer


								var handleHide = function handleHide() {
										this._hiddenWriter = true;
										this.$writermount.className = 'hide';
										this._unsetActiveBody();
								};

								//let ourselves know that we uploaded a file successfully


								var handleContent = function handleContent(e) {
										var _this3 = this;

										var res = handleUpload(this.$fileSubmit.files[0]);
										res.then(function (success) {
												if (success) return _this3.$submitIcon.className = 'icon icon-check';

												//else set icon to icon x -- set
												_this3.$submitIcon.className = 'icon icon-cancel';
												_this3.$submitIcon.style.color = 'red';

												window.setTimeout(function () {
														_this3.$submitIcon.className = 'icon icon-camera';
														_this3.$submitIcon.style.color = '';
												}, 3000);
										});
								};

								//handle hover event for fullscreen writer


								var onTitleClick = function onTitleClick(e) {
										this.$writermount.classList.contains('originalWriter') ? this.$writermount.classList.remove('originalWriter') : this.$writermount.classList.add('originalWriter');
								};

								//set writer to open
								this._openWriter = true;

								//stop scroll on body
								this._setActiveBody('writemode');

								//element that we'll use to get the writer
								var writerMount = document.createElement('div');

								//set new element's id
								writerMount.id = "TopNav-writer-mount";

								//generate writer from the template
								var writer = (0, _template.generateWriter)(groups, user.usernames, to);

								//set div's contents to the above
								writerMount.innerHTML = writer;

								//append writer
								this.$nav.appendChild(writerMount);

								//set reference
								this.$writermount = writerMount;

								//set references to DOM elements generated by writer
								this.$savebutton = (0, _helpers.$id)('TopNav-writer-save');
								this.$cancelbutton = (0, _helpers.$id)('TopNav-writer-cancel');
								this.$fileSubmit = (0, _helpers.$id)('TopNav-writer-content-submit');
								this.$submitIcon = (0, _helpers.$id)('TopNav-writer-submit-icon');
								this.$submit = (0, _helpers.$id)('TopNav-writer-send');
								this.$group = (0, _helpers.$id)('TopNav-writer-select');
								this.$identity = (0, _helpers.$id)('TopNav-writer-identity-select');
								this.$body = (0, _helpers.$id)('TopNav-writer-input');
								this.$link = (0, _helpers.$id)('TopNav-writer-link-box');
								this.$writerhead = (0, _helpers.$id)('TopNav-writer-head');

								(0, _helpers.$on)(this.$cancelbutton, 'click', this._removeWriter.bind(this), false);
								(0, _helpers.$on)(this.$savebutton, 'click', handleHide.bind(this), false);
								(0, _helpers.$on)(this.$fileSubmit, 'change', handleContent.bind(this), false);
								(0, _helpers.$on)(this.$submit, 'click', handleSend.bind(this), false);
								//$on(this.$writermount, 'touchmove', e => e.preventDefault(), false);
								(0, _helpers.$on)(this.$writerhead, 'click', onTitleClick.bind(this), false);
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
						this._hiddenWriter = false;
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
				value: function _showMenu(user, groups) {
						var _this4 = this;

						//check if menu exists --> remove it if it exists
						if (this._openMenu) {
								this.$menuicon.classList.remove('active');
								this._removeMenu();
								return;
						}

						//element that we'll use to get the menu
						var menuMount = document.createElement('nav');
						menuMount.id = "TopNav-menu-bg";

						//add active as to prevent scroling on mobile
						this.$menuicon.classList.add('active');

						//generate menu from the array of groups
						var menu = (0, _template.generateMenu)(user, groups);

						//set div's contents to the above
						menuMount.innerHTML = menu;

						//append menu
						this.$nav.appendChild(menuMount);

						//get important dom elements
						var $dropdownBg = (0, _helpers.$id)('TopNav-menu-bg');
						var $dropdown = (0, _helpers.$id)('TopNav-menu-list');
						var $down = (0, _helpers.$id)('TopNav-dropdown-down');
						var $secret = (0, _helpers.$id)('TopNav-menu-secretmenu');

						var toggleMore = function toggleMore() {
								$secret.classList.contains('hide') ? $down.className = "icon icon-up-open-big" : $down.className = "icon icon-down-open-big";
								$secret.classList.toggle('hide');
						};

						//handle dropdown click
						var handleDropdown = function handleDropdown(e) {
								e.stopPropagation();
								var el = e.target.dataset.type ? e.target.dataset.type : e.target.parentNode.dataset.type;

								//delegate clicks based on their data-type label
								switch (el) {
										case 'about':
												console.log('About Hit');
												break;
										case 'user':
												console.log('Hit username');
												break;
										case 'signup':
												console.log('Hit signup');
												break;
										case 'login':
												console.log('Hit login');
												break;
										case 'faq':
												console.log('Hit faq');
												break;
										case 'more':
												console.log('Hit Secret');
												toggleMore();
												break;
										case 'privacy':
												console.log('Hit privacy');
												break;
										case 'group':
												_this4._goToGroup(e.target.dataset.group);
												_this4._removeMenu();
												break;
										case 'rules':
												console.log('Hit relevant');
												break;
								}
						};

						//bind events here
						(0, _helpers.$on)($dropdown, 'click', handleDropdown, false);
						(0, _helpers.$on)($dropdownBg, 'click', this._removeMenu.bind(this), false);
						(0, _helpers.$on)($dropdownBg, 'scroll', function (e) {
								if (e.target.classList.contains('dropdown')) e.stopPropagation();
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

},{"../router/router.js":122,"./helpers.js":113,"./template.js":118,"babel-runtime/core-js/promise":6,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/helpers/classCallCheck":10,"babel-runtime/helpers/createClass":11,"babel-runtime/regenerator":13}],115:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replacelink = exports.validate = undefined;

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
var urlPattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
var validate = exports.validate = function validate(url) {
  return urlPattern.test(url);
};

//should break if there's a bad protocol
var replacelink = exports.replacelink = function replacelink(url) {
  return url.replace(urlPattern, function (match, $1) {
    return '<a class="Body-url" href="' + ($1.indexOf('http') == -1 ? 'http://' + $1 : $1) + '">\n                                                   ' + $1 + '\n                                                 </a>';
  });
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
      html: '<h4 class="Content-text">' + replacelink(str) + '</h4>'
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

                        //sometimes the oembed just sends a link to an image

                        return _context.abrupt('return', jresp.html || '<a class="Content-link" href="' + url + '"><img class="Content-frame" src="' + jresp.url + '"></img></a>');

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

},{"../config.js":111,"babel-runtime/core-js/json/stringify":1,"babel-runtime/core-js/object/keys":4,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13,"isomorphic-fetch":103}],116:[function(require,module,exports){
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
var ref = /\(post:(.*?)\)/g;
//regex for mentions
var mention = /@(\S*?)\s/g;
//regex for getting links back into place
var links = /`l`i`n`k`/g;
//regex for links ('holy grail' via Matthew O'Riordan)
var url = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;

//returns html for a given body
function parse(body, author) {
  //array of links that we'll keep for later
  var matches = [];
  //set urls -- fails for javascript protocol (important) --> this way links won't be broken
  body = body.replace(url, function (match, $1) {
    matches.push('<a class="Body-url" href="' + ($1.indexOf('http') == -1 ? 'http://' + $1 : $1) + '">' + $1 + '</a>');
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

  //set mentions
  htmlbody = htmlbody.replace(mention, '<span class="Body-mention">$1</span>');

  //set refs
  htmlbody = author ? htmlbody.replace(ref, '<span data-post="$1" data-type="ref" class="Body-ref">@' + author + '</span>') : htmlbody;

  //set links
  htmlbody = htmlbody.replace(links, function (match) {
    var mat = matches.shift();
    var rematch = mat ? mat : '';
    return rematch;
  });

  //return html wrapped in parent div
  return '<div data-type="body" class="Body-content">' + htmlbody + '</div>';
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

},{"../config.js":111}],117:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auto = _config2.default.groups.auto; /**
                                          * Store for core actions (particularly those caused by nav)
                                          */

var isNode = _config2.default.isNode;

//export appStore, handles general user data
var store = {
  //initialize user as anon
  _user: { anonymous: true, username: '', usernames: [] },

  //initialize groups
  _groups: auto,

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
  addUser: function addUser(user) {
    if (user.anonymous) {
      store._user = {
        anonymous: true,
        username: '',
        usernames: [],
        notifications: 0
      };
    } else {
      store._user = {
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
  addGroups: function addGroups(groups) {

    //loop through array of groups & push them to our internal list
    groups.forEach(function (grp) {
      return undefined._groups.push();
    });
  },

  //get all groups that have been added so far
  get groups() {

    //get groups from internal store
    return this._groups;
  },

  //push data to owned ids
  addOwned: function addOwned(opts) {
    store._owned[opts.postId] = opts.id;

    if (!isNode) {
      //set owned in localStorage (the cheap way)
      window.localStorage._owned = (0, _stringify2.default)(store._owned);
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

exports.default = store;

},{"../config.js":111,"babel-runtime/core-js/json/stringify":1}],118:[function(require,module,exports){
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
            _context.t0 = '\n    <div data-type="post" id="' + postID + '" class="Post">\n      <header class="Header">\n      ' + generatePostHeader(group, post.author, timestamp) + '\n      </header>\n      <div class="Content">\n      ';
            _context.next = 6;
            return generateContent(post.content, post.contentType);

          case 6:
            _context.t1 = _context.sent;
            _context.t2 = _context.t0 + _context.t1;
            _context.t3 = _context.t2 + '\n      </div>\n      <div class="Body">\n      ';
            _context.t4 = generateBody(post);
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
            _context2.t0 = '\n    <div data-type="post" id="' + postID + '" class="PopularPost">\n      <header class="Header">\n      ' + generatePopularPostHeader(post.group, post.author, timestamp) + '\n      </header>\n      <div data-type="content" class="Content">\n      ';
            _context2.next = 6;
            return generateContent(post.content, post.contentType);

          case 6:
            _context2.t1 = _context2.sent;
            _context2.t2 = _context2.t0 + _context2.t1;
            _context2.t3 = _context2.t2 + '\n      </div>\n      <div data-type="body" class="Body">\n      ';
            _context2.t4 = generateBody(post);
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
            _context3.t0 = '\n    <div data-type="post" id="' + threadID + '" class="HeadPost">\n      <header class="Header">\n      ' + generatePostHeader(thread.group, post.author, timestamp) + '\n      </header>\n      <div data-type="content" class="Content">\n      ';
            _context3.next = 8;
            return generateContent(post.content, post.contentType);

          case 8:
            _context3.t1 = _context3.sent;
            _context3.t2 = _context3.t0 + _context3.t1;
            _context3.t3 = _context3.t2 + '\n      </div>\n      <div data-type="body"\n       class="Body">\n      ';
            _context3.t4 = generateBody(post);
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
            _context4.t1 = '<div data-type="content" class="Content-frame">' + _context4.t0;
            html = _context4.t1 + '</div>';
            _context4.next = 12;
            break;

          case 11:
            //treat video and images differently
            if (contentType.split('/')[0] === 'video') {
              html = '\n      <video data-type="content" controls="controls" muted class="Content-iv">\n        <source src="' + content + '" type="' + contentType + '">\n      </video>';
            } else if (contentType == "text") {
              html = '<h4 data-type="content" class="Content-text">' + content + '</h4>';
            } else {
              html = '<div data-type="content" class="Content-frame"><img class="Content-frame" src="' + content + '"></div>';
            }

          case 12:
            return _context4.abrupt('return', '<div data-type="content" class="Content-wrapper">' + html + '</div>');

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
            footer = '\n  <div class="Footer-content">\n    <span class="Footer-left">\n      <span class="icon-chat Footer-left-icon"></span>\n      <span class="Footer-left-size">' + (length || 0) + ' ' + (length != 1 ? 'posts' : 'post') + '</span>\n    </span>\n    <span class="Footer-right" data-post="' + postid + '" data-thread="' + threadid + '">\n      ' + (anonymous ? '' : '<span data-type="save" class="Footer-right-save">save</span>') + '\n      ' + generateDelete(postid, owned) + '\n      <span data-type="reply" class="Footer-right-reply space">reply</span>\n      <span data-type="open" class="Footer-open space">open</span>\n    </span>\n  </div>\n  ';
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

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Nav View Templates
 */

//get template for either user logged in or not logged in
/**
 * dom template helpers
 */

function getUserMenu(user) {
  if (user.anonymous) {
    return '\n      <a href="/register" class="nostylelink">\n        <li id="TopNav-menu-signup" data-type="signup" class="TopNav-menu-dropdown-row ddtop">\n            <span id="dd-icon-signup" class="icon icon-book ddicon">\n            </span>\n            <span class="ddtext">Register for an account</span>\n        </li>\n      </a>\n      <a href="/login" class="nostylelink">\n        <li id="TopNav-menu-login" data-type="login" class="TopNav-menu-dropdown-row">\n            <span id="dd-icon-login" class="icon icon-book-open ddicon">\n            </span>\n            <span class="ddtext">Log in to your account</span>\n        </li>\n      </a>\n      ';
  } else {
    return '\n       <li id="TopNav-menu-username" data-type="user" class="TopNav-menu-dropdown-row ddtop">\n         <span id="dd-icon-user" class="icon icon-cog ddicon">\n         </span>\n         <span class="ddtext">' + user.username + '</span>\n       </li>\n       <span id="TopNav-dropdown-logout">logout</span>\n       ';
  }
}

//generate Menu groups --> should only
function getMenuGroups(groups) {
  return groups.auto.map(function (group) {
    return '\n       <li data-type="group" data-group="' + group + '" class="TopNav-menu-dropdown-row">\n          <span class="icon ddgroup-icon">G</span>\n          <span data-group="' + group + '" class="ddgroup-description">\n            <span data-group="' + group + '" class="ddgroup">' + group + '</span>\n            ' + groups.descriptions[group] + '\n          </span>\n  \t\t </li>';
  }).join('');
}

//generate Menu
function generateMenu(user, groups) {
  //show menu -- submenu simply has class hide
  return '\n    <ul id="TopNav-menu-list" class="dropdown">\n\t\t\t' + getUserMenu(user) + '\n      <li class="listsection"></li>\n      ' + getMenuGroups(groups) + '\n      <li class="listsection"></li>\n      <li id="TopNav-menu-secret" data-type="more" class="TopNav-menu-dropdown-row">\n        <span id="dd-icon-secret" class="icon icon-comment ddicon"></span>\n        <span class="ddtext">More</span>\n        <span id="TopNav-dropdown-down" data-type="more" class="icon icon-down-open-big"></span>\n      </li>\n      <ul id="TopNav-menu-secretmenu" class="dropdown hide">\n        <li id="TopNav-menu-about" data-type="about" class="TopNav-menu-dropdown-row ddnested">\n          <span id="dd-icon-about" class="icon icon-info ddicon"></span>\n          <span class="ddtext">About</span>\n        </li>\n        <li id="TopNav-menu-privacy" data-type="privacy" class="TopNav-menu-dropdown-row ddnested">\n          <span id="dd-icon-privacy" class="icon icon-chat ddicon"></span>\n          <span class="ddtext">Privacy</span>\n        </li>\n        <li id="TopNav-menu-faq" data-type="faq" class="TopNav-menu-dropdown-row ddnested">\n          <span id="dd-icon-faq" class="icon icon-help ddicon">\n          </span>\n          <span class="ddtext">How do I use this?</span>\n        </li>\n      </ul>\n      <li id="TopNav-menu-relevant" data-type="rules" class="TopNav-menu-dropdown-row">\n        <span id="dd-icon-relevant" class="icon icon-check ddicon"></span>\n        <span class="ddtext">Rules for Posting</span>\n      </li>\n    </ul>\n  ';
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
  return '\n    <div class="Head-content">\n      <span class="Head-left">\n        <span data-type="author" class="Head-author">' + author + '</span>\n        -\n        <a data-type="group" class="Head-group">' + group + '</a>\n        -\n        <span data-type="timestamp" class="Head-created">' + generateTimestamp(created) + '</span>\n      </span>\n      <span class="Head-rm">\n        <span data-type="hide" class="icon-down-open-big"></span>\n      </span>\n    </div>\n  ';
}

//generate the header for a post --> don't show replies if head
function generatePopularPostHeader(group, author) {
  //title for each of the posts, replies should be overflow-x
  return '\n    <div class="Head-content">\n      <span class="Head-left">\n        <a data-type="group" class="Head-group">' + group + '</a>\n      </span>\n      <span class="Head-right">\n        <span data-type="author" class="Head-author">' + author + '</span>\n      </span>\n    </div>\n  ';
}function generateBody(post) {
  var str = post.body;
  var author = post.author;

  //generate string
  if (str) {
    str = (0, _parser2.default)(str, author);
  } else {
    str = '';
  }

  //finally get body string...
  return str;
}

function generateDelete(postId, owned) {
  for (var i = 0; i < owned.length; i++) {
    if (postId === owned[i]) {
      return '<span data-type="delete" class="Footer-right-delete space">delete</span>';
    }
  }
  return '<span data-type="report" class="report space">report</span>';
}

function generateButtons(postId, owned) {
  for (var i = 0; i < owned.length; i++) {
    if (postId === owned[i]) {
      return '<span data-type="delete" class="Footer-right-delete space">delete</span>\n              ' + (postId ? '<span data-type="reply" class="Footer-right-reply space">reply</span>' : '') + '\n              ';
    }
  }
  //<span data-type="edit" class="Footer-right-delete space">edit</span>
  return '<span data-type="report" class="report space">report</span><span data-type="reply" class="Footer-right-reply space">reply</span>';
}function generatePopFooter(size, threadid, postid, anonymous, owned) {
  var length = size;
  var footer = '\n  <div class="Footer-content">\n    <span class="Footer-left">\n      <span class="icon-chat Footer-left-icon"></span>\n      <span class="Footer-left-size">' + (length || 0) + ' ' + (length != 1 ? 'posts' : 'post') + '</span>\n    </span>\n    <span class="Footer-right" data-post="' + postid + '" data-thread="' + threadid + '">\n      <span data-type="reply" class="Footer-right-reply space">reply</span>\n      <span data-type="open" class="Footer-open space">open</span>\n    </span>\n  </div>\n  ';
  return footer;
}

//handle footer of thread post (head)
function generatePostFooter(post, owned) {
  var replies = post.replies.length;
  var postid = post.id;

  //might make calls in here later -> that's why it's a function
  var footer = '\n  <div class="Footer-content">\n    <span class="Footer-left">\n      <span class="icon-chat Footer-left-icon"></span>\n      <span class="Footer-left-size">' + replies + '</span>\n      replies\n    </span>\n    <span class="Footer-right" data-post="' + postid + '">\n      ' + generateButtons(postid, owned) + '\n    </span>\n  </div>\n  ';
  return footer;
}

},{"../ajax/threads.js":109,"./helpers.js":113,"./oembed.js":115,"./parser":116,"babel-runtime/core-js/object/keys":4,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13}],119:[function(require,module,exports){
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

var checkAuth = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(group) {
    var res, resp;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _groups.getAuth)(group);

          case 3:
            res = _context4.sent;
            resp = res.json();
            return _context4.abrupt('return', resp);

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](0);
            return _context4.abrupt('return');

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 8]]);
  }));
  return function checkAuth(_x5) {
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
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(group, page, auth) {
    var threads, res, jres, popular, _res, _jres, info, _res2, _jres2, user, actions, data, grp;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            threads = void 0;
            _context5.prev = 1;
            _context5.next = 4;
            return (0, _groups.getGroup)(group, page);

          case 4:
            res = _context5.sent;
            _context5.next = 7;
            return res.json();

          case 7:
            jres = _context5.sent;

            //get array of threads
            threads = jres.threads;
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5['catch'](1);

            console.log(_context5.t0);

          case 14:
            popular = void 0;
            _context5.prev = 15;
            _context5.next = 18;
            return (0, _groups.getPopular)(0);

          case 18:
            _res = _context5.sent;
            _context5.next = 21;
            return _res.json();

          case 21:
            _jres = _context5.sent;

            //get array of threads
            popular = _jres.posts;
            _context5.next = 28;
            break;

          case 25:
            _context5.prev = 25;
            _context5.t1 = _context5['catch'](15);

            console.log(_context5.t1);

          case 28:
            info = void 0;
            _context5.prev = 29;
            _context5.next = 32;
            return (0, _groups.getGroupInfo)(group);

          case 32:
            _res2 = _context5.sent;
            _context5.next = 35;
            return _res2.json();

          case 35:
            _jres2 = _context5.sent;

            info = _jres2;
            _context5.next = 42;
            break;

          case 39:
            _context5.prev = 39;
            _context5.t2 = _context5['catch'](29);

            console.log(_context5.t2);

          case 42:

            //setup user so we can determine which buttons to render on each post
            user = {
              owned: _store2.default.owned,
              user: _store2.default.user,
              auth: auth
            };
            actions = {
              deleteThread: deleteThread,
              saveThread: save,
              unsaveThread: unsave,
              checkAuth: checkAuth
            };
            data = {
              info: info,
              popular: popular,
              threads: threads
            };

            //group administrator ? -> group settings link
            //pass threads, along with thread actions
            //thread actions: save thread, delete ?, nav to thread

            grp = new _groupv2.default(group, data, user, page, actions);

            grp.render();
            return _context5.abrupt('return', grp);

          case 48:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[1, 11], [15, 25], [29, 39]]);
  }));

  function start(_x6, _x7, _x8) {
    return ref.apply(this, arguments);
  }

  return start;
}();

},{"../ajax/groups.js":108,"../ajax/threads.js":109,"../ajax/user.js":110,"../core/store.js":117,"./groupv.js":120,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13}],120:[function(require,module,exports){
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
    this.checkAuth = options.checkAuth;

    //setup commands for view actions
    this.viewCommands = {
      reply: function reply(e) {
        return _this._reply(e);
      },
      open: function open(e) {
        return _this._open(e);
      },
      group: function group(e) {
        return _this._goToGroup(e.target.textContent);
      },
      user: function user(e) {
        return _this._goToUser(e);
      },
      savePost: function savePost(e) {
        return _this._savePost(e);
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
      },
      togglePost: function togglePost(e) {
        return _this._togglePost(e);
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
      var $groupinput = (0, _helpers.$id)('GroupNav-input');

      //clicks on listing sections --> reuses _onPostClick for convenience
      (0, _helpers.$on)($listing, 'click', this._onPostClick.bind(this), false);
      (0, _helpers.$on)($popular, 'click', this._onPostClick.bind(this), false);
      (0, _helpers.$on)($author, 'click', function () {
        return _this2._goToUser(_this2.info.author);
      }.bind(this), false);
      (0, _helpers.$on)($groupinput, 'keyup', this._handleGoToGroup.bind(this), false);

      //set up handlers for pagination
      if ($prev) (0, _helpers.$on)($prev, 'click', this.viewCommands.prevPage.bind(this), false);
      if ($next) (0, _helpers.$on)($next, 'click', this.viewCommands.nextPage.bind(this), false);
    }
  }, {
    key: '_postOwned',
    value: function _postOwned(id) {
      //checks if we own post (so we can add delete when we render)
      if (this.user.auth.mod) return true;
      var owned = false;
      this.user.owned.forEach(function (currId) {
        if (currId === id) owned = true;
      });
      return owned;
    }
  }, {
    key: '_togglePost',
    value: function _togglePost(e) {
      //flip icon
      e.target.className = e.target.dataset.open === 'true' ? 'icon-down-open-big' : 'icon-up-open-big';

      //because it's not initialized in the dom --> switches off
      e.target.dataset.open = e.target.dataset.open === 'true' ? 'false' : 'true';

      //move up in the dom until we find the post
      var target = e.target;
      while (target.dataset.type != 'post') {
        target = target.parentNode;
      }

      //toggle post visibility
      target.classList.toggle('Post-Hide');
    }

    //handles the group navigation in the desktop view -- OnKeyUp

  }, {
    key: '_handleGoToGroup',
    value: function _handleGoToGroup(e) {
      var _this3 = this;

      var badresp = function badresp(inputEl) {
        inputEl.placeholder = 'Group is unavailable.';
        setTimeout(function () {
          return inputEl.placeholder = 'Go to group...';
        }, 3000);
      };
      if (e.keyCode === 13) {
        (function () {
          var entered = e.target.value;
          var smoothed = '/' + entered.replace(/\//g, '') + '/';

          var resp = _this3.checkAuth(smoothed);

          //reject bad responses
          if (!resp) badresp(e.target);

          //handle json from response
          resp.then(function (res) {

            //check if allowed, reject if we're not
            if (!res.allowed) {
              badresp(e.target);
            } else {

              //here we are allowed to visit group --> navigate to group
              _this3._goToGroup(smoothed);
            }
          });
          e.target.value = '';
        })();
      }
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
      switch (target.dataset.type) {
        case 'author':
          this._goToUser(target.textContent);
          break;
        case 'group':
          this.viewCommands.group(e);
          break;
        case 'hide':
          this.viewCommands.togglePost(e);
          break;
        case 'body':
          this.viewCommands.toggleBody(e);
          break;
        case 'report':
          //sends request off to dev server
          this.viewCommands.report(e);
          break;
        case 'save':
          //saves and unsaves posts
          this.viewCommands.savePost(e);
          break;
        case 'reply':
          //opens writer with thread as target
          this.viewCommands.reply(e);
          break;
        case 'open':
          //opens thread
          this.viewCommands.open(e);
          break;
        case 'delete':
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
    value: function _goToGroup(grp) {
      _router2.default.navigate(grp);
    }

    //go to user

  }, {
    key: '_goToUser',
    value: function _goToUser(username) {
      if (username !== 'Anonymous') _router2.default.navigate('/user/' + username);
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
      e.target.style.maxHeight = e.target.style.maxHeight === '500px' ? '1000px' : '500px';
    }

    //generate html

  }, {
    key: 'generateStaticView',
    value: function generateStaticView(threads, info, popular, user) {
      var _this4 = this;

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
          }, _callee, _this4);
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
          }, _callee2, _this4);
        }));
        return function getpopularposts() {
          return ref.apply(this, arguments);
        };
      }();

      var buildView = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
          var header, list, footer, groupInfo, popularInfo;
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
                  footer = '\n      <div class="Main-Footer">\n      ' + (_this4.page > 0 ? '<a class="Main-Footer-btn" id="prevpage" href="javascript:;">prev</a>' : '') + '\n      ' + (_this4.threads.length === 30 ? '<a class="Main-Footer-btn" id="nextpage" href="javascript:;">next</a>' : '') + '\n      </div>\n      ';

                  //desktop view information about groups --> allows group navigation

                  groupInfo = '\n        <div id="Main-desktop-info" class="desktop">\n          <div class="GroupName">' + info.name + '</div>\n          <div class="GroupAuthor">\n            <p class="GroupAuthor-title">Made by:</p>\n            <p id="Main-desktop-author" class="GroupAuthor-name">' + info.author + '</p>\n          </div>\n          <div class="GroupPage">\n            <p class="GroupPage-page">Page:</p>\n            <p class="GroupPage-num">' + _this4.page + '</p>\n          </div>\n          <div class="Created">\n            <p>Created</p>\n            <p>' + (0, _template.generateTimestamp)(info.created) + '</p>\n          </div>\n          <div class="GroupNav">\n            <input id="GroupNav-input" placeholder="Go to group...">\n          </div>\n        </div>\n      ';

                  //desktop view information --> popular posts and stuff like that

                  _context3.next = 10;
                  return getpopularposts();

                case 10:
                  _context3.t2 = _context3.sent;
                  _context3.t3 = '\n        <div id="Main-desktop-group" class="desktop">\n          <div class="PopularList">\n            <span id="Main-desktop-title">\n              <span id="Main-desktop-title-text">Popular</span>\n            </span>\n            ' + _context3.t2;
                  popularInfo = _context3.t3 + '\n          </div>\n        </div>\n      ';
                  return _context3.abrupt('return', '\n        <div id="Main-container">\n          ' + header + '\n          ' + groupInfo + '\n          ' + popularInfo + '\n          ' + list + '\n          ' + footer + '\n        </div>\n        ');

                case 14:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this4);
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

},{"../core/core.js":112,"../core/helpers.js":113,"../core/oembed.js":115,"../core/template.js":118,"../router/router.js":122,"babel-runtime/core-js/object/keys":4,"babel-runtime/core-js/promise":6,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/helpers/classCallCheck":10,"babel-runtime/helpers/createClass":11,"babel-runtime/regenerator":13}],121:[function(require,module,exports){
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

var _term = require('./term.js');

var _term2 = _interopRequireDefault(_term);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//handle getting user (usernames, username) data via ajax
{
  console.log(_term2.default);

  var terminal = new _term2.default();
  window.terminal = terminal;
  console.log(terminal);
  (0, _term.handler)(terminal);
  //get user data and store it
  (function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var usr, usrjson;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _user.getUser)();

            case 3:
              usr = _context.sent;
              _context.next = 6;
              return usr.json();

            case 6:
              usrjson = _context.sent;

              if (usrjson) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return');

            case 9:

              //else continue
              _store2.default.addUser(usrjson);

              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return');

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 12]]);
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
} /*
    main.js -- entry point for the application
  */

},{"./ajax/user.js":110,"./core/core.js":112,"./core/oembed.js":115,"./core/parser.js":116,"./core/store.js":117,"./router/router.js":122,"./term.js":125,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13}],122:[function(require,module,exports){
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

},{"../config.js":111,"./routes.js":123}],123:[function(require,module,exports){
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

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _group = require('../group/group.js');

var _group2 = _interopRequireDefault(_group);

var _thread = require('../thread/thread.js');

var _thread2 = _interopRequireDefault(_thread);

var _socket = require('../socket.js');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//group gotten when hitting '/' route
var main = _config2.default.groups.main;

//this is where views are set up
/**
  Router init function (sets up routes)

  layout:
          / --> home (pg 0 for /main/)
          /:group --> grp
          /t/:thread --> front page threads
          /:group/:page --> group view for page
          /:group/t/:thread --> thread view for group
*/

function setup(router) {
  var _this = this;

  //middleware for routing
  router.onNavigate(function (path) {

    //leave real time connection in thread
    if (_socket2.default.inRoom) _socket2.default.leaveRoom();

    //clear view on route change --> maybe put an animation
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
            return (0, _groups.getAuth)(main);

          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();

          case 5:
            resp = _context.sent;

            (0, _group2.default)(main, 0, resp);

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
              _socket2.default.joinRoom(thread);
              group = group ? group : '/';
              _context2.next = 4;
              return (0, _groups.getAuth)('/' + group + '/');

            case 4:
              res = _context2.sent;
              _context2.next = 7;
              return res.json();

            case 7:
              resp = _context2.sent;

              if (!(!resp.allowed && group != "/404/")) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt('return', router.navigate('/404'));

            case 10:
              //setup thread view
              (0, _thread2.default)(thread);

            case 11:
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

              //setup group once again -- squiggles are a string -> int type conversion
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
}

},{"../ajax/groups.js":108,"../config.js":111,"../group/group.js":119,"../socket.js":124,"../thread/thread.js":127,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13}],124:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//location of ws enpoint
var ws = _config2.default.ws;

//grab the connection
/**
 *  Manages websocket connections
 */
var connection = new WebSocket(ws);

connection.addEventListener('open', function (event) {
  console.log('Socket opened!');
});

//handle incoming messages
connection.addEventListener('message', function (event) {
  //get message
  var message = JSON.parse(event.data);

  //separate by kind
  switch (message.kind) {

    //for now the only message we're sending is that to add a message
    case 'thread':
      ;
      break;
  }
});

//simple helper function to wait for the condition and try again each interval
function waitFor(check, interval, func, args) {
  if (check()) {
    func.apply(this, args);
  } else {
    window.setTimeout(function () {
      return waitFor(check, interval, func, args);
    }, interval);
  }
}

//little interface to deal with websockets socket
var socket = {
  inRoom: false,
  connection: connection,
  joinRoom: function joinRoom(room) {
    if (socket.inRoom) {
      socket.leaveRoom();
    }
    //make sure we're connected befor we start sending stuff
    waitFor(function () {
      return connection.readyState === 1;
    }, 100, function () {
      connection.send((0, _stringify2.default)({
        kind: 'join',
        thread: room
      }));
      console.log('sent');
    }, [room]);
    socket.inRoom = true;
  },
  leaveRoom: function leaveRoom() {
    socket.inRoom = false;
    connection.send((0, _stringify2.default)({
      kind: 'leave'
    }));
  },
  send: function send(message) {
    connection.send((0, _stringify2.default)({
      kind: 'thread',
      body: message
    }));
  },
  edit: function edit(newMessage, id) {
    return console.log('edit');
  },
  delete: function _delete(id) {
    return console.log('delete');
  },
  receive: function receive(message) {
    return console.log('recieve');
  }
};

window.socket = socket;

exports.default = socket;

},{"./config.js":111,"babel-runtime/core-js/json/stringify":1}],125:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _xterm = require('xterm');

var _xterm2 = _interopRequireDefault(_xterm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_xterm2.default.prototype.toggleFullscreen = function (fullscreen) {
  var fn;
  if (typeof fullscreen == 'undefined') {
    fn = this.element.classList.contains('fullscreen') ? 'remove' : 'add';
  } else if (!fullscreen) {
    fn = 'remove';
  } else {
    fn = 'add';
  }
  this.element.classList[fn]('fullscreen');
}; /*
    * xterm.js addons condensed into a single file
    */


var proposeGeometry = function proposeGeometry(term) {
  var parentElementStyle = window.getComputedStyle(term.element.parentElement),
      parentElementHeight = parseInt(parentElementStyle.getPropertyValue('height')),
      parentElementWidth = parseInt(parentElementStyle.getPropertyValue('width')),
      elementStyle = window.getComputedStyle(term.element),
      elementPaddingVer = parseInt(elementStyle.getPropertyValue('padding-top')) + parseInt(elementStyle.getPropertyValue('padding-bottom')),
      elementPaddingHor = parseInt(elementStyle.getPropertyValue('padding-right')) + parseInt(elementStyle.getPropertyValue('padding-left')),
      availableHeight = parentElementHeight - elementPaddingVer,
      availableWidth = parentElementWidth - elementPaddingHor,
      container = term.rowContainer,
      subjectRow = term.rowContainer.firstElementChild,
      contentBuffer = subjectRow.innerHTML,
      characterHeight,
      rows,
      characterWidth,
      cols,
      geometry;

  subjectRow.style.display = 'inline';
  subjectRow.innerHTML = 'W'; // Common character for measuring width, although on monospace
  characterWidth = subjectRow.getBoundingClientRect().width;
  subjectRow.style.display = ''; // Revert style before calculating height, since they differ.
  characterHeight = parseInt(subjectRow.offsetHeight);
  subjectRow.innerHTML = contentBuffer;

  rows = parseInt(availableHeight / characterHeight);
  cols = parseInt(availableWidth / characterWidth) - 1;

  geometry = { cols: cols, rows: rows };
  return geometry;
};

var fit = function fit(term) {
  var geometry = proposeGeometry(term);

  term.resize(geometry.cols, geometry.rows);
};

_xterm2.default.prototype.proposeGeometry = function () {
  return proposeGeometry(this);
};

_xterm2.default.prototype.fit = function () {
  return fit(this);
};

function handler(terminal) {
  if (terminal._initialized) {
    return;
  }

  terminal._initialized = true;

  var shellprompt = '$ ';

  terminal.prompt = function () {
    terminal.write('\r\n' + shellprompt);
  };

  terminal.writeln('Welcome to Mixroom');
  terminal.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
  terminal.writeln('Type some keys and commands to play around.');
  terminal.writeln('');
  terminal.prompt();

  terminal.on('key', function (key, ev) {
    var printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

    if (ev.keyCode == 13) {
      terminal.prompt();
    } else if (ev.keyCode == 8) {
      // Do not delete the prompt
      if (terminal.x > 2) {
        terminal.write('\b \b');
      }
    } else if (printable) {
      terminal.write(key);
    }
  });

  terminal.on('paste', function (data, ev) {
    terminal.write(data);
  });
}

exports.default = _xterm2.default;

},{"xterm":106}],126:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNode = _config2.default.isNode;

//export appStore, handles general user data
/**
 * Store for thread -- helps to model posts
 */

exports.default = {
  //initialize user as anon
  _posts: [],

  //set user data
  get posts() {
    return this._posts;
  },

  addPosts: function addPosts(posts) {
    posts.forEach(function (post) {
      return undefined._posts.push(post);
    });
  },

  addPost: function addPost(post) {

    undefined._posts.push(post);
  }

};

},{"../config.js":111}],127:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var removePost = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(post, id) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _threads.rmPost)(post, id);

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
  return function removePost(_x, _x2) {
    return ref.apply(this, arguments);
  };
}(); /**
      * group.js is a controller for group (kinda)
      */

var updatePost = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(post, content, id) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _threads.editPost)(threadId, content, id);

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
  return function updatePost(_x3, _x4, _x5) {
    return ref.apply(this, arguments);
  };
}();

//init for group controller (or whatever you'd like to call it)


var _threads = require('../ajax/threads.js');

var _store = require('../core/store.js');

var _store2 = _interopRequireDefault(_store);

var _store3 = require('./store.js');

var _store4 = _interopRequireDefault(_store3);

var _threadv = require('./threadv.js');

var _threadv2 = _interopRequireDefault(_threadv);

var _socket = require('../socket.js');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(threadid) {
    var res, thread, user, actions, thrd;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _threads.getThread)(threadid);

          case 3:
            res = _context3.sent;
            _context3.next = 6;
            return res.json();

          case 6:
            thread = _context3.sent;
            user = {
              owned: _store2.default.owned,
              user: _store2.default.user
            };
            actions = {
              removePost: removePost,
              editPost: updatePost
            };

            //in thread actions

            thrd = new _threadv2.default(thread, user, actions, _socket2.default);

            thrd.render();
            return _context3.abrupt('return', thrd);

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);

          case 17:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 14]]);
  }));

  function start(_x6) {
    return ref.apply(this, arguments);
  }

  return start;
}();

},{"../ajax/threads.js":109,"../core/store.js":117,"../socket.js":124,"./store.js":126,"./threadv.js":128,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/regenerator":13}],128:[function(require,module,exports){
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

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

  function View(thread, user, actions, socket) {
    var _this = this;

    (0, _classCallCheck3.default)(this, View);


    //set thread
    this.thread = thread;

    //unpack actions onto our class
    this.removePost = actions.removePost;
    this.editPost = actions.editPost;

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
      togglePost: function togglePost(e) {
        return _this._togglePost(e);
      },
      peek: function peek(e) {
        return _this._peek(e);
      },
      delete: function _delete(e) {
        return _this._delete(e);
      },
      scrollToPost: function scrollToPost(e) {
        return _this._scrollToPost(e);
      }
    };

    socket.connection.onmessage = function (event) {
      var message = JSON.parse(event.data).body;
      _this.addPost(message);
    };
  }

  //binds events --> mostly delegated events up in here


  (0, _createClass3.default)(View, [{
    key: 'bind',
    value: function bind() {

      //get references (as elements are dynamically rendered)
      var $listing = (0, _helpers.$id)('List');
      var $prev = (0, _helpers.$id)('prevpage');

      //might as well keep a reference to the listing because we'll be adding to it
      this.$listing = $listing;

      //clicks on listing section
      (0, _helpers.$on)($listing, 'click', this._onPostClick.bind(this), false);
      (0, _helpers.$on)($listing, 'mousemove', this._onPostHover.bind(this), false);
      (0, _helpers.$on)($prev, 'click', this._back.bind(this), false);
    }
  }, {
    key: '_delete',
    value: function _delete(e) {
      var content = e.target.innerHTML;
      if (content === 'delete') {
        this._cancelDelete();
        e.target.innerHTML = "sure?";
        e.target.id = 'delete-pending';
        return;
      }

      var post = e.target.parentNode.dataset.post;
      var match = void 0;
      var owned = (0, _keys2.default)(this.user.owned);
      for (var i = 0; i < owned.length; i++) {
        if (post === owned[i]) {
          match = owned[i];
        }
      }
      console.log(match);
      if (match) this.removePost(post, this.user.owned[match]);

      //reload this page (but not refresh)
      _router2.default.check();
    }
  }, {
    key: '_togglePost',
    value: function _togglePost(e) {
      //flip icon
      e.target.className = e.target.dataset.open === 'true' ? 'icon-down-open-big' : 'icon-up-open-big';

      //because it's not initialized in the dom --> switches off
      e.target.dataset.open = e.target.dataset.open === 'true' ? 'false' : 'true';

      //move up in the dom until we find the post
      var target = e.target;
      while (target.dataset.type != 'post') {
        target = target.parentNode;
      }

      //toggle post visibility
      target.classList.toggle('Post-Hide');
    }
  }, {
    key: '_scrollToPost',
    value: function _scrollToPost(e) {
      var post = (0, _helpers.$id)(e.target.dataset.post.trim());

      //if we don't get the post, add a strikethrough
      if (!post) {
        e.target.style.setProperty("text-decoration", "line-through");
        return;
      }

      //else scroll into post-view
      post.scrollIntoView();
      window.scrollBy(0, -48);
      post.classList.remove('enter-animation');

      //hacky way to reset animation, but a must if we don't want to have to clone the element and replace it
      window.setTimeout(function () {
        return post.classList.add('enter-animation', 0);
      });
    }
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
  }, {
    key: '_back',
    value: function _back() {
      _router2.default.back();
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
      switch (target.dataset.type) {
        case 'author':
          this._goToUser(e);
          break;
        case 'group':
          this.viewCommands.group(e);
          break;
        case 'hide':
          this.viewCommands.togglePost(e);
          break;
        case 'body':
          this.viewCommands.toggleBody(e);
          break;
        case 'report':
          //sends request off to dev server
          this.viewCommands.report(e);
          break;
        case 'save':
          //saves and unsaves posts
          this.viewCommands.savePost(e);
          break;
        case 'reply':
          //opens writer with thread as target
          this.viewCommands.reply(e);
          break;
        case 'open':
          //opens thread
          this.viewCommands.open(e);
          break;
        case 'delete':
          //deletes thread
          this.viewCommands.delete(e);
          break;
        case 'ref':
          //scroll to id of post
          this.viewCommands.scrollToPost(e);
        default:
          this._cancelDelete(e);
      }
    }
  }, {
    key: '_removePeek',
    value: function _removePeek() {
      var post = (0, _helpers.$id)('peek-post');
      if (post) {
        post.parentNode.removeChild(post);
      }
    }

    //handle post clicks

  }, {
    key: '_onPostHover',
    value: function _onPostHover(e) {
      var target = e.target;
      switch (target.dataset.type) {
        case 'body':
          this._removePeek();
          break;
        case 'content':
          this._removePeek();
          break;
        case 'ref':
          this._peekIntoPost(e);
          break;
      }
    }

    //lets us look at a post on reference hover

  }, {
    key: '_peekIntoPost',
    value: function _peekIntoPost(e) {
      console.log('peek');

      this._removePeek();
      var post = (0, _helpers.$id)(e.target.dataset.post.trim());

      //if we don't get the post, add a strikethrough
      if (!post) {
        //  e.target.style.setProperty("text-decoration", "line-through");
        return;
      }

      var newPost = post.cloneNode(true);

      var dimensions = post.getBoundingClientRect();

      //check if dom element is in view on Y axis
      var isInView = dimensions.bottom > 42 && dimensions.top < (window.innerHeight || document.documentElement.clientHeight);

      console.log(isInView);

      if (isInView) {
        var _ret = function () {
          post.style.backgroundColor = "#ffffba";
          //handler to remove highlight from post on mouseout
          var removeSpotlight = function removeSpotlight(e) {
            post.style.backgroundColor = "white";
            e.target.removeEventListener('mouseout', removeSpotlight, false);
          };

          //add spotlight, add mouseout listener, on mouseout we remove the spotlight
          (0, _helpers.$on)(e.target, 'mouseout', removeSpotlight, false);
          return {
            v: void 0
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
      }

      newPost.id = 'peek-post';
      newPost.className = 'peeking-post';

      //grab target bounding rectangle
      var targetDimensions = e.target.getBoundingClientRect();

      //else lets grab the post and bring it here
      newPost.style.left = targetDimensions.left + window.scrollX + 92 + 'px';
      newPost.style.top = targetDimensions.top + window.scrollY - 36 + 'px';
      newPost.style.backgroundColor = 'white';
      this.$listing.appendChild(newPost);
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
      if (e.target.textContent !== 'Anonymous') _router2.default.navigate('/user/' + e.target.textContent);
    }

    //save post -- does nothing yet

  }, {
    key: '_savePost',
    value: function _savePost(e) {
      e.target.style.color = e.target.style.color === '#6879FF' ? '#6879FF' : '#3b5998';
    }

    //report post -- does nothing yet

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
          var header, list, footer, threadInfo, threadRight;
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

                  console.log(_this2.thread);
                  //desktop view information about groups --> allows group navigation
                  threadInfo = '\n        <div id="Main-desktop-info" class="desktop">\n          <div class="GroupAuthor">\n            <p class="GroupAuthor-title">Made by:</p>\n            <p id="Main-desktop-author" class="GroupAuthor-name">' + _this2.thread.posts[0].author + '</p>\n          </div>\n          <div class="ThreadCreated">\n            <p>Created:</p>\n            <p>' + (0, _template.generateTimestamp)(_this2.thread.created) + '</p>\n          </div>\n          <div class="ThreadNav">\n            <a class="Main-Footer-btn" href="http://' + location.host + _this2.thread.group + '">back</a>\n            <a class="Main-Footer-btn" href="http://' + location.host + _this2.thread.group + '">next</a>\n          </div>\n        </div>\n      ';

                  //desktop view information --> popular posts and stuff like that

                  threadRight = '\n        <div id="Main-desktop-thread" class="desktop">\n          <div class="PopularList">\n            <span id="Main-desktop-title">\n              <span id="Main-desktop-title-text">Popular</span>\n            </span>\n          </div>\n        </div>\n      ';

                  //final template for section

                  return _context2.abrupt('return', '\n        <div id="Main-container">\n          ' + header + '\n          ' + threadInfo + '\n          ' + threadRight + '\n          ' + list + '\n          ' + footer + '\n        </div>\n        ');

                case 11:
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

    //add post to view

  }, {
    key: 'addPost',
    value: function addPost(post) {
      var _this3 = this;

      //get the embedded json
      var message = JSON.parse(post);

      //generate post and add it
      var genPostAddIt = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
          var div;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  div = document.createElement('div');
                  _context3.next = 3;
                  return (0, _template.generatePost)(_this3.thread.group, message, _this3.user);

                case 3:
                  div.innerHTML = _context3.sent;

                  _this3.$listing.appendChild(div);

                case 5:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this3);
        }));
        return function genPostAddIt() {
          return ref.apply(this, arguments);
        };
      }();

      //actually generate the post and add it to the DOM
      genPostAddIt();

      //update replies to posts that affect us
      this.addReplies(message.responseTo);
    }

    //increment number of replies post has and

  }, {
    key: 'addReplies',
    value: function addReplies(postIds) {
      postIds.forEach(function (postId) {
        var post = (0, _helpers.qs)('[id=\'' + postId + '\'] span.Footer-left-size');
        ++post.innerHTML;
      });
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

},{"../core/core.js":112,"../core/helpers.js":113,"../core/oembed.js":115,"../core/template.js":118,"../router/router.js":122,"babel-runtime/core-js/object/keys":4,"babel-runtime/core-js/promise":6,"babel-runtime/helpers/asyncToGenerator":9,"babel-runtime/helpers/classCallCheck":10,"babel-runtime/helpers/createClass":11,"babel-runtime/helpers/typeof":12,"babel-runtime/regenerator":13}]},{},[121]);
