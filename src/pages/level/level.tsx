import React from 'react';
import LevelApi from '../../services/level';
import LevelModel, { LevelArray } from './model/LevelModel';
import LevelItem from './view/levelItem';
import LevelAdd from './view/levelAdd';

interface IState {
  rootItem: any,
  path: number[]
}

export default class Level extends React.Component<{}, IState> {
  levelArray: LevelArray | undefined;

  LevelAddView: LevelAdd| undefined;

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      rootItem: undefined,
      path: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    }
  }

  componentDidMount() {
    this.getAllLevel();
  }

  getAllLevel() {
    LevelApi.allLevel({}).then(res => {
      const { data } = res || {};
      this.levelArray = new LevelArray({
        list: data,
      });
      this.setState({
        rootItem: this.levelArray.rootItem,
      })
    })
  }

  updateLevelPath = (item: LevelItem, index: number, levelIndex: number, levelPath: number[]) => {
    const newPath = [...levelPath];
    newPath[levelIndex] = index;
    this.setState({
      path: newPath,
    });
  }

  addItem = (currentItem: LevelItem) => {
    if (this.LevelAddView) {
      this.LevelAddView.show(currentItem);
    }
  }

  delItem = (currentItem: LevelModel) => {
    LevelApi.deleLevel(currentItem.id).then(() => {
      this.getAllLevel();
    });
  }

  renderContent(): React.ReactNode {
    const { rootItem, path } = this.state;

    const actives = {
      addItem: this.addItem,
      delItem: this.delItem,
    }

    const params = {
      levelModels: [rootItem],
      levelPath: path,
      levelIndex: 0,
    }

    if (this.state.rootItem) {
      return (
        // eslint-disable-next-line max-len
        <LevelItem {...actives} updateLevelPath={this.updateLevelPath} {...params} />
      )
    }
    return undefined;
  }

  renderAddView() {
    return (
      <LevelAdd ref={(view: LevelAdd) => {
        this.LevelAddView = view;
      }}
      success={() => this.getAllLevel()} />
    )
  }

  render(): React.ReactNode {
    return (
      <div>
        {this.renderContent()}
        {this.renderAddView()}
      </div>
    )
  }
}
