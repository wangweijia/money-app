import { getRequest, postRequest } from '../utils/request';

export default class MoneyApi {
  static addMoney(params: {}): Promise<any> {
    console.log(params);
    return postRequest('/money/save', params);
  }

  static allMoney(params: {}): Promise<any> {
    return getRequest('/money', params);
  }

  static deleMoney(tagId: number) {
    return postRequest('/money/delete', { id: tagId });
  }

  static updateMoney(params: any) {
    return postRequest('/money/update', params);
  }
}
