const node =
  h =>
    tagName =>
      (...argsArray) => h(tagName, ...argsArray);

const TAG_NAMES =
  [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
  'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
  'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl',
  'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
  'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend',
  'li', 'link', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript', 'object',
  'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'q', 'rp', 'rt', 'ruby', 's',
  'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong',
  'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th',
  'thead', 'title', 'tr', 'u', 'ul', 'video'
  ];

module.exports =
  h => {
    const exported = {};
    TAG_NAMES.forEach(n => { exported[n] = node(h)(n); });
    exported.TAG_NAMES = TAG_NAMES;
    return exported;
  };
