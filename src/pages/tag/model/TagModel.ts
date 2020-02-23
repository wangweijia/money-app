import ModelHelper from '../../../utils/modeHelper';

export enum TagStatus {
  // 可以使用
  Enable = 1,
  // 不可以使用
  Unable
}

export default class TagModel extends ModelHelper {
  id!: number;
  name: string = '';
  des: string = '';
  tagStatus: TagStatus = TagStatus.Enable;

  constructor(props: any) {
    super(props);
    this.initByJson(props);
  }
}