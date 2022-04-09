import React, { useMemo } from 'react';
import styles from './index.module.scss';
import appIcon from 'src/assets/images/icon.png';
import classNames from 'classnames';
import { Button } from 'antd';
import { useItmsServices } from './hooks';
import styled from 'styled-components';
import { SizedBox } from 'src/components/container/sized-box';

const StyledButton = styled(Button)`
  && {
    border-radius: 50px;
    height: 54px;
    width: 204px;
    color: white;
    font-size: 16px;
    background-color: #3a6a8f;
    border: 1px solid #61a4d8;

    &[disabled] {
      color: #dadada;
      background-color: #6c7378;
      border-color: #a9a9a9;
    }
  }
`;

export default function Downloader() {
  const inSafari = useMemo(() => {
    return /safari/i.test(navigator.userAgent);
  }, []);

  const itmsUrl = useItmsServices(
    'https://trinitytree.coding.net/p/tempproject/d/cms-ds-ota/git/raw/main/manifest.plist'
  );

  return (
    <div className={styles.bgContainer}>
      <div className={styles.squareBox}>
        <div
          className={classNames(styles.squareDecorator, styles.squareLeft)}
        ></div>
        <div
          className={classNames(styles.squareDecorator, styles.squareRight)}
        ></div>
      </div>

      <section className={styles.assets}>
        <label>
          招银直销<label>(v1.0)</label>
        </label>
        <SizedBox height={16} />
        <img height={126} width={126} src={appIcon}></img>
      </section>
      <SizedBox height={60} />
      <a href={inSafari ? itmsUrl : undefined}>
        <StyledButton disabled={!inSafari}>Download</StyledButton>
      </a>
      {!inSafari && (
        <>
          <SizedBox height={10} />
          <label className={styles.warn}>请使用Safari浏览器下载</label>
        </>
      )}
    </div>
  );
}
