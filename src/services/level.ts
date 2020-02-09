import { getRequest, postRequest } from '../utils/request';
import LevelModel from '../pages/level/model/LevelModel';

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

  static updateLevel(params: LevelModel) {
    return postRequest('/level/update', params);
  }

}
