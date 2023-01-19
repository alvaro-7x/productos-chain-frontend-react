/* eslint-disable @typescript-eslint/no-explicit-any */

import { asigarMsjError } from './dialogo/DialogoActions';
import { TiposAcciones } from '../types/TiposAcciones';

export const setError = (storeAPI: any) => (next: any) => (action: any) =>
{
  switch (action.type)
  {
    // Productos error
    case TiposAcciones.actualizarProductoError:
    case TiposAcciones.eliminarProductoError:
    case TiposAcciones.guardarProductoError:
      storeAPI.dispatch(asigarMsjError(action.payload.error));
      break;
  }
  return next(action);
};
