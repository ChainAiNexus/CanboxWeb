import axois from '../utils/axiosExport';
export function getIdoBaseInfo(data?: any) {
    return axois.request({
        url: `/ido/getIdoBaseInfo`,
        method: 'GET',
    });
}
export function getFriendList(data?: any) {
    return axois.request({
        url: `/user/getFriendList`,
        method: 'post',
        data,
    });
}
export function getReferee(data?: any) {
    return axois.request({
        url: `/user/getReferee`,
        method: 'GET',
    });
}
export function getUserAwardInfo(data?: any) {
    return axois.request({
        url: `/user/getMyAwardInfo`,
        method: 'GET',
    });
}

export function getUserInfo(data?: any) {
    return axois.request({
        url: `/user/getUserInfo`,
        method: 'GET',
    });
}
export function getMyAwardInfo(data?: any) {
    return axois.request({
        url: `/user/getMyAwardSolInfo`,
        method: 'GET',
    });
}
export function getMyAwardSolInfoDetail(data?: any) {
    return axois.request({
        url: `/user/getMyAwardSolInfoDetail`,
        method: 'post',
        data,
    });
}
export function getDrawSolAward(data?: any) {
    return axois.request({
        url: `/user/drawSolAward`,
        method: 'post',
        data,
    });
}
export function getIdoBuyRecord(data?: any) {
    return axois.request({
        url: `/ido/getIdoBuyRecord`,
        method: 'GET',
    });
}
export function getIdoPay(data?: any) {
    return axois.request({
        url: `/ido/pay`,
        method: 'GET',
    });
}
// 签到
export function getSignBaseList(data?: any) {
    return axois.request({
        url: `/signIn/getSignBaseList`,
        method: 'GET',
    });
}
export function getSignIn(data?: any) {
    return axois.request({
        url: `/signIn/signIn`,
        method: 'post',
        data,
    });
}
// 任务
export function getTaskList(data?: any) {
    return axois.request({
        url: `/task/getTaskList/${data}`,
        method: 'GET',
    });
}
export function startTask(data?: any) {
    return axois.request({
        url: `/task/startTask`,
        method: 'post',
        data: {
            ...data,
            Encrypt: true,
        },
    });
}
export function submitTask(data?: any) {
    return axois.request({
        url: `/task/submitTask`,
        method: 'post',
        data: {
            ...data,
            Encrypt: true,
        },
    });
}
// 积分
export function getScoreAwardInfo(data?: any) {
    return axois.request({
        url: `/task/getScoreAwardInfo`,
        method: 'GET',
    });
}
export function getScoreAwardDetail(data?: any) {
    return axois.request({
        url: `/task/getScoreAwardDetail`,
        method: 'post',
        data,
    });
}
export function getChartingInfo(data?: any) {
    return axois.request({
        url: `/charting/getChartingInfo`,
        method: 'GET',
    });
}
export function aiCharting(data?: any) {
    return axois.request({
        url: `/charting/aiCharting`,
        method: 'post',
        data,
    });
}
export function getChartingList(data?: any) {
    return axois.request({
        url: `/charting/getChartingList`,
        method: 'post',
        data,
    });
}
export function operateCollect(data?: any) {
    return axois.request({
        url: `/charting/operateCollect`,
        method: 'post',
        data,
    });
}
export function getSubscriptionInfo(data?: any) {
    return axois.request({
        url: `/user/getSubscriptionInfo`,
        method: 'GET',
    });
}
export function getSubscriptionInfoDetail(data?: any) {
    return axois.request({
        url: `/user/getSubscriptionInfoDetail`,
        method: 'post',
        data,
    });
}
