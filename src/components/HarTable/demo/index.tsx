import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect, useRef } from 'react';
import { Form } from 'antd';
import HarTable from '@/components/HarTable';
import { getTableData } from '@/service/api/order';

const buttonList = [
  { value: '', label: '所有订单' },
  { value: 1, label: '待支付' },
  { value: 3, label: '待发货' },
  { value: 4, label: '已发货' },
];

const Demo = () => {
  const actionRef = useRef<any>();
  const [form] = Form.useForm();
  const [data, setData] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);
  const [cascaderOptions, setCascaderOptions] = useState<any>([]);

  const columns = [
    {
      title: '商品',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '商品支付单价',
      dataIndex: 'paidPrice',
      key: 'paidPrice',
    },
    {
      title: '数量',
      dataIndex: 'initialPrice',
      key: 'initialPrice',
    },
    {
      title: '用户/下单地址',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '订单金额',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '交易状态',
      dataIndex: 'orderState',
      key: 'orderState',
    },
    {
      title: '订单操作',
      key: 'operation',
    },
  ];

  useEffect(() => {
    // getOrder();
  }, []);

  const click = () => {
    actionRef.current.reload();
  };

  return (
    <PageContainer>
      <HarTable
        actionRef={actionRef}
        formRef={form}
        filter={{
          initialValues: {
            tab: 1,
            key: {
              key: 1,
            },
          },
          filterTabProp: 'orderState',
          filterTab: buttonList,
          operation: [{
            key: 1,
            type: 'primary',
            label: '新增按钮',
            onClick: () => {
              console.log('新增点击');
            },
          }],
          filterItem: [{
            key: 1,
            prop: 'name',
            name: '名字',
            placeholder: '占位符',
          }, {
            key: 2,
            prop: 'gender',
            name: '性别',
            options,
          }, {
            key: 3,
            type: 'cascader',
            prop: 'cate',
            name: '分类',
            options: cascaderOptions,
          }, {
            key: 4,
            type: 'dateRange',
            prop: 'date',
          }, {
            key: 5,
            type: 'inputWithFilter',
            prop: 'key',
            options: [{
              value: 1,
              label: '订单号',
            }, {
              value: 2,
              label: '商品',
            }],
          }],
        }}
        rowKey="orderId"
        columns={columns}
        dataSource={data}
        request={async (params) => {
          const res = {
            list: [{
              orderNo: '251635826050490368',
              shippingPrice: 0.0000,
              orderId: '3c28d5bd4d354e6da068302fd2ab0af7',
              createTime: 1637802656000,
              details: [{
                skuName: 'Blue Striped Underwire Lace up Bikini',
                imageJson: '["https://image.r.ooooo.com/s0b0697bd9cb5000/Bikineria%203/FbgEENnPlkq-KSMRBHD8M.jpg"]',
                images: [],
                originalPrice: 0.0100,
                productSpecs: '[{"id": "63c07b9b4b424bfc9031a7534f4aeee6", "isDelete": 0, "productId": "0004e763c8cc4f27affa78e93bddf8f2", "specsKeyId": "2f6bf00593ac4b36923cdce57a7ecff3", "productSkuId": "b8f61a08567e463ba07401dc57004a44", "specsKeyName": "Top Size", "specsValueId": "6ddba938ecce4add8f12f0e2d308e5e3", "specsValueName": "M"}, {"id": "91d47f6317284feba4187e35909c8fac", "isDelete": 0, "productId": "0004e763c8cc4f27affa78e93bddf8f2", "specsKeyId": "ddea87e273ae4317a302a77bb5591b9d", "productSkuId": "b8f61a08567e463ba07401dc57004a44", "specsKeyName": "Bottom Size", "specsValueId": "052d623182a342c9bcac86edb84fe277", "specsValueName": "M"}]',
                productSpecss: [],
                discountPrice: 0.0100,
                settlementPrice: 0.0000,
                skuId: 'b8f61a08567e463ba07401dc57004a44',
                skuNum: 10000,
              }, {
                skuName: 'Blue Striped Underwire Lace up Bikini',
                imageJson: '["https://image.r.ooooo.com/s0b0697bd9cb5000/Bikineria%203/FbgEENnPlkq-KSMRBHD8M.jpg"]',
                images: [],
                originalPrice: 0.0200,
                productSpecs: '[{"id": "9c163dee78054279b2de78ccda583a44", "isDelete": 0, "productId": "0004e763c8cc4f27affa78e93bddf8f2", "specsKeyId": "2f6bf00593ac4b36923cdce57a7ecff3", "productSkuId": "2a753176c4784a8788bf477caf52c507", "specsKeyName": "Top Size", "specsValueId": "67b69c285aa4493ca15e84f78b8f3ffd", "specsValueName": "L"}, {"id": "9c40a2ab8fbe4460ac9527d2c087df7a", "isDelete": 0, "productId": "0004e763c8cc4f27affa78e93bddf8f2", "specsKeyId": "ddea87e273ae4317a302a77bb5591b9d", "productSkuId": "2a753176c4784a8788bf477caf52c507", "specsKeyName": "Bottom Size", "specsValueId": "12875a2abe93498f954b948cf788c47b", "specsValueName": "XS"}]',
                productSpecss: [],
                discountPrice: 0.0200,
                settlementPrice: 0.0000,
                skuId: '2a753176c4784a8788bf477caf52c507',
                skuNum: 10000,
              }],
              userName: '158****2655',
              userId: 'u03648e4f5785d000',
              orderState: 1,
              shippingMsg: {
                phoneNumber: '17608455001',
                address: '火星街6601',
                contactName: '张三',
              },
              paidPrice: 295.0000,
            }],
            recordsCount: 1,
          };
          setData(res.list);
          return {
            total: res.recordsCount,
          };
        }} />
    </PageContainer>
  );
};
export default Demo;
