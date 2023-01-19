
import ReactDOM from 'react-dom';
import { DialogoPregunta } from '../DialogoPregunta/DialogoPregunta';

const portal = document.getElementById('dialogo') as Element;

export const DialogoPreguntaPortal = () =>
{
  return (ReactDOM.createPortal(<DialogoPregunta />, portal));
};

