const assert = require('assert');
const h = require('hyperscript');
const helpers = require('../index')(h);
const div = helpers.div;
const jsc = require('jsverify');
const _ = require('lodash')

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

var tagArb = jsc.elements(helpers.TAG_NAMES);

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

// TODO: in jsverify 0.7.x there will be helpers to do recursive definitions (easily)
