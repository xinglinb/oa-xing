import React from 'react';
import { connect } from 'dva';
import { Table, Drawer } from 'antd';

class AllFeedBack extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'feedback/getFeedbackData'
    })
  }
  render() {
    const columns = [
      {
        title: '反馈类型',
        dataIndex: 'type',
        key: 'type'
      }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '部门',
        dataIndex: 'depart',
        key: 'depart'
      }, {
        title: '反馈内容',
        dataIndex: 'content',
        key: 'content',
        width: '40%'
      }, {
        title: '反馈时间',
        dataIndex: 'time',
        key: 'time'
      }];
    return (
      <div>
        <Table
          dataSource={this.props.feedbacks}
          rowKey='time'
          columns={columns}
          scroll={{ x: 900 }}
          loading={this.props.loading}
        />
      </div >
    );
  }

}

export default connect(({ feedback }) => ({
  feedbacks: feedback.feedbacks,
  loading: feedback.loading
}))(AllFeedBack);


