/* eslint-disable @typescript-eslint/no-explicit-any */

import { TiposAcciones } from '../types/TiposAcciones';

export const saveState = (storeAPI: any) => (next: any) => (action: any) =>
{
  switch (action.type)
  {
    // Auth
    case TiposAcciones.conectarWalletSuccess:
    case TiposAcciones.desconectarWalletError:
      return saveToLocalStorage('auth', 'user_r', storeAPI, next, action);

    // Dialogo
    case TiposAcciones.actualizarBalance:
      return saveToLocalStorage('dialogo', 'dialogo_r', storeAPI, next, action);

    // Productos
    case TiposAcciones.listarProductos:
    case TiposAcciones.listarProductosSuccess:
    case TiposAcciones.listarProductosError: //
    case TiposAcciones.eliminarProducto:
    case TiposAcciones.eliminarProductoSuccess:
    case TiposAcciones.eliminarProductoError: //
    case TiposAcciones.crearProducto:
    case TiposAcciones.guardarProducto:
    case TiposAcciones.guardarProductoSuccess:
    case TiposAcciones.guardarProductoError: //
    case TiposAcciones.editarProducto:
    case TiposAcciones.editarProductoSuccess:
    case TiposAcciones.editarProductoError: //
    case TiposAcciones.actualizarProducto:
    case TiposAcciones.actualizarProductoSuccess:
    case TiposAcciones.actualizarProductoError: //
    case TiposAcciones.seleccionarProducto:
    case TiposAcciones.deseleccionarProducto:
    case TiposAcciones.deseleccionarTodosLosProductos: //
    case TiposAcciones.limpiarError:
      return saveToLocalStorage('productos', 'productos_r', storeAPI, next, action);

    default:
      return next(action);
  }
};

const saveToLocalStorage = (nameState: string, nameSateStorage: string, storeAPI: any, next: any, action: any) =>
{
  const result = next(action);
  const state = storeAPI.getState()[nameState];
  localStorage.setItem(nameSateStorage, JSON.stringify(state || ''));
  return result;
};
