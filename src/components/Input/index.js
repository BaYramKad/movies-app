import { Input } from 'antd';
import React from 'react';
import '../movies-style.css';
export const InputComponent = ({ inputEvent }) => {
  return <Input className="input-style" placeholder="Search" onChange={inputEvent} />;
};
