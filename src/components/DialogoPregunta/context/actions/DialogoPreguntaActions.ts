
import { DialogoPreguntaTypes } from '../types/DialogoPreguntaTypes';
import { asignarAcciones, removerAcciones } from './DialogoPreguntaActionsTypes';

export const asignar = (proceder: (gasLimit: number, gasPrice: number, id?: string|undefined)=>void|undefined, cancelar: ()=>void|undefined, id?: string | undefined): asignarAcciones =>
{
  return {
    type: DialogoPreguntaTypes.abrir,
    payload: { proceder: proceder, cancelar: cancelar, id: id }
  };
};

export const remover = (): removerAcciones =>
{
  return {
    type: DialogoPreguntaTypes.cerrar
  };
};
