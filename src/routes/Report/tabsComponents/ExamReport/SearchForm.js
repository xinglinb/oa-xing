import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input, Select } from 'antd';

const Option = Select.Option;
const Search = Input.Search;

class SearchForm extends React.Component {
  componentDidMount() {

  }
  updateSelect(key, value) {
    this.props.dispatch({
      type: 'report/getExamReportFromForm',
      payload: {
        key,
        value
      }
    })
  }
  render() {
    return (
      <Row style={{ marginTop: -8 }}>
        <Col xl={4} sm={6} xs={24} style={{ marginBottom: 15 }}>
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
        <Col xl={4} sm={6} xs={24} style={{ marginBottom: 15 }}>
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
        <Col xl={{ span: 6, offset: 8 }} sm={{ span: 6, offset: 3 }} xs={{ span: 24, offset: 0 }} style={{ textAlign: 'right', marginBottom: 15 }}>
          <Row>
            <Col span={6} style={{ textAlign: 'right', height: 32, lineHeight: '32px' }}>
              筛选：
              </Col>
            <Col span={18}>
              <Search
                placeholder="可输入姓名、学号（回车筛选）"
                onSearch={value => {
                  this.updateSelect('contact', value)
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col xl={{ span: 2, offset: 0 }} sm={{ span: 2, offset: 1 }} xs={24} style={{ marginBottom: 15, textAlign: 'right' }}>
          <Button type="primary" onClick={() => {
            this.props.dispatch({ type: 'report/getReportExcel' })
          }}>导出excel</Button>
        </Col>
      </Row>
    );
  }

}

export default connect(({ report, login }) => ({
  searchFrom: report.searchFrom,
  campus: login.campus,
  departs: login.departs,
}))(SearchForm);


