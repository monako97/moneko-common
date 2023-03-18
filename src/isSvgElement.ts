import getDataType from './getDataType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isSvgElement(target: any): target is SVGAElement {
  const tagType = getDataType(target);

  return '[object SVGSVGElement]' === tagType || '[object SVGPathElement]' === tagType;
}

export default isSvgElement;
