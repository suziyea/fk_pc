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