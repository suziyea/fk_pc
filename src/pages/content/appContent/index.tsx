import {
  Button, Card, Tabs, Modal, Form, notification,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import styles from './index.less';
import BannerItem from './components/BannerItem';
import BannerForm from './components/BannerForm';

import {
  getBannerList, delBanner, addBanner, updateBanner,
} from '@/services/api/other';

const { TabPane } = Tabs;

const AppContent: React.FC = () => {
  const [bannerForm] = Form.useForm();
  const [bannerId, setBannerId] = useState<string>('');

  const { resetFields: resetBannerFields, validateFields: validateBannerFields } = bannerForm;
  /**
   * banner配置的显隐
   *  */
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false);

  const [allBannerList, setAllBannerList] = useState<any>();

  const addOrUpdateBanner = async () => {
    const submitData = await validateBannerFields();
    if (submitData.st && submitData.et) {
      if (moment(submitData.st).format('yyyy-MM-DD HH:mm').valueOf() >= moment(submitData.et).format('yyyy-MM-DD HH:mm').valueOf()) {
        notification.error({
          message: '结束时间不能大于等于开始时间',
        });
        return;
      }
    }
    const submitForm = {
      ...submitData,
      st: submitData.st ? moment(submitData.st) : '',
      et: submitData.et ? moment(submitData.et) : '',
    };
    console.log(submitForm);

    try {
      if (bannerId) {
        await updateBanner(submitForm);
      } else {
        await addBanner(submitForm);
      }
      notification.success({
        message: bannerId ? '修改成功' : '新建成功',
      });
      getBanner();
      setIsBannerVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  const getBanner = async () => {
    const res = await getBannerList({});
    // res[0] = res[0]?.splice(0, 10) || [];
    console.log(res, '虚啊哈');

    setAllBannerList(res?.list);
  };
  const bannerToTop = async (status: number, id: string) => {
    // 置顶排序后的id list 传给后端
    const idList = allBannerList[status].map((v: any) => v.id);
    const idIndex = idList.indexOf(id);
    if (idIndex === 0) {
      notification.error({
        message: '当前banner已置顶',
      });
      return;
    }
    idList.unshift(idList.splice(idIndex, 1)[0]);
    //   try {
    //     await sortBanner({
    //       terminalType,
    //       idList,
    //     });
    //     notification.success({
    //       message: '置顶成功',
    //     });
    //     getBanner();
    //   } catch (error) {
    //     console.log(error);
    //   }
  };

  const editBanner = async (item: any) => {
    setBannerId(item.id);
    bannerForm.setFieldsValue({
      ...item,
      st: moment(item.st) || moment(item.created_at),
      et: moment(item.et) || '',
      id: item.id
    });
    setIsBannerVisible(true);
  };

  const bannerDelete = async (id: string, status: number) => {
    try {
      await delBanner({
        id,
      });
      notification.success({
        message: '删除成功',
      });
      getBanner();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer>
      {/* banner */}
      <Card className={styles.card} title={`Banner配置(${allBannerList?.length || 0}/5)`}>
        <Button
          className={styles['content-add']}
          size="small"
          type="primary"
          onClick={() => {
            resetBannerFields();
            setBannerId('');
            setIsBannerVisible(true);
          }}>
          新增
        </Button>
        <div className={styles['banner-box']}>
          {
            allBannerList?.map((v: any) => <BannerItem key={v.id} item={v} bannerToTop={bannerToTop} editBanner={editBanner} bannerDelete={bannerDelete} />)
          }
        </div>
        <Modal
          width={900}
          title={`${bannerId ? '编辑' : '新增'}banner`}
          visible={isBannerVisible}
          onOk={() => addOrUpdateBanner()}
          onCancel={() => setIsBannerVisible(false)}>
          <BannerForm form={bannerForm} />
        </Modal>
      </Card>
    </PageContainer>
  );
};

export default AppContent;
