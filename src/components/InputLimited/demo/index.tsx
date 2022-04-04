import { useState } from 'react';
import InputLimited from '@/components/InputLimited';

const Demo = () => {
  const [value, setValue] = useState('');
  return <InputLimited placeholder="活动名称" limited={20} value={value} onChange={(val: string) => setValue(val)} />;
};

export default Demo;
