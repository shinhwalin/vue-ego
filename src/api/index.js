/**
 * 请求的方法
 */
import axios from "axios";
import base from "./base";
const api = {
  /**
   * 商品列表
   */
  getGoodsList(params) {
    //(page:xx)
    return axios.get(base.goodList, {
      params,
    });
  },
  /**
   * 获取类目选择
   */
  selectCategory(params) {
    //params 接受的参数是id 传入cid
    return axios.get(base.selectCategory, { params });
  },
  /**
   * 添加商品
   */
  addGoods(data) {
    return axios.post(base.addGoods, data);
  },
  /**
   * 删除商品
   */
  deleteGoods(params) {
    return axios.get(base.deleteGoods, { params });
  },
  /**
   * 选择商品
   */
  selectGoods(params) {
    return axios.get(base.selectGoods, { params });
  },
  /**
   * 更新商品
   */
  updateGoods(data) {
    return axios.post(base.updateGoods, data);
  },
  /**
   * mock测试
   */
  mockTest() {
    return axios.get(base.mockTest);
  },
  /**
   * 首页展示MOCK
   */
  getStatistical() {
    return axios.get(base.getStatistical);
  },
  /**
   * 首页展示MOCK
   */
  getSellTotal() {
    return axios.get(base.getSellTotal);
  },
  /**
   * 固定资产状态查询
   */
  queryStatus(params) {
    return axios.get(base.queryStatus, { params });
  },
};

export default api;
