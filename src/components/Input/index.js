import { Input } from 'antd';
import React from 'react';

export const InputComponent = ({ inputEvent }) => {
  return <Input style={{ marginBottom: 30 }} placeholder="Search" onChange={inputEvent} />;
};
