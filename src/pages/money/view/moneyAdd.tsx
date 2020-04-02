import React, { ChangeEvent } from 'react';
import { Modal, Input, TreeSelect, InputNumber, Select, Form } from 'antd';
import LevelApi from '../../../services/level';
import TagApi from '../../../services/tag';
import LevelModel, { LevelArray } from '../../level/model/LevelModel';
import MoneyModel from '../model/MoneyModel';

// import { FormComponentProps } from 'antd/Form';

const { Option } = Select;
const { TreeNode } = TreeSelect;

interface FormProps {
  rootItem: LevelModel | undefined,
  allTags: any[],
  defaultValues?: any, 
}

class MoneyForm extends React.Component<FormProps, {}> {
  // 是否有默认值
  defaultValues?: any;
  // form 对象
  formRef: any;
  
  constructor(props: FormProps) {
    super(props);

    // form 实体
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const { defaultValues } = this.props;
    if (defaultValues) {
      this.formRef.current.setFieldsValue(defaultValues);
    };
  }

  componentWillReceiveProps(props: any, b: any) {
    const { defaultValues } = props;

    if (JSON.stringify(defaultValues) !== JSON.stringify(this.defaultValues)) {
      if (defaultValues) {
        this.formRef.current.setFieldsValue(defaultValues);
        this.defaultValues = defaultValues;
      };
    }
  }

  // 渲染层级树
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
    const { rootItem } = this.props;

    return (
      <Form.Item label="挂载节点" rules={[{ required: true, message: '节点不能为空' }]} name="levelId" >
        <TreeSelect
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="选择挂载节点"
          allowClear
          treeDefaultExpandAll
        >
          {getNode(rootItem, 0)}
        </TreeSelect>
      </Form.Item>
    )
  }

  // 渲染标签
  renderTags() {
    const { allTags } = this.props;

    return (
      <Form.Item label="标签" name="tagsId" >
        <Select
          mode="multiple"
          placeholder="选择标签"
        >
          {allTags.map(item => {
            const { id, name } = item;
            return (
              <Option key={id} value={id} >{name}</Option>
            )
          })}
        </Select>
      </Form.Item>
    )
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
      <Form ref={this.formRef} {...formItemLayout} >
        <Form.Item style={{ width: '100%' }} label="金额" rules={[{ required: true, message: '金额不能为空' }]} name="sum"  >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item style={{ width: '100%' }} label="说明" rules={[{ required: true, message: '说明不能为空' }]} name="des" >
          <Input placeholder="说明" />
        </Form.Item>
        {this.renderTree()}
        {this.renderTags()}
      </Form>
    )
  }
}

interface State {
  visible: boolean;
  rootItem: LevelModel | undefined,
  allTags: any[],
  sum: number,
  des: string,
  levelId: number | undefined,
  tagsId: any[],
  id?: number,
  form: any,
  defaultValues?: Object
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
  id: undefined,
  form: {},
  defaultValues: undefined,
}

export default class MoneyAdd extends React.Component<Props, State> {
  levelArray: LevelArray | undefined;
  wrappedMoneyForm: any;

  constructor(props: Props) {
    super(props);

    this.state = {...defaultStatus};
  }

  // 重置
  resetStatus() {
    console.log('reset')
    this.setState({
      rootItem: undefined,
      sum: 0,
      des: '',
      levelId: undefined,
      tagsId: [],
      defaultValues: undefined,
      ...defaultStatus
    });
    // this.wrappedMoneyForm.resetFields();
  }

  // 显示
  show(money?: MoneyModel) {
    this.getLevel();
    this.getTags();
    this.setState({
      visible: true,
    }, () => {
      if (money) {
        const {id, sum, des, levelId, tagsId} = money;
        this.setState({
          id, 
          sum, 
          des,
          tagsId,
          levelId,
          defaultValues: {sum, des, levelId, tagsId}
        });
      }
    });
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
    TagApi.allEnableTags({}).then(res => {
      const { data } = res || {};
      if (data) {
        this.setState({
          allTags: data,
        });
      }
    })
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
    if (this.wrappedMoneyForm) {
      this.wrappedMoneyForm.validateFields((err: any, values: any) => {
        if (!err) {
          console.log('Received values of form: ', values);
          const { create, edit } = this.props;
          const { id } = this.state;
          if (id) {
            edit({id, ...values});
          } else {
            create({ ...values });
          }
          this.handleCancel();
        }
      });
    }
  }

  render(): React.ReactNode {
    const { visible } = this.state;
    return (
      <div>
        <Modal
          title="添加金额"
          visible={this.state.visible}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
        >
          {visible && <MoneyForm ref={(v) => {
            this.wrappedMoneyForm = v;
          }} rootItem={this.state.rootItem} allTags={this.state.allTags} defaultValues={this.state.defaultValues} />}
        </Modal>
      </div>
    )
  }
}
