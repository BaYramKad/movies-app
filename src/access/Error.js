import { Alert } from 'antd';
import React from 'react';

export const Error = ({ reasonError, network }) => {
  if (network) {
    return (
      <Alert
        message={`Error: No internet connection`}
        description={'Please check your network settings.'}
        type="error"
        closable
      />
    );
  } else {
    const { status, statusText, url } = reasonError;
    const text = !statusText.length ? `Could not fetch ${url}, received ${status}` : statusText;
    return <Alert message={`Error ${status}`} description={text} type="error" closable />;
  }
};
