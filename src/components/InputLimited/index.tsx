import { Input } from 'antd';
import styles from './index.less';

interface InputLimitedProps {
  /**
   * @description 限制字数
   */
  limited: number;
  /**
   * @description 占位符
   */
  placeholder?: string;
  /**
   * @description 样式
   */
  style?: Object;
  /**
   * @description 输入值
   */
  value?: string;
  /**
   * @description change事件
   */
  onChange?: (val: string) => void;
}

/**
 * 限制字数的input框
 */
const InputLimited = ({
  limited, placeholder = '请输入', style, value, onChange,
}: InputLimitedProps) => (
  <Input
    value={value}
    style={style}
    placeholder={placeholder}
    maxLength={limited}
    suffix={(
      <span className={styles.suffix}>
        {value?.length || 0}
        /
        {limited}
      </span>
    )}
    onChange={(e) => onChange?.(e.target.value)} />
);
export default InputLimited;
