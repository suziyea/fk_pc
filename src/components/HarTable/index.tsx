import { useState, useEffect, useImperativeHandle } from 'react';
import {
  Table, Tabs, Button, Input, Form, Select, Cascader, DatePicker, Space,
} from 'antd';

import { useAccess, Access } from 'umi';
import styles from './index.less';
import { enumType } from '@/types';
import { HarTableProps, operationProps } from './types';

const { TabPane } = Tabs;
const { Item, useForm } = Form;
const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;

/**
 * 带下拉框筛选的输入框组件
 * @param item 筛选配置
 * @param value { key,value } key为下拉框的值，value为输入框的值
 * @param onChange change方法
 * @return 返回节点
 */
const InputWithFilter = ({
  item, value = {
    key: '',
    value: '',
  }, onChange,
}: {
  item: any;
  value?: {
    key: any;
    value: any;
  };
  onChange: Function;
}) => {
  const triggerChange = (val: any) => {
    onChange?.(val);
  };
  const [key, setKey] = useState('');
  const [inputVal, setInputVal] = useState('');
  useEffect(() => {
    console.log(value);
    setKey(value.key);
    setInputVal(value.value);
  }, [value]);
  return (
    <Input.Group className={styles['input-group']}>
      <Select
        value={key}
        onChange={(val) => {
          triggerChange({
            ...value,
            key: val,
          });
        }}>
        {
          item.options?.map((v: enumType) => <Option key={v.value} value={v.value}>{v.label}</Option>)
        }
      </Select>
      <Search
        value={inputVal}
        placeholder="请输入"
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
        onSearch={(val) => {
          triggerChange({
            ...value,
            value: val,
          });
        }} />
    </Input.Group>
  );
};

/**
 * 基于antd table 二次封装带筛选，操作表格组件
 * @param style 外部盒子样式
 * @param formRef 表单ref 提供表单实例
 * @param actionRef 表格ref 提供reload方法
 * @param filter 筛选配置项，操作栏配置项
 * @param showTotal 显示总数文案
 * @param request 请求方法, 如果作为展示列表，则不传request，前端分页，自动计算总数
 * @param pageSize 分页页数，默认20条
 * @rest 其余参数同antd table 的props
 */
const HarTable = ({
  style, formRef, actionRef, filter = {}, showTotal, request, pageSize = 20, ...rest
}: HarTableProps) => {
  const access = useAccess();
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([...rest.dataSource]);
  const [allData, setAllData] = useState([...rest.dataSource]);

  const {
    initialValues, filterTabProp, filterTab, filterItem, operation, tabChange,
  } = filter;

  /**
   * 查询方法
   */
  const onSearch = async (params: any) => {
    if (!params) params = {};
    const { pageIndex = 1, size = pageSize } = params;
    if (request) {
      const submit = await formRef.validateFields();
      const res = await request({
        ...initialValues,
        ...submit,
        pageIndex: submit.pageIndex || pageIndex,
        pageSize: size,
      });
      setTotal(res.total);
      // setTotalInfo(showTotal?.(res.total || 0) || `当前筛选总计${res.total || 0}条`);
    } else {
      setTotal(allData.length);
    }
  };

  useEffect(() => {
    onSearch({ pageIndex: 1, size: pageSize });
  }, []);

  useEffect(() => {
    setData([...rest.dataSource]);
    if (!request) {
      setAllData([...rest.dataSource]);
      // setTotalInfo(showTotal?.(rest.dataSource.length || 0) || `当前筛选总计${rest.dataSource.length || 0}条`);
    }
  }, [rest.dataSource]);

  const reload = () => {
    onSearch({ pageIndex: 1, size: pageSize });
  };

  useImperativeHandle(actionRef, () => ({
    reload,
  }));

  /**
   * 判断渲染筛选组件
   * @param item 筛选项配置
   * @return 筛选项节点
   */
  const renderFilterType = (item: any) => {
    if (item.type === 'inputWithFilter') {
      return (
        <InputWithFilter item={item} onChange={onSearch} />
      );
    }
    if (item.type === 'dateRange') {
      return <RangePicker {...item} onChange={onSearch} />;
    }
    if (item.type === 'cascader') {
      return (
        <Cascader
          style={{ minWidth: '120px' }}
          placeholder="请选择三级分类"
          options={item.options}
          changeOnSelect={item.changeOnSelect} // 每选一层级，触动onChange方法
          onChange={onSearch} />
      );
    }
    if (item.options) {
      return (
        <Select
          {...item}
          style={{ minWidth: '120px' }}
          mode={item.mode}
          placeholder={item.placeholder || `请选择${item.name || ''}`}
          allowClear={item.allowClear !== false}
          onChange={onSearch}>
          {
            item.options?.map((v: enumType) => <Option disabled={!!v.disabled} key={v.value} value={v.value}>{v.label}</Option>)
          }
        </Select>
      );
    }
    return <Search placeholder={item.placeholder || `请输入${item.name || ''}`} onSearch={onSearch} />;
  };

  return (
    <div className={styles.table} style={style}>
      <Form
        form={formRef}
        initialValues={initialValues}
        autoComplete="off">
        <Item name="pageIndex" hidden />
        <div className={styles['top-filter']}>
          <div className={styles['top-left']}>
            {/* 顶部左侧tab按钮 */}
            {
              filterTab && filterTab.length > 0 && (
                <Item name={filterTabProp} noStyle>
                  <Tabs
                    className={styles['table-tab']}
                    type="card"
                    size="small"
                    onChange={(val) => {
                      tabChange?.(val);
                      onSearch(val);
                    }}>
                    {
                      filterTab?.map((v: enumType) => <TabPane key={v.value} tab={v.label} />)
                    }
                  </Tabs>
                </Item>
              )
            }
            {/* 顶部左侧操作按钮 */}
            {
              (operation && operation.length > 0) && (
                <div className={styles['button-group']}>
                  {
                    operation?.map((v: operationProps) => (
                      // v.auth ? (
                      //   <Access accessible={access.hasBtnPermission(v.auth)}>
                      //     <Button style={{ marginRight: '8px' }} key={v.key} type={v.type} onClick={v?.onClick}>{v.label}</Button>
                      //   </Access>
                      // ) : 
                      <Button style={{ marginRight: '8px' }} key={v.key} type={v.type} onClick={v?.onClick}>{v.label}</Button>
                    ))
                  }
                </div>
              )
            }
          </div>
          <div className={styles['top-right']}>
            {/* 顶部右侧筛选条件 */}
            <Space size="small">
              {
                filterItem?.map((v: any) => (
                  <Item className={styles['right-item']} key={v.key} name={v.prop} rules={v.rules}>
                    {
                      renderFilterType(v)
                    }
                  </Item>
                ))
              }
            </Space>
          </div>
        </div>
      </Form>
      {/* 底部表格 */}
      <div>
        <Table
          pagination={{
            simple: true,
            current: formRef.getFieldValue('pageIndex'),
            pageSize,
            total,
            onChange: (pageIndex, size) => {
              formRef.setFieldsValue({
                pageIndex,
              });
              onSearch({
                pageIndex,
                size,
              });
            },
          }}
          {...rest}
          dataSource={data} />
        <span className={styles.total}>
          {
            (rest.pagination !== false) && (showTotal?.(total || 0) || `当前筛选总计${total || 0}条`)
          }
        </span>
      </div>
    </div>
  );
};
export default HarTable;
