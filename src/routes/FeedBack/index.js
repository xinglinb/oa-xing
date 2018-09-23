import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import AllFeedBack from "./tabsComponents/AllFeedBack";

class FeedBack extends React.Component {
  state = {
    titleKey: 'one',
    tabListTitle: [
      {
        key: 'one',
        tab: '所有反馈',
        role: 1
      }
    ],
    contentList: {
      one: <AllFeedBack />
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

FeedBack.propTypes = {
};

export default connect(({ login }) => ({
  user: login.user
}))(FeedBack);
