import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';
import md5 from "md5";

const FormItem = Form.Item;

const MySetting = Form.create()(
  class extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let params = {}
          for (var key in values) {
            if (values.hasOwnProperty(key) && values[key] !== '' && key !== 'oldPwd' && key !== 'newPwd')
              params[key] = values[key]
          }
          if (JSON.stringify(params) !== '{}')
            this.props.dispatch({
              type: 'setting/changeInfo',
              payload: params
            })
          if (!!values.oldPwd && !!values.newPwd) {
            this.props.dispatch({
              type: 'setting/changePwd',
              payload: {
                oldPwd: md5(values.oldPwd),
                newPwd: md5(values.newPwd),
              }
            })
          }
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
          sm: { span: 8 },
        }
      }
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 8,
            offset: 3,
          },
        },
      };
      return (
        <Form>
          <FormItem label="电话号码" {...formCol} >
            {getFieldDecorator('phone')(
              <Input />
            )}
          </FormItem>
          <FormItem label="QQ" {...formCol} >
            {getFieldDecorator('qq')(
              <Input />
            )}
          </FormItem>
          <FormItem label="邮箱" {...formCol} >
            {getFieldDecorator('email')(
              <Input />
            )}
          </FormItem>
          <FormItem label="银行卡" {...formCol} >
            {getFieldDecorator('debitcard')(
              <Input />
            )}
          </FormItem>
          <FormItem label="原密码" {...formCol} >
            {getFieldDecorator('oldPwd')(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem label="新密码" {...formCol} >
            {getFieldDecorator('newPwd')(
              <Input type="password" />
            )}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <div style={{ display: 'flex' }}>
              <Button onClick={this.handleSubmit} type="primary">修改</Button>
              <p style={{ lineHeight: '25px', marginLeft: 10, marginTop: -10 }}>
                注：修改单项信息只需要填写单项就可以了，修改密码的话需要同时填写原密码！
              </p>
            </div>
          </FormItem>
        </Form>
      );
    }

  }
)

export default connect(({ home }) => ({
  announces: home.announces
}))(MySetting);
