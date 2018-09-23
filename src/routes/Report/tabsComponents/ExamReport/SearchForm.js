import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input, Select } from 'antd';
import styles from '../../../../assets/index.less';

const Option = Select.Option;

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
    const { user: { role } } = this.props
    const beforeCol = {
      xl: 4, sm: 5, xs: 24
    }
    const endCol = {
      xl: { span: 6, offset: role >= 2 ? 8 : 16 },
      sm: { span: 6, offset: role >= 2 ? 5 : 15 },
      xs: { span: 24, offset: 0 }
    }
    const buttonCol = {
      xl: { span: 2, offset: 0 },
      sm: { span: 2, offset: 1 },
      xs: { span: 24, offset: 0 }
    }
    return (
      <Row style={{ marginTop: -8 }}>
        {
          role >= 2 && [
            <Col key={1} {...beforeCol} className={styles.searchCol}>
              <Row>
                <Col span={6} className={styles.searchColText}>
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
            </Col>,
            <Col key={2} {...beforeCol} className={styles.searchCol}>
              <Row>
                <Col span={6} className={styles.searchColText}>
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
          ]
        }
        <Col {...endCol} className={styles.searchCol}>
          <Row>
            <Col span={6} className={styles.searchColText}>
              筛选：
              </Col>
            <Col span={18}>
              <Input
                placeholder="可输入姓名、学号（回车筛选）"
                onPressEnter={e => {
                  this.updateSelect('contact', e.target.value)
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col {...buttonCol} className={styles.searchColButton}>
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
  user: login.user,
}))(SearchForm);


