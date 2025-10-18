import styles from './styles.module.css';

type ButtonIconProps = {
  icon: React.ReactNode;
  children?: React.ReactNode;
  color?: 'green' | 'red' | 'yellow' | 'blue';
} & React.ComponentProps<'button'>;

export function ButtonIcon({
  icon,
  children,
  color = 'green',
  ...props
}: ButtonIconProps) {
  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...props}>
        {icon}
        {children}
      </button>
    </>
  );
}
