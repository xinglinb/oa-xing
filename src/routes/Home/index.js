import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import Notice from "./tabsComponents/Notice";
import SendNotice from "./tabsComponents/SendNotice";

class Home extends React.Component {
  state = {
    titleKey: 'one',
    tabListTitle: [
      {
        key: 'one',
        tab: '通知公告',
      },
      {
        key: 'two',
        tab: '发通知',
      }
    ],
    contentList: {
      one: <Notice />,
      two: <SendNotice />,
    }
  }
  render() {
    return (
      <Card
        style={{ width: '100%' }}
        tabList={this.state.tabListTitle}
        activeTabKey={this.state.titleKey}
        onTabChange={(key) => { this.setState({ titleKey: key }) }}
      >
        {this.state.contentList[this.state.titleKey]}
      </Card>
    );
  }

}

Home.propTypes = {
};

export default connect(({ home }) => ({

}))(Home);
