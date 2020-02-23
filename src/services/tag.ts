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

  static updateTag(item: any) {
    return postRequest('/tag/update', item);
  }

  static changeStatus(id: number, status: any) {
    return postRequest('/tag/changeStatus', {id, status});
  } 
}
