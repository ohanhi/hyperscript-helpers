# `hyperscript-helpers`

Terse syntax for hyperscript.

[`elm-html`](https://github.com/evancz/elm-html) inspired helpers for writing [hyperscript](https://github.com/dominictarr/hyperscript) or [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript).

```javascript
// instead of writing
h('div', properties, children)

// write
div(properties, children)
```

See the supported `TAG_NAMES` here: [src/index.js](src/index.js).

## How to use

The `hyperscript-helpers` are hyperscript-agnostic, which means there are no dependencies. Instead, you need to pass the implementation when you import the helpers.

Using ES6 :sparkling_heart:

```javascript
var h = require('hyperscript'); // or 'virtual-hyperscript'
const { div, span, h1 } = require('hyperscript-helpers')(h); // ← Notice the (h)
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

▸ div({ 'class': 'wrapper' }, [ h1('Heading'), span('Spanner') ]).outerHTML
◂ '<div class="wrapper"><h1>Heading</h1><span>Spanner</span></div>'
```

Brought to you by [ohanhi](https://github.com/ohanhi/).

License: MIT
