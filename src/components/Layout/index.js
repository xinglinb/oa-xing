import React from 'react';
import styles from './layout.less';
import { Layout, Menu, Icon, Avatar, Dropdown, Modal, Drawer } from 'antd';
import { connect } from 'dva';
import Nav from "./components/Nav";
import Routes from "./components/Routes";
import cookie from "./../../utils/cookie";

const { Header, Content, Footer, Sider } = Layout;
// const SubMenu = Menu.SubMenu;

class MyLayout extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'login/getUser' })
      .catch(e => {
        console.log(e);
      })
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
        {
          document.body.clientWidth > 992 && <Sider
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
        }
        {
          document.body.clientWidth <= 992 && <Drawer
            placement='left'
            closable={false}
            onClose={() => { this.autoToggle(false) }}
            visible={this.state.collapsed}
            width={100}
            style={{
              backgroundColor: '#001529',
              padding: 0,
              height: '100%',
            }}
          >
            <Nav actMenu={this.props.location.pathname} />
          </Drawer>
        }

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
                        props.dispatch({ type: 'login/logout' })
                          .then(res => {
                            resolve()
                            if (res.success) {
                              props.history.push('/login')
                              cookie.clearCookie()
                            }
                          })
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
                {props.user.name}
              </Avatar>
            </Dropdown>
          </Header>
          <div style={{ maxHeight: document.body.clientHeight - 64, overflow: 'auto' }}>
            <Content style={{ marginTop: 10, }}>
              <div style={{ background: '#fff' }}>
                <Routes indexUrl={this.props.match.url} role={this.props.user.role} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              OA ©2018 Created by 明理院
            </Footer>
          </div>

        </Layout>
      </Layout>
    );
  };
}

export default connect(({ login }) => ({
  loginLoading: login.loginLoading,
  user: login.user
}))(MyLayout);
