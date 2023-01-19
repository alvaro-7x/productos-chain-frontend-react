import styles from './Notificacion.module.scss';
import {TbBellRinging} from 'react-icons/tb';
import { MdOutlineClose } from 'react-icons/md';
import { Fragment } from 'react';
import { generarIdTx, tx2Array } from '../../utils/Utils';
import { NotificacionTipo } from '../../interfaces/interfaces.interface';

const urlTransaccion = import.meta.env.VITE_TRANSACCION;

interface PropsNotificacion
{
  notificacion: NotificacionTipo;
  setNotificacion: (s: NotificacionTipo)=>void;
}

export const Notificacion = ({notificacion, setNotificacion}: PropsNotificacion) =>
{
  const handleCerrar = () =>
  {
    setNotificacion({
      ...notificacion,
      visible: false
    });
  };

  return (
    <Fragment>
      {
        notificacion.visible &&
      <div className={styles.containerNotificacion}>
        <section>
          <div className={styles.contenido}>
            <span className={styles.icono}><TbBellRinging /></span>
            <div className={styles.texto}>
              Transacción
              {
                tx2Array(notificacion.tx).map((txHash: string, i: number) => (
                  <a key={`${txHash}-${i}`} href={`${urlTransaccion}/${txHash}`} target="_blank"> {generarIdTx(txHash)} </a>
                ))
              }
              realizada ({notificacion.tipoAccion})
            </div>
            <span className={styles.cerrar}><MdOutlineClose onClick={ handleCerrar }/></span>
          </div>
        </section>
      </div>
      }
    </Fragment>
  );
};
