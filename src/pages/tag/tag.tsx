import React from 'react';
import { Table, Button } from 'antd';
import TagAdd from './view/tagAdd';

import Styles from './tag.less'
import TagApi from '../../services/tag';
import { TagStatus } from './model/TagModel';

const Columns = [
  // {
  //   title: 'id',
  //   dataIndex: 'id',
  //   key: 'id',
  // },
  {
    title: '标签名字',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '说明',
    dataIndex: 'des',
    key: 'des',
  },
  {
    title: '状态',
    key: 'tagStatus',
    render: (text: any, record: any, index: number) => {
      const { tagStatus } = record;
      return tagStatus === TagStatus.Enable ? '启用' : '禁用';
    },
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
      title: '操作',
      key: 'action',
      render: (text: any, record: any, index: number) => (
        this.renderAction(text, record, index)
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

  changeTagStatus = (tagId: number, status: TagStatus) => {
    TagApi.changeStatus(tagId, status).then(() => {
      this.getAllTag();
    })
  }

  showAddView() {
    if (this.tagAddView) {
      this.tagAddView.show();
    }
  }

  renderAction = (text: any, record: any, index: number) => {
    const { tagStatus, id } = record;
    const btnName: string = tagStatus === TagStatus.Enable ? '禁用' : '启用';
    const newStatus: TagStatus = tagStatus === TagStatus.Enable ? TagStatus.Unable : TagStatus.Enable;

    return (
      <div>
        <Button onClick={() => this.changeTagStatus(id, newStatus)} >{btnName}</Button>
      </div>
    )
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
