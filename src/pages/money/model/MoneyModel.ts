import ModelHelper from '../../../utils/modeHelper';
import TagModel from '../../tag/model/TagModel';
import LevelModel from '../../level/model/LevelModel';

export default class MoneyModel extends ModelHelper {
  // id
  id!: number;
  // 金额
  sum: number = 0.0;
  // 说明
  des!: string;
  // 标签对象，列表
  tagArray!: TagModel[];
  // 层级对象
  levelObj!: LevelModel;

  // 层级对象  id
  levelId!: number;
  // 标签对象 id列表
  tagsId!: string[];

  // 创建时间
  createTime: Date = new Date();
  // 编辑时间
  editTime: Date = new Date();

  constructor(props: any) {
    super(props);
    this.initByJson(props);

    this.initTags(props);
    this.initLevel(props);
  }

  initTags(props: any) {
    const {tagArray = []} = props;
    this.tagArray = TagModel.initByList(tagArray) as TagModel[];
    
    this.tagsId = this.tagArray.map((item) => {
      return `${item.id}`;
    });
  }

  initLevel(props: any) {
    const { levelObj = {} } = props;
    this.levelObj = new LevelModel(levelObj);
    this.levelId = this.levelObj.id;
  }
}