import React from 'react';
import { connect } from 'dva';
import { Card, Form, Icon, Input, Button, message } from 'antd';
import styles from "./login.less";
import md5 from "md5";
import cookie from "./../../utils/cookie";

const FormItem = Form.Item;
class Login extends React.Component {
  render() {
    console.log(this.props)
    const { props: { history, dispatch } } = this
    const LoginForm = Form.create()(
      class extends React.Component {
        state = {
          loginLoading: false
        }
        handleSubmit = (e) => {
          e.preventDefault();
          this.props.form.validateFields((err, values) => {
            if (!err) {
              this.setState({ loginLoading: true })
              dispatch({
                type: 'login/login',
                payload: {
                  ...values,
                  password: md5(values.password)
                }
              }).then(res => {
                if (res.success) {
                  cookie.setCookie('hasLogin', 1, 1 / 12)
                  history.push('/')
                } else {
                  this.setState({ loginLoading: false })
                }
              })
            }
          });
        }
        render() {
          const { getFieldDecorator } = this.props.form;
          return (
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: '请输入你的学号！' },
                    { len: 10, message: '学号长度不对！' },
                    { pattern: /[0-9]/g, message: '学号！学号！' }
                  ],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="学号" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入你的密码！' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                )}
              </FormItem>
              <FormItem style={{ margin: 0 }}>
                <Button loading={this.state.loginLoading} type="primary" htmlType="submit" style={{ width: '100%' }}>
                  登录
                  </Button>
                <a style={{ float: 'right' }} onClick={() => {
                  message.warning('忘记密码，找部长去？')
                }}>忘记密码？</a>
              </FormItem>
            </Form>
          );
        }

      }
    )
    return (
      <div className={styles.bacImg}>
        <Card title="工大学子办公系统" bordered={false} className={styles.card}>
          <LoginForm />
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
};

export default connect(({ login }) => ({
  loginLoading: login.loginLoading
}))(Login);
