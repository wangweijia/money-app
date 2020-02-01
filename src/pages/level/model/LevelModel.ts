

export default class LevelModel {
  // 子节点对象
  children: LevelModel[] = [];

  parent: number = -1000;

  id: number = 0;

  name: string | undefined;

  des: string | undefined;

  constructor(props: any) {
    const { id, name, des, parent = -1 } = props;
    this.id = id;
    this.parent = parent;
    this.name = name;
    this.des = des;
  }

  strKey() {
    return `k_${this.id}`;
  }

  strParentKey() {
    return `k_${this.parent}`;
  }

  addChildren(item: LevelModel) {
    item.parent = this.id;
    this.children.push(item);
  }
}

export class LevelArray {
  // 等级映射
  levelMap: { [key: string]: LevelModel } = {};

  // 树状图-根节点
  rootItem: LevelModel | undefined;

  constructor(props: any) {
    const { list = [] } = props;

    list.forEach((element: any) => {
      const tempItem: LevelModel = new LevelModel(element);
      // 父节点 stirng id
      const parentKey: string = tempItem.strParentKey();
      // 自己 string id
      const currentItemKey: string = tempItem.strKey();

      if (this.levelMap[currentItemKey]) {
        tempItem.children = this.levelMap[currentItemKey].children;
      }
      this.levelMap[currentItemKey] = tempItem

      if (this.levelMap[parentKey]) {
        this.levelMap[parentKey].addChildren(tempItem);
      } else if (tempItem.parent > 0) {
          const parentTempItem: LevelModel = new LevelModel({
            id: tempItem.parent,
          });
          this.levelMap[parentKey] = parentTempItem;
        } else {
          this.rootItem = tempItem;
        }
    });

    console.log(this);
  }
}
