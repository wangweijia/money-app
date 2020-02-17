import ModelHelper from '../../../utils/modeHelper';

export default class TagModel extends ModelHelper {
  id!: number;
  name: string = '';
  des: string = '';

  constructor(props: any) {
    super(props);
    this.initByJson(props);
  }
}