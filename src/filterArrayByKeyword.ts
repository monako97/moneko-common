/**
 * 根据关键词过滤数组元素
 *
 * @template T - 数组元素类型
 * @param {T} source - 要搜索的源数组，不会修改原数组
 * @param {string} [keyword] - 搜索关键词。如果未提供或为空字符串，则返回原数组的浅拷贝
 * @returns {T} 包含匹配元素的新数组，保持原数组顺序。如果没有匹配项，返回空数组
 *
 * @example
 * // 基本用法 - 字符串数组
 * const fruits = ['apple', 'banana', 'grape'];
 * const result = filterArrayByKeyword(fruits, 'ap');
 * // => ['apple', 'grape']
 *
 * @example
 * // 对象数组 - 搜索所有属性值
 * const users = [
 *   { name: 'John', email: 'john@example.com' },
 *   { name: 'Jane', email: 'jane@test.com' }
 * ];
 * const filteredUsers = filterArrayByKeyword(users, 'example');
 * // => [{ name: 'John', email: 'john@example.com' }]
 *
 * @example
 * // 空关键词情况
 * const numbers = [1, 2, 3];
 * const unchanged = filterArrayByKeyword(numbers);
 * // => [1, 2, 3]
 *
 * @example
 * // 无匹配项
 * const data = ['cat', 'dog', 'bird'];
 * const noMatch = filterArrayByKeyword(data, 'fish');
 * // => []
 *
 * @remarks
 * - 搜索区分大小写
 * - 对于对象元素，会递归搜索所有可枚举的字符串属性值
 * - 返回新数组，原数组保持不变
 */
export function filterArrayByKeyword<T extends Array<unknown>>(source: T, keyword?: string): T {
  // 如果关键字为空，返回原始数据
  if (keyword === void 0 || keyword === null || !keyword.length) {
    return source;
  }
  // 辅助函数：检查值是否包含关键字
  const containsKeyword = (value: unknown): boolean => {
    if (value === null || value === void 0) {
      return false;
    }

    // 如果是字符串，直接检查
    if (typeof value === 'string') {
      return value.includes(keyword);
    }

    // 如果是数字或布尔值，转换为字符串检查
    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value).includes(keyword);
    }

    // 如果是数组，递归检查每个元素
    if (Array.isArray(value)) {
      return value.some((item) => containsKeyword(item));
    }

    // 如果是对象，递归检查所有属性值
    if (typeof value === 'object') {
      return Object.values(value).some((val) => containsKeyword(val));
    }

    return false;
  };
  const isBasicType = (val: unknown): val is object & boolean => {
    return (
      typeof val === 'string' ||
      typeof val === 'number' ||
      typeof val === 'boolean' ||
      val === null ||
      val === void 0
    );
  };
  // 递归过滤值，对数组和对象进行深度过滤
  const filterValue = (value: unknown, parentMatched = false): unknown => {
    // 如果是字符串、数字或布尔值，直接返回
    if (isBasicType(value)) {
      return value;
    }

    // 如果是数组，过滤每个元素并递归处理
    if (Array.isArray(value)) {
      // 如果父级已匹配，保留所有元素
      if (parentMatched) {
        return value.map((item) => filterValue(item, true));
      }
      return value.map((item) => filterValue(item, false)).filter((item) => containsKeyword(item));
    }

    // 如果是对象，递归处理所有属性
    if (typeof value === 'object') {
      const filtered: Record<string, unknown> = {};
      // 检查对象的直接属性值（基本类型）是否包含关键字（只检查当前层级，不递归）
      const directPropertyMatches = Object.values(value!).some(
        (val) =>
          (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') &&
          containsKeyword(val),
      );
      // 如果父级已匹配或当前层级的直接属性值匹配，则父级匹配，子级应该完整保留
      const isParentMatched = parentMatched || directPropertyMatches;

      // 先处理所有属性，收集子级匹配情况
      const childMatches: boolean[] = [];

      for (const [key, val] of Object.entries(value!)) {
        // 基本类型属性：如果父级已匹配，直接保留；否则检查是否包含关键字
        if (isBasicType(val)) {
          if (isParentMatched || containsKeyword(val)) {
            filtered[key] = val;
          }
        } else if (isParentMatched) {
          // 父级已匹配（当前层级匹配），子级应该完整保留，传递 parentMatched=true
          filtered[key] = filterValue(val, true);
          childMatches.push(true);
        } else {
          // 父级未匹配（当前层级不匹配），递归过滤子元素
          const filteredVal = filterValue(val, false);

          // 如果过滤后的值包含关键字，则保留过滤后的值
          const childMatched = containsKeyword(filteredVal);

          if (childMatched) {
            filtered[key] = filteredVal;
            childMatches.push(true);
          } else {
            childMatches.push(false);
          }
        }
      }

      // 如果子级匹配了，需要保留父级的所有基本类型属性
      const hasChildMatch = childMatches.some((matched) => matched);

      if (hasChildMatch && !isParentMatched) {
        // 重新遍历，这次保留所有基本类型属性
        for (const [key, val] of Object.entries(value!)) {
          if (isBasicType(val)) {
            // 子级匹配时，保留所有基本类型属性
            filtered[key] = val;
          }
        }
      }

      return filtered;
    }

    return value;
  };

  // 过滤数组，保留包含关键字的对象，并对每个对象进行深度过滤
  return source.map((item) => filterValue(item)).filter((item) => containsKeyword(item)) as T;
}
