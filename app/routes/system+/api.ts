import request from '~/lib/ofetch'

export interface IResponse {
  code: string | number
  msg: string
  [propsName: string]: any
}

export function getMenus(params: any): Promise<IResponse> {
  return request('/system/menu/list', { query: params})
}
// 字典
export const getDictTypeList = (size = 200): Promise<IResponse> => {
  const params = {
    pageNum: 1,
    pageSize: size
  }
  return request('/system/dict/type/list', { query: params })
}
export const getDictList = (params: any): Promise<IResponse> =>
  request('/system/dict/data/list', { query: params })
export const getDictListByType = (dictType: string): Promise<IResponse> =>
  request(`/system/dict/data/type/${dictType}`)
export function delDictValue(id: number | string): Promise<IResponse> {
  return request(`/system/dict/data/${id}` , {
    method: 'DELETE'
  })
}
export function delDictType(id: number): Promise<IResponse> {
  return request(`/system/dict/type/${id}`, {
    method: 'DELETE'
  })
}
export function settingDictType(data: any, type: string): Promise<IResponse> {
  return request(`/system/dict/type`, {
    method: type === 'edit' ? 'put' : 'post',
    body: data
  })
}

export function settingDictData(data: any, type: string): Promise<IResponse> {
  return request('/system/dict/data', {
    method: type === 'edit' ? 'put' : 'post',
    body: data
  })
}

// 用户管理

export function getUserList(params: any): Promise<IResponse> {
  return request(`/system/user/list`, { query: params })
}
export function deptTree(params?: any): Promise<IResponse> {
  return request(`/system/user/deptTree`, { query: params })
}
export function getUser(userId: number): Promise<IResponse> {
  return request(`/system/user/${userId}`)
}
export function delUser(userId: number | undefined): Promise<IResponse> {
  return request(`/system/user/${userId}`, {
    method: 'delete',
  })
}
export function settingUser(data: any, type: 'edit' | 'add'): Promise<IResponse> {
  return request(`/system/user`, {
    method: type === 'edit' ? 'put' : 'post',
    body: data
  })
}
export function resetPwd(data: any): Promise<IResponse> {
  return request(`/system/user/resetPwd`, {
    method: 'PUT',
    body: data
  })
}

export function authRole(userId: number): Promise<IResponse> {
  return request(`/system/user/authRole/${userId}`)
}
export function updateAuthRole(userId: number, roles: string): Promise<IResponse> {
  return request(`/system/user/authRole?userId=${userId}&roleIds=${roles}`, {
    method: 'PUT'
  })
}

// 角色
export function getRoleList(params: any): Promise<IResponse> {
  return request(`/system/role/list`, { query: params })
}
export function delRole(roleId: number): Promise<IResponse> {
  return request(`/system/role/${roleId}`, {
    method: 'delete'
  })
}
export function settingRole(data: any, type: string): Promise<IResponse> {
  return request(`/system/role`, {
    method: type === 'edit' ? 'put' : 'post',
    body: data
  })
}
// 登录日志
export function logininfor(params: any): Promise<IResponse> {
  return request(`/system/logininfor/list`, { query: params })
}
export function operatorLog(params: any): Promise<IResponse> {
  return request(`/system/operlog/list`, { query: params })
}

// 菜单管理
export function settingMenu(data: any, type: string): Promise<IResponse> {
  return request(`/system/menu`, {
    method: type === 'edit' ? 'put' : 'post',
    body: data
  })
}
export function detailMenu(id: number): Promise<IResponse> {
  return request(`/system/menu/${id}`)
}
export function delMenu(id: number): Promise<IResponse> {
  return request(`/system/menu/${id}`, {
    method: 'delete'
  })
}
// 通知
export function getNoticeList(params: any): Promise<IResponse> {
  return request(`/system/notice/list`, { query: params })
}
export function getNoticeDetail(id: number): Promise<IResponse> {
  return request(`/system/notice/${id}`)
}
export function settingNotice(data: any, type: string): Promise<IResponse> {
  return request(`/system/notice`, {
    method: type === 'edit' ? 'put' : 'post',
    body: data
  })
}
export function delNotice(id: number): Promise<IResponse> {
  return request(`/system/notice/${id}`, {
    method: 'delete'
  })
}
// 部门
export function getDept(params: any): Promise<IResponse> {
  return request(`/system/dept/list`, { query: params })
}
