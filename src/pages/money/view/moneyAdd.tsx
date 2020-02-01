// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/sort-comp */
import React, { ChangeEvent } from 'react';
import { Modal, Form, Input, TreeSelect, InputNumber, Select } from 'antd';
import LevelApi from '../../../services/level';
import TagApi from '../../../services/tag';
import LevelModel, { LevelArray } from '../../level/model/LevelModel';

const { Option } = Select;
const { TreeNode } = TreeSelect;

interface State {
  visible: boolean;
  rootItem: LevelModel | undefined,
  allTags: any[],
  sum: number,
  des: string,
  level: number | undefined,
  tags: any[],
}

interface Props extends React.Props<any> {
  create: Function
}

export default class MoneyAdd extends React.Component<Props, State> {
  levelArray: LevelArray | undefined;

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      rootItem: undefined,
      allTags: [],
      sum: 0,
      des: '',
      level: undefined,
      tags: [],
    }
  }

  show() {
    this.setState({
      visible: true,
    })
  }

  componentDidMount() {
    this.getLevel();
    this.getTags();
  }

  getLevel() {
    LevelApi.allLevel({}).then(res => {
      const { data } = res;
      this.levelArray = new LevelArray({
        list: data,
      });
      this.setState({
        rootItem: this.levelArray.rootItem,
      });
    });
  }

  getTags() {
    TagApi.allTag({}).then(res => {
      const { data } = res;
      if (data) {
        this.setState({
          allTags: data,
        });
      }
    })
  }

  desChange = (e: ChangeEvent | undefined) => {
    let des;
    if (e) {
      const { value }: any = e.target;
      des = value;
    }
    this.setState({
      des,
    });
  }

  moneyChange = (value: number | undefined) => {
    const sum: number = value === undefined ? 0 : value;
    this.setState({
      sum,
    })
  }

  tagChange = (value: any[]) => {
    this.setState({
      tags: value,
    })
  }

  treeChange = (value: any) => {
    this.setState({
      level: value,
    })
  }

  renderTree() {
    // 返回树节点
    const getNode = (item: LevelModel | undefined, index: number) => {
      if (item === undefined) {
        return undefined;
      }
      const { children, name, id } = item;
      const selectable = children.length === 0;
      return (
        <TreeNode selectable={selectable} value={id} title={name} key={id}>
            {children.map(subItem => getNode(subItem, index + 1))}
        </TreeNode>
      )
    }
    const { rootItem } = this.state;
    return (
      <Form.Item label="挂载节点">
        <TreeSelect
          style={{ width: '100%' }}
          value={this.state.level}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          onChange={this.treeChange}
        >
          {getNode(rootItem, 0)}
        </TreeSelect>
      </Form.Item>
    )
  }

  renderTags() {
    const { allTags } = this.state;
    return (
      <Form.Item label="标签">
        <Select
          mode="multiple"
          placeholder="Please select"
          defaultValue={[]}
          onChange={this.tagChange}
        >
          {allTags.map(item => {
            const { id, name } = item;
            return (
              <Option key={id}>{name}</Option>
            )
          })}
        </Select>
      </Form.Item>
    )
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  handleOk = () => {
    const { create } = this.props;
    const { sum, des, level, tags } = this.state;
    if (create) {
      create({ sum, des, level, tags });
    }
    this.handleCancel();
  }

  render(): React.ReactNode {
    return (
      <div>
        <Modal
          title="添加金额"
          visible={this.state.visible}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
        >
          <Form layout="vertical" >
            <Form.Item style={{ width: '100%' }} label="金额">
              <InputNumber min={0} defaultValue={0} onChange={this.moneyChange} />
            </Form.Item>
            <Form.Item style={{ width: '100%' }} label="说明">
              <Input
                placeholder="说明"
                onChange={this.desChange}
                value={this.state.des}
              />
            </Form.Item>
            {this.renderTree()}
            {this.renderTags()}
          </Form>
        </Modal>
      </div>
    )
  }
}
