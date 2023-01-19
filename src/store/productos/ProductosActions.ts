
import { CustomError, Producto, RespuestaServicio } from '../../interfaces/interfaces.interface';
import { TiposAcciones } from '../../types/TiposAcciones';
import { AnyAction } from 'redux';
import { RootState } from '../store';
import { actualizarProductoService, crearProductoService, editarProductoService, eliminarProductoService, eliminarVariosProductosService, listarProductosService } from '../../services/ProductosServices';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { actualizarBalance } from '../dialogo/DialogoActions';
import { socketService } from '../../services/SocketService';

// listar Productos
export const listarProductos = (): ThunkAction<void, RootState, unknown, AnyAction> =>
{
  return (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) =>
  {
    dispatch({
      type: TiposAcciones.listarProductos
    });

    return listarProductosService()
      .then((resp: RespuestaServicio) =>
      {
        const productos = (resp.productos) || [];
        const balance = resp.balance || 0;

        dispatch(listarProductosSuccess(productos, balance));
        dispatch(actualizarBalance(balance, false, ''));
      })
      .catch((error: CustomError) =>
      {
        dispatch(listarProductosError(error.msj));
      });
  };
};
export const listarProductosSuccess = (productos: Producto[], balance: number, tx?: string) =>
{
  return {
    type: TiposAcciones.listarProductosSuccess,
    payload: { productos: productos, balance: balance, tx: tx }
  };
};
export const listarProductosError = (error: CustomError) =>
{
  return {
    type: TiposAcciones.listarProductosError,
    payload: { error: error }
  };
};

// seleccionar producto
export const seleccionarProducto = (id: string) =>
{
  return {
    type: TiposAcciones.seleccionarProducto,
    payload: { id: id }
  };
};

// deseleccionar producto
export const deseleccionarProducto = (id: string) =>
{
  return {
    type: TiposAcciones.deseleccionarProducto,
    payload: { id: id }
  };
};

// deseleccionar TODOS los producto
export const deseleccionarTodosProductos = () =>
{
  return {
    type: TiposAcciones.deseleccionarTodosLosProductos
  };
};

// eliminar producto
export const eliminarProducto = (id: string, gasLimit: number, gasPrice: number): ThunkAction<void, RootState, unknown, AnyAction> =>
{
  return (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) =>
  {
    dispatch({
      type: TiposAcciones.eliminarProducto,
      payload: { id: id, gasLimit: gasLimit, gasPrice: gasPrice }
    });

    return eliminarProductoService(id, gasLimit, gasPrice)
      .then((resp: RespuestaServicio) =>
      {
        socketService.emit('producto-eliminado-cliente', { data: id, balance: resp.balance, tx: resp.tx });
        dispatch(eliminarProductoSuccess(id, resp.balance, resp.tx));
        dispatch(actualizarBalance(resp.balance, true, resp.tx || ''));
      })
      .catch((error: CustomError) =>
      {
        dispatch(eliminarProductoError(error.msj));
      });
  };
};
export const eliminarVariosProductos = (id: string[], gasPrice: number): ThunkAction<void, RootState, unknown, AnyAction> =>
{
  return (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) =>
  {
    dispatch({
      type: TiposAcciones.eliminarVariosProductos,
      payload: { id: id, gasPrice: gasPrice }
    });

    return eliminarVariosProductosService(id, gasPrice)
      .then((resp: RespuestaServicio) =>
      {
        socketService.emit('productos-eliminados-cliente', { data: id, balance: resp.balance, tx: resp.tx });
        dispatch(eliminarVariosProductosSuccess(id, resp.balance, resp.tx));
        dispatch(actualizarBalance(resp.balance, true, resp.tx || ''));
      })
      .catch((error: CustomError) =>
      {
        dispatch(eliminarProductoError(error.msj));
      });
  };
};
export const eliminarVariosProductosSuccess = (id: string[], balance: number, tx?: string) =>
{
  return {
    type: TiposAcciones.eliminarVariosProductosSuccess,
    payload: { id: id, balance: balance, tx: tx }
  };
};
export const eliminarProductoSuccess = (id: string, balance: number, tx?: string) =>
{
  return {
    type: TiposAcciones.eliminarProductoSuccess,
    payload: { id: id, balance: balance, tx: tx }
  };
};
export const eliminarProductoError = (error: CustomError) =>
{
  return {
    type: TiposAcciones.eliminarProductoError,
    payload: { error: error }
  };
};

// crear producto
export const crearProducto = () =>
{
  return {
    type: TiposAcciones.crearProducto
  };
};

// guadar producto
export const guardarProducto = (producto: Producto, imagen: File|undefined, gasLimit: number, gasPrice: number): ThunkAction<void, RootState, unknown, AnyAction> =>
{
  return (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) =>
  {
    dispatch({
      type: TiposAcciones.guardarProducto,
      payload: { producto: producto, imagen: imagen, gasLimit: gasLimit, gasPrice: gasPrice }
    });

    return crearProductoService(producto, imagen, gasLimit, gasPrice)
      .then((resp: RespuestaServicio) =>
      {
        socketService.emit('producto-creado-cliente', { data: resp.producto, balance: resp.balance, tx: resp.tx });
        if (resp.producto)
        {
          dispatch(guardarProductoSuccess(resp.producto, resp.balance, resp.tx));
          dispatch(actualizarBalance(resp.balance, true, resp.tx || ''));
        }
        else
        {
          const error: CustomError = { msj: 'Ocurrio un error al guardar el producto.' };
          dispatch(guardarProductoError(error.msj));
        }
      })
      .catch((error: CustomError) =>
      {
        dispatch(guardarProductoError(error.msj));
      });
  };
};
export const guardarProductoSuccess = (producto: Producto, balance: number, tx?: string) =>
{
  return {
    type: TiposAcciones.guardarProductoSuccess,
    payload: { producto: producto, balance: balance, tx: tx }
  };
};
export const guardarProductoError = (error: CustomError) =>
{
  return {
    type: TiposAcciones.guardarProductoError,
    payload: { error: error }
  };
};

// editar producto
export const editarProducto = (id: string): ThunkAction<void, RootState, unknown, AnyAction> =>
{
  return (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) =>
  {
    dispatch({
      type: TiposAcciones.editarProducto,
      payload: { id: id }
    });

    return editarProductoService(id)
      .then((resp: RespuestaServicio) =>
      {
        const p = (resp.producto) || null;
        dispatch(editarProductoSuccess(p));
      })
      .catch((error: CustomError) =>
      {
        dispatch(editarProductoError(error.msj));
      });
  };
};
export const editarProductoSuccess = (producto: Producto | null) =>
{
  return {
    type: TiposAcciones.editarProductoSuccess,
    payload: { producto: producto }
  };
};
export const editarProductoError = (error: CustomError) =>
{
  return {
    type: TiposAcciones.editarProductoError,
    payload: { error: error }
  };
};

// actualizar producto
export const actualizarProducto = (producto: Producto, imagen: File|undefined, id: string | null, gasLimit: number, gasPrice: number): ThunkAction<void, RootState, unknown, AnyAction> =>
{
  return (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) =>
  {
    dispatch({
      type: TiposAcciones.actualizarProducto,
      payload: { producto: producto, imagen: imagen, id: id, gasLimit: gasLimit, gasPrice: gasPrice }
    });

    return actualizarProductoService(producto, imagen, id, gasLimit, gasPrice)
      .then((resp: RespuestaServicio) =>
      {
        socketService.emit('producto-actualizado-cliente', { data: resp.producto, balance: resp.balance, tx: resp.tx });
        if (resp.producto)
        {
          dispatch(actualizarProductoSuccess(resp.producto, resp.balance, resp.tx));
          dispatch(actualizarBalance(resp.balance, true, resp.tx || ''));
        }
        else
        {
          const error: CustomError = { msj: 'Ocurrio un error al actualizar el producto.' };
          dispatch(actualizarProductoError(error.msj));
        }
      })
      .catch((error: CustomError) =>
      {
        dispatch(actualizarProductoError(error.msj));
      });
  };
};
export const actualizarProductoSuccess = (producto: Producto, balance: number, tx?: string) =>
{
  return {
    type: TiposAcciones.actualizarProductoSuccess,
    payload: { producto: producto, balance: balance, tx: tx }
  };
};
export const actualizarProductoError = (error: CustomError) =>
{
  return {
    type: TiposAcciones.actualizarProductoError,
    payload: { error: error }
  };
};

// Busqueda producto
export const iniciarBusquedaProducto = (buscar: string) =>
{
  return {
    type: TiposAcciones.iniciarBusquedaProducto,
    payload: { buscar: buscar }
  };
};
export const terminarBusquedaProducto = () =>
{
  return {
    type: TiposAcciones.terminarBusquedaProducto
  };
};

// Limpiar error
export const limpiarErrorProducto = () =>
{
  return {
    type: TiposAcciones.limpiarError
  };
};

export const asignarErrorProducto = (error: CustomError) =>
{
  return {
    type: TiposAcciones.asignarError,
    payload: { error: error }
  };
};
