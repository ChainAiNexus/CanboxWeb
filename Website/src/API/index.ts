import axois from '../utils/axiosExport';
interface LoginData {
  chainName: string;
  inviteCode: string;
  userAddress: string;
  sign: string;
  signMsg: string;
  signature: string;
}

export function Login(data: LoginData) {
  return axois.request({
    url: '/user/login',
    method: 'post',
    data: {
      ...data,
      Encrypt: true,
    },
  });
}

export function getTokenContractAddress(data?: any) {
  return axois.request({
    url: `/user/getTokenContractAddress`,
    method: 'GET',
    data: {
      ...data,
    },
  });
}

export function getPledgeRecord(data?: any) {
  return axois.request({
    url: `/user/getPledgeRecord`,
    method: 'GET',
    data: {
      ...data,
    },
  });
}


export function getCanUserAccount(data?: any) {
  return axois.request({
    url: `/user/getCanUserAccount`,
    method: 'GET',
    data: {
      ...data,
    },
  });
}
export function getCategoryList(data?: any) {
  return axois.request({
    url: `/user/getCategoryList`,
    method: 'GET',
    data: {
      ...data,
    },
  });
}
export function getInstalledApps(data?: any) {
  return axois.request({
    url: `/user/getInstalledApps`,
    method: 'post',
    data,
  });
}
export function getCategoryByIdList(categoryId?: any) {
  return axois.request({
    url: `/user/getCategoryByIdList/${categoryId}`,
    method: 'GET',
  });
}
export function searchAiBase(data?: any) {
  return axois.request({
    url: '/user/searchAiBase',
    method: 'post',
    data,
  });
}

export function getTwitterInfo(data?: any) {
  return axois.request({
    url: `/user/getTwitterInfo`,
    method: 'GET',
    data: {
      ...data,
    },
  });
}
export function getTwitterOauth2Url(data?: any) {
  return axois.request({
    url: `/twitter/oauth2Url`,
    method: 'GET',
    data: {
      ...data,
    },
  });
}
export function getUserInfo(data?: any) {
  return axois.request({
    url: `/user/getUserInfo`,
    method: 'GET',
  });
}
export function getShareInfo(data?: any) {
  return axois.request({
    url: `/user/getShareInfo`,
    method: 'GET',
  });
}
export function getUpdateNftInfo(data?: any) {
  return axois.request({
    url: `/user/getUpdateNftInfo`,
    method: 'GET',
  });
}
export function getEarnRecord(data?: any) {
  return axois.request({
    url: `/user/getEarnRecord`,
    method: 'GET',
  });
}
export function getTaskAwardDetail(data?: any) {
  return axois.request({
    url: `/user/getTaskAwardDetail`,
    method: 'GET',
  });
}
export function getNftInfo(data?: any) {
  return axois.request({
    url: `/user/getNftInfo`,
    method: 'GET',
  });
}
export function getWhiteRecord(data?: any) {
  return axois.request({
    url: `/user/getWhiteRecord`,
    method: 'GET',
  });
}
export function transferWhite(data?: any) {
  return axois.request({
    url: '/user/transferWhite',
    method: 'post',
    data,
  });
}
export function getTopTask(data?: any) {
  return axois.request({
    url: `/task/getTopTask`,
    method: 'GET',
  });
}
export function getTaskList(data?: any) {
  return axois.request({
    url: `/task/getTaskList`,
    method: 'POST',
    data: {
      ...data,
    },
  });
}
export function getScoreInfo(type?: any) {
  return axois.request({
    url: `/task/getScoreInfo`,
    method: 'GET',
  });
}
export function verifyTask(data?: any) {
  return axois.request({
    url: '/task/verifyTask',
    method: 'post',
    data,
  });
}
export function startTask(data?: any) {
  return axois.request({
    url: '/task/startTask',
    method: 'post',
    data,
  });
}

export function getTwitterToken(type?: any) {
  return axois.request({
    url: `/task/getTwitterToken`,
    method: 'GET',
  });
}
export function refreshTwitterToken(type?: any) {
  return axois.request({
    url: `/task/refreshToken`,
    method: 'GET',
  });
}

// deping
export function getProductBaseList(data?: any) {
  return axois.request({
    url: `/product/getProductBaseList`,
    method: 'GET',
  });
}
export function getProductOrderList(data?: any) {
  return axois.request({
    url: `/product/getProductOrderList`,
    method: 'GET',
  });
}
export function payProduct(data?: any) {
  return axois.request({
    url: '/product/payProduct',
    method: 'post',
    data,
  });
}
export function getSolXPrice(data?: any) {
  return axois.request({
    url: `/product/getSolXPrice`,
    method: 'GET',
  });
}
export function payProductCallback(data?: any) {
  return axois.request({
    url: '/product/callback',
    method: 'post',
    data,
  });
}
