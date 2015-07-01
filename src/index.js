const node =
  h =>
    tagName =>
      (...argsArray) => h(tagName, ...argsArray);

const tagNames =
  [
  'a',
  'article',
  'div',
  'footer',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'li',
  'ol',
  'section',
  'span',
  'ul',
  ];

module.exports =
  h => {
    const exported = {};
    tagNames.forEach(n => { exported[n] = node(h)(n); });
    return exported;
  };
