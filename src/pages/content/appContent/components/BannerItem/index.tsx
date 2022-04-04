import {
  EyeOutlined, VerticalAlignTopOutlined, EditOutlined, DeleteOutlined,
} from '@ant-design/icons';
import {
  Image, Modal,
} from 'antd';
import { useState } from 'react';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/index.css';
import moment from 'moment';
import styles from './index.less';

const { confirm } = Modal;

interface BannerItemType {
  item: any;
  bannerToTop: Function;
  editBanner: Function;
  bannerDelete: Function;
}

const BannerItem = ({
  item, bannerToTop, editBanner, bannerDelete,
}: BannerItemType) => {
  /**
   * @zh-CN 图片预览展示的控制
   *  */
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className={styles['banner-item']}>
      <PhotoSlider
        images={[{ src: item?.dataMap?.imageUrl }]}
        visible={visible}
        onClose={() => setVisible(false)} />
      <div className={styles['banner-main']}>
        <Image
          preview={false}
          width="100%"
          height={200}
          style={{ objectFit: 'cover' }}
          src={item?.dataMap?.imageUrl} />
        <div className={styles['banner-button']}>
          <EyeOutlined className={styles['banner-icon']} onClick={() => setVisible(true)} />
          <VerticalAlignTopOutlined
            className={styles['banner-icon']}
            onClick={() => confirm({
              content: '确认要置顶该banner配置？',
              icon: <></>,
              okText: '确认',
              cancelText: '取消',
              onOk: () => {
                bannerToTop(item.status, item.id);
              },
            })} />
          <EditOutlined className={styles['banner-icon']} onClick={() => editBanner(item)} />
          <DeleteOutlined
            className={styles['banner-icon']}
            onClick={() => confirm({
              content: '确认要删除该banner配置？',
              icon: <></>,
              okText: '确认',
              okType: 'danger',
              cancelText: '取消',
              onOk: () => {
                bannerDelete(item.id, item.status);
              },
            })} />
        </div>
      </div>
      <p className={styles['banner-title']}>{item.campaignName}</p>
      <p className={styles['banner-date']}>
        {moment(item.startTime).format('yyyy-MM-DD')}
        ~
        {moment(item.endTime).format('yyyy-MM-DD')}
      </p>
    </div>
  );
};

export default BannerItem;
