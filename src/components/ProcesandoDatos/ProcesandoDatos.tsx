import styles from './ProcesandoDatos.module.scss';
import { Spinner } from '../Spinner/Spinner';

interface PropsProcesandoDatos
{
  loading: boolean
}

export const ProcesandoDatos = ({loading}: PropsProcesandoDatos) =>
{
  return (
    <div className={`${styles.container} ${loading ? styles.containerActive : ''}`}>
      <Spinner texto={true} />
    </div>
  );
};
