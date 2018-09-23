import React from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;

const MemberForm = Form.create()(
  class extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.dispatch({
        type: 'member/updataMember',
        payload: this.props.form.getFieldsValue()
      }).then(res => {
        this.props.dispatch({
          type: 'member/getMember'
        })
      })
    }
    render() {
      const { form: { getFieldDecorator }, actMember, user: { role } } = this.props;
      const twoFormCol = {
        labelCol: {
          xs: { span: 24 },
          lg: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          lg: { span: 16 },
        }
      }
      const oneFormCol = {
        labelCol: {
          xs: { span: 24 },
          lg: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          lg: { span: 16 },
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
            offset: 4,
          },
        },
      };
      const formStyle = {}
      return (
        <Form>
          <Row gutter={8}>
            <Col lg={12} xs={24}>
              <FormItem style={formStyle} label="学号/性别：" {...twoFormCol} >
                {getFieldDecorator('name', {
                  initialValue: actMember.name
                })(
                  <Input disabled />
                )}
              </FormItem>
            </Col>
            <Col lg={8} xs={24}>
              <FormItem style={formStyle}>
                {getFieldDecorator('sex', {
                  initialValue: actMember.sex
                })(
                  <Input disabled />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col lg={12} xs={24}>
              <FormItem style={formStyle} label="学院/班级：" {...twoFormCol} >
                {getFieldDecorator('college', {
                  initialValue: actMember.college
                })(
                  <Input disabled />
                )}
              </FormItem>
            </Col>
            <Col lg={8} xs={24}>
              <FormItem style={formStyle}>
                {getFieldDecorator('major', {
                  initialValue: actMember.major
                })(
                  <Input disabled />
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem style={formStyle} label="状态：" {...oneFormCol}>
            {getFieldDecorator('status', {
              initialValue: actMember.status
            })(
              <Select style={{ width: '100%' }}>
                {this.props.memberStatus.map(item => (
                  <Option key={item.key} value={item.value}>{item.value}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <Row gutter={8}>
            <Col lg={12} xs={24}>
              <FormItem style={formStyle} label="部门：" {...twoFormCol} >
                {getFieldDecorator('depart', {
                  initialValue: actMember.depart
                })(
                  <Select style={{ width: '100%' }} disabled={role < 2}>
                    {this.props.departs.map(item => (
                      <Option key={item.key} value={item.value}>{item.value}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col lg={8} xs={24}>
              <FormItem style={formStyle}>
                {getFieldDecorator('role', {
                  initialValue: actMember.role
                })(
                  <Select style={{ width: '100%' }}>
                    {this.props.memberRole.map(item => (
                      <Option key={item.key} disabled={Number(item.key) > role} value={item.value}>{item.value}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem style={formStyle} label="校区：" {...oneFormCol}>
            {getFieldDecorator('campus', {
              initialValue: actMember.campus
            })(
              <Select style={{ width: '100%' }}>
                {this.props.campus.map(item => (
                  <Option key={item.key} value={item.value}>{item.value}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem style={formStyle} label="电话：" {...oneFormCol}>
            {getFieldDecorator('phone', {
              initialValue: actMember.phone
            })(
              <Input addonBefore="+86" />
            )}
          </FormItem>
          <FormItem style={formStyle} label="Q Q：" {...oneFormCol}>
            {getFieldDecorator('qq', {
              initialValue: actMember.qq
            })(
              <Input />
            )}
          </FormItem>
          <FormItem style={formStyle} label="邮箱：" {...oneFormCol}>
            {getFieldDecorator('email', {
              initialValue: actMember.email
            })(
              <Input />
            )}
          </FormItem>
          <FormItem style={formStyle} label="银行卡号：" {...oneFormCol}>
            {getFieldDecorator('debitcard', {
              initialValue: actMember.debitcard
            })(
              <Input />
            )}
          </FormItem>
          <FormItem style={formStyle} label="密码：" {...oneFormCol}>
            {getFieldDecorator('password')(
              <Input type="password" placeholder='若无需修改请留空白' />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button onClick={this.handleSubmit} type="primary">更新并保存</Button>
          </FormItem>
        </Form>
      );
    }

  }
)

export default connect(({ member, login }) => ({
  actMember: member.actMember,
  memberStatus: login.memberStatus,
  departs: login.departs,
  memberRole: login.memberRole,
  campus: login.campus,
  user: login.user
}))(MemberForm);
