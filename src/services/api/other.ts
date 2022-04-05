
import request from '@/services/request';
// other-set列表
export function getOtherSetList(data: any) {
  return request({
    url: '/api/admin/other-set/search',
    method: 'post',
    data,
  });
}

// 更新other-set
export function updateOtherSet(data: any) {
  return request({
    url: '/api/admin/other-set/update',
    method: 'post',
    data,
  });
}

// banner 列表
export function getBannerList(data: any) {
    return request({
      url: '/api/admin/banner/list',
      method: 'post',
      data,
    });
 }


// banner delete
export function delBanner(data: any) {
  return request({
    url: '/api/admin/banner/delete',
    method: 'post',
    data,
  });
}


// banner save
export function addBanner(data: any) {
  return request({
    url: '/api/admin/banner/save',
    method: 'post',
    data,
  });
}


// banner 编辑
export function updateBanner(data: any) {
  return request({
    url: '/api/admin/banner/update',
    method: 'post',
    data,
  });
}