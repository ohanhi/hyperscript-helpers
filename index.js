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

var tagNames = ['a', 'article', 'div', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'li', 'ol', 'section', 'span', 'ul'];

module.exports = function (h) {
  var exported = {};
  tagNames.forEach(function (n) {
    exported[n] = node(h)(n);
  });
  return exported;
};
