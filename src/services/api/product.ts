
import request from '@/services/request';
// 产品列表
export function getProdctList(data: any) {
  return request({
    url: '/api/admin/product-recommend/search',
    method: 'post',
    data,
  });
}

// 新增产品
export function addProduct(data: any) {
  return request({
    url: '/api/admin/product-recommend/create',
    method: 'post',
    data,
  });
}

// 更新产品
export function updateProduct(data: any) {
  return request({
    url: '/api/admin/product-recommend/update',
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