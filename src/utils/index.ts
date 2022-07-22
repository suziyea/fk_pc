import { useRef, useCallback } from 'react';
/* eslint-disable no-return-assign */
interface enumType {
  value: string | number;
  label: string | number;
}

// 枚举映射
export const mapEnum = (val: any, enumList: Array<enumType>) => {
  let strVal = null;
  enumList.forEach((v: enumType) => {
    if (v.value === val) {
      strVal = v.label;
    }
  });
  return strVal;
};

/**
 * 千分位分割
 * @param price 数字、字符串
 * @returns 返回千分位分割的字符串
 */
 export const toThousand = (price: number | string | undefined) => {
  if (!price && price !== 0) return '';
  return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


// 防止多次点击
export function useLockFn<T extends any[], K>(fn: (...args: T) => Promise<K>): (...args: T) => Promise<K | undefined> {
  const lockRef = useRef(false);

  return useCallback(async (...args: T) => {
    if (lockRef.current) return;

    try {
      lockRef.current = true;
      const result = await fn(...args);
      return result;
    } finally {
      lockRef.current = false;
    }
  }, [fn]);
}