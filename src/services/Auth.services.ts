import axios from 'axios';
import Web3 from 'web3';
import { sign } from 'web3-token';
import { RespuestaAuth } from '../interfaces/interfaces.interface';
import { setInterceptor } from './Interceptor';

declare const window: any;

const chainIds = (import.meta.env.VITE_CHAINIDS).split(',');
let web3: Web3;

const url = import.meta.env.VITE_URL;

let cuenta: string|null;

if (window && window.ethereum)
{
  web3 = new Web3(window.ethereum);
}

export const getCuentaService = async () =>
{
  if (!window.ethereum)
  {
    const data = { success: false, msj: 'Instale MetaMask para ingresar en la aplicación.' };
    throw (data);
  }

  const chainId: string = await window.ethereum.request({ method: 'eth_chainId' });

  if (!chainIds.includes(chainId))
  {
    const data = { success: false, msj: 'La red seleccionada no es la adecuada, debe selecionar LA RED GOERLI' };
    throw (data);
  }

  const cuentas: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });

  cuenta = cuentas[0];

  return ({ success: true, msj: 'Cuenta seleccionada exitosamente.', data: cuenta });
};

export const generarJWTService = async (cuenta: string|null) =>
{
  let token;

  if (!cuenta)
  {
    const data = { success: false, msj: 'Token no generado, seleccione una cuenta.' };
    throw (data);
  }

  try
  {
    token = await sign((msg) => web3.eth.personal.sign(msg, cuenta, ''), '1d');
    return ({ success: true, msj: 'Token generado exitosamente.', data: token });
  }
  catch (e: any)
  {
    const msj: string = e?.message || '';

    if (msj.includes('User denied message signature'))
    {
      const data = { success: false, msj: 'El usuario cancelo el login.' };
      throw (data);
    }

    const data = { success: false, msj: 'Ocurrio un error al generar el token.' };
    throw (data);
  }
};

export const loginService = (token: string|null): Promise<RespuestaAuth> =>
{
  const instance = axios.create({
    baseURL: url,
    headers:
    {
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use((config) =>
  {
    const tokenTmp = token || '';

    if (!config.headers)
    {
      config.headers = {};
    }

    config.headers['x-token'] = tokenTmp;
    return config;
  });

  return instance.post(`/auth/login`)
    .then((respuesta) =>
    {
      const resp = respuesta.data;
      let data;

      if (resp.success)
      {
        localStorage.setItem('token', resp.data);
        data = { success: true, msj: 'Proceso login exitoso.', data: resp.cuenta };
        return Promise.resolve(data);
      }
      else
      {
        data = { success: false, msj: 'Ocurrio un error desconocido al realizar el login.' };
        return Promise.reject(data);
      }
    })
    .catch((error) =>
    {
      let msj = 'Ocurrio un error desconocido al realizar el login.';

      if (Object.keys(error).length === 0)
      {
        msj = 'Ocurrio un error desconocido al realizar el login.';
      }
      else if (error.message.includes('404'))
      {
        msj = 'Servicio esta temporalmente deshabilitado, vuelva a intentarlo en unos minutos.';
      }

      const dataError = { success: false, msj: msj };
      return Promise.reject(dataError);
    });
};

export const validarTokenService = () =>
{
  const instance = axios.create({
    baseURL: url,
    headers:
    {
      'Content-Type': 'application/json'
    }
  });

  setInterceptor(instance);

  return instance.get(`/auth/verificar-token`)
    .then((respuesta) =>
    {
      const resp = respuesta.data;
      localStorage.setItem('token', resp.data);
      return resp.success;
    })
    .catch(() =>
    {
      return false;
    });
};

export const logoutService = () =>
{
  localStorage.removeItem('token');
  localStorage.removeItem('user_r');
  localStorage.removeItem('productos_r');
  localStorage.removeItem('dialogo_r');

  return { success: true, msj: 'Proceso logout exitoso.', data: null };
};
