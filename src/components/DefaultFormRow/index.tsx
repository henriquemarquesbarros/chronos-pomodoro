import styles from './styles.module.css';

type DefaultFormRowProps = {
  children: React.ReactNode;
};

export function DefaultFormRow({ children }: DefaultFormRowProps) {
  return <div className={styles.formRow}>{children}</div>;
}
