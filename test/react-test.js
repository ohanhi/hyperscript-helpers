const assert = require('assert');
const React = require('react');
const helpers = require('../dist/index')(React.createElement);
const div = helpers.div;
const jsc = require('jsverify');
const _ = require('lodash');
const tagNames = require('html-tag-names');

describe('div', function(){
  jsc.property('div() ≡ React.createElement("div")', function(){
    return _.isEqual(React.createElement('div').nodeName, div().nodeName);
  });

  jsc.property('div(attrs) ≡ React.createElement("div", attrs)', "dict string", function(attrs){
    const hr = React.createElement('div', attrs);
    const divr = div(attrs);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div(children) ≡ React.createElement("div", children)', "array string", function (children) {
    const hr = React.createElement('div', children);
    const divr = div(children);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div(attrs, children) ≡ React.createElement("div", attrs, children)', "dict string", "array string", function(attrs, children) {
    const hr = React.createElement('div', attrs, children);
    const divr = div(attrs, children);
    return jsc.utils.isApproxEqual(hr, divr);
  });
});

var tagArb = jsc.elements(tagNames);

describe('arbitrary tag', function(){
  jsc.property('tag() ≡ React.createElement("tag")', tagArb, function(tag){
    return _.isEqual(React.createElement(tag).nodeName, helpers[tag]().nodeName);
  });

  jsc.property('div(attrs) ≡ React.createElement("div", attrs)', tagArb, "dict string", function(tag, attrs){
    const hr = React.createElement(tag, attrs);
    const divr = helpers[tag](attrs);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div(children) ≡ React.createElement("div", children)', tagArb, "array string", function (tag, children) {
    const hr = React.createElement(tag, children);
    const divr = helpers[tag](children);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div(attrs, children) ≡ React.createElement("div", attrs, children)', tagArb, "dict string", "array string", function(tag, attrs, children) {
    const hr = React.createElement(tag, attrs, children);
    const divr = helpers[tag](attrs, children);
    return jsc.utils.isApproxEqual(hr, divr);
  });
});

describe('isSelector', function() {
  jsc.property('isSelector(".<any>") ≡ true', "string", function(string) {
    return helpers.isSelector('.' + string);
  });

  jsc.property('isSelector("#<any>") ≡ true', "string", function(string) {
    return helpers.isSelector('#' + string);
  });

  jsc.property('isSelector("^[.#]<any>") ≡ false', "nestring", function(string) {
    const startingWith =
      string.indexOf('.') === 0
      || string.indexOf('#') === 0;
    return startingWith || !helpers.isSelector(string);
  });
});

var selChars = jsc.elements(['.', '#']);

describe('arbitrary selector', function() {
  jsc.property('div(".class") ≡ React.createElement("div.class")', "nestring", function(className) {
    const selector = '.' + className;
    const hr = React.createElement('div' + selector);
    const divr = div(selector);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div("#id") ≡ React.createElement("div#id")', "nestring", function(id) {
    const selector = '#' + id;
    const hr = React.createElement('div' + selector);
    const divr = div(selector);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div("[.#]foo", children) ≡ React.createElement("div[.#]id", children)', selChars, "nestring", "array string", function(selChar, id, children) {
    const selector = selChar + id;
    const hr = React.createElement('div' + selector, children);
    const divr = div(selector, children);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div("[.#]foo", attrs, children) ≡ React.createElement("div[.#]id", attrs, children)', selChars, "nestring", "dict string", "array string", function(selChar, id, attrs, children) {
    const selector = selChar + id;
    const hr = React.createElement('div' + selector, attrs, children);
    const divr = div(selector, attrs, children);
    return jsc.utils.isApproxEqual(hr, divr);
  });
});

// TODO: in jsverify 0.7.x there will be helpers to do recursive definitions (easily)
