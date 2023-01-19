import styles from './InfoProductosSeleccionados.module.scss';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppDispatch, RootState } from '../../store/store';
import { deseleccionarTodosProductos } from '../../store/productos/ProductosActions';
import { Fragment } from 'react';
import { Tooltip } from '../Tooltip/Tooltip';

interface PropsInfoProductosSeleccionados
{
  cantidad: number;
}

export const InfoProductosSeleccionados = ({cantidad}: PropsInfoProductosSeleccionados) =>
{
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch<AppDispatch>();

  const retirarSeleccionados = () =>
  {
    dispatch(deseleccionarTodosProductos());
  };

  return (
    <Fragment>
      {
        (cantidad > 0) &&
        <div className={styles.cantidadSeleccionados}>
          <div className={'tooltipContainer'} >
            <IoCloseCircleOutline onClick={retirarSeleccionados} className={styles.icono} />
            <Tooltip texto={'Deseleccionar todos los productos (Esc)'} />
          </div>
          Productos seleccionados: {cantidad}
        </div>
      }
    </Fragment>
  );
};
