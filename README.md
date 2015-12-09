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

## Hyperscript-Helpers vs templates (including JSX) 

With HH:

* It's nice to use functional utilities like lodash, because it's just functions
* You get errors if you misspell a tag name, because they are function names
* You have a consistent syntax at all times, because markup is just functions
* Also, it's just functions

This is super helpful, especially when using `hyperscript-helpers` with [Cycle.js](http://cycle.js.org/)!

See the supported `TAG_NAMES` here: [src/index.js](src/index.js).

## API

Because **hyperscript-helpers** are library agnostic there is no exact API. 
But, just to give you a picture of syntax possibilities: 

```
tagName(selector)
tagName(attrs)
tagName(children)
tagName(attrs, children)
tagName(selector, children)
tagName(selector, attrs, children)
```

Where `selector` is string, starting with "." or "#".<br/>
Where `attrs` is an object of attributes. 
Where `children` is hyperscript node, array of hyperscript nodes, string or array of strings.

**Hyperscript-helpers** provide a very thin wrapper so a syntax of exact hyperscript library<br/>
(like [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript)) still applies.

For example, for multiple classes: 

```js
// ... with Matt-Esch/virtual-dom/.../virtual-hyperscript
button({className: "btn btn-default"}); // ← separated by space!
button(".btn.btn-default");             // ← separated by dot!
```

Other hyperscript libraries may have other syntax conventions. 

#### Caution

Whenever you use `tagName(<children>)` syntax and `<children>` may be a string,<br/>
starting with `'.'` or `'#'`, wrap an argument in `[]`.

Not recommended:
```js
filenames.map(span); // <span>README.md</span><span class="gitignore"></span>
``` 

Recommended:

```js
filenames.map(filename => span([filename])); // <span>README.md</span><span>.gitignore</span>
```` 

As most of the nodes will be hardcoded manually, we keep this convenient shortcut.

Syntax 

```js
span(error ? ".error" : null) 
```

is also illegal. If you need to apply logic rules for class generation, use libraries like [classnames](https://github.com/JedWatson/classnames) for making proper `{className: ...}` argument.

## How to use

```
npm install hyperscript-helpers
```

The `hyperscript-helpers` are hyperscript-agnostic, which means there are no dependencies. 
Instead, you need to pass the implementation when you import the helpers.

Using ES6 :sparkling_heart:

```js
var h = require('hyperscript'); // or 'virtual-hyperscript'
const { div, span, h1 } = require('hyperscript-helpers')(h); // ← Notice the (h)
```

With React

```js
var React = require('react');
const { div, span, h1 } = require('hyperscript-helpers')(React.createElement); // ← Notice the (React.createElement)
```

Using ES5

```js
var h = require('hyperscript'); // or 'virtual-hyperscript'
var hh = require('hyperscript-helpers')(h);  // ← Notice the (h)
// to use the short syntax, you need to introduce them to the current scope
var div = hh.div,
  span    = hh.span,
  h1      = hh.h1;
```


Once that's done, you can go and use the terse syntax:

```js
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

---

`hyperscript-helpers` is brought to you by [@ohanhi](https://twitter.com/ohanhi/).

License: MIT
