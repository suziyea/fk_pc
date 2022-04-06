
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