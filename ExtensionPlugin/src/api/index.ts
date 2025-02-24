import request from "../utils/axiosExport";

export const indxApi = {
  /**
   * 
   * @param params
   */
  getIndexLoad: (data?: any) => {
    return request({
      url: `/depinUser/connect`,
      method: "POST",
      headers: {
        token: data?.token,
      },
    });
  },
};
