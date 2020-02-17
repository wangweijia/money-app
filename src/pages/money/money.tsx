/* eslint-disable react/sort-comp */
import React from 'react';
import { Table, Tag, Button } from 'antd';
import moment from 'moment';
import Style from './money.less';
import MoneyAdd from './view/moneyAdd';
import MoneyApi from '../../services/money';

import MoneyModel from './model/MoneyModel';
import TagModel from '../tag/model/TagModel';

interface State {
  moneys: any[]
}

const columns = [
  {
    title: '金额',
    dataIndex: 'sum',
    key: 'sum',
    render: (sum: number) => (
        <div>
          {sum.toFixed(2)}
        </div>
      ),
  },
  {
    title: '说明',
    dataIndex: 'des',
    key: 'des',
  },
  {
    title: '标签',
    key: 'tag',
    dataIndex: 'tag',
    render: (tags: TagModel[]) => {
      return (
        <div>
          {tags.map((tag: TagModel) => (
            <Tag color="gold" key={tag.id} >{tag.name}</Tag>
            ))}
        </div>
      )
    },
  },
  {
    title: '更新时间',
    key: 'time',
    dataIndex: 'time',
    render: (time: string) => {
      const t = moment(time).format('YYYY-MM-DD HH:mm:ss')
      return (
        <span>{t}</span>
      )
    },
  },
]

export default class Money extends React.Component<{}, State> {
  moneyAddView: MoneyAdd | undefined;

  constructor(props: any) {
    super(props);

    this.state = {
      moneys: [],
    };
  }

  componentDidMount() {
    this.allMoney();
  }

  allMoney() {
    MoneyApi.allMoney({}).then(res => {
      const { data } = res;
      const moneys = MoneyModel.initByList(data);
      console.log(moneys);
      this.setState({
        moneys: MoneyModel.initByList(data),
      });
    })
  }

  showAddMoney = () => {
    if (this.moneyAddView) {
      this.moneyAddView.show();
    }
  }

  addMoney = (item: any) => {
    const { sum, des, level, tags } = item;

    MoneyApi.addMoney({
      sum, des, levelId: level, tags,
    }).then(() => {
      this.allMoney();
    })
  }

  renderTable(moneys: any[]): React.ReactNode {
    return (
      <Table rowKey='id' columns={columns} dataSource={moneys} />
    )
  }

  render(): React.ReactNode {
    const { moneys } = this.state;
    return (
      <div className={Style.rootContent} >
        <div>
          <Button onClick={this.showAddMoney} >添加金额</Button>
        </div>
        {this.renderTable(moneys)}
        <MoneyAdd ref={(view: MoneyAdd) => {
          this.moneyAddView = view;
        }} create={this.addMoney} />
      </div>
    )
  }
}
