'use strict';

var node = function node(h) {
  return function (tagName) {
    return function () {
      for (var _len = arguments.length, argsArray = Array(_len), _key = 0; _key < _len; _key++) {
        argsArray[_key] = arguments[_key];
      }

      return h.apply(undefined, [tagName].concat(argsArray));
    };
  };
};

module.exports = function (h) {
  return {
    div: node(h)('div')
  };
};
