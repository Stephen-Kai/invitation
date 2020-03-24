import request from '@/utils/request'

export function validEmailInfo(params) {
    return request({
      url: `/valid-api/fake-auth`,
      method: 'post',
      data: params
    })
  }