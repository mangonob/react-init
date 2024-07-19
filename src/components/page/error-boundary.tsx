import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate, useRouteError } from 'react-router';
import PageLoadError from './error';

export default function PageLoadErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  return error instanceof PageLoadError ? (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          回首页
        </Button>
      }
    />
  ) : (
    <p>{`Error: ${(error as Error).message}`}</p>
  );
}
