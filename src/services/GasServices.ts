import axios from 'axios';
import { setInterceptor } from './Interceptor';
import { Producto } from '../interfaces/interfaces.interface';
import { handleError } from '../utils/Utils';

const url = import.meta.env.VITE_URL;

// RespuestaGasServicio
export const consultarGasService = (tipo: number, producto: Producto | null, id: string | string[] | null) =>
{
  const body = {tipo, producto, id };
  const instance = axios.create({
    baseURL: url,
    headers:
    {
      'Content-Type': 'application/json'
    }
  });

  setInterceptor(instance);

  return instance.post('/productos/consultar-gas', body)
    .then((respuesta) =>
    {
      return Promise.resolve(respuesta.data);
    })
    .catch((error) =>
    {
      return Promise.reject(handleError(error));
    });
};
