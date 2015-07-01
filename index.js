'use strict';

var node = function node(h) {
  return function (nodeName) {
    return function () {
      for (var _len = arguments.length, argsArray = Array(_len), _key = 0; _key < _len; _key++) {
        argsArray[_key] = arguments[_key];
      }

      return h.apply(undefined, [nodeName].concat(argsArray));
    };
  };
};

module.exports = function (h) {
  return {
    div: node(h)('div')
  };
};
