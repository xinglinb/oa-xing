import React from 'react';
import { Form, Input, Button, DatePicker, Row, Col } from 'antd';
import { connect } from 'dva';
import moment from 'moment'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';

const WriteForm = Form.create()(
  class extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.dispatch({
        type: 'report/sendReport',
        payload: this.props.form.getFieldsValue()
      })
    }
    render() {
      const { form: { getFieldDecorator }, reportStatus } = this.props;
      const FormCol = {
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
      return (
        <Form>
          <FormItem label="工作时间" {...FormCol}>
            {getFieldDecorator('desc', {
              initialValue: [moment(reportStatus.work_start_date, dateFormat), moment(reportStatus.work_end_date, dateFormat)]
            })(
              <RangePicker format={dateFormat} disabled />
            )}
          </FormItem>
          <FormItem label="工作陈述" {...FormCol}>
            {getFieldDecorator('content', {
              rules: [
                { required: true, message: '别忘了填啊！' },
              ],
            })(
              <TextArea
                placeholder='本月工作内容，请简明分点陈述，格式如下
                              １、参与XXX项目，完成了首页和Logo设计
                            ２、参与XXX项目，完成前端技术实现'
                autosize={{ minRows: 6, maxRows: 6 }}
              />
            )}
          </FormItem>
          <FormItem label="意见建议" {...FormCol}>
            {getFieldDecorator('suggestion')(
              <TextArea
                placeholder="工作中发现的问题
                            对工作室／部门的意见建议"
                autosize={{ minRows: 3, maxRows: 3 }}
              />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button onClick={this.handleSubmit} type="primary">提交</Button>
          </FormItem>
        </Form>
      );
    }

  }
)

export default connect(({ report }) => ({
  reportStatus: report.reportStatus
}))(WriteForm);
