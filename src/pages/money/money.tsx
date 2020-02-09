/* eslint-disable react/sort-comp */
import React from 'react';
import { Table, Tag, Button } from 'antd';
import moment from 'moment';
import Style from './money.less';
import MoneyAdd from './view/moneyAdd';
import MoneyApi from '../../services/money';

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
    render: (tags: string) => {
      const tagItems = JSON.parse(tags);
      return (
        <div>
          {tagItems.map((tag: string) => (
            <Tag color="gold" key={tag} >{tag}</Tag>
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
      this.setState({
        moneys: data,
      })
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
      sum, des, level, tag: JSON.stringify(tags),
    }).then(() => {
      this.allMoney();
    })
  }

  renderTable(moneys: any[]): React.ReactNode {
    if (moneys.length > 0) {
      return (
        <Table columns={columns} dataSource={moneys} />
      )
    }
    return undefined
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
