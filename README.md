# hyperscript-helpers

![](https://travis-ci.org/ohanhi/hyperscript-helpers.svg)

Terse syntax for hyperscript.

> Less than 50 lines of code, taking your hyperscripting to the next level.

## What is it

**hyperscript-helpers** [elm-html](https://github.com/evancz/elm-html) inspired helpers for writing
[hyperscript](https://github.com/dominictarr/hyperscript) or [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript).

They work with `React.createElement`, but there is also a feature-rich hyperscript library for React:
[react-hyperscript](https://github.com/mlmorg/react-hyperscript).

```javascript
// instead of writing
h('div')

// write
div()

// instead of writing
h('section#main', mainContents)

// write
section('#main', mainContents)
```

## hyperscript-helpers vs templates (including JSX)

With **hyperscript-helpers**:

* It's nice to use functional utilities like lodash, because it's just functions
* You get errors if you misspell a tag name, because they are function names
* You have a consistent syntax at all times, because markup is just functions
* Also, it's just functions

This is super helpful, especially when using **hyperscript-helpers** with [Cycle.js](http://cycle.js.org/)!

See the supported `TAG_NAMES` here: [src/index.js](src/index.js).

#### Example

Suppose we have a list of menu items of:

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

## How to use

```
npm install hyperscript-helpers
```

The **hyperscript-helpers** are hyperscript-agnostic, which means there are no dependencies.
Instead, you need to pass the implementation when you import the helpers.

Using ES6 :sparkling_heart:

```js
const h = require('hyperscript'); // or 'virtual-hyperscript'
const { div, span, h1 } =
  require('hyperscript-helpers')(h); // ← Notice the (h)
```

With React

```js
// ✅ Preferred
const h = require('react-hyperscript');
const React = require('react');
const { div, span, h1 } =
  require('hyperscript-helpers')(h); // ← Notice the (h)


// Also works, but beware of the createElement API
const React = require('react');
const { div, span, h1 } =
  require('hyperscript-helpers')(React.createElement); // ← Notice the (React.createElement)
```

Using ES5

```js
var h = require('hyperscript'); // or 'virtual-hyperscript'
var hh = require('hyperscript-helpers')(h);  // ← Notice the (h)
// to use the short syntax, you need to introduce them to the current scope
var div  = hh.div,
    span = hh.span,
    h1   = hh.h1;
```

Once that's done, you can go and use the terse syntax:

```js
$ node
▸ const { div, span, h1 } = require('hyperscript-helpers')(require('hyperscript'));
◂ undefined

▸ span('😍').outerHTML
◂ '<span>😍</span>'

▸ h1({ 'data-id': 'headline-6.1.2' }, 'Structural Weaknesses').outerHTML
◂ '<h1 data-id="headline-6.1.2">Structural Weaknesses</h1>'

▸ div('#with-proper-id.wrapper', [ h1('Heading'), span('Spanner') ]).outerHTML
◂ '<div class="wrapper" id="with-proper-id"><h1>Heading</h1><span>Spanner</span></div>'
```

## API

Because **hyperscript-helpers** are hyperscript-agnostic there is no "exact" API.
But, just to give you a direction of what should be possible:

```js
tagName(selector)
tagName(attrs)
tagName(children)
tagName(attrs, children)
tagName(selector, children)
tagName(selector, attrs, children)
```

Where
* `selector` is string, starting with "." or "#".
* `attrs` is an object of attributes.
* `children` is a hyperscript node, an array of hyperscript nodes, a string or an array of strings.

**hyperscript-helpers** is a collection of wrapper functions, so the syntax of your exact hyperscript library
(like [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript)) still applies.

For example, for multiple classes:

```js
// ... with Matt-Esch/virtual-dom/.../virtual-hyperscript
button({className: "btn btn-default"}); // ← separated by space!
button(".btn.btn-default");             // ← separated by dot!
```

Other hyperscript libraries may have other syntax conventions.


## Potential issues

### Selector shortcut

The selector shortcut (`div('.my-class')`) may cause unexpected results in some cases. Our suggestion is:

**Whenever you use `tagName(<children>)` syntax and `<children>` may be a string,
starting with `.` (period) or `#` (number sign), wrap the argument in `[]`.**

```js
// ✅ GOOD
filenames.map(filename => span([filename])); // <span>README.md</span><span>.gitignore</span>

// ❌ BAD
filenames.map(span); // <span>README.md</span><span class="gitignore"></span>
```

As most hyperscript is written by hand, we decided keep this convenient shortcut despite the [issue](https://github.com/ohanhi/hyperscript-helpers/issues/6#issuecomment-162989208).


### Logic in class names

If you need to apply logic rules for class generation,
we recommend using libraries like [classnames](https://github.com/JedWatson/classnames)
for making proper `{className: ...}` argument.

Not recommended:
```js
span(error ? ".error" : null);         // ← may be a trap, because:
span(error ? ".error" : null, {}, []); // ← this one is wrong
```

## Tools

[html-to-hyperscript.paqmind.com](http://html-to-hyperscript.paqmind.com) – webservice to convert HTML to hyperscript

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

# commit your changes with commitizen
npm run commit
# or "git cz", if you have commitizen in your PATH
```

The source code can be found under the `src` directory, and the built file is under `dist`.

Tests are written with Mocha, using the awesome [JSVerify](http://jsverify.github.io/) library.

---

**hyperscript-helpers** is brought to you by [@ohanhi](https://twitter.com/ohanhi/).

License: MIT
