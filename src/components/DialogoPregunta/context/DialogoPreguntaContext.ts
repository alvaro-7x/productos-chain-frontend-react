import { createContext, Dispatch } from 'react';
import { DialogoPreguntaActionsTypes } from './actions/DialogoPreguntaActionsTypes';

export interface DialogoPreguntaState
{
  proceder: ((gasLimit: number, gasPrice: number, id?: string|undefined)=>void)|undefined,
  cancelar: (()=>void)|undefined,
  id?: string | undefined
}

interface DialogoPreguntaInterface
{
  accionesDialogo: DialogoPreguntaState;
  dispatchAccionesDialogo: Dispatch<DialogoPreguntaActionsTypes>
}

export const DialogoPreguntaContext = createContext<DialogoPreguntaInterface>({} as DialogoPreguntaInterface);
