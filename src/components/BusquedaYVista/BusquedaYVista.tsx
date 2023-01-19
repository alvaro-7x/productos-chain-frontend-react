import styles from './BusquedaYVista.module.scss';
import { BiGrid, BiSearch } from 'react-icons/bi';
import { BsListUl } from 'react-icons/bs';
import { ChangeEvent, Fragment, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { iniciarBusquedaProducto, terminarBusquedaProducto } from '../../store/productos/ProductosActions';
import { Tooltip } from '../Tooltip/Tooltip';
import { Producto } from '../../interfaces/interfaces.interface';
import { MdClose } from 'react-icons/md';

interface PropsBusquedaYVista
{
  productos: Producto[];
  buscando: boolean;
  vista: number;
  setVista: (v: number)=>void;
}

export const BusquedaYVista = ({productos, buscando, vista, setVista}: PropsBusquedaYVista) =>
{
  // vista en grid es 0
  // vista en list es 1
  const [busquedaVisible, setBusquedaVisible] = useState<boolean>(false);
  const [terminoBuscado, setTerminoBuscado] = useState<string>('');
  const inputBuscar = useRef<HTMLInputElement|null>(null);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch<AppDispatch>();

  const tipoVista = (tipo: number) =>
  {
    setVista(tipo);
  };

  const toggleBusqueda = () =>
  {
    setBusquedaVisible(!busquedaVisible);
  };

  const handleBuscar = (e: KeyboardEvent) =>
  {
    if (e.charCode === 13)
    {
      if (terminoBuscado !== '')
      {
        dispatch(iniciarBusquedaProducto(terminoBuscado));
      }
    }
  };

  const limpiarBusqueda = () =>
  {
    setTerminoBuscado('');
  };

  useEffect(() =>
  {
    if (busquedaVisible)
    {
      if (inputBuscar.current)
      {
        inputBuscar.current.focus();
      }
    }
    else
    {
      setTerminoBuscado('');
      dispatch(terminarBusquedaProducto());
    }
  }, [busquedaVisible]);

  return (
    <Fragment>
      <div className={styles.containerBusquedaYVista}>

        <div className={styles.btnGroup}>
          <button className={`tooltipContainer ${styles.btn} ${busquedaVisible ? styles.btnActive : ''}`} onClick={toggleBusqueda}>
            <span><BiSearch className={styles.icono} /></span>
            <Tooltip texto={'Mostrar/Ocultar busqueda'} posicion={'right'} />
          </button>
          <button className={`tooltipContainer ${styles.btn} ${vista === 0 ? styles.btnActive : ''}`} onClick={() =>
          {
            tipoVista(0);
          }}>
            <span><BiGrid className={styles.icono} /></span>
            <Tooltip texto={'Ver en grilla'} posicion={'right'} />
          </button>
          <button className={`tooltipContainer ${styles.btn} ${vista === 1 ? styles.btnActive : ''}`} onClick={() =>
          {
            tipoVista(1);
          }}>
            <span><BsListUl className={styles.icono} /></span>
            <Tooltip texto={'Ver en lista'} posicion={'right'} />
          </button>
        </div>

        {
          busquedaVisible &&
      <div className={styles.busqueda}>
        <div className={styles.prodBuscar}>
          <span className={styles.iconoBuscar}>
            <BiSearch />
          </span>
          <input type="search" required autoFocus placeholder="   "
            ref={inputBuscar}
            className={styles.inputBuscar}
            value={terminoBuscado}
            onKeyPress={ handleBuscar }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
            {
              setTerminoBuscado(e.currentTarget.value);
            }}
          />
          {
            terminoBuscado.length > 0 &&
            <button type="button" className={styles.cancelBuscar} onClick={limpiarBusqueda}>
              <MdClose />
            </button>
          }
        </div>
        {
          buscando &&
          <div className={styles.prodResultado}>
            {productos.length} coincidencias.
          </div>
        }
      </div>
        }

      </div>
    </Fragment>
  );
};
