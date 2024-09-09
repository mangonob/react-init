import styles from './index.module.scss';

export interface ImageMessageProps {
  url?: string;
}

export default function ImageMessage(props: ImageMessageProps) {
  const { url } = props;

  return <img className={styles.imageMessage} src={url} />;
}
