import styles from './Header.module.scss';
import { Fragment, useContext, useEffect } from 'react';
import { MdAddShoppingCart, MdDeleteSweep } from 'react-icons/md';
import { ThunkDispatch } from 'redux-thunk';
import { AppDispatch, RootState, useAppSelector } from '../../store/store';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { crearProducto, deseleccionarTodosProductos, eliminarVariosProductos } from '../../store/productos/ProductosActions';
import { useNavigate } from 'react-router-dom';
import { BotonInfo } from '../BotonInfo/BotonInfo';
import { TipoDialogo } from '../../types/TiposAcciones';
import { abrirDialogo } from '../../store/dialogo/DialogoActions';
import { Tooltip } from '../Tooltip/Tooltip';
import { DialogoPreguntaContext } from '../DialogoPregunta/context/DialogoPreguntaContext';
import { asignar, remover } from '../DialogoPregunta/context/actions/DialogoPreguntaActions';

interface PropsHeader
{
  estadoSocket: boolean;
}

export const Header = ({estadoSocket}: PropsHeader) =>
{
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch<AppDispatch>();
  const productos = useAppSelector(state => state.productos);
  const navigate = useNavigate();

  const {dispatchAccionesDialogo} = useContext(DialogoPreguntaContext);

  const handleCrearProducto = () =>
  {
    dispatch(crearProducto());
    navigate('/wallet/producto');
  };

  const handleEliminarVariosProductos = () =>
  {
    const ids = productos.productosSeleccionados;

    dispatchAccionesDialogo(asignar(accionProcederDialogo, accionCerrarDialogo));
    dispatch(abrirDialogo(TipoDialogo.ELIMINAR, null, ids));
  };

  const accionProcederDialogo = (gasLimit: number, gasPrice: number) =>
  {
    const ids = productos.productosSeleccionados;
    dispatch(eliminarVariosProductos(ids, gasPrice));
  };

  const accionCerrarDialogo = () =>
  {
    dispatchAccionesDialogo(remover());
  };

  const keyEvent = (event: KeyboardEvent) =>
  {
    if (event.keyCode === 27)
    {
      dispatch(deseleccionarTodosProductos());
    }
  };

  useEffect(() =>
  {
    window.document.addEventListener('keydown', keyEvent);

    return () =>
    {
      window.document.removeEventListener('keydown', keyEvent);
    };
  }
  , []);

  return (
    <Fragment>
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.detalles}>
            {
              productos.productosSeleccionados.length > 0
                ? <button type="button" onClick={handleEliminarVariosProductos} className={`tooltipContainer ${styles.btnAccion}`}>
                  <MdDeleteSweep className={styles.icono} />
                  <span className={styles.badged}>{productos.productosSeleccionados.length}</span>
                  <Tooltip texto={'Borrar productos seleccionados (Experimental)'} />
                </button>
                : <button type="button" onClick={handleCrearProducto} className={`tooltipContainer ${styles.btnAccion}`}>
                  <MdAddShoppingCart className={styles.icono} />
                  <Tooltip texto={'Nuevo producto'} />
                </button>
            }
          </div>
          <BotonInfo estadoSocket={estadoSocket} />
        </div>
      </header>
    </Fragment>
  );
};
