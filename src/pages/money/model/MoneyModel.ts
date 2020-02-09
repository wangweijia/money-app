import ModelHelper from '../../../utils/modeHelper';

export default class MoneyModel extends ModelHelper {
  id!: number;
  sum: number = 0.0;
  des!: string;
  level!: number;
  tag!: string;
  createTime: Date = new Date();
  editTime: Date = new Date();

  constructor(props: any) {
    super(props);
    this.initByJson(props);
  }
}