import { Spin } from 'antd';
import React from 'react';
import './access-style.css';

export const Loader = (size) => {
  return (
    <Spin tip="Loading" size={size}>
      <div className="content-loader" />
    </Spin>
  );
};
