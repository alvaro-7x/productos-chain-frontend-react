
import { AuthActionsTypes } from './AuthActionsTypes';
import { TiposAcciones } from '../../types/TiposAcciones';

export interface AuthState {
  cuenta: string | null;
  loading: boolean;
  logueado: boolean;
  estado: string;
  error: any;
}

export const initialState: AuthState =
{
  cuenta: null,
  loading: false,
  logueado: false,
  estado: 'No conectado',
  error: null
};

let myLocalStorage = JSON.parse(localStorage.getItem('user_r') || '{}');

if (Object.keys(myLocalStorage).length === 0)
{
  myLocalStorage = null;
}

export const authReducer = (state: AuthState = (myLocalStorage || initialState), action: AuthActionsTypes) =>
{
  switch (action.type)
  {
    case TiposAcciones.conectarWallet:
      return {
        ...state,
        loading: true,
        logueado: false,
        estado: 'Intentando conexión ...',
        error: null
      };

    case TiposAcciones.generarToken:
      return {
        ...state,
        estado: 'Seleccionando cuenta ...'
      };

    case TiposAcciones.realizarLogin:
      return {
        ...state,
        estado: 'Iniciando sesión ...'
      };

    case TiposAcciones.conectarWalletSuccess:
      return {
        ...state,
        cuenta: action.payload.cuenta,
        loading: false,
        logueado: true,
        estado: 'Conectado.',
        error: null
      };

    case TiposAcciones.conectarWalletError:
      return {
        ...state,
        cuenta: null,
        loading: false,
        logueado: false,
        estado: 'No conectado',
        error: action.payload.error
      };

    // Acciones para desconectar wallet
    case TiposAcciones.desconectarWallet:
      return {
        ...state,
        loading: true
      };

    case TiposAcciones.desconectarWalletSuccess:
      return initialState;

    case TiposAcciones.desconectarWalletError:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};
