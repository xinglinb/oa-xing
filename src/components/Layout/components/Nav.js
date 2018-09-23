import React from 'react';
import { connect } from 'dva';
import { Menu, Icon, Modal } from 'antd';
import { Link } from 'dva/router';
import SuggestFrom from "./SuggestFrom";
import styles from './../layout.less';

class Nav extends React.Component {
  state = {
    visible: false,
    submitLodaing: false
  }
  showModel = () => {
    this.setState({
      visible: true
    })
  }
  hideModel = () => {
    this.setState({
      visible: false
    })
  }
  handleOk = () => {
    this.refs.suggestFromRef.validateFields((err, values) => {
      if (!err) {
        this.setState({ submitLodaing: true })
        this.props.dispatch({
          type: 'feedback/seedFeedback',
          payload: values
        }).then(res => {
          if (res.success) {
            this.refs.suggestFromRef.resetFields()
            this.setState({ visible: false })
          }
        }).finally(() => {
          this.setState({ submitLodaing: false })
        })
      }
    })
  }
  render() {
    const { nav, actMenu, user } = this.props
    return (
      <div style={{ height: '100%', position: "relative", minHeight: 450 }}>
        <div className={styles.logos} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[actMenu]}>
          {
            nav.filter(item => item.role <= user.role)
              .map(item => (
                <Menu.Item key={item.url}>
                  <Link to={item.url}>
                    <Icon type={item.icon} />
                    <span>{item.name}</span>
                  </Link>
                </Menu.Item>
              ))
          }
        </Menu>
        <Icon type="message" theme="outlined" className={styles.message} onClick={this.showModel} />
        <Modal
          title="吐槽/建议"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.hideModel}
          confirmLoading={this.state.submitLodaing}
        >
          <SuggestFrom
            ref="suggestFromRef"
          />
        </Modal>
      </div>
    );
  }
}

Nav.propTypes = {
};

export default connect(({ login }) => ({
  nav: login.nav,
  user: login.user
}))(Nav);
