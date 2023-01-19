import styles from './SinProductos.module.scss';
import { Fragment } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

interface PropsSinProductos
{
  loading: boolean;
  buscando: boolean;
}

export const SinProductos = ({loading, buscando}: PropsSinProductos) =>
{
  return (
    <Fragment>
      {
        !loading &&
        !buscando &&
        <div className={styles.sinProductos}>
          <div className={styles.mensaje}>
            Cree en nuevo producto haciendo clic en el boton &nbsp;

            <button className={styles.btnAccion}>
              <MdAddShoppingCart className={styles.icono}/>
            </button>
            &nbsp; ubicado en la parte superior izquerda.
          </div>
        </div>
      }
    </Fragment>
  );
};
