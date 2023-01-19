import styles from './ProductosPage.module.scss';
import { Fragment, useContext, useEffect, useState } from 'react';
import { AppDispatch, RootState, useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { editarProducto, eliminarProducto, limpiarErrorProducto, listarProductos, seleccionarProducto } from '../../store/productos/ProductosActions';
import { ProcesandoDatos } from '../../components/ProcesandoDatos/ProcesandoDatos';
import { TipoDialogo } from '../../types/TiposAcciones';
import { abrirDialogo } from '../../store/dialogo/DialogoActions';
import { useNavigate } from 'react-router-dom';
import { BusquedaYVista } from '../../components/BusquedaYVista/BusquedaYVista';
import { ContainerCardGrid } from '../../components/ContainerCardGrid/ContainerCardGrid';
import { ContainerCardList } from '../../components/ContainerCardList/ContainerCardList';
import { InfoProductosSeleccionados } from '../../components/InfoProductosSeleccionados/InfoProductosSeleccionados';
import { DialogoPreguntaContext } from '../../components/DialogoPregunta/context/DialogoPreguntaContext';
import { asignar, remover } from '../../components/DialogoPregunta/context/actions/DialogoPreguntaActions';
import { SinProductos } from '../../components/SinProductos/SinProductos';

export const ProductosPage = () =>
{
  // vista en grid es 0
  // vista en list es 1
  const [vista, setVista] = useState<number>(0);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch<AppDispatch>();
  const productos = useAppSelector(state => state.productos);
  const dialogo = useAppSelector(state => state.dialogo);

  const navigate = useNavigate();
  const {dispatchAccionesDialogo} = useContext(DialogoPreguntaContext);

  const handleEditarProducto = (id: string|undefined) =>
  {
    if (id)
    {
      dispatch(editarProducto(id));
    }
  };

  const handleEliminarProducto = (id: string|undefined) =>
  {
    if (id)
    {
      dispatch(abrirDialogo(TipoDialogo.ELIMINAR, null, id));
      dispatchAccionesDialogo(asignar(accionProcederDialogo, accionCerrarDialogo, id));
    }
  };

  const handleSeleccionarProducto = (id: string|undefined) =>
  {
    if (id)
    {
      dispatch(seleccionarProducto(id));
    }
  };

  const accionProcederDialogo = (gasLimit: number, gasPrice: number, id?: string|undefined) =>
  {
    if (id)
    {
      dispatch(eliminarProducto(id, gasLimit, gasPrice));
    }
  };

  const accionCerrarDialogo = () =>
  {
    dispatch(limpiarErrorProducto());
    dispatchAccionesDialogo(remover());
  };

  const intentarListarProductos = () =>
  {
    dispatch(listarProductos());
  };

  useEffect(() =>
  {
    if (!productos.loaded && !productos.loading)
    {
      dispatch(listarProductos());
    }

    return () =>
    {
      dispatch(limpiarErrorProducto());
    };
  }, []);

  useEffect(() =>
  {
    if (productos.productoSeleccionado !== null)
    {
      navigate('/wallet/producto');
    }
  }, [productos.productoSeleccionado]);

  return (
    <Fragment>
      {
        !dialogo.dialogoAbierto &&
        productos.loading &&
        <ProcesandoDatos loading={productos.loading}/>
      }

      <BusquedaYVista
        productos={productos.productosBusqueda}
        buscando={productos.buscando}
        vista={vista}
        setVista={setVista}
      />
      {
        !productos.loaded &&
        !productos.loading &&
        <div className={styles.productosNoCargados} onClick={ intentarListarProductos }>
          <span>¿Intentar cargar productos de nuevo?</span>
        </div>
      }
      <InfoProductosSeleccionados cantidad = {productos.productosSeleccionados.length} />

      {
        productos.productos.length <= 0
          ? <SinProductos loading={productos.loading} buscando={productos.buscando} />
          : vista === 0
            ? <ContainerCardGrid
              productos={productos.buscando ? productos.productosBusqueda : productos.productos}
              seleccionados={productos.productosSeleccionados}
              handleEditarProducto={handleEditarProducto}
              handleEliminarProducto={handleEliminarProducto}
              handleSeleccionarProducto={handleSeleccionarProducto}
            />
            : <ContainerCardList
              productos={productos.buscando ? productos.productosBusqueda : productos.productos}
              seleccionados={productos.productosSeleccionados}
              handleEditarProducto={handleEditarProducto}
              handleEliminarProducto={handleEliminarProducto}
              handleSeleccionarProducto={handleSeleccionarProducto}
            />
      }
    </Fragment>
  );
};
