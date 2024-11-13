(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
var input = document.getElementById('paragraph-input');
var inputValue;
var button = document.querySelector('.generate');
var generatedTextDiv = document.querySelector('.generated-text');
const { loremIpsum } = require('lorem-ipsum');

input.addEventListener('input', (event) => {
    inputValue = event.target.value;
})
button.addEventListener('click', function () {
    removeText();
    generateLorem(inputValue);
})


function removeText() {
    var paragraphsInDiv = document.getElementsByClassName('lorem-text');
    while (paragraphsInDiv.length > 0) {
        paragraphsInDiv[0].remove();
    }
}

function generateLorem(number) {

    for (var i = 0; i < number; i++) {
        const text = loremIpsum({
            count: 1,
            units: 'paragraphs',
            format: 'plain',
        });

        var addTextToDiv = document.createElement("p");
        addTextToDiv.classList.add("lorem-text");
        addTextToDiv.innerHTML = text;
        generatedTextDiv.appendChild(addTextToDiv);
        console.log(text);
    }

}




const sensiLorem = require("sensible-lorem");

console.log(sensiLorem(10));

var input2 = document.getElementById('paragraph-input-2');
var inputValue2;
var button2 = document.querySelector('.generate-2');
var generatedTextDiv2 = document.querySelector('.generated-text-2');

input2.addEventListener('input', (event) => {
    inputValue2 = event.target.value;
    inputvalue2ToNumber = Number(inputValue2);
})
button2.addEventListener('click', function () {
    removeText2();
    generateSensiLorem(randomNumber, inputvalue2ToNumber);
})

function generateSensiLorem(number, times) {

    for(var i = 0; i < times; i++) {
    var addTextToDiv2 = document.createElement("p");
    addTextToDiv2.classList.add("lorem-text-2");
    addTextToDiv2.innerHTML = sensiLorem(number);
    generatedTextDiv2.appendChild(addTextToDiv2);
}
}


function removeText2() {
    var paragraphsInDiv2 = document.getElementsByClassName('lorem-text-2');
    while (paragraphsInDiv2.length > 0) {
        paragraphsInDiv2[0].remove();
    }
}

var randomNumber = Math.floor(Math.random() * (80 - 50) + 50);
},{"lorem-ipsum":8,"sensible-lorem":18}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FORMAT_PLAIN = exports.FORMAT_HTML = exports.FORMATS = void 0;
var FORMAT_HTML = "html";
exports.FORMAT_HTML = FORMAT_HTML;
var FORMAT_PLAIN = "plain";
exports.FORMAT_PLAIN = FORMAT_PLAIN;
var FORMATS = [FORMAT_HTML, FORMAT_PLAIN];
exports.FORMATS = FORMATS;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LINE_ENDINGS = void 0;
var LINE_ENDINGS = {
  POSIX: "\n",
  WIN32: "\r\n"
};
exports.LINE_ENDINGS = LINE_ENDINGS;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPPORTED_PLATFORMS = void 0;
var SUPPORTED_PLATFORMS = {
  DARWIN: "darwin",
  LINUX: "linux",
  WIN32: "win32"
};
exports.SUPPORTED_PLATFORMS = SUPPORTED_PLATFORMS;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNIT_WORDS = exports.UNIT_WORD = exports.UNIT_SENTENCES = exports.UNIT_SENTENCE = exports.UNIT_PARAGRAPHS = exports.UNIT_PARAGRAPH = exports.UNITS = void 0;
var UNIT_WORDS = "words";
exports.UNIT_WORDS = UNIT_WORDS;
var UNIT_WORD = "word";
exports.UNIT_WORD = UNIT_WORD;
var UNIT_SENTENCES = "sentences";
exports.UNIT_SENTENCES = UNIT_SENTENCES;
var UNIT_SENTENCE = "sentence";
exports.UNIT_SENTENCE = UNIT_SENTENCE;
var UNIT_PARAGRAPHS = "paragraphs";
exports.UNIT_PARAGRAPHS = UNIT_PARAGRAPHS;
var UNIT_PARAGRAPH = "paragraph";
exports.UNIT_PARAGRAPH = UNIT_PARAGRAPH;
var UNITS = [UNIT_WORDS, UNIT_WORD, UNIT_SENTENCES, UNIT_SENTENCE, UNIT_PARAGRAPHS, UNIT_PARAGRAPH];
exports.UNITS = UNITS;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WORDS = void 0;
var WORDS = ["ad", "adipisicing", "aliqua", "aliquip", "amet", "anim", "aute", "cillum", "commodo", "consectetur", "consequat", "culpa", "cupidatat", "deserunt", "do", "dolor", "dolore", "duis", "ea", "eiusmod", "elit", "enim", "esse", "est", "et", "eu", "ex", "excepteur", "exercitation", "fugiat", "id", "in", "incididunt", "ipsum", "irure", "labore", "laboris", "laborum", "Lorem", "magna", "minim", "mollit", "nisi", "non", "nostrud", "nulla", "occaecat", "officia", "pariatur", "proident", "qui", "quis", "reprehenderit", "sint", "sit", "sunt", "tempor", "ullamco", "ut", "velit", "veniam", "voluptate"];
exports.WORDS = WORDS;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LoremIpsum", {
  enumerable: true,
  get: function get() {
    return _LoremIpsum["default"];
  }
});
exports.loremIpsum = void 0;

var _formats = require("./constants/formats");

var _units = require("./constants/units");

var _words = require("./constants/words");

var _LoremIpsum = _interopRequireDefault(require("./lib/LoremIpsum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loremIpsum = function loremIpsum() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$count = _ref.count,
      count = _ref$count === void 0 ? 1 : _ref$count,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? _formats.FORMAT_PLAIN : _ref$format,
      _ref$paragraphLowerBo = _ref.paragraphLowerBound,
      paragraphLowerBound = _ref$paragraphLowerBo === void 0 ? 3 : _ref$paragraphLowerBo,
      _ref$paragraphUpperBo = _ref.paragraphUpperBound,
      paragraphUpperBound = _ref$paragraphUpperBo === void 0 ? 7 : _ref$paragraphUpperBo,
      random = _ref.random,
      _ref$sentenceLowerBou = _ref.sentenceLowerBound,
      sentenceLowerBound = _ref$sentenceLowerBou === void 0 ? 5 : _ref$sentenceLowerBou,
      _ref$sentenceUpperBou = _ref.sentenceUpperBound,
      sentenceUpperBound = _ref$sentenceUpperBou === void 0 ? 15 : _ref$sentenceUpperBou,
      _ref$units = _ref.units,
      units = _ref$units === void 0 ? _units.UNIT_SENTENCES : _ref$units,
      _ref$words = _ref.words,
      words = _ref$words === void 0 ? _words.WORDS : _ref$words,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === void 0 ? "" : _ref$suffix;

  var options = {
    random: random,
    sentencesPerParagraph: {
      max: paragraphUpperBound,
      min: paragraphLowerBound
    },
    words: words,
    wordsPerSentence: {
      max: sentenceUpperBound,
      min: sentenceLowerBound
    }
  };
  var lorem = new _LoremIpsum["default"](options, format, suffix);

  switch (units) {
    case _units.UNIT_PARAGRAPHS:
    case _units.UNIT_PARAGRAPH:
      return lorem.generateParagraphs(count);

    case _units.UNIT_SENTENCES:
    case _units.UNIT_SENTENCE:
      return lorem.generateSentences(count);

    case _units.UNIT_WORDS:
    case _units.UNIT_WORD:
      return lorem.generateWords(count);

    default:
      return "";
  }
};

exports.loremIpsum = loremIpsum;

},{"./constants/formats":3,"./constants/units":6,"./constants/words":7,"./lib/LoremIpsum":9}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _formats = require("../constants/formats");

var _lineEndings = require("../constants/lineEndings");

var _generator = _interopRequireDefault(require("../lib/generator"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LoremIpsum = /*#__PURE__*/function () {
  function LoremIpsum() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _formats.FORMAT_PLAIN;
    var suffix = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, LoremIpsum);

    this.format = format;
    this.suffix = suffix;

    _defineProperty(this, "generator", void 0);

    if (_formats.FORMATS.indexOf(format.toLowerCase()) === -1) {
      throw new Error("".concat(format, " is an invalid format. Please use ").concat(_formats.FORMATS.join(" or "), "."));
    }

    this.generator = new _generator["default"](options);
  }

  _createClass(LoremIpsum, [{
    key: "getLineEnding",
    value: function getLineEnding() {
      if (this.suffix) {
        return this.suffix;
      }

      if (!(0, _util.isReactNative)() && (0, _util.isNode)() && (0, _util.isWindows)()) {
        return _lineEndings.LINE_ENDINGS.WIN32;
      }

      return _lineEndings.LINE_ENDINGS.POSIX;
    }
  }, {
    key: "formatString",
    value: function formatString(str) {
      if (this.format === _formats.FORMAT_HTML) {
        return "<p>".concat(str, "</p>");
      }

      return str;
    }
  }, {
    key: "formatStrings",
    value: function formatStrings(strings) {
      var _this = this;

      return strings.map(function (str) {
        return _this.formatString(str);
      });
    }
  }, {
    key: "generateWords",
    value: function generateWords(num) {
      return this.formatString(this.generator.generateRandomWords(num));
    }
  }, {
    key: "generateSentences",
    value: function generateSentences(num) {
      return this.formatString(this.generator.generateRandomParagraph(num));
    }
  }, {
    key: "generateParagraphs",
    value: function generateParagraphs(num) {
      var makeString = this.generator.generateRandomParagraph.bind(this.generator);
      return this.formatStrings((0, _util.makeArrayOfStrings)(num, makeString)).join(this.getLineEnding());
    }
  }]);

  return LoremIpsum;
}();

var _default = LoremIpsum;
exports["default"] = _default;

},{"../constants/formats":3,"../constants/lineEndings":4,"../lib/generator":10,"../util":12}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _words = require("../constants/words");

var _util = require("../util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Generator = /*#__PURE__*/function () {
  function Generator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$sentencesPerPara = _ref.sentencesPerParagraph,
        sentencesPerParagraph = _ref$sentencesPerPara === void 0 ? {
      max: 7,
      min: 3
    } : _ref$sentencesPerPara,
        _ref$wordsPerSentence = _ref.wordsPerSentence,
        wordsPerSentence = _ref$wordsPerSentence === void 0 ? {
      max: 15,
      min: 5
    } : _ref$wordsPerSentence,
        random = _ref.random,
        seed = _ref.seed,
        _ref$words = _ref.words,
        words = _ref$words === void 0 ? _words.WORDS : _ref$words;

    _classCallCheck(this, Generator);

    _defineProperty(this, "sentencesPerParagraph", void 0);

    _defineProperty(this, "wordsPerSentence", void 0);

    _defineProperty(this, "random", void 0);

    _defineProperty(this, "words", void 0);

    if (sentencesPerParagraph.min > sentencesPerParagraph.max) {
      throw new Error("Minimum number of sentences per paragraph (".concat(sentencesPerParagraph.min, ") cannot exceed maximum (").concat(sentencesPerParagraph.max, ")."));
    }

    if (wordsPerSentence.min > wordsPerSentence.max) {
      throw new Error("Minimum number of words per sentence (".concat(wordsPerSentence.min, ") cannot exceed maximum (").concat(wordsPerSentence.max, ")."));
    }

    this.sentencesPerParagraph = sentencesPerParagraph;
    this.words = words;
    this.wordsPerSentence = wordsPerSentence;
    this.random = random || Math.random;
  }

  _createClass(Generator, [{
    key: "generateRandomInteger",
    value: function generateRandomInteger(min, max) {
      return Math.floor(this.random() * (max - min + 1) + min);
    }
  }, {
    key: "generateRandomWords",
    value: function generateRandomWords(num) {
      var _this = this;

      var _this$wordsPerSentenc = this.wordsPerSentence,
          min = _this$wordsPerSentenc.min,
          max = _this$wordsPerSentenc.max;
      var length = num || this.generateRandomInteger(min, max);
      return (0, _util.makeArrayOfLength)(length).reduce(function (accumulator, index) {
        return "".concat(_this.pluckRandomWord(), " ").concat(accumulator);
      }, "").trim();
    }
  }, {
    key: "generateRandomSentence",
    value: function generateRandomSentence(num) {
      return "".concat((0, _util.capitalize)(this.generateRandomWords(num)), ".");
    }
  }, {
    key: "generateRandomParagraph",
    value: function generateRandomParagraph(num) {
      var _this2 = this;

      var _this$sentencesPerPar = this.sentencesPerParagraph,
          min = _this$sentencesPerPar.min,
          max = _this$sentencesPerPar.max;
      var length = num || this.generateRandomInteger(min, max);
      return (0, _util.makeArrayOfLength)(length).reduce(function (accumulator, index) {
        return "".concat(_this2.generateRandomSentence(), " ").concat(accumulator);
      }, "").trim();
    }
  }, {
    key: "pluckRandomWord",
    value: function pluckRandomWord() {
      var min = 0;
      var max = this.words.length - 1;
      var index = this.generateRandomInteger(min, max);
      return this.words[index];
    }
  }]);

  return Generator;
}();

var _default = Generator;
exports["default"] = _default;

},{"../constants/words":7,"../util":12}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @param str  A string that may or may not be capitalized.
 * @returns    A capitalized string.
 */
var capitalize = function capitalize(str) {
  var trimmed = str.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

var _default = capitalize;
exports["default"] = _default;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "capitalize", {
  enumerable: true,
  get: function get() {
    return _capitalize["default"];
  }
});
Object.defineProperty(exports, "isNode", {
  enumerable: true,
  get: function get() {
    return _isNode["default"];
  }
});
Object.defineProperty(exports, "isReactNative", {
  enumerable: true,
  get: function get() {
    return _isReactNative["default"];
  }
});
Object.defineProperty(exports, "isWindows", {
  enumerable: true,
  get: function get() {
    return _isWindows["default"];
  }
});
Object.defineProperty(exports, "makeArrayOfLength", {
  enumerable: true,
  get: function get() {
    return _makeArrayOfLength["default"];
  }
});
Object.defineProperty(exports, "makeArrayOfStrings", {
  enumerable: true,
  get: function get() {
    return _makeArrayOfStrings["default"];
  }
});

var _capitalize = _interopRequireDefault(require("./capitalize"));

var _isNode = _interopRequireDefault(require("./isNode"));

var _isReactNative = _interopRequireDefault(require("./isReactNative"));

var _isWindows = _interopRequireDefault(require("./isWindows"));

var _makeArrayOfLength = _interopRequireDefault(require("./makeArrayOfLength"));

var _makeArrayOfStrings = _interopRequireDefault(require("./makeArrayOfStrings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./capitalize":11,"./isNode":13,"./isReactNative":14,"./isWindows":15,"./makeArrayOfLength":16,"./makeArrayOfStrings":17}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @returns  True if the runtime is NodeJS.
 */
var isNode = function isNode() {
  return typeof module !== "undefined" && !!module.exports;
};

var _default = isNode;
exports["default"] = _default;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Check if runtime is ReactNative.
 * Solution based on https://github.com/knicklabs/lorem-ipsum.js/pull/52/files
 *
 * @returns  True if runtime is ReactNative.
 */
var isReactNative = function isReactNative() {
  var isReactNativeResult = false;

  try {
    isReactNativeResult = navigator.product === "ReactNative";
  } catch (e) {
    isReactNativeResult = false;
  }

  return isReactNativeResult;
};

var _default = isReactNative;
exports["default"] = _default;

},{}],15:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _platforms = require("../constants/platforms");

/**
 * @returns True if process is windows.
 */
var isWindows = function isWindows() {
  var isWindowsResult = false;

  try {
    isWindowsResult = process.platform === _platforms.SUPPORTED_PLATFORMS.WIN32;
  } catch (e) {
    isWindowsResult = false;
  }

  return isWindowsResult;
};

var _default = isWindows;
exports["default"] = _default;

}).call(this)}).call(this,require('_process'))
},{"../constants/platforms":5,"_process":1}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @param length Length "x".
 * @returns      An array of indexes of length "x".
 */
var makeArrayOfLength = function makeArrayOfLength() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return Array.apply(null, Array(length)).map(function (item, index) {
    return index;
  });
};

var _default = makeArrayOfLength;
exports["default"] = _default;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _makeArrayOfLength = _interopRequireDefault(require("./makeArrayOfLength"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @param length  Length "x".
 * @returns       An array of strings of length "x".
 */
var makeArrayOfStrings = function makeArrayOfStrings(length, makeString) {
  var arr = (0, _makeArrayOfLength["default"])(length);
  return arr.map(function () {
    return makeString();
  });
};

var _default = makeArrayOfStrings;
exports["default"] = _default;

},{"./makeArrayOfLength":16}],18:[function(require,module,exports){
class SentenceGenerator {
  //  words
  #words = {
    moods: ["happy", "sad", "excited", "calm", "curious", "angry"],

    animalNouns: [
      "cat",
      "dog",
      "lion",
      "elephant",
      "rabbit",
      "bird",
      "shark",
      "whale",
      "tiger",
      "wolf",
    ],
    personNouns: [
      "teacher",
      "doctor",
      "engineer",
      "artist",
      "scientist",
      "child",
      "parent",
      "athlete",
      "driver",
    ],
    thingNouns: [
      "car",
      "phone",
      "book",
      "table",
      "computer",
      "lamp",
      "pen",
      "watch",
      "bicycle",
      "chair",
    ],
    placeNouns: [
      "city",
      "village",
      "forest",
      "mountain",
      "beach",
      "park",
      "restaurant",
      "school",
      "market",
    ],
    abstractNouns: [
      "idea",
      "truth",
      "love",
      "fear",
      "hope",
      "honor",
      "anger",
      "joy",
      "beauty",
      "justice",
    ],

    animalVerbs: [
      "run",
      "hunt",
      "fly",
      "crawl",
      "pounce",
      "swim",
      "roar",
      "chirp",
      "climb",
      "scratch",
    ],
    personVerbs: [
      "teach",
      "build",
      "study",
      "create",
      "help",
      "lead",
      "sing",
      "play",
      "read",
      "drive",
    ],
    thingVerbs: [
      "ring",
      "break",
      "shine",
      "open",
      "close",
      "fall",
      "move",
      "roll",
      "buzz",
      "click",
    ],
    placeVerbs: [
      "thrive",
      "bustle",
      "grow",
      "decline",
      "expand",
      "flourish",
      "shrink",
      "quiet",
    ],
    abstractVerbs: [
      "exist",
      "inspire",
      "believe",
      "create",
      "imagine",
      "feel",
      "learn",
      "dream",
      "reflect",
    ],

    animalSizes: ["big", "small", "huge", "tiny", "massive", "minute"],
    personSizes: ["tall", "short", "strong", "weak"],
    thingSizes: ["large", "compact", "bulky", "lightweight"],
    placeSizes: ["spacious", "cramped", "vast", "narrow"],
    abstractSizes: ["ample", "minimal"],

    animalColors: ["red", "blue", "green", "yellow", "purple", "white"],
    personColors: ["black", "gray", "orange"],
    thingColors: ["colorful", "monochrome"],
    placeColors: ["lush", "bare"],
    abstractColors: ["vibrant", "muted"],

    animalManner: [
      "quickly",
      "slowly",
      "carefully",
      "gracefully",
      "awkwardly",
      "boldly",
      "silently",
      "eagerly",
    ],
    personManner: ["quickly", "slowly", "patiently", "energetically", "calmly"],
    thingManner: ["smoothly", "noisily", "softly", "gently"],
    placeManner: ["quietly", "bustlingly", "peacefully"],
    abstractManner: ["freely", "gracefully"],

    personSubjects: ["I", "you", "he", "she", "it", "we", "they"],
    personObjects: ["me", "you", "him", "her", "it", "us", "them"],
    animalSubjects: ["he", "she", "it", "they"],
    thingSubjects: ["it", "they"],
    placeSubjects: ["it", "they"],
    abstractSubjects: ["it", "they"],

    prepositions: [
      "on",
      "in",
      "under",
      "over",
      "beside",
      "between",
      "around",
      "against",
      "through",
    ],

    conjunctions: [
      "and",
      "but",
      "or",
      "so",
      "because",
      "although",
      "while",
      "if",
      "since",
      "unless",
    ],
  };

  // sentence structures
  #sentenceStructures = [
    ["moods", "personSubjects", "personVerbs", "thingNouns"],
    ["animalNouns", "animalVerbs", "animalSizes"],
    ["thingNouns", "thingVerbs", "thingColors"],
    ["placeNouns", "placeVerbs", "placeSizes"],
    ["abstractNouns", "abstractVerbs", "abstractSizes"],

    // Adjective and Adverb Combinations
    ["thingSizes", "thingNouns", "thingVerbs", "thingManner"],
    ["animalColors", "animalNouns", "animalVerbs", "animalManner"],
    ["personSizes", "personNouns", "personVerbs", "personManner"],

    // Verb and Object Combinations
    ["personSubjects", "personVerbs", "thingNouns"],
    ["animalSubjects", "animalVerbs", "thingNouns"],
    ["thingNouns", "thingVerbs", "abstractNouns"],

    // Prepositional Phrases
    ["personSubjects", "personVerbs", "prepositions", "placeNouns"],
    ["animalNouns", "animalVerbs", "prepositions", "thingNouns"],

    // Conjunction and Compound Structures
    [
      "animalNouns",
      "animalVerbs",
      "conjunctions",
      "personSubjects",
      "personVerbs",
    ],

    // Including Pronouns
    [
      "personSubjects",
      "personVerbs",
      "thingManner",
      "prepositions",
      "placeNouns",
    ],

    // Questions
    ["questionWords", "personSubjects", "personVerbs", "thingNouns"],

    // Conditional Sentences
    ["personSubjects", "conjunctions", "animalNouns", "animalVerbs"],

    // More Complex Structures
    ["personSubjects", "personVerbs", "abstractNouns", "abstractVerbs"],

    // Combining Abstract Nouns with Other Elements
    [
      "abstractSubjects",
      "abstractVerbs",
      "thingManner",
      "prepositions",
      "thingNouns",
    ],
  ];

  // Method to generate sentences
  generateSentences(size) {
    if (typeof size !== "number") {
      throw new TypeError("Number of words should be a number.");
    }

    if (size < 1) {
      throw new RangeError("Number of words should be positive.");
    }

    size = parseInt(size);
    let sentences = [];
    let totalWords = 0;

    while (totalWords < size) {
      // Randomly select a sentence structure
      const structure =
        this.#sentenceStructures[
          Math.floor(Math.random() * this.#sentenceStructures.length)
        ];
      let sentence = this.#buildSentence(structure)
        .replace(/\s{2,}/g, " ")
        .trim();
      let sen = sentence.split(" ");
      const wordCount = sen.length;

      if (wordCount + totalWords > size) {
        let diff = wordCount + totalWords - size;
        sen = sen.slice(0, wordCount - diff);
        sentence = sen.join(" ");
      }
      sentences.push(sentence);
      totalWords += wordCount;
    }

    return sentences
      .join(" ")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  // method to build a sentence based on the structure
  #buildSentence(structure) {
    return structure
      .map((part) => {
        if (Array.isArray(this.#words[part])) {
          return this.#getRandomWord(this.#words[part]);
        } else if (this.#words[part]) {
          return this.#getRandomWord(this.#words[part]);
        }
        return "";
      })
      .join(" ");
  }

  // Helper method to get a random word from an array
  #getRandomWord(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

function sensiLorem(size) {
  const generator = new SentenceGenerator();
  return generator.generateSentences(size);
}

module.exports = sensiLorem;

},{}]},{},[2]);
