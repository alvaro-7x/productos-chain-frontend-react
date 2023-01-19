import { TiposAcciones } from '../../types/TiposAcciones';
import { CustomError } from '../../interfaces/interfaces.interface';

type conectarWallet =
{
  type: TiposAcciones.conectarWallet
}

type generarToken =
{
  type: TiposAcciones.generarToken,
  payload: { cuenta: string | null }
}

type login =
{
  type: TiposAcciones.realizarLogin,
  payload: { token: string | null }
}

type conectarWalletSuccess =
{
  type: TiposAcciones.conectarWalletSuccess,
  payload: { cuenta: string | null }
}

type conectarWalletError =
{
  type: TiposAcciones.conectarWalletError,
  payload: { error: CustomError }
}

// desconectar wallet
type desconectarWallet =
{
  type: TiposAcciones.desconectarWallet
}

type desconectarWalletSuccess =
{
  type: TiposAcciones.desconectarWalletSuccess
}

type desconectarWalletError =
{
  type: TiposAcciones.desconectarWalletError,
  payload: { error: CustomError }
}

export type AuthActionsTypes =
  conectarWallet |
  generarToken |
  login |
  conectarWalletSuccess |
  conectarWalletError |
  desconectarWallet |
  desconectarWalletSuccess |
  desconectarWalletError;
