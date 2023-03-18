import getDataType from './getDataType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isString(target: any): target is string {
  return 'string' === typeof target && getDataType(target) == '[object String]';
}

export default isString;
