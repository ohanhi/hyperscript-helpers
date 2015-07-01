const assert = require('assert');
const h = require('hyperscript');
const helpers = require('../index')(h);
const div = helpers.div;

describe('div', function(){

  it('should return equal to h() without args', function(){
    assert.equal(h('div').nodeName, div().nodeName);
  });

  const attrs = { 'class': 'foobar', 'foo': 'bar' };
  it('should return equal to h() with attrs', function(){
    const hr = h('div', attrs);
    const divr = div(attrs);
    const hTest = [hr.nodeName, hr.foo, hr.class];
    const divTest = [divr.nodeName, divr.foo, divr.class];
    assert.deepEqual(hTest, divTest);
  });

  const children = 'foobar';
  it('should return equal to h() with attrs and children', function() {
    const hr = h('div', attrs, children);
    const divr = div(attrs, children);
    const hTest = [ hr.nodeName, hr.foo, hr.class,
                    hr.childNodes.length, hr.childNodes[0].value ];
    const divTest = [ divr.nodeName, divr.foo, divr.class,
                      divr.childNodes.length, divr.childNodes[0].value];
    assert.deepEqual(hTest, divTest);
  });
});
