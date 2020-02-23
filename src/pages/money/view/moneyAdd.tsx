import React, { ChangeEvent } from 'react';
import { Modal, Form, Input, TreeSelect, InputNumber, Select } from 'antd';
import LevelApi from '../../../services/level';
import TagApi from '../../../services/tag';
import LevelModel, { LevelArray } from '../../level/model/LevelModel';
import MoneyModel from '../model/MoneyModel';

const { Option } = Select;
const { TreeNode } = TreeSelect;

interface State {
  visible: boolean;
  rootItem: LevelModel | undefined,
  allTags: any[],
  sum: number,
  des: string,
  levelId: number | undefined,
  tagsId: any[],
  id?: number,
}

interface Props extends React.Props<any> {
  create: Function,
  edit: Function
}

const defaultStatus = {
  visible: false,
  rootItem: undefined,
  allTags: [],
  sum: 0,
  des: '',
  levelId: undefined,
  tagsId: [],
  id: undefined
}

export default class MoneyAdd extends React.Component<Props, State> {
  levelArray: LevelArray | undefined;

  constructor(props: Props) {
    super(props);

    this.state = defaultStatus;
  }

  // 重置
  resetStatus() {
    this.setState({
      rootItem: undefined,
      sum: 0,
      des: '',
      levelId: undefined,
      tagsId: [],
    })
  }

  // 显示
  show(money?: MoneyModel) {
    this.getLevel();
    this.getTags();
    this.setState({
      visible: true,
    });
    if (money) {
      const {id, sum, des, levelId, tagsId} = money;
      this.setState({
        id, 
        sum, 
        des,
        tagsId,
        levelId,
      });
    }
  }

  // 获取所有的层级
  getLevel() {
    LevelApi.allLevel({}).then(res => {
      const { data } = res || {};
      this.levelArray = new LevelArray({
        list: data,
      });
      this.setState({
        rootItem: this.levelArray.rootItem,
      });
    });
  }

  // 获取所有的标签
  getTags() {
    TagApi.allTag({}).then(res => {
      const { data } = res || {};
      if (data) {
        this.setState({
          allTags: data,
        });
      }
    })
  }

  // 说明变化
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

  // 资金变化
  moneyChange = (value: number | undefined) => {
    const sum: number = value === undefined ? 0 : value;
    this.setState({
      sum,
    })
  }

  // 渲染层级树
  renderTree() {
    // 层级选择变化
    const treeChange = (value: any) => {
      this.setState({
        levelId: value,
      })
    }
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
          value={this.state.levelId}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="选择挂载节点"
          allowClear
          treeDefaultExpandAll
          onChange={treeChange}
        >
          {getNode(rootItem, 0)}
        </TreeSelect>
      </Form.Item>
    )
  }

  // 渲染标签
  renderTags() {
    // 标签选择变化
    const tagChange = (value: any[]) => {
      this.setState({
        tagsId: value,
      })
    }
    const { allTags, tagsId } = this.state;
    return (
      <Form.Item label="标签">
        <Select
          mode="multiple"
          placeholder="选择标签"
          value={tagsId}
          onChange={tagChange}
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

  // 关闭弹窗
  handleCancel = () => {
    this.resetStatus();
    this.setState({
      visible: false,
    })
  }

  // 提交
  handleOk = () => {
    const { create, edit } = this.props;
    const { sum, des, levelId, tagsId, id } = this.state;
    if (id) {
      edit({sum, des, levelId, tagsId, id});
    } else {
      create({ sum, des, levelId, tagsId });
    }
    this.handleCancel();
  }

  render(): React.ReactNode {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    
    return (
      <div>
        <Modal
          title="添加金额"
          visible={this.state.visible}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
        >
          <Form {...formItemLayout} >
            <Form.Item style={{ width: '100%' }} label="金额">
              <InputNumber min={0} value={this.state.sum} onChange={this.moneyChange} />
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
