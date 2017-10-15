
import hh from './index';

// https://www.w3.org/TR/SVG/eltindex.html
// The tag names are verified against svg-tag-names in the tests
// See https://github.com/ohanhi/hyperscript-helpers/issues/34 for the reason
// why the tags aren't simply required from svg-tag-names
const TAG_NAMES = [
  'a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'animation', 'audio', 'canvas',
  'circle', 'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'discard',
  'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG',
  'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'handler', 'hatch', 'hatchpath',
  'hkern', 'iframe', 'image', 'line', 'linearGradient', 'listener', 'marker',
  'mask', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'metadata',
  'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline',
  'prefetch', 'radialGradient', 'rect', 'script', 'set', 'solidColor',
  'solidcolor', 'stop', 'style', 'svg', 'switch', 'symbol', 'tbreak', 'text',
  'textArea', 'textPath', 'title', 'tref', 'tspan', 'unknown', 'use', 'video',
  'view', 'vkern'
];

export default h => {
  const createTag = hh(h).createTag;
  const exported = { TAG_NAMES, createTag };
  TAG_NAMES.forEach(n => {
    exported[n] = createTag(n);
  });
  return exported;
};
