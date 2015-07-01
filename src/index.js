const node =
  h =>
    tagName =>
      (...argsArray) => h(tagName, ...argsArray);

module.exports = h => ({
  div: node(h)('div')
});
