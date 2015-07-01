const node =
  h =>
    nodeName =>
      (...argsArray) => h(nodeName, ...argsArray);

module.exports = h => ({
  div: node(h)('div')
});
