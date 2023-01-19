import styles from './ProgressBar.module.scss';

export const ProgressBar = () =>
{
  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
    </div>
  );
};
