import { CustomError, Producto } from '../../interfaces/interfaces.interface';
import { TiposAcciones } from '../../types/TiposAcciones';

type abrirDialogo = {
  type: TiposAcciones.abrirDialogo,
  payload: { tipo: number, producto: Producto | null, id: string | string[] | null }
}

type cerrarDialogo = {
  type: TiposAcciones.cerrarDialogo
}

type procesandoAccionEnDialogo = {
  type: TiposAcciones.procesandoAccionEnDialogo
}

// consultar gas
type consultarGas = {
  type: TiposAcciones.consultarGas,
  payload: { tipo: number, producto: Producto | null, id: string | string[] | null }
}
type consultarGasSuccess = {
  type: TiposAcciones.consultarGasSuccess,
  payload: { gas: number, balance: number }
}
type consultarGasError = {
  type: TiposAcciones.consultarGasError,
  payload: { error: CustomError }
}
type actualizarBalance = {
  type: TiposAcciones.actualizarBalance,
  payload: { balance: number, procesoExitoso: boolean, tx: string }
}
type asigarMsjError = {
  type: TiposAcciones.asignarMensajeDeError,
  payload: { error: CustomError }
}

export type DialogoActionsTypes =
  abrirDialogo |
  cerrarDialogo |
  procesandoAccionEnDialogo |
  consultarGas |
  consultarGasSuccess |
  consultarGasError |
  actualizarBalance |
  asigarMsjError;
