import React from 'react';
import { connect } from 'dva';
import { Collapse, Spin } from 'antd';

const Panel = Collapse.Panel;

class Notice extends React.Component {
  state = {
    loading: false
  }
  componentDidMount() {
    this.setState({ loading: true })
    this.props.dispatch({
      type: 'home/announce'
    }).finally(() => {
      this.setState({ loading: false })
    })
  }
  render() {
    return (
      <Spin spinning={this.state.loading}>
        <Collapse bordered={false}>
          {
            this.props.announces.map(item => (
              <Panel
                header={(<p style={{ margin: 0 }}>{item.time}&nbsp;&nbsp;&nbsp;&nbsp;{item.title}</p>)}
                key={item.id}
              >
                {item.content}
              </Panel>
            ))
          }
        </Collapse>
      </Spin>
    );
  }

}

export default connect(({ home }) => ({
  announces: home.announces
}))(Notice);
