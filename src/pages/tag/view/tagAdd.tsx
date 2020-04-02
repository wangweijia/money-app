import React, { ChangeEvent } from 'react';
import { Modal, Input, Form } from 'antd';
import TagApi from '../../../services/tag';

const { TextArea } = Input;

interface State {
  visible: boolean;
  tagName: string;
  tagDes: string;
}

interface Props extends React.Props<any> {
  success: (data?: any) => any;
}

export default class TagAdd extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      visible: false,
      tagName: '',
      tagDes: '',
    };
  }

  show() {
    this.setState({
      visible: true,
    });
  }

  hidden() {
    this.setState({
      visible: false,
    });
  }

  handleOk() {
    // console.log(this.state);
    const { tagName, tagDes } = this.state;
    TagApi.addTag({
      name: tagName,
      des: tagDes,
    }).then(data => {
      const { success } = this.props;
      if (success) {
        success(data);
      }
      this.hidden();
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  onChangeTagName(e: ChangeEvent) {
    const { value }: any = e.target;
    this.setState({
      tagName: value,
    });
  }

  onChangeTagDes(e: ChangeEvent) {
    const { value }: any = e.target;
    this.setState({
      tagDes: value,
    });
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
          title="创建标签"
          visible={this.state.visible}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
        >
          <Form {...formItemLayout} >
            <Form.Item label="标签名">
              <Input
                onChange={(e: ChangeEvent) => this.onChangeTagName(e)}
                value={this.state.tagName}
              />
            </Form.Item>
            <Form.Item label="说明">
              <TextArea
                onChange={(e: ChangeEvent) => this.onChangeTagDes(e)}
                value={this.state.tagDes}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
