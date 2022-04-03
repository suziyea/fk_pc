export interface MyResponseType<T = any> {
  code: number;
  msg: string;
  data: T;
}

export interface enumType {
  disabled?: boolean;
  value: string | number;
  label: string;
  children?: enumType[];
}
