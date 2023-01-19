import axios from 'axios';
import { setInterceptor } from './Interceptor';
import { Producto } from '../interfaces/interfaces.interface';
import { handleError } from '../utils/Utils';

const url = import.meta.env.VITE_URL;

const crearInstanceAxios = (baseURL: string, params: any, headers: any, data: any = {}) =>
{
  return axios.create({
    baseURL: baseURL,
    params: params,
    headers: headers,
    data: data
  });
};

export const listarProductosService = () =>
{
  const instance = crearInstanceAxios(url, {}, {'Content-Type': 'application/json'});

  setInterceptor(instance);

  return instance.get('/productos')
    .then((respuesta) =>
    {
      return Promise.resolve(respuesta.data);
    })
    .catch((error) =>
    {
      return Promise.reject(handleError(error));
    });
};

export const eliminarProductoService = (id: string, gasLimit: number, gasPrice: number) =>
{
  const instance = crearInstanceAxios(url, { }, {'Content-Type': 'application/json'}, {gasLimit, gasPrice});

  setInterceptor(instance);

  return instance.delete(`/productos/${id}`)
    .then((respuesta) =>
    {
      return Promise.resolve(respuesta.data);
    })
    .catch((error) =>
    {
      return Promise.reject(handleError(error));
    });
};

export const eliminarVariosProductosService = (id: string[], gasPrice: number) =>
{
  const body = { id, gasPrice };

  const instance = crearInstanceAxios(url, {}, {'Content-Type': 'application/json'});

  setInterceptor(instance);

  return instance.post('/productos/eliminar', body)
    .then((respuesta) =>
    {
      return Promise.resolve(respuesta.data);
    })
    .catch((error) =>
    {
      return Promise.reject(handleError(error));
    });
};

export const crearProductoService = (producto: Producto, imagen: File|undefined, gasLimit: number, gasPrice: number) =>
{
  const productoData = new FormData();
  const keys = Object.keys(producto);
  const values = Object.values(producto);

  for (const i in keys)
  {
    productoData.append(keys[i], values[i]);
  }

  if (imagen)
  {
    productoData.append('imagen', imagen);
  }
  productoData.append('gasLimit', gasLimit.toString());
  productoData.append('gasPrice', gasPrice.toString());

  const instance = crearInstanceAxios(url, {}, {'Content-Type': 'multipart/form-data'});

  setInterceptor(instance);

  return instance.post('/productos', productoData)
    .then((respuesta) =>
    {
      return Promise.resolve(respuesta.data);
    })
    .catch((error) =>
    {
      return Promise.reject(handleError(error));
    });
};

export const editarProductoService = (id: string) =>
{
  const instance = crearInstanceAxios(url, {}, {'Content-Type': 'application/json'});

  setInterceptor(instance);

  return instance.get(`/productos/${id}`)
    .then((respuesta) =>
    {
      return Promise.resolve(respuesta.data);
    })
    .catch((error) =>
    {
      return Promise.reject(handleError(error));
    });
};

export const actualizarProductoService = (producto: Producto, imagen: File|undefined, id: string | null, gasLimit: number, gasPrice: number) =>
{
  if (id == null)
  {
    id = '';
  }

  const productoData = new FormData();

  const keys = Object.keys(producto);
  const values = Object.values(producto);

  for (const i in keys)
  {
    productoData.append(keys[i], values[i]);
  }
  if (imagen)
  {
    productoData.append('imagen', imagen);
  }
  productoData.append('gasLimit', gasLimit.toString());
  productoData.append('gasPrice', gasPrice.toString());

  const instance = crearInstanceAxios(url, {}, {'Content-Type': 'multipart/form-data'});

  setInterceptor(instance);

  return instance.put(`/productos/${id}`, productoData)
    .then((respuesta) =>
    {
      return Promise.resolve(respuesta.data);
    })
    .catch((error) =>
    {
      return Promise.reject(handleError(error));
    });
};
