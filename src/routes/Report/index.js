import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import WriteReport from "./tabsComponents/WriteReport/";
import MyReport from "./tabsComponents/MyReport";
import ExamReport from "./tabsComponents/ExamReport/";

class Report extends React.Component {
  state = {
    titleKey: 'one',
    tabListTitle: [
      {
        key: 'one',
        tab: '填写汇报',
        role: 0
      },
      {
        key: 'two',
        tab: '我的汇报',
        role: 0
      },
      {
        key: 'three',
        tab: '审核汇报',
        role: 1
      }
    ],
    contentList: {
      one: <WriteReport />,
      two: <MyReport />,
      three: <ExamReport />,
    }
  }
  render() {
    return (
      <Card
        style={{ width: '100%' }}
        tabList={this.state.tabListTitle.filter(item => item.role <= this.props.user.role)}
        activeTabKey={this.state.titleKey}
        onTabChange={(key) => { this.setState({ titleKey: key }) }}
      >
        {this.state.contentList[this.state.titleKey]}
      </Card>
    );
  }

}


export default connect(({ login }) => ({
  user: login.user
}))(Report);
