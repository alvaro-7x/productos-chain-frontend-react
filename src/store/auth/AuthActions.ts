import { TiposAcciones } from '../../types/TiposAcciones';
import { AnyAction } from 'redux';
import { CustomError, RespuestaAuth } from '../../interfaces/interfaces.interface';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { getCuentaService, loginService, generarJWTService } from '../../services/Auth.services';

// conectar wallet
export const conectarWallet = (): ThunkAction<void, RootState, unknown, AnyAction> =>
{
  return (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) =>
  {
    dispatch({
      type: TiposAcciones.conectarWallet
    });

    return getCuentaService()
      .then((resp: RespuestaAuth) =>
      {
        dispatch(generarToken(resp.data));
      })
      .catch((error: CustomError) =>
      {
        dispatch(conectarWalletError(error.msj));
      });
  };
};

export const generarToken = (cuenta: string | null): ThunkAction<void, RootState, unknown, AnyAction> =>
{
  return (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) =>
  {
    dispatch({
      type: TiposAcciones.generarToken,
      payload: {cuenta: cuenta}
    });

    return generarJWTService(cuenta)
      .then((resp: RespuestaAuth) =>
      {
        dispatch(realizarLogin(resp.data));
      })
      .catch((error: CustomError) =>
      {
        dispatch(conectarWalletError(error.msj));
      });
  };
};

export const realizarLogin = (token: string | null): ThunkAction<void, RootState, unknown, AnyAction> =>
{
  return (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) =>
  {
    dispatch({
      type: TiposAcciones.realizarLogin,
      payload: { token: token }
    });

    return loginService(token)
      .then((resp: RespuestaAuth) =>
      {
        dispatch(conectarWalletSuccess(resp.data));
      })
      .catch((error: CustomError) =>
      {
        dispatch(conectarWalletError(error.msj));
      });
  };
};

export const noAccion = () =>
{
  return {
    type: TiposAcciones.noAccion
  };
};

export const conectarWalletSuccess = (cuenta: string | null) =>
{
  return {
    type: TiposAcciones.conectarWalletSuccess,
    payload: { cuenta: cuenta }
  };
};

export const conectarWalletError = (error: CustomError) =>
{
  return {
    type: TiposAcciones.conectarWalletError,
    payload: { error: error }
  };
};

// desconectar wallet
export const desconectarWallet = () =>
{
  return desconectarWalletSuccess();
};
export const desconectarWalletSuccess = () =>
{
  return {
    type: TiposAcciones.desconectarWalletSuccess
  };
};
export const desconectarWalletError = (error: CustomError) =>
{
  return {
    type: TiposAcciones.desconectarWalletError,
    payload: { error: error }
  };
};
