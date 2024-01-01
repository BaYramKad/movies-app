import { Alert } from 'antd';
import React from 'react';

export const Error = () => {
  return (
    <Alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description Error Description Error Description"
      type="error"
      closable
    />
  );
};
