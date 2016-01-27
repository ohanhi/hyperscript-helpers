import fs from 'fs';
import { TAG_NAMES } from './src/index';

const start =
`declare interface HyperScriptHelperFn {
  (selector?: any, properties?: any, children?: any): any;
}

declare type HyperScriptHelpers = {`;

/* eslint-disable */
const middle = TAG_NAMES.reduce((accum, tag) => {
  return accum + `
  ${tag}: HyperScriptHelperFn;`;
}, ``);
/* eslint-enable */

const end = `
}

export default function hh(h: Function): HyperScriptHelpers;
`;

fs.writeFile('./dist/index.d.ts', start + middle + end, (err) => {
  if (err) {
    throw err;
  }
});
