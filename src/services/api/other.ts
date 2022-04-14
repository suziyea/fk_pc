
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
    loading: true,
    data,
  });
}

// banner 列表
export function getBannerList(data: any) {
  return request({
    url: '/api/admin/banner/list',
    method: 'post',
    loading: true,
    data,
  });
 }


// banner delete
export function delBanner(data: any) {
  return request({
    url: '/api/admin/banner/delete',
    method: 'post',
    loading: true,
    data,
  });
}


// banner save
export function addBanner(data: any) {
  return request({
    url: '/api/admin/banner/save',
    method: 'post',
    loading: true,
    data,
  });
}


// banner 编辑
export function updateBanner(data: any) {
  return request({
    url: '/api/admin/banner/update',
    method: 'post',
    loading: true,
    data,
  });
}

// 图片集合
export function getImageSet(data: any) {
  return request({
    url: '/api/admin/image-collection/search',
    method: 'post',
    loading: true,
    data,
  });
}

// 图片集合修改
export function updateImageSet(data: any) {
  return request({
    url: '/api/admin/image-collection/update',
    method: 'post',
    loading: true,
    data,
  });
}

// 反馈
export function getFeedback(data: any) {
  return request({
    url: '/api/admin/feedback/search',
    method: 'post',
    loading: true,
    data,
  });
}