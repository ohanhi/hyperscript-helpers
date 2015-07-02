const assert = require('assert');
const h = require('hyperscript');
const helpers = require('../index')(h);
const div = helpers.div;
const jsc = require('jsverify');
const _ = require('lodash')

var isArray = Array.isArray;
function isObject(o) {
  /* eslint-disable no-new-object */
  return new Object(o) === o;
  /* eslint-enable no-new-object */
}

/**
  Tests whether two objects are deeply equal.
  Returns false only if they are distinguisable un-equal
  Takes optional 'opts' parameter with properties:
  - 'fnEqual' - whether all functions are considered equal (default: yes)
  - 'depth' - how deep to recurse until treating as equal (default: 5)
*/
function approxDeepEqual(x, y, opts) {
  opts = opts || {};
  var fnEqual = opts.fnEqual === false ? false : true;
  var depth = opts.depth || 5; // totally arbitrary

  // state contains pairs we checked (or are still checking, but assume equal!)
  var state = [];

  function loop(a, b, n) {
    // trivial check
    if (a === b) {
      return true;
    }

    // depth check
    if (n >= depth) {
      return true;
    }

    var i;

    // check if pair already occured
    for (i = 0; i < state.length; i++) {
      if (state[i][0] === x && state[i] === b) {
        return true;
      }
    }

    // add to state
    state.push([a, b]);

    if (typeof a === "function" && typeof b === "function") {
      return fnEqual;
    }

    if (isArray(a) && isArray(b) && a.length === b.length) {
      for (i = 0; i < a.length; i++) {
        if (!loop(a[i], b[i], n + 1)) {
          return false;
        }
      }
      return true;
    } else if (isObject(a) && isObject(b) && !isArray(a) && !isArray(b)) {
      var akeys = Object.keys(a);
      var bkeys = Object.keys(b);
      if (!loop(akeys, bkeys, n + 1)) {
        return false;
      }

      for (i = 0; i < akeys.length; i++) {
        if (!loop(a[akeys[i]], b[akeys[i]], n + 1)) {
          return false;
        }
      }
      return true;
    }

    return false;
  }
  return loop(x, y, 0);
}

describe('approxDeepEqual', function() {
  jsc.property("works for non circular objects", "json", "json", function (a,b){
    // True value is highly unlickly though
    return _.isEqual(a,b) === approxDeepEqual(a,b);
  })
});

describe('div', function(){
  jsc.property('div() ≡ h("div")', function(){
    return _.isEqual(h('div').nodeName, div().nodeName);
  });

  jsc.property('div(attrs) ≡ h("div", attrs)', "dict string", function(attrs){
    const hr = h('div', attrs);
    const divr = div(attrs);
    return approxDeepEqual(hr, divr);
  });

  jsc.property('div(children) ≡ h("div", children)', "array string", function (children) {
    const hr = h('div', children);
    const divr = div(children);
    return approxDeepEqual(hr, divr);
  });

  jsc.property('div(attrs, children) ≡ h("div", attrs, children)', "dict string", "array string", function(attrs, children) {
    const hr = h('div', attrs, children);
    const divr = div(attrs, children);
    return approxDeepEqual(hr, divr);
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
    return approxDeepEqual(hr, divr);
  });

  jsc.property('div(children) ≡ h("div", children)', tagArb, "array string", function (tag, children) {
    const hr = h(tag, children);
    const divr = helpers[tag](children);
    return approxDeepEqual(hr, divr);
  });

  jsc.property('div(attrs, children) ≡ h("div", attrs, children)', tagArb, "dict string", "array string", function(tag, attrs, children) {
    const hr = h(tag, attrs, children);
    const divr = helpers[tag](attrs, children);
    return approxDeepEqual(hr, divr);
  });
});

// TODO: in jsverify 0.7.x there will be helpers to do recursive definitions (easily)
