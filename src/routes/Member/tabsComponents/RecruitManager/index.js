import React from 'react';
import { connect } from 'dva';
import { Table, Drawer } from 'antd';
import SearchForm from "./SearchForm";
import RecruitForm from "./RecruitForm";

class RecruitManager extends React.Component {
  state = {
    visible: false
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'recruit/getRecruit'
    }).then(res => {
      console.log(res)
    })
  }
  showRecruit = (row) => {
    this.props.dispatch({
      type: 'recruit/getRecruitDetail',
      payload: row
    }).then(() => {
      this.setState({
        visible: true
      })
    })
  }
  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        render: (text, record, index) => {
          return <a onClick={() => {
            this.showRecruit(record)
          }}>{text}</a>
        }
      },
      {
        title: '申请部门',
        dataIndex: 'depart'
      },
      {
        title: '学号',
        dataIndex: 'stuid'
      },
      {
        title: '手机号',
        dataIndex: 'phone'
      },
      {
        title: 'QQ号',
        dataIndex: 'qq'
      },
      {
        title: '校区',
        dataIndex: 'campus'
      },
      {
        title: '学院',
        dataIndex: 'college'
      },
      {
        title: '专业',
        dataIndex: 'major'
      },
      {
        title: '性别',
        dataIndex: 'sex'
      },
      {
        title: '申请时间',
        dataIndex: 'time'
      }
    ];
    return (
      <div>
        <SearchForm />
        <Table
          dataSource={this.props.recruits}
          columns={columns}
          scroll={{ x: 1200 }}
          loading={this.props.loading}
          rowKey='key'
        />
        <Drawer
          title={"应聘详情：" + this.props.actRecruit.name}
          placement="right"
          width={document.body.clientWidth > 992 ? document.body.clientWidth < 1600 ? '70%' : '50%' : '90%'}
          onClose={() => { this.setState({ visible: false }) }}
          visible={this.state.visible}
        >
          <RecruitForm />
        </Drawer>
      </div >
    );
  }

}

export default connect(({ recruit }) => ({
  recruits: recruit.recruits,
  actRecruit: recruit.actRecruit,
  loading: recruit.loading
}))(RecruitManager);


