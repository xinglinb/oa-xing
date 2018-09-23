import React from 'react';
import { connect } from 'dva';
import { Table, Drawer } from 'antd';
import SearchForm from "./SearchForm";
import MemberForm from "./MemberForm";

class MemberManager extends React.Component {
  state = {
    visible: false
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'member/getMember'
    })
  }
  showMember = (row) => {
    this.setState({
      visible: true
    })
    this.props.dispatch({
      type: 'member/changeMember',
      payload: row
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
            this.showMember(record)
          }}>{text}</a>
        }
      },
      {
        title: '部门',
        dataIndex: 'depart'
      }, {
        title: '校区',
        dataIndex: 'campus'
      }, {
        title: '角色',
        dataIndex: 'role'
      }, {
        title: '学号',
        dataIndex: 'stuid',
      }, {
        title: '电话',
        dataIndex: 'phone'
      }, {
        title: 'QQ',
        dataIndex: 'qq',
      }, {
        title: '状态',
        dataIndex: 'status',
      }
    ];
    return (
      <div>
        <SearchForm />
        <Table
          dataSource={this.props.members}
          columns={columns}
          scroll={{ x: 780 }}
          loading={this.props.loading}
        />
        <Drawer
          title={"成员信息：" + this.props.actMember.name}
          placement="right"
          width={document.body.clientWidth > 992 ? '50%' : '90%'}
          onClose={() => { this.setState({ visible: false }) }}
          visible={this.state.visible}
        >
          <MemberForm />
        </Drawer>
      </div >
    );
  }

}

export default connect(({ member }) => ({
  members: member.members,
  loading: member.loading,
  actMember: member.actMember,
}))(MemberManager);


