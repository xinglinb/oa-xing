import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input, Select } from 'antd';

const Option = Select.Option;

class SearchForm extends React.Component {
  componentDidMount() {

  }
  updateSelect(key, value) {
    this.props.dispatch({
      type: 'member/getMemberFromForm',
      payload: {
        key,
        value
      }
    })
  }
  render() {
    return (
      <Row style={{ marginTop: -8 }}>
        <Col xl={4} sm={5} xs={24} style={{ marginBottom: 15 }}>
          <Row>
            <Col span={6} style={{ textAlign: 'right', height: 32, lineHeight: '32px' }}>
              届别：
              </Col>
            <Col span={18}>
              <Select
                value={this.props.searchFrom.period}
                style={{ width: '100%' }}
                onChange={value => {
                  this.updateSelect('period', value)
                }}
              >
                <Option value={13}>第13届</Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col xl={4} sm={5} xs={24} style={{ marginBottom: 15 }}>
          <Row>
            <Col span={6} style={{ textAlign: 'right', height: 32, lineHeight: '32px' }}>
              校区：
              </Col>
            <Col span={18}>
              <Select
                value={this.props.searchFrom.campus}
                style={{ width: '100%' }}
                onChange={value => {
                  this.updateSelect('campus', value)
                }}
              >
                <Option value="">all</Option>
                {this.props.campus.map(item => (
                  <Option value={item.value} key={item.key}>{item.text}</Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Col>
        <Col xl={4} sm={5} xs={24} style={{ marginBottom: 15 }}>
          <Row>
            <Col span={6} style={{ textAlign: 'right', height: 32, lineHeight: '32px' }}>
              部门：
              </Col>
            <Col span={18}>
              <Select
                value={this.props.searchFrom.depart}
                style={{ width: '100%' }}
                onChange={value => {
                  this.updateSelect('depart', value)
                }}
              >
                <Option value="">all</Option>
                {this.props.departs.map(item => (
                  <Option value={item.value} key={item.key}>{item.text}</Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Col>
        <Col xl={{ span: 6, offset: 4 }} sm={{ span: 6, offset: 0 }} xs={{ span: 24, offset: 0 }} style={{ textAlign: 'right', marginBottom: 15 }}>
          <Row>
            <Col span={6} style={{ textAlign: 'right', height: 32, lineHeight: '32px' }}>
              筛选：
              </Col>
            <Col span={18}>
              <Input placeholder="可输入姓名、学号、手机号（回车筛选）" />
            </Col>
          </Row>
        </Col>
        <Col xl={{ span: 2, offset: 0 }} sm={{ span: 2, offset: 1 }} xs={24} style={{ marginBottom: 15, textAlign: 'right' }}>
          <Button type="primary" onClick={() => {
            this.props.dispatch({ type: 'member/getMemberExcel' })
          }}>导出excel</Button>
        </Col>
      </Row>
    );
  }

}

export default connect(({ member, login }) => ({
  searchFrom: member.searchFrom,
  campus: login.campus,
  departs: login.departs,
}))(SearchForm);


