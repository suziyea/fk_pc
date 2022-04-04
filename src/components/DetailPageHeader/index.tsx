import { LeftOutlined } from '@ant-design/icons';
import { history } from 'umi';

interface DetailPageHeaderType {
  /**
   *  @param 页面名字
   */
  headerName: string
}
/**
 * 详情页头部页面名及返回按钮
 *  */
const DetailPageHeader = ({ headerName }: DetailPageHeaderType) => (
  <>
    <LeftOutlined style={{ marginRight: '10px' }} onClick={() => history.goBack()} />
    <span>{headerName}</span>
  </>
);

export default DetailPageHeader;
