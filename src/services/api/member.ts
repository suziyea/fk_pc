import request from '@/services/request';


export function getMemberList(data: any) {
  return request({
    url: '/api/admin/user/search',
    method: 'post',
    // loading: true,
    data,
  });
}


export function updateImg(data: any) {
    return request({
      url: '/api/admin/image-collection/update',
      method: 'post',
      // loading: true,
      data,
    });
  }