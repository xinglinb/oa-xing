import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const { TextArea } = Input;

const SendNotice = Form.create()(
  class extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'home/sendAnnounce',
            payload: values
          }).then(res => {
            if (res.success) {
              this.props.form.resetFields()
            }
          })
        }
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      const formCol = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 3 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        }
      }
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 3,
          },
        },
      };
      return (
        <Form>
          <FormItem
            label="标题"
            {...formCol}
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请填写标题！' }],
            })(
              <Input placeholder="标题" />
            )}
          </FormItem>
          <FormItem
            label="详情"
            {...formCol}
          >
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '不写点什么吗？' }],
            })(
              <TextArea placeholder="请填写通告详情" autosize={{ minRows: 7, maxRows: 7 }} />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button onClick={this.handleSubmit} type="primary">发布公告</Button>
          </FormItem>
        </Form>
      );
    }

  }
)

export default connect(({ home }) => ({
  announces: home.announces
}))(SendNotice);
