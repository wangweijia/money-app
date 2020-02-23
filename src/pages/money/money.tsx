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
  moneys: any[],
  moneySum: number,
}

export default class Money extends React.Component<{}, State> {
  moneyAddView: MoneyAdd | undefined;

  columns = [
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
      key: 'tagArray',
      dataIndex: 'tagArray',
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
      key: 'editTime',
      dataIndex: 'editTime',
      render: (time: string) => {
        const t = moment(time).format('YYYY-MM-DD HH:mm:ss')
        return (
          <span>{t}</span>
        )
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: MoneyModel) => (
        <div className={Style.tabEdit} >
          <div>
            <Button type="primary" block onClick={()=>this.editMoney(record)} >
              编辑
            </Button>
          </div>
          <div>
            <Button type="danger" block>
              删除
            </Button>
          </div>
        </div>
      ),
    }
  ]

  constructor(props: any) {
    super(props);

    this.state = {
      moneys: [],
      moneySum: 0
    };
  }

  componentDidMount() {
    this.allMoney();
  }

  // 请求所有金额
  allMoney() {
    MoneyApi.allMoney({}).then(res => {
      const { data } = res;
      const moneys = MoneyModel.initByList(data);
      console.log(moneys);
      this.setState({
        moneys,
      });
    });
    this.sumMoney();
  }

  //  总金额
  sumMoney() {
    MoneyApi.sumMoney().then((res) => {
      const { data = 0 } = res;
      this.setState({
        moneySum: data
      });
    })
  }

  showAddMoney = () => {
    if (this.moneyAddView) {
      this.moneyAddView.show();
    }
  }

  // 新增金额
  addMoney = (item: any) => {
    MoneyApi.addMoney(item).then(() => {
      this.allMoney();
    })
  }

  // 编辑
  editMoney = (item: MoneyModel) => {
    if (this.moneyAddView) {
      this.moneyAddView.show(item);
    }
  }

  // 更新金额
  updateMoney = (item: MoneyModel) => {
    MoneyApi.updateMoney(item).then(() => {
      this.allMoney();
    })
  }

  renderTable(moneys: any[]): React.ReactNode {
    return (
      <Table rowKey='id' columns={this.columns} dataSource={moneys} />
    )
  }

  render(): React.ReactNode {
    const { moneys, moneySum } = this.state;
    return (
      <div className={Style.rootContent} >
        <h1>总金额：{moneySum.toFixed(2)}元</h1>
        <div className={Style.headerView} >
          <Button onClick={this.showAddMoney} >添加金额</Button>
        </div>
        {this.renderTable(moneys)}
        <MoneyAdd ref={(view: MoneyAdd) => {
          this.moneyAddView = view;
        }} create={this.addMoney} edit={this.updateMoney} />
      </div>
    )
  }
}
