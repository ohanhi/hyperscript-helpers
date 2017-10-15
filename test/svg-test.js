const assert = require('assert');
const h = require('hyperscript');
const helpers = require('../dist/index')(h);
const svgHelpers = require('../dist/svg')(h);
const svg = helpers.svg;
const rect = svgHelpers.rect;
const jsc = require('jsverify');
const _ = require('lodash');
const tagNames = require('svg-tag-names');

describe('svg', function(){
  jsc.property('svg() ≡ h("svg")', function(){
    return _.isEqual(h('svg').nodeName, svg().nodeName);
  });

  jsc.property('rect() ≡ h("rect")', function(){
    return _.isEqual(h('rect').nodeName, rect().nodeName);
  });
});

var tagArb = jsc.elements(tagNames);

describe('arbitrary svg tag', function(){
  jsc.property('tag() ≡ h("tag")', tagArb, function(tag){
    return _.isEqual(h(tag).nodeName, svgHelpers[tag]().nodeName);
  });
});
