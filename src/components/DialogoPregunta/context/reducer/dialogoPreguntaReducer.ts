
import { DialogoPreguntaActionsTypes } from '../actions/DialogoPreguntaActionsTypes';
import { DialogoPreguntaState } from '../DialogoPreguntaContext';
import { DialogoPreguntaTypes } from '../types/DialogoPreguntaTypes';

const initState =
{
  proceder: undefined,
  cancelar: undefined,
  id: undefined
};

export const dialogoPreguntaReducer = (state: DialogoPreguntaState = initState, action: DialogoPreguntaActionsTypes) =>
{
  switch (action.type)
  {
    case DialogoPreguntaTypes.abrir:
      return {
        proceder: action.payload.proceder,
        cancelar: action.payload.cancelar,
        id: action.payload.id
      };

    case DialogoPreguntaTypes.cerrar:
      return initState;

    default:
      return state;
  }
};
