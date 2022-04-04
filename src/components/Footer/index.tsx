import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} 牟财金融后台管理系统`}
      links={[]} />
  );
};
