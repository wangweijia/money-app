import React, { ChangeEvent } from 'react';
import { Modal, Form, Input } from 'antd';
import LevelApi from '../../../services/level';

interface State {
  visible: boolean;
  LevelName: string;
  LevelDes: string;
}

interface Props extends React.Props<any> {
  success: (data?: any) => any;
}

export default class LevelAdd extends React.Component<Props, State> {
  current: any;

  constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      visible: false,
      LevelName: '',
      LevelDes: '',
    };
  }

  onChangeTagDes(e: ChangeEvent) {
    const { value }: any = e.target;
    this.setState({
      LevelDes: value,
    });
  }

  onChangeTagName(e: ChangeEvent) {
    const { value }: any = e.target;
    this.setState({
      LevelName: value,
    });
  }

  handleOk() {
    const { LevelName, LevelDes } = this.state;
    LevelApi.addLevel({
      name: LevelName,
      des: LevelDes,
      parent: this.current.id,
      children: '[]',
    }).then((data: any) => {
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

  show(current: any) {
    this.current = current;
    this.setState({
      visible: true,
    });
  }

  hidden() {
    this.setState({
      visible: false,
      LevelName: '',
      LevelDes: '',
    });
    this.current = undefined;
  }

  render(): React.ReactNode {
    return (
      <div>
        <Modal
          title="创建层级"
          visible={this.state.visible}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
        >
          <Form layout="inline">
            <Form.Item label="LevelName">
              <Input
                placeholder="层级名字"
                onChange={(e: ChangeEvent) => this.onChangeTagName(e)}
                value={this.state.LevelName}
              />
            </Form.Item>
            <Form.Item label="LevelDes">
              <Input
                placeholder="层级说明"
                onChange={(e: ChangeEvent) => this.onChangeTagDes(e)}
                value={this.state.LevelDes}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
