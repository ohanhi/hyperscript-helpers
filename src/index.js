import tagNames from 'html-tag-names';

const isValidString =
  param =>
    typeof param === 'string' && param.length > 0;

const startsWith =
  (string, start) =>
    string[0] === start;

const isSelector =
  param =>
    isValidString(param) && (startsWith(param, '.') || startsWith(param, '#'));

const node =
  h =>
    tagName =>
      (first, ...rest) => {
        if (isSelector(first)) {
          return h(tagName + first, ...rest);
        } else if (typeof first === 'undefined') {
          return h(tagName);
        } else {
          return h(tagName, first, ...rest);
        }
      };

export default
  h => {
    const createTag = node(h);
    const exported = { tagNames, isSelector, createTag };
    tagNames.forEach(n => {
      exported[n] = createTag(n);
    });
    return exported;
  };
