import {
    Button, Card, Tabs, Modal, Form, notification,
  } from 'antd';
  import React, { useState, useEffect } from 'react';
  import { PageContainer } from '@ant-design/pro-layout';
  import moment from 'moment';
  import styles from './index.less';
  import BannerItem from './components/BannerItem';
  const { TabPane } = Tabs;

  
  const AppContent: React.FC = () => {
    const [bannerForm] = Form.useForm();
    const [bannerId, setBannerId] = useState<string>('');
  
    const { resetFields: resetBannerFields, validateFields: validateBannerFields } = bannerForm;
    /**
     * banner配置的显隐
     *  */
    const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false);
  
    const [allBannerList, setAllBannerList] = useState<Object>({});
  
    const addOrUpdateBanner = async () => {
      const submitData = await validateBannerFields();
      if (moment(submitData.effectiveTime[0]).format('yyyy-MM-DD HH:mm').valueOf() === moment(submitData.effectiveTime[1]).format('yyyy-MM-DD HH:mm').valueOf()) {
        notification.error({
          message: '结束时间不能等于开始时间',
        });
        return;
      }
      const submitForm = {
        ...submitData,
        id: bannerId,
        appEnabled: submitData.terminalType.indexOf('0') > -1, // 生效终端是否勾选app
        h5Enabled: submitData.terminalType.indexOf('1') > -1, // 生效终端是否勾选小程序
        startTime: submitData.effectiveTime[0],
        endTime: submitData.effectiveTime[1],
        targetInfo: JSON.stringify(submitData.targetInfo),
        // targetApp: submitData.targetType === '0' ? submitData.targetAddon + splitUrlFormatEncode(submitData.targetApp) : splitUrlFormatEncode(submitData.targetApp),
        type: '1',
        enabled: true,
        subType: '202',
        metaType: 'imagetext-1',
        name: '顶部广告',
        dataMap: {
          ...submitData.dataMap,
          title: '',
          subTitle: '探索更多',
        },
      };
      console.log(submitForm);
      
      try {
        // await addOrUpdateBannerList(submitForm);
        // notification.success({
        //   message: '保存成功',
        // });
        // getBanner();
        setIsBannerVisible(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getBanner();
    }, []);
  
    const getBanner = async () => {
    //   const res = await getBannerList({
    //     terminalType,
    //   });
    //   res[0] = res[0]?.splice(0, 10) || [];
      setAllBannerList([]);
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
        // targetType: item.targetApp?.startsWith('http') ? '0' : '1',
        // targetApp: decodeURIComponent(item.targetApp?.replace(httpOrHttpsReg, '')),
        // targetAddon: 'https://',
        targetInfo: item.targetInfo && JSON.parse(item.targetInfo),
        effectiveTime: [moment(item.startTime), moment(item.endTime)],
        terminalType: judgeTerminalType(item),
      });
      setIsBannerVisible(true);
    };
  
    const judgeTerminalType = (detail: any) => {
      const type = [];
      if (detail.appEnabled) type.push('0');
      if (detail.h5Enabled) type.push('1');
      return type;
    };
  
    const bannerDelete = async (id: string, status: number) => {
      try {
        // await delBanner({
        //   terminalType,
        //   id,
        //   homePageType: 1,
        // });
        // notification.success({
        //   message: '删除成功',
        // });
        getBanner();
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <PageContainer>
        {/* banner */}
        <Card className={styles.card} title={`Banner配置(${allBannerList[1]?.length || 0}/5)`}>
          <Tabs type="card" size="small">
            <TabPane tab="已上线" key="1">
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
                  allBannerList[1]?.map((v: any) => <BannerItem key={v.id} item={v} bannerToTop={bannerToTop} editBanner={editBanner} bannerDelete={bannerDelete} />)
                }
              </div>
            </TabPane>
            <TabPane tab="待上线" key="2">
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
                //   allBannerList[2]?.map((v: any) => <BannerItem key={v.id} item={v} bannerToTop={bannerToTop} editBanner={editBanner} bannerDelete={bannerDelete} />)
                }
              </div>
            </TabPane>
            <TabPane tab="已下线" key="0">
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
                //   allBannerList[0]?.map((v: any) => <BannerItem key={v.id} item={v} bannerToTop={bannerToTop} editBanner={editBanner} bannerDelete={bannerDelete} />)
                }
              </div>
            </TabPane>
          </Tabs>
          <Modal
            width={900}
            title={`${bannerId ? '编辑' : '新增'}banner`}
            visible={isBannerVisible}
            onOk={() => addOrUpdateBanner()}
            onCancel={() => setIsBannerVisible(false)}>
            {/* <BannerForm form={bannerForm} /> */}
          </Modal>
        </Card>
      </PageContainer>
    );
  };
  
  export default AppContent;
  