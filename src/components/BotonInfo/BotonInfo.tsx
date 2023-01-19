import styles from './BotonInfo.module.scss';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { MyCustomJazzicon } from '../MyCustomJazzicon/MyCustomJazzicon';
import { ThunkDispatch } from 'redux-thunk';
import { AppDispatch, RootState, useAppSelector } from '../../store/store';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { generarIdTx } from '../../utils/Utils';
import { Fragment, MouseEvent, useState } from 'react';
import { Producto } from '../../interfaces/interfaces.interface';
import { logoutService } from '../../services/Auth.services';
import { desconectarWallet } from '../../store/auth/AuthActions';

interface PropsBotonInfo
{
  estadoSocket: boolean;
}

export const BotonInfo = ({estadoSocket}: PropsBotonInfo) =>
{
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch<AppDispatch>();
  const auth = useAppSelector((state: RootState) => state.auth);
  const productos = useAppSelector((state: RootState) => state.productos);
  const dialogo = useAppSelector((state: RootState) => state.dialogo);
  const [menuAbierto, setMenuAbierto] = useState<boolean>(false);

  const misProductos = () =>
  {
    let cantidad = 0;
    productos.productos.map((producto: Producto) =>
    {
      const creadoPor = producto.creadoPor;
      const cuenta = auth.cuenta || '';

      if (creadoPor.toLowerCase() === cuenta.toLowerCase())
      {
        cantidad++;
      }
    });
    return cantidad;
  };

  const handleCerrarSesion = () =>
  {
    setMenuAbierto(false);
    logoutService();
    dispatch(desconectarWallet());
    location.href = '/auth';
  };

  return (
    <Fragment>
      <div className={styles.botonInfo} onClick={() => setMenuAbierto(!menuAbierto)}>
        <div className={styles.cuenta}>
          <div className={styles.imgCuenta}>
            <MyCustomJazzicon autor={auth.cuenta || ''} diametro={24} />
          </div>
          <span className={`${styles.infoCuenta} ${!estadoSocket ? styles.socketDesconectado : ''}`} >
            {generarIdTx(auth.cuenta)}
          </span>
          <span className={styles.iconoArrow} >
            {
              menuAbierto
                ? <MdOutlineKeyboardArrowUp className={styles.icono} />
                : <MdOutlineKeyboardArrowDown className={styles.icono} />
            }
          </span>
        </div>

      </div>
      {
        menuAbierto &&
        <div className={styles.menuContainer} onClick={() => setMenuAbierto(!menuAbierto)}>
          <div className={styles.menu} onClick={(e: MouseEvent) => e.stopPropagation() }>
            <div className={styles.subMenu}>
              <span className={styles.titulo}>Total productos:</span>
              <span className={styles.dato}>{productos.productos.length}</span>
            </div>
            <div className={styles.subMenu}>
              <span className={styles.titulo}>Mis productos:</span>
              <span className={styles.dato}>{misProductos()}</span>
            </div>
            <div className={styles.subMenu}>
              <span className={styles.titulo}>Mi balance:</span>
              <span className={styles.dato}>{dialogo.balance} ETH</span>
            </div>
            {
              !estadoSocket &&
              <div className={styles.subMenu}>
                <span className={`${styles.titulo} ${styles.socketDesconectado}`}>Error de conexión</span>
              </div>
            }
            <div className={styles.divisor}></div>
            <div className={styles.subMenuButton}>
              <button type="button" className={styles.button} onClick={handleCerrarSesion}>Cerrar sesión</button>
            </div>
          </div>
        </div>
      }
    </Fragment>
  );
};
