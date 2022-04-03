# HarTable 
## 带表格筛选，操作的表格组件 v0.1

<code src="./demo/index.tsx"></code>

### API

| Properties | Description | Type | Default |
| --- | --- | --- | --- |
| reload | 表格刷新方法，需要通过ref实例调用 | `Function` | - |
| formRef | 筛选表单form实例 | `FormInstance` | - |
| request | 调用接口的方法，方法中需要setData控制数据，如果作为展示列表，则不传request，前端分页，自动计算总数 | `(params?: {pageSize, pageIndex,...filterValue}) => {total}` | - |
| filter | 表格左上tab，左下操作，以及右上筛选按钮组合 | `object` | - |
| showTotal | 总数显示文案 | `(total: number) => string` | - |
| rowKey | 同antd | `string` | - |
| columns | 同antd | `ColumnsType` | - |
| dataSource | 同antd | `ColumnsType` | - |
| pageSize | 分页每页条数 | `number` | - |
... 其余可传参数同antd table

### filter

左上tab以及右上筛选为整个form表单

| Properties | Description | Type | Default |
| --- | --- | --- | --- |
| initialValues | 表单初始值 | `object` | - |
| filterTabProp | 左上tab调用接口的字段名 | `string` | - |
| filterTab | tab选项 | `Array<{ value: string \| number, label: string }>]` | - |
| operation | 操作按钮 | `Array<{key: number, label: string, auth: string, onClick: MouseEventHandler<HTMLElement>}>` | - |
| filterItem | 右侧筛选项配置 | `Array<{filterItemProps}>` | - |
| tabChange | tab切换事件 | `(val: any)=> void` | - |

### filterItem

右上筛选项配置

| Properties | Description | Type | Default |
| --- | --- | --- | --- |
| key | 配置项key | `number` | - |
| type | 筛选项类型, 无type则为input | `cascader \| dateRange | inputWithFilter` | - |
| prop | 表单绑定字段名 | `string` | - |
| name | 表单label名 | `string` | - |
| placeholder | 占位符 | `Array<{key: number, label: string, onClick: MouseEventHandler<HTMLElement>}>` |  `请输入${name} \| 请选择${name}` |
| options | 有options则为下拉框 | `Array<{value: string \| number, label: string}>` | [] |
| allowClear | 默认为true | `boolean` | true |
... 其余props同对应表单项props