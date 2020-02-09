import React from 'react';
import { Table, Button } from 'antd';
import TagAdd from './view/tagAdd';

import Styles from './tag.less'
import TagApi from '../../services/tag';

const Columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'des',
    dataIndex: 'des',
    key: 'des',
  },
];

interface State {
  data: []
}
export default class Tag extends React.Component<{}, State> {
  tagAddView!: TagAdd;

  pageIndex: number = 0;

  Columns: any[] = [
    ...Columns,
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any, index: number) => (
        <div>
          <Button onClick={() => this.deleTag(record)} >删除</Button>
        </div>
      ),
    },
  ]

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getAllTag();
  }

  getAllTag() {
    TagApi.allTag({}).then(res => {
      const { data } = res || {};
      if (data) {
        this.setState({
          data,
        });
      }
    })
  }

  deleTag(record: { id: number }) {
    const { id } = record;
    TagApi.deleTag(id).then(() => {
      this.getAllTag();
    })
  }

  showAddView() {
    if (this.tagAddView) {
      this.tagAddView.show();
    }
  }

  render(): React.ReactNode {
    return (
      <div className={Styles.rootContent} >
        <div>
          <Button onClick={() => this.showAddView()}>新建标签</Button>
        </div>
        <Table
          rowKey="id"
          columns={this.Columns}
          dataSource={this.state.data} />
        <TagAdd
          ref={(view: TagAdd) => {
            this.tagAddView = view;
          }}
          success={() => this.getAllTag()}
        />
      </div>
    );
  }
}
