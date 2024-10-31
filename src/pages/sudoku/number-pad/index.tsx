import styles from './index.module.scss';

export interface NumberPadProps {
  onChange?: (value: number) => void;
}

export default function NumberPad(props: NumberPadProps) {
  const { onChange } = props;

  const renderCell = (index: number) => {
    return (
      <div
        key={index}
        className={styles.cell}
        onClick={() => onChange?.(index + 1)}
      >
        <span>{index + 1}</span>
      </div>
    );
  };

  return (
    <div className={styles.numberPad}>
      {Array.from({ length: 9 }).map((_, i) => renderCell(i))}
    </div>
  );
}
