import React from 'react';
import styles from './layout.less';
import { Layout, Menu, Icon, Avatar, Dropdown, Modal } from 'antd';
import { connect } from 'dva';
import Nav from "./components/Nav";
import Routes from "./components/Routes";
import cookie from "./../../utils/cookie";

const { Header, Content, Footer, Sider } = Layout;
// const SubMenu = Menu.SubMenu;

class MyLayout extends React.Component {
  componentDidMount() {
    // this.props.dispatch({ type: 'login/getUser' })
  }
  state = {
    collapsed: false
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  autoToggle = (bool) => {
    this.setState({
      collapsed: bool
    })
  }
  render() {
    const { props } = this
    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          breakpoint="lg"
          collapsible={true}
          collapsedWidth="0"
          collapsed={this.state.collapsed}
          trigger={null}
          onBreakpoint={this.autoToggle}
          width={100}
          style={{ overflow: 'hidden' }}
        >

          <Nav actMenu={this.props.location.pathname} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              style={{ fontSize: '18px', marginLeft: '10px' }}
              onClick={this.toggle}
            />
            <Dropdown overlay={(
              <Menu>
                <Menu.Item onClick={() => {
                  Modal.confirm({
                    title: '确定退出登录？',
                    content: '注销后需重新登录！',
                    okText: '确定',
                    cancelText: '取消',
                    okType: 'danger',
                    onOk() {
                      return new Promise((resolve, reject) => {
                        resolve()
                        props.history.push('/login')
                        cookie.clearCookie()
                      })
                        .catch((e) => console.log(e));
                    },
                  });
                }}>
                  <Icon type="poweroff" theme="outlined" />
                  注销
                </Menu.Item>
              </Menu>
            )} placement="bottomCenter" trigger={['click']}>
              <Avatar className={styles.avatar} size="large">
                邢力
            </Avatar>
            </Dropdown>
          </Header>
          <Content style={{ marginTop: 10 }}>
            <div style={{ background: '#fff' }}>
              <Routes indexUrl={this.props.match.url} role={this.props.user.role} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            OA ©2018 Created by 明理院
      </Footer>
        </Layout>
      </Layout>
    );
  };
}

export default connect(({ login }) => ({
  loginLoading: login.loginLoading,
  user: login.user
}))(MyLayout);
