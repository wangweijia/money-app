import React from 'react';
import { Button, Icon, message } from 'antd';
import LevelModel from '../model/LevelModel';
import Style from './levelItem.less';

interface State {

}

interface Props extends React.Props<any> {
  // 数据来源
  levelModels: LevelModel[],
  // 当前控件层级
  levelIndex: number,
  // 全局控件 路由
  levelPath: number[],
  // 更新 level
  updateLevelPath: Function,
  // 新增 level
  addItem: Function,
  // 删除 level
  delItem?: Function,
}

export default class LevelItem extends React.Component<Props, State> {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: Readonly<Props>) {
    super(props);
  }


  itemSelected = (item: LevelModel, index: number) => {
    const { levelIndex, levelPath, updateLevelPath } = this.props;
    updateLevelPath(item, index, levelIndex, levelPath);
  }

  addItem = (e: any, currentItem: LevelModel) => {
    const { addItem } = this.props;
    addItem(currentItem);
    e.stopPropagation();
  }

  delItem = (e: any, currentItem: LevelModel) => {
    const { delItem } = this.props;
    const { children, id, parent } = currentItem;
    if (parent < 0) {
      message.error('不能删除根节点');
      return;
    }
    if (children.length > 0) {
      message.error('子节点个数大于0，无法删除');
      return;
    }
    if (delItem) {
      delItem(currentItem);
    }
    e.stopPropagation();
  }

  renderParent() : React.ReactNode {
    const { levelModels, levelIndex, levelPath } = this.props;
    const selected = levelPath[levelIndex];
    return (
      <div>
        {levelModels.map((item, index) => {
          const style = selected === index ? Style.parentSelected : Style.parent;
          return (
            <div className={style} key={item.id} onClick={() => this.itemSelected(item, index)} >
              {item.name}
              <div className={Style.addIconBtn} >
                <Icon type="plus-circle" onClick={e => this.addItem(e, item)} />
              </div>
              <div className={Style.addIconBtn}>
                <Icon type="edit" />
              </div>
              <div className={Style.addIconBtn}>
                <Icon type="delete" onClick={e => this.delItem(e, item)} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  renderChildren(): React.ReactNode {
    const { levelPath, levelIndex, levelModels } = this.props;
    const currentSelectIndex = levelPath[levelIndex];
    const { children = [] } = levelModels[currentSelectIndex];
    if (children.length > 0) {
      return (
        // eslint-disable-next-line max-len
        <LevelItem {...this.props} levelIndex={levelIndex + 1} levelModels={children} />
      )
    }
    return undefined;
  }

  render(): React.ReactNode {
    return (
      <div className={Style.rootContent} >
        {this.renderParent()}
        {this.renderChildren()}
      </div>
    )
  }
}
