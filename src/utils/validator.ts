/**
 * antd form 的 validator 校验整数和小数
 */
export const validateNum = (rules: any, value: string) => {
  const reg = new RegExp('^[0-9]+([.]{1}[0-9]+){0,1}$');
  if (!reg.test(value)) {
    return Promise.reject(new Error('请输入数字'));
  }
  return Promise.resolve();
};

/**
 * 验证是否是正整数
 * @param rules
 * @param value
 * @param callback
 */
export const validatePositiveInteger = (rules: any, value: string, callback: (info?: string) => void) => {
  console.log(value);
  const reg = new RegExp('^\\d+$');
  const regZero = new RegExp('^[1-9]\\d*|0$');
  if (!reg.test(value)) {
    return Promise.reject(new Error('请输入正整数'));
  }

  if (!regZero.test(value)) {
    return Promise.reject(new Error('不能以零开头'));
  }
  return Promise.resolve();
};
/**
 * antd form 的 validateNumDecimals 校验非零开头且不多于两位小数
 */
export const validateNumDecimals = (rules: any, value: string) => {
  const reg = new RegExp('^\\d+(\\.\\d{1,2})?$');
  if (!reg.test(value)) {
    return Promise.reject(new Error('请输入不多于两位小数的数字'));
  }
  if (value === '0') {
    return Promise.reject(new Error('请输入非0数字'));
  }

  return Promise.resolve();
};
/**
 * antd form 的 validateNumDecimal 校验非零开头且不多于一位小数
 */
export const validateNumDecimal = (rules: any, value: string) => {
  const reg = new RegExp('^[0-9]+(.[0-9]{1})?$');
  // const reg = new RegExp('^([0-9]*)+(.[0-9]{1,1})?$');
  // const regZero = new RegExp('^[1-9]\\d*|0$');

  if (!reg.test(value)) {
    return Promise.reject(new Error('请输入一位小数的数字'));
  }
  // if (value === '0') {
  //   return Promise.reject(new Error('折扣价不能为0'));
  // }
  // if (!regZero.test(value)) {
  //   return Promise.reject(new Error('不能以零开头'));
  // }

  return Promise.resolve();
};

/**
 * antd form 的 validator 校验 emoji 表情符号
 */
export const validateEmoji = (rules: any, value: string) => {
  // 校验 emoji 正则
  const patternEmoji = /\uD83D[\uDC00-\uDE4F]/g;
  if (patternEmoji.test(value)) {
    return Promise.reject(new Error('不可输入表情'));
  }
  return Promise.resolve();
};

/**
 * antd form 的 validator 校验 特殊符号 speciaSymbol
 */
export const validateSpeciaSymbol = (rules: any, value: string) => {
  // 特殊符号 正则
  const patternSpecialSymbol = new RegExp('[`~!@#¥$^&*()=|{}\':;\',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？]');
  if (patternSpecialSymbol.test(value)) {
    return Promise.reject(new Error('不可输入特殊符号'));
  }
  return Promise.resolve();
};

/**
 * antd form 的 validator 校验 不能是空格开头或结尾
 */
export const validateTrim = (rules: any, value: string) => {
  // 特殊符号 正则
  const patternTrim = new RegExp('^[^\\s]+(\\s+[^\\s]+)*$');
  if (!patternTrim.test(value)) {
    return Promise.reject(new Error('不可以空格开头或结尾'));
  }
  return Promise.resolve();
};
