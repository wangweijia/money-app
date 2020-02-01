import { postRequest, getRequest } from '../utils/request';

export default class TagApi {
  static addTag(params: {}): Promise<any> {
    return postRequest('/tag/save', params);
  }
  
  static allTag(params: {}): Promise<any> {
    return getRequest('/tag', {});
  }

  static deleTag(tagId: number) {
    return postRequest('/tag/delete', { id: tagId });
  } 
}
