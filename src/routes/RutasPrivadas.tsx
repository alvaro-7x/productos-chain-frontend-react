import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useReducer, useState } from 'react';
import { AppDispatch, RootState, useAppSelector } from '../store/store';
import { Header } from '../components/Header/Header';
import { ProductosPage } from '../pages/ProductosPage/ProductosPage';
import { logoutService, validarTokenService } from '../services/Auth.services';
import { desconectarWallet } from '../store/auth/AuthActions';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ProductoPage } from '../pages/ProductoPage/ProductoPage';
import { MensajeError } from '../components/MensajeError/MensajeError';
import { NotificacionTipo, RespuestaSocket } from '../interfaces/interfaces.interface';
import { actualizarProductoSuccess, eliminarProductoSuccess, eliminarVariosProductosSuccess, guardarProductoSuccess, listarProductos } from '../store/productos/ProductosActions';
import { DialogoPreguntaContext } from '../components/DialogoPregunta/context/DialogoPreguntaContext';
import { dialogoPreguntaReducer } from '../components/DialogoPregunta/context/reducer/dialogoPreguntaReducer';
import { DialogoPreguntaPortal } from '../components/DialogoPreguntaPortal/DialogoPreguntaPortal';
import { Notificacion } from '../components/Notificacion/Notificacion';
import { socketService } from '../services/SocketService';

export declare let window: any;

export const RutasPrivadas = () =>
{
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch<AppDispatch>();
  const auth = useAppSelector((state: RootState) => state.auth);
  const locationReact = useLocation();
  const navigate = useNavigate();
  const [notificacion, setNotificacion] = useState<NotificacionTipo>({tx: '', tipoAccion: '', visible: false});

  const [estadoSocket, setEstadoSocket] = useState<boolean>(false);

  useEffect(() =>
  {
    if (locationReact.pathname !== '/wallet')
    {
      validarTokenService()
        .then((resp: boolean) =>
        {
          if (!resp)
          {
            dispatch(desconectarWallet());
            navigate('/login');
          }
        })
        .catch(() =>
        {
          dispatch(desconectarWallet());
          navigate('/login');
        });
    }
  }
  , [locationReact.pathname]);

  useEffect(() =>
  {
    // Metamask
    if (window.ethereum)
    {
      window.ethereum.on('accountsChanged', cambioEnWallet, true);
      window.ethereum.on('chainChanged', cambioEnWallet, true);
      window.ethereum.on('disconnect', cambioEnWallet, true);
    }

    // Socket
    if (socketService.getSocket())
    {
      socketService.getSocket()
        .off('connect')
        .on('connect', () =>
        {
          setEstadoSocket(true);
          dispatch(listarProductos());
        });

      socketService.getSocket().on('disconnect', () =>
      {
        setEstadoSocket(false);
      });

      socketService.getSocket()
        .off('producto-creado')
        .on('producto-creado', (resp: RespuestaSocket) =>
        {
          dispatch(guardarProductoSuccess(resp.data, resp.balance));
          notificarUsuarios(resp.tx, 'Creación');
        });

      socketService.getSocket()
        .off('producto-actualizado')
        .on('producto-actualizado', (resp: RespuestaSocket) =>
        {
          dispatch(actualizarProductoSuccess(resp.data, resp.balance));
          notificarUsuarios(resp.tx, 'Actualización');
        });

      socketService.getSocket()
        .off('producto-eliminado')
        .on('producto-eliminado', (resp: RespuestaSocket) =>
        {
          dispatch(eliminarProductoSuccess(resp.data, resp.balance));
          notificarUsuarios(resp.tx, 'Eliminación');
        });

      socketService.getSocket()
        .off('productos-eliminados')
        .on('productos-eliminados', (resp: RespuestaSocket) =>
        {
          dispatch(eliminarVariosProductosSuccess(resp.data, resp.balance));
          notificarUsuarios(resp.tx, 'Eliminaciones');
        });
    }

    return () =>
    {
      window.ethereum.removeListener('accountsChanged', cambioEnWallet, true);
      window.ethereum.removeListener('chainChanged', cambioEnWallet, true);
      window.ethereum.removeListener('disconnect', cambioEnWallet, true);
    };
  }, []);

  useEffect(() =>
  {
    if (!estadoSocket)
    {
      socketService.getSocket().connect();
    }
    setEstadoSocket(socketService.getSocket().connected);
  }, [socketService.getSocket().connected]);

  if (!auth.cuenta && auth.estado !== 'Conectado.')
  {
    dispatch(desconectarWallet());
    logoutService();
    location.href = '/';
  }

  const cambioEnWallet = () =>
  {
    dispatch(desconectarWallet());
    logoutService();
    location.href = '/';
  };

  const notificarUsuarios = (tx: string, tipoAccion: string) =>
  {
    setNotificacion({
      tx: tx,
      tipoAccion: tipoAccion,
      visible: true
    });
  };

  const initState = () =>
  {
    return {
      proceder: undefined,
      cancelar: undefined,
      id: undefined
    };
  };

  const [accionesDialogo, dispatchAccionesDialogo] = useReducer(dialogoPreguntaReducer, { }, initState);

  return (
    <Fragment>
      <DialogoPreguntaContext.Provider value={{accionesDialogo, dispatchAccionesDialogo}}>
        <Header estadoSocket={estadoSocket} />
        <MensajeError />
        <Notificacion notificacion={notificacion} setNotificacion={setNotificacion} />
        <DialogoPreguntaPortal/>
        <Routes>
          <Route path="productos" element={ <ProductosPage/> } />

          <Route path="producto" element={ <ProductoPage /> } />

          <Route path="*" element={<Navigate to="productos" replace/>} />
        </Routes>
        <Outlet />
      </DialogoPreguntaContext.Provider>
    </Fragment>
  );
};
