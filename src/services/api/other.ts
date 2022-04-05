
import request from '@/services/request';
// other-set列表
export function getOtherSetList(data: any) {
  return request({
    url: '/api/admin/other-set/search',
    method: 'post',
    data,
  });
}

// 新增other-set
export function addProduct(data: any) {
  return request({
    url: '/api/admin/product-recommend/create',
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

// 更新产品
export function delProduct(data: any) {
    return request({
        url: '/api/admin/product-recommend/delete',
        method: 'post',
        data,
    });
 }