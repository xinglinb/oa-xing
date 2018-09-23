import React from 'react';
import { Form, Input, Button, Row, Col, Select, Steps } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step;

const RecruitForm = Form.create()(
  class extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.props.form.getFieldsValue());

      this.props.dispatch({
        type: 'recruit/updataRecruitStatus',
        payload: this.props.form.getFieldsValue()
      }).then(res => {
        // this.props.dispatch({
        //   type: 'recruit/getRecruit'
        // })
      })
    }
    render() {
      const { form: { getFieldDecorator }, actRecruit } = this.props;
      const FormCol = {
        labelCol: {
          xs: { span: 24 },
          lg: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          lg: { span: 12 },
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
      return (
        <Form>
          <Row gutter={8}>
            <Steps
              current={actRecruit.status.current}
              status="process"
              direction={document.body.clientWidth > 992 ? 'horizontal' : "vertical"}
              size={document.body.clientWidth > 992 ? 'default' : "small"}
            >
              {actRecruit.status.steps.map(item => (
                <Step title={item.title} description={item.desc} key={item.key} />
              ))}
            </Steps>
          </Row>
          <Row gutter={8} style={{ marginTop: 20 }}>
            <Col lg={6} xs={24} style={{ textAlign: 'center', fontSize: 20 }}>
              处理申请：
            </Col>
            <Col lg={18} xs={24}>
              <FormItem label="更新状态" {...FormCol}>
                {getFieldDecorator('status')(
                  <Select style={{ width: '100%' }} placeholder='处理简历'  >
                    {this.props.recruitStatus.map(item => (
                      <Option value={item.key} key={item.key}>{item.value}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              {
                this.props.form.getFieldValue('status') === 5
                && <FormItem label="转部门" {...FormCol}>
                  {getFieldDecorator('depart', {
                    initialValue: actRecruit.depart
                  })(
                    <Select style={{ width: '100%' }}>
                      {this.props.departs.map(item => (
                        <Option value={item.value} key={item.key}>{item.value}</Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              }

              <FormItem label="操作备注" {...FormCol}>
                {getFieldDecorator('desc')(
                  <Input placeholder='如：有编程经验。。。' />
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button onClick={this.handleSubmit} type="primary">更新并保存</Button>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8} style={{ marginTop: 20 }}>
            <Col lg={6} xs={24} style={{ textAlign: 'center', fontSize: 20 }}>
              自我介绍：
            </Col>
            <Col lg={18} xs={24} style={{ marginTop: 6 }}>
              {actRecruit.say}
            </Col>
          </Row>

        </Form>
      );
    }

  }
)

export default connect(({ recruit, login }) => ({
  actRecruit: recruit.actRecruit,
  recruitStatus: login.recruitStatus,
  departs: login.departs
}))(RecruitForm);
