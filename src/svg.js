
import hh from './index';

// https://www.w3.org/TR/SVG/eltindex.html
const TAG_NAMES = [
  'a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'colorProfile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotlight', 'feTile', 'feTurbulence', 'filter', 'font', 'fontFace',
  'fontFaceFormat', 'fontFaceName', 'fontFaceSrc', 'fontFaceUri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missingGlyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script',
  'set', 'stop', 'style', 'switch', 'symbol', 'text', 'textPath', 'title',
  'tref', 'tspan', 'use', 'view', 'vkern'
];

export default
  h => {
    const createTag = hh(h).createTag;
    const exported = { TAG_NAMES };
    TAG_NAMES.forEach(n => {
      exported[n] = createTag(n);
    });
    return exported;
  };
