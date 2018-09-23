import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import WriteForm from "./WriteForm";

class WriteReport extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'report/getReportStatus'
    })
  }
  render() {

    return (
      <div>
        {
          this.props.reportStatus.report_stat === 'open'
          && <Row gutter={24}>
            <Col lg={12} xs={24}>
              <WriteForm />
            </Col>
            <Col lg={12} xs={24} style={{ fontSize: '16px', lineHeight: '30px' }}>
              <p style={{ fontSize: '28px' }}>注意事项：</p>
              １、本次汇报开启时间：
            <span style={{ color: '#d73435' }}>
                {this.props.reportStatus.report_start_date} ~ {this.props.reportStatus.report_end_date}
              </span><br />
              ２、本次审核开启时间：
            <span style={{ color: '#d73435' }}>
                {this.props.reportStatus.review_start_date} ~ {this.props.reportStatus.review_end_date}
              </span><br />
              ３、工作汇报不必提及值班、值日、开会等常规工作<br />
              ４、工作汇报中不要填写与工作室无关的工作，如组织班级活动等<br />
              ５、另外有任何想说的话请填写在`意见建议`中<br />
            </Col>
          </Row>
        }
        {
          this.props.reportStatus.report_stat === 'done'
          && <p style={{ fontSize: '28px', lineHeight: '30px' }}>本轮汇报你已经填写过了哦</p>
        }
        {
          this.props.reportStatus.report_stat === 'close'
          && <div style={{ fontSize: '16px', lineHeight: '30px' }}>
            <p style={{ fontSize: '28px' }}>本轮汇报尚未开始</p>
            １、汇报时间一般为每个月15号左右，届时会有通知<br />
            ２、如通知汇报开启，请及时提交工作汇报<br />
          </div>
        }
      </div >
    );
  }

}

export default connect(({ report }) => ({
  reportStatus: report.reportStatus
}))(WriteReport);


