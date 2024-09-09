import { Alert, Button, Result, Space } from 'antd';
import { useState } from 'react';
import { useNavigate, useRouteError } from 'react-router';
import PageLoadError from './error';
import styles from './index.module.scss';

export default function PageLoadErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const [isViewMore, setViewMore] = useState(false);

  if (error instanceof PageLoadError) {
    return (
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
    );
  } else {
    const errorMessage = String(error);

    const renderMessage = () => {
      const maxCount = 2048;

      return errorMessage.length <= maxCount ? (
        <span className={styles.errorMessage}>{errorMessage}</span>
      ) : (
        <span className={styles.errorMessage}>
          <span>
            {isViewMore ? errorMessage : errorMessage.slice(0, maxCount)}
          </span>
          {isViewMore ? (
            <span
              className={styles.viewMore}
              onClick={() => setViewMore(false)}
            >
              收起
            </span>
          ) : (
            <span className={styles.viewMore} onClick={() => setViewMore(true)}>
              查看全部
            </span>
          )}
        </span>
      );
    };

    return (
      <Result
        className={styles.pageLoadErrorBoundary}
        status="error"
        title="Catastrophic Error"
        subTitle="There are some internal errors in the system that will prevent the page from loading correctly."
        extra={
          <Space size={16}>
            <Button type="default">Go back</Button>
            <Button type="primary">重新载入</Button>
          </Space>
        }
      >
        <Alert
          className={styles.errorAlert}
          type="error"
          showIcon
          message={renderMessage()}
        />
      </Result>
    );
  }
}
