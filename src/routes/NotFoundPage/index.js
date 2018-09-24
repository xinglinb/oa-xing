import React from 'react'
import { Icon } from 'antd';

function Routes(props) {
  return (
    <div style={{
      height: document.body.clientHeight - 143,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '45px'
    }}>
      <p style={{ textAlign: 'center' }}><Icon type="frown" theme="outlined" /><br />404</p>

    </div>
  )
}
export default Routes
