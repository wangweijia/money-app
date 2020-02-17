import ModelHelper from '../../../utils/modeHelper';
import TagModel from '../../tag/model/TagModel';

export default class MoneyModel extends ModelHelper {
  id!: number;
  sum: number = 0.0;
  des!: string;
  level!: number;
  tag!: TagModel[];
  createTime: Date = new Date();
  editTime: Date = new Date();

  constructor(props: any) {
    super(props);
    this.initByJson(props);

    this.initTags(props);
  }

  initTags(props: any) {
    const {tag = []} = props;
    this.tag = TagModel.initByList(tag) as TagModel[];
  }
}