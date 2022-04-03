/* eslint-disable no-return-assign */
interface enumType {
  value: string | number;
  label: string | number;
}
/**
 * 枚举值映射
 * @param val 枚举的值
 * @param enumList 枚举列表
 * @returns 枚举的label
 */
export const mapEnum = (val: any, enumList: Array<enumType>) => {
  let str = null;
  enumList.forEach((v: enumType) => {
    if (v.value === val) {
      str = v.label;
    }
  });
  return str;
};
