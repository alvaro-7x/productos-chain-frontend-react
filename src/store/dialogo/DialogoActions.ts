import { CustomError, Producto, RespuestaGasServicio } from '../../interfaces/interfaces.interface';
import { TiposAcciones } from '../../types/TiposAcciones';
import { RootState } from '../store';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { consultarGasService } from '../../services/GasServices';

export const abrirDialogo = (tipo: number, producto: Producto | null, id: string | string[] | null): ThunkAction<void, RootState, unknown, AnyAction> =>
{
  return (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) =>
  {
    dispatch({
      type: TiposAcciones.abrirDialogo,
      payload: { tipo: tipo, producto: producto, id: id }
    });

    return consultarGasService(tipo, producto, id)
      .then((resp: RespuestaGasServicio) =>
      {
        dispatch(consultarGasSuccess(resp.gas, resp.balance));
      })
      .catch((error: CustomError) =>
      {
        dispatch((consultarGasError(error.msj)));
      });
  };
};

export const cerrarDialogo = () =>
{
  return {
    type: TiposAcciones.cerrarDialogo
  };
};

export const procesandoAccionEnDialogo = () =>
{
  return {
    type: TiposAcciones.procesandoAccionEnDialogo
  };
};

// consultar gas
export const consultarGas = (tipo: number, producto: Producto | null, id: string | string[] | null) =>
{
  return {
    type: TiposAcciones.consultarGas,
    payload: { tipo: tipo, producto: producto, id: id }
  };
};
export const consultarGasSuccess = (gas: number, balance: number) =>
{
  return {
    type: TiposAcciones.consultarGasSuccess,
    payload: { gas: gas, balance: balance }
  };
};
export const consultarGasError = (error: CustomError) =>
{
  return {
    type: TiposAcciones.consultarGasError,
    payload: { error: error }
  };
};
export const actualizarBalance = (balance: number, procesoExitoso: boolean, tx: string) =>
{
  return {
    type: TiposAcciones.actualizarBalance,
    payload: { balance: balance, procesoExitoso: procesoExitoso, tx: tx }
  };
};
export const asigarMsjError = (error: CustomError) =>
{
  return {
    type: TiposAcciones.asignarMensajeDeError,
    payload: { error: error }
  };
};

