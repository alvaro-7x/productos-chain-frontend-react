import styles from './MensajeError.module.scss';
import { AppDispatch, RootState, useAppSelector } from '../../store/store';
import { Fragment} from 'react';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { limpiarErrorProducto } from '../../store/productos/ProductosActions';
import { MdOutlineClose } from 'react-icons/md';

export const MensajeError = () =>
{
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch<AppDispatch>();
  const productos = useAppSelector((state:RootState) => state.productos);
  const dialogo = useAppSelector((state:RootState) => state.dialogo);

  const handleCerrar = () =>
  {
    dispatch(limpiarErrorProducto());
  };

  return (
    <Fragment>
      {
        !!productos.error &&
      !dialogo.dialogoAbierto &&
      <div className={styles.mensajeError}>
        <div className={styles.contenido}>
          <span className={styles.icono} onClick={handleCerrar}><MdOutlineClose /></span>
          {productos.error}
        </div>
      </div>
      }
    </Fragment>
  );
};
