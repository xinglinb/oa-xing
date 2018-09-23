import React from 'react';
import { connect } from 'dva';
import { Card, Divider, Rate, Spin, Input, InputNumber } from 'antd';
import SearchForm from "./SearchForm";

class ExamReport extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'report/getExamReport'
    })
  }
  examHandler(params) {
    this.props.dispatch({
      type: 'report/examReport',
      payload: params
    })
  }
  render() {
    return (
      <div>
        <SearchForm />
        <Spin spinning={this.props.examLoading}>
          {
            this.props.examReport.map(item => (
              <Card
                title={item.username}
                extra={item.start_date + '~' + item.end_date} key={item.id}
                style={{ marginBottom: 10 }}
              >
                <div style={{ display: 'flex' }}>
                  <div>工作陈述：</div>
                  <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
                <Divider style={{ margin: '8px 0' }} />
                <div style={{ display: 'flex' }}>
                  <div>意见建议：</div>
                  <div dangerouslySetInnerHTML={{ __html: item.suggestion }}></div>
                </div>
                <Divider style={{ margin: '8px 0' }} />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: document.body.clientWidth > 992 ? 75 : 100, lineHeight: '32px' }}>部长回评：</div>
                  <Input defaultValue={item.comment} onPressEnter={e => {
                    this.examHandler({
                      id: item.id,
                      comment: e.target.value
                    })
                  }} disabled={item.status !== 'normal'} placeholder="部长评价（回车确定）" />
                </div>
                <Divider style={{ margin: '8px 0' }} />
                <div>部长打分：<Rate onChange={value => {
                  this.examHandler({
                    id: item.id,
                    rate: value
                  })
                }} disabled={item.status !== 'normal'} allowHalf defaultValue={item.rate} /></div>
                <Divider style={{ margin: '8px 0' }} />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 100, lineHeight: '32px' }}>部长薪资意见：</div>
                  <InputNumber onChange={value => {
                    this.examHandler({
                      id: item.id,
                      salary_sug: value
                    })
                  }} max={400} disabled={item.status !== 'normal'} defaultValue={item.salary.review} />
                </div>
                {
                  this.props.user.role > 1 && <div>
                    <Divider style={{ margin: '8px 0' }} />
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: 100, lineHeight: '32px' }}>Ta的最终薪资：</div>
                      <InputNumber onChange={value => {
                        this.examHandler({
                          id: item.id,
                          salary: value
                        })
                      }} max={400} defaultValue={item.salary.final} />
                    </div>
                  </div>
                }
              </Card>
            ))
          }
        </Spin>
      </div>

    );
  }

}

export default connect(({ report, login }) => ({
  examReport: report.examReport,
  examLoading: report.examLoading,
  user: login.user
}))(ExamReport);


