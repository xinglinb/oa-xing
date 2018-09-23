import React from 'react';
import { Form, Input, Button, Switch, DatePicker } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const ReportSetting = Form.create()(
  class extends React.Component {
    componentDidMount() {
      this.props.dispatch({
        type: 'setting/getStatus'
      })
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'setting/openStatus',
            payload: values
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
      const { status } = this.props
      return (
        <Form>
          <FormItem label="汇报开关" {...formCol} >
            <Switch onChange={value => {
              this.props.dispatch({
                type: 'setting/changeStatus',
                payload: value
              })
            }} checked={status.report_stat === 'open'} />
          </FormItem>
          {
            status.report_stat === 'open'
            && <div>
              <FormItem label="汇报对应工作日期" {...formCol} >
                {getFieldDecorator('work_date', {
                  initialValue: [moment(status.work_start_date, dateFormat), moment(status.work_end_date, dateFormat)]
                })(
                  <RangePicker format={dateFormat} />
                )}
              </FormItem>
              <FormItem label="汇报提交起止时间" {...formCol} >
                {getFieldDecorator('report_date', {
                  initialValue: [moment(status.report_start_date, dateFormat), moment(status.report_end_date, dateFormat)]
                })(
                  <RangePicker format={dateFormat} />
                )}
              </FormItem>
              <FormItem label="部长审核起止时间" {...formCol} >
                {getFieldDecorator('review_date', {
                  initialValue: [moment(status.review_start_date, dateFormat), moment(status.review_end_date, dateFormat)]
                })(
                  <RangePicker format={dateFormat} />
                )}
              </FormItem>

              <FormItem {...tailFormItemLayout}>
                <Button onClick={this.handleSubmit} type="primary">开启汇报通道</Button>
              </FormItem>
            </div>
          }

        </Form>
      );
    }

  }
)

export default connect(({ setting }) => ({
  status: setting.status
}))(ReportSetting);
