import styles from './Auth.module.scss';
import { AnyAction } from 'redux';
import { conectarWallet } from '../../store/auth/AuthActions';
import { AppDispatch, RootState, useAppSelector } from '../../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';

export const Auth = () =>
{
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch<AppDispatch>();
  const auth = useAppSelector((state: RootState) => state.auth);

  const handleClick = () =>
  {
    dispatch(conectarWallet());
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1 className={styles.titulo}>Productos Chain</h1>

        <div className={styles.imagen} style={{'backgroundImage': 'url(../img/fondo.svg)'}}>
          <img src={'../img/fondo.svg'} />
        </div>

        <div className={styles.descripcion}>
          Una aplicación <abbr title="(Crear, Leer, Actualizar, Borrar)">C.R.U.D</abbr> de productos, utilizado la test network Goerli. Para ingresar en la aplicación debe seguir los siguientes pasos:
        </div>

        <ul className={styles.pasos}>
          <li>
            Instalar <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/" target="_blank" className={styles.textoResaltadoLink}>Metamask</a>.
          </li>
          <li>
            Obtener <a href="https://faucets.chain.link/" target="_blank" className={styles.textoResaltadoLink}>ethers de prueba de Goerli</a>.
          </li>
          <li>
            Hacer clic en el boton <span className={styles.textoResaltado}>Conectar wallet</span>.
          </li>
        </ul>

        <div className={styles.conexion}>
          Estado: <span className={`${styles.textoResaltado} ${auth.error ? styles.errorLogin : ''} `}>{ auth.error ? auth.error : auth.estado }</span>
        </div>

        <div className={styles.powered}>
          Powered by React
        </div>

        <div className={styles.conectar}>
          <button type="button" onClick={handleClick}>
            { auth.loading
              ? 'Conectando ...'
              : auth.logueado
                ? 'Conectado'
                : 'Conectar wallet'
            }
          </button>
        </div>
      </div>
    </div>
  );
};
