import request from '@/services/request';


export function signIn(data: any) {
  return request({
    url: '/api/security/admin/login',
    method: 'post',
    loading: true,
    data,
  });
}

// 图片上传
export function imgUpload(data: any) {
  return request<any>({
    url: `/api/media/image/upload`,
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data,
  });
}

export function updateImg(data: any) {
  return request<any>({
    url: `/api/admin/image-collection/update`,
    method: 'post',
    data,
  });
}