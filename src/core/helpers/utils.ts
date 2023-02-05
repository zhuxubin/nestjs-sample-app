import deepmerge from 'deepmerge';

/**
 * 用于请求验证中的number数据转义
 *
 * @export
 * @param {(string | number)} [value]
 * @returns {*}  {(number | undefined)}
 */
export function tNumber(value?: string | number): string | number | undefined {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
        try {
            return Number(value);
        } catch (error) {
            return value;
        }
    }

    return value;
}

/**
 * 用于请求验证中的boolean数据转义
 *
 * @export
 * @param {(string | boolean)} [value]
 * @return {*}
 */
export function tBoolean(value?: string | boolean): string | boolean | undefined {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
        try {
            return JSON.parse(value.toLowerCase());
        } catch (error) {
            return value;
        }
    }
    return value;
}

/**
 * @description 用于请求验证中转义null
 * @export
 * @param {(string | null)} [value]
 * @returns {*}  {(string | null | undefined)}
 */
export function tNull(value?: string | null): string | null | undefined {
    return value === 'null' ? null : value;
}

/**
 * 深度合并对象
 * @param x 初始值
 * @param y 新值
 * @param arrayMode 对于数组采取的策略,`replace`为直接替换,`merge`为合并数组
 */
export const deepMerge = <T1, T2>(
    x: Partial<T1>,
    y: Partial<T2>,
    arrayMode: 'replace' | 'merge' = 'merge',
) => {
    const options: deepmerge.Options = {};
    if (arrayMode === 'replace') {
        options.arrayMerge = (_d, s, _o) => s;
    } else if (arrayMode === 'merge') {
        options.arrayMerge = (_d, s, _o) => Array.from(new Set([..._d, ...s]));
    }
    return deepmerge(x, y, options) as T2 extends T1 ? T1 : T1 & T2;
};
