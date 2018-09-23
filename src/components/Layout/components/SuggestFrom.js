import React from 'react';
import { Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

export default Form.create()(
  class extends React.Component {
    render() {
      const { getFieldDecorator } = this.props.form;
      const formCol = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 3 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        }
      }
      return (
        <Form>
          <FormItem
            label="类型"
            {...formCol}
          >
            {getFieldDecorator('value', {
              rules: [{ required: true, message: '请选择吐槽类型！' }],
            })(
              <Select placeholder="选择吐槽类型">
                <Option value="0">吐槽</Option>
                <Option value="1">Bug</Option>
                <Option value="2">脑洞大开</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            label="内容"
            {...formCol}
          >
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '不写点什么吗？' }],
            })(
              <TextArea placeholder="写下自己想反馈的内容吧！" autosize={{ minRows: 7, maxRows: 7 }} />
            )}
          </FormItem>
        </Form>
      );
    }

  }
)

