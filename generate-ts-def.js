import fs from 'fs';
import hh from './src/index';

const { TAG_NAMES } = hh();

const start =
`declare interface HyperScriptHelperFn {
  (selector?: any, properties?: any, children?: any): any;
}

declare type HyperScriptHelpers = {`;

const middle = TAG_NAMES.reduce((accum, tag) => {
  return accum + `
  ${tag}: HyperScriptHelperFn;`;
}, ``);

const end = `
}

export default function hh(h: Function): HyperScriptHelpers;
`;

fs.writeFile('./dist/index.d.ts', start + middle + end, (err) => {
  if (err) {
    throw err;
  }
});
