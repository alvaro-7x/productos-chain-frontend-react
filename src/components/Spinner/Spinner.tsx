import styles from './Spinner.module.scss';

interface PropsSpinner
{
  texto: boolean;
}

export const Spinner = ({texto}: PropsSpinner) =>
{
  return (
    <div className={styles.spinner} >
      <div className={styles.icono}></div>
      {
        texto && <div className={styles.texto}>Procesando ...</div>
      }
    </div>
  );
};
