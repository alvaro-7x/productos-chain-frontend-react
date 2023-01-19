import { TiposAcciones } from '../../types/TiposAcciones';
import { DialogoActionsTypes } from './DialogoActionsTypes';

const GAS_LIMIT = parseInt(import.meta.env.VITE_GAS_LIMIT);

export interface DialogoState {
  balance: number;
  gas: number;
  procesoExitoso: boolean;
  dialogoAbierto: boolean;
  loading: boolean;
  tx: string;
  error: any;
}

export const initialState: DialogoState =
{
  balance: 0,
  gas: GAS_LIMIT,
  procesoExitoso: false,
  dialogoAbierto: false,
  loading: false,
  tx: '',
  error: null
};

let myLocalStorage = JSON.parse(localStorage.getItem('dialogo_r') || '{}');
if (Object.keys(myLocalStorage).length === 0)
{
  myLocalStorage = null;
}

export const dialogoReducer = (state: DialogoState = (myLocalStorage || initialState), action: DialogoActionsTypes) =>
{
  switch (action.type)
  {
    case TiposAcciones.abrirDialogo:
      return {
        ...state,
        gas: GAS_LIMIT,
        procesoExitoso: false,
        dialogoAbierto: true,
        loading: true,
        tx: '',
        error: null
      };

    case TiposAcciones.cerrarDialogo:
      return {
        ...initialState,
        // procesoExitoso: state.procesoExitoso,
        balance: state.balance,
        gas: state.gas,
        tx: ''
      };

    case TiposAcciones.procesandoAccionEnDialogo:
      return {
        ...state,
        loading: true,
        error: null
      };

    case TiposAcciones.asignarMensajeDeError:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case TiposAcciones.consultarGas:
      return {
        ...state,
        loading: true,
        tx: ''
      };

    case TiposAcciones.consultarGasSuccess:
      return {
        ...state,
        loading: false,
        gas: action.payload.gas,
        balance: action.payload.balance
      };

    case TiposAcciones.consultarGasError:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case TiposAcciones.actualizarBalance:
      return {
        ...state,
        balance: action.payload.balance,
        procesoExitoso: action.payload.procesoExitoso,
        loading: false,
        tx: action.payload.tx,
        error: null
      };

    default:
      return state;
  }
};
