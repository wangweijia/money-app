import { getRequest, postRequest } from '../utils/request';

export default class MoneyApi {
  static addMoney(params: {}): Promise<any> {
    return postRequest('/money/save', params);
  }

  static allMoney(params: {}): Promise<any> {
    return getRequest('/money', params);
  }

  // static deleLevel(tagId: number) {
  //   return postRequest('/tag/delete', { id: tagId });
  // }
}
