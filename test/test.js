const assert = require('assert');
const h = require('hyperscript');
const helpers = require('../dist/index')(h);
const div = helpers.div;
const jsc = require('jsverify');
const _ = require('lodash');
const tagNames = require('html-tag-names');

describe('div', function(){
  jsc.property('div() ≡ h("div")', function(){
    return _.isEqual(h('div').nodeName, div().nodeName);
  });

  jsc.property('div(attrs) ≡ h("div", attrs)', "dict string", function(attrs){
    const hr = h('div', attrs);
    const divr = div(attrs);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div(children) ≡ h("div", children)', "array string", function (children) {
    const hr = h('div', children);
    const divr = div(children);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div(attrs, children) ≡ h("div", attrs, children)', "dict string", "array string", function(attrs, children) {
    const hr = h('div', attrs, children);
    const divr = div(attrs, children);
    return jsc.utils.isApproxEqual(hr, divr);
  });
});

var tagArb = jsc.elements(tagNames);

describe('arbitrary tag', function(){
  jsc.property('tag() ≡ h("tag")', tagArb, function(tag){
    return _.isEqual(h(tag).nodeName, helpers[tag]().nodeName);
  });

  jsc.property('div(attrs) ≡ h("div", attrs)', tagArb, "dict string", function(tag, attrs){
    const hr = h(tag, attrs);
    const divr = helpers[tag](attrs);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div(children) ≡ h("div", children)', tagArb, "array string", function (tag, children) {
    const hr = h(tag, children);
    const divr = helpers[tag](children);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div(attrs, children) ≡ h("div", attrs, children)', tagArb, "dict string", "array string", function(tag, attrs, children) {
    const hr = h(tag, attrs, children);
    const divr = helpers[tag](attrs, children);
    return jsc.utils.isApproxEqual(hr, divr);
  });
});

var strRandom = function(size) {
  return _.times(size, () => 'abcdefghijklmnopqrstuvwxyz'[_.random(25)]).join('');
};

var tagCustom = jsc.number(1, 20).smap(function(size) {
  return strRandom(size) + '-' + strRandom(size);
});

describe('custom tag', function(){
  jsc.property('tag() ≡ h("tag")', tagCustom, function(tagName){
    return _.isEqual(h(tagName).nodeName, helpers.createTag(tagName)().nodeName);
  });

  jsc.property('div(attrs) ≡ h("div", attrs)', tagCustom, "dict string", function(tagName, attrs){
    const hr = h(tagName, attrs);
    const divr = helpers.createTag(tagName)(attrs);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div(children) ≡ h("div", children)', tagCustom, "array string", function (tagName, children){
    const hr = h(tagName, children);
    const divr = helpers.createTag(tagName)(children);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div(attrs, children) ≡ h("div", attrs, children)', tagCustom, "dict string", "array string", function(tagName, attrs, children) {
    const hr = h(tagName, attrs, children);
    const divr = helpers.createTag(tagName)(attrs, children);
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
  jsc.property('div(".class") ≡ h("div.class")', "nestring", function(className) {
    const selector = '.' + className;
    const hr = h('div' + selector);
    const divr = div(selector);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div("#id") ≡ h("div#id")', "nestring", function(id) {
    const selector = '#' + id;
    const hr = h('div' + selector);
    const divr = div(selector);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div("[.#]foo", children) ≡ h("div[.#]id", children)', selChars, "nestring", "array string", function(selChar, id, children) {
    const selector = selChar + id;
    const hr = h('div' + selector, children);
    const divr = div(selector, children);
    return jsc.utils.isApproxEqual(hr, divr);
  });

  jsc.property('div("[.#]foo", attrs, children) ≡ h("div[.#]id", attrs, children)', selChars, "nestring", "dict string", "array string", function(selChar, id, attrs, children) {
    const selector = selChar + id;
    const hr = h('div' + selector, attrs, children);
    const divr = div(selector, attrs, children);
    return jsc.utils.isApproxEqual(hr, divr);
  });
});

// TODO: in jsverify 0.7.x there will be helpers to do recursive definitions (easily)
