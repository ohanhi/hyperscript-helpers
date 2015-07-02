# hyperscript-helpers

[`elm-html`](https://github.com/evancz/elm-html) inspired helpers for writing [hyperscript](https://github.com/dominictarr/hyperscript) or [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript).

```javascript
// instead of writing
h('div', properties, children)

// write
div(properties, children)
```

**Work in progress!** See the supported `tagNames` list here: [src/index.js](src/index.js).

## How to use

The helpers are hyperscript-agnostic, which means there is no dependencies. Instead, you need to pass the implementation when you import the helpers.

```javascript
const h = require('hyperscript'); // or 'virtual-hyperscript'
const hh = require('hyperscript-helpers')(h);

// with ES6 destructuring
const { div, span, h1 } = require('hyperscript-helpers')(h);
```

Brought to you by [ohanhi](https://github.com/ohanhi/).

License: MIT
