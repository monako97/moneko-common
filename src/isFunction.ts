import functionType from './functionType';
import getDataType from './getDataType';
import isObject from './isObject';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
export type Func = (...args: any) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFunction(target: any): target is Func {
  if (!isObject(target)) return false;
  const tagType = getDataType(target);

  return functionType.includes(tagType);
}

export default isFunction;
