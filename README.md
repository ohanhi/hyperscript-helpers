# `hyperscript-helpers`

Terse syntax for hyperscript.

![](https://travis-ci.org/ohanhi/hyperscript-helpers.svg)

[`elm-html`](https://github.com/evancz/elm-html) inspired helpers for writing [hyperscript](https://github.com/dominictarr/hyperscript) or [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript).

`hyperscript-helpers` work with `React.createElement`, but bear in mind there is also a feature-rich hyperscript library for React: [react-hyperscript](https://github.com/mlmorg/react-hyperscript).

```javascript
// instead of writing
h('div', properties, children)

// write
div(properties, children)
```

Okay. Suppose we have a list of menu items of:

`{ title: String, id: Number }`

and a function that returns attributes given an id:

```javascript
function attrs(id) {
  return { draggable: "true", "data-id": id };
}
```


How would we render these in plain hyperscript, JSX or with the helpers?

```javascript
// plain hyperscript
h('ul#bestest-menu', items.map( item =>
  h('li#item-'+item.id, attrs(item.id), item.title))
);

// JSX
<ul id="bestest-menu">
  {items.map( item =>
    <li id={"item-"+item.id} {...attrs(item.id)}>{item.title}</li>
  )}
</ul>

// hyperscript-helpers
ul('#bestest-menu', items.map( item =>
  li('#item-'+item.id, attrs(item.id), item.title))
);
```

With `hyperscript-helpers`

* It's nice to use functional utilities like lodash, because it's just functions.
* You get errors if you misspell a tag name, because they are function names.
* You have a consistent syntax at all times, because markup is just functions.
* Also, it's just functions.


This is super helpful, especially when using `hyperscript-helpers` with [Cycle.js](http://cycle.js.org/)!

See the supported `TAG_NAMES` here: [src/index.js](src/index.js).


## How to use

```
npm install hyperscript-helpers
```

The `hyperscript-helpers` are hyperscript-agnostic, which means there are no dependencies. Instead, you need to pass the implementation when you import the helpers.

Using ES6 :sparkling_heart:

```javascript
var h = require('hyperscript'); // or 'virtual-hyperscript'
const { div, span, h1 } = require('hyperscript-helpers')(h); // ← Notice the (h)
```

With React

```javascript
var React = require('react');
const { div, span, h1 } = require('hyperscript-helpers')(React.createElement); // ← Notice the (React.createElement)
```

Using ES5

```javascript
var h = require('hyperscript'); // or 'virtual-hyperscript'
var hh = require('hyperscript-helpers')(h);  // ← Notice the (h)
// to use the short syntax, you need to introduce them to the current scope
var div = hh.div,
  span    = hh.span,
  h1      = hh.h1;
```


Once that's done, you can go and use the terse syntax:

```javascript
▸ span('😍').outerHTML
◂ '<span>😍</span>'

▸ h1({ 'data-id': 'headline-6.1.2' }, 'Structural Weaknesses').outerHTML
◂ '<h1 data-id="headline-6.1.2">Structural Weaknesses</h1>'

▸ div('#with-proper-id.wrapper', [ h1('Heading'), span('Spanner') ]).outerHTML
◂ '<div class="wrapper" id="with-proper-id"><h1>Heading</h1><span>Spanner</span></div>'
```

## Contributing

To get set up, simply clone the repository, navigate to the directory on your terminal
and do the following:

```bash
# install dependencies
npm install

# build the project
npm start

# run tests
npm test
```

The source code can be found under the `src` directory, and the built file is under `dist`.

Tests are written with Mocha, using the awesome [JSVerify](http://jsverify.github.io/) library.



`hyperscript-helpers` is brought to you by [@ohanhi](https://twitter.com/ohanhi/).

License: MIT
