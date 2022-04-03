import { TableProps } from 'antd/es/table';
import { ButtonType } from 'antd/es/button';
import { MouseEventHandler } from 'react';
import { enumType } from '@/types';

export interface operationProps {
  key: number;
  type?: ButtonType;
  label: string;
  auth?: string;
  onClick: MouseEventHandler<HTMLElement>;
}

export interface filterProps {
  initialValues?: Object;
  filterTabProp?: string;
  filterTab?: Array<enumType>;
  operation?: Array<operationProps>;
  filterItem?: Array<any>;
  tabChange?: (val: any) => void;
}

export interface HarTableProps extends TableProps<any> {
  formRef: any;
  actionRef?: any;
  filter?: filterProps;
  rowKey: string;
  columns: Array<any>;
  dataSource: Array<any>;
  pageSize?: number;
  showTotal?: (total: number) => string;
  request?: (params: any) => Promise<{ total: number }>;
}

export interface actionRefHandle {
  reload: () => void;
  pageIndex: number;
  pageSize: number;
}
