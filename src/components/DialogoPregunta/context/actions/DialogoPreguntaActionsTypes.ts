import { DialogoPreguntaTypes } from '../types/DialogoPreguntaTypes';

export type asignarAcciones = {
  type: DialogoPreguntaTypes.abrir,
  payload: { proceder: (gasLimit: number, gasPrice: number, id?: string|undefined)=>void|undefined, cancelar: ()=>void|undefined, id?: string | undefined }
}

export type removerAcciones = {
  type: DialogoPreguntaTypes.cerrar
}

export type DialogoPreguntaActionsTypes =
  asignarAcciones |
  removerAcciones;
