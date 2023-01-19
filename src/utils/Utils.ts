import { store } from '../store/store';
import { TiposAcciones } from '../types/TiposAcciones';

export const generarIdTx = (value: string | null): string =>
{
  return (!value) ? '' : value.toLowerCase().substr(0, 5) + '...' + value.toLowerCase().substr(-4);
};

export const formatearFecha = (utc: number|string) =>
{
  const myUtc = typeof utc === 'string'
    ? parseInt(utc)
    : utc;

  const utcTmp = myUtc * 1000;
  const fecha = new Date(utcTmp);
  const formato: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  };
  return fecha.toLocaleDateString('en-US', formato);
};

export const urlImagen = (url: string) =>
{
  return (url === '') ? '../img/default.png' : url;
};

export const tx2Array = (value = ''): string [] =>
{
  const txs = value.split(',');
  return txs;
};

export const handleError = (error: any) =>
{
  let msj = 'Ocurrio un error desconocido, vuelva a intentarlo en unos minutos.';
  let data;

  if (error.response.status === 401)
  {
    store.dispatch({type: TiposAcciones.desconectarWallet});
    location.href = '/';
    data = { success: false, msj };
    return data;
  }

  if (error.message.includes('404'))
  {
    data = { success: false, msj: 'Servicio esta temporalmente deshabilitado, vuelva a intentarlo en unos minutos.' };
    return data;
  }
  // if (error.hasOwnProperty('error') && error.error.hasOwnProperty('msj'))
  if (Object.prototype.hasOwnProperty.call(error.response, 'data') && Object.prototype.hasOwnProperty.call(error.response.data, 'msj'))
  {
    msj = error.response.data.msj;
  }

  data = { success: false, msj };

  return data;
};
