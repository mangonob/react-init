import classNames from 'classnames';
import { useState } from 'react';
import { LeaderLineReact } from 'src/components';
import styles from './index.module.scss';

export default function LeaderLineExamples() {
  const [source, setSource] = useState<HTMLElement | null>();
  const [target, setTarget] = useState<HTMLElement | null>();

  return (
    <>
      <LeaderLineReact source={source} target={target} />
      <div className={styles.examples}>
        <div className={styles.container}>
          <div
            ref={setSource}
            className={classNames(styles.block, styles.source)}
          >
            Source
          </div>
          <div
            ref={setTarget}
            className={classNames(styles.block, styles.target)}
          >
            Target
          </div>
        </div>
      </div>
    </>
  );
}
