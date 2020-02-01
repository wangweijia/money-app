import { getRequest, postRequest } from '../utils/request';

export default class LevelApi {
  static addLevel(params: {}): Promise<any> {
    return postRequest('/level/save', params);
  }

  static allLevel(params: {}): Promise<any> {
    return getRequest('/level', {});
  }

  static deleLevel(levelId: number) {
    return postRequest('/level/delete', { id: levelId });
  }
}
