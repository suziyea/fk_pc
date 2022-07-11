
import request from '@/services/request';
// 渠道列表
export function getChannelList(data: any) {
  return request({
    url: '/api/admin/channel/search',
    method: 'post',
    loading: true,
    data,
  });
}

// 新增渠道
export function addChannel(data: any) {
  return request({
    url: '/api/admin/channel/save',
    method: 'post',
    loading: true,
    data,
  });
}

// 更新渠道
export function updateChannel(data: any) {
  return request({
    url: '/api/admin/channel/update',
    method: 'post',
    loading: true,
    data,
  });
}

// 全渠道数据统计
export function getChannelTotalList(data: any) {
  return request({
    url: '/api/admin/channel/data-statistics',
    method: 'post',
    loading: true,
    data,
  });
}

// 全渠道数据总统计
export function getChannelTotalAllList(data: any) {
  return request({
    url: '/api/admin/channel/data-summary-statistics',
    method: 'post',
    loading: true,
    data,
  });
}

// 删除渠道
export function delChannel(data: any) {
  return request({
    url: '/api/admin/channel/delete',
    method: 'post',
    loading: true,
    data,
  });
}