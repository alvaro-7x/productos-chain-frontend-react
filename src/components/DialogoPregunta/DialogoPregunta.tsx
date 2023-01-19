import styles from './DialogoPregunta.module.scss';
import { BsFillCheckCircleFill, BsQuestionCircleFill } from 'react-icons/bs';
import { ChangeEvent, FormEvent, Fragment, KeyboardEvent, useContext, useEffect, useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AppDispatch, RootState, useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { cerrarDialogo, procesandoAccionEnDialogo } from '../../store/dialogo/DialogoActions';
import { generarIdTx, tx2Array } from '../../utils/Utils';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { AnyAction } from 'redux';
import { limpiarErrorProducto } from '../../store/productos/ProductosActions';
import { DialogoPreguntaContext } from './context/DialogoPreguntaContext';
import { remover } from './context/actions/DialogoPreguntaActions';

interface Gas
{
  gasLimit: number;
  gasPrice: number;
}

const GasInit = {
  gasLimit: parseInt(import.meta.env.VITE_GAS_LIMIT),
  gasPrice: parseInt(import.meta.env.VITE_GAS_PRICE)
};

const urlTransaccion = import.meta.env.VITE_TRANSACCION;
export const DialogoPregunta = () =>
{
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch<AppDispatch>();
  const dialogo = useAppSelector((state: RootState) => state.dialogo);
  const auth = useAppSelector((state: RootState) => state.auth);

  const [gas, setGas] = useState<Gas>(GasInit);

  const gasLimitTmp = dialogo.gas;

  const [error, setError] = useState<string|undefined>(undefined);
  const [estimatedGasFee, setEstimatedGasFee] = useState<number>(0);

  const {accionesDialogo, dispatchAccionesDialogo} = useContext(DialogoPreguntaContext);

  const soloNumeros = (event: KeyboardEvent) =>
  {
    if (!(event.charCode >= 48 && event.charCode < 58))
    {
      event.preventDefault();
    }
  };

  const handleClose = () =>
  {
    dispatch(cerrarDialogo());
    dispatch(limpiarErrorProducto());
    dispatchAccionesDialogo(remover());

    if (dialogo.procesoExitoso === true && accionesDialogo.cancelar)
    {
      accionesDialogo.cancelar();
    }

    setGas(GasInit);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
  {
    const target = event.target;

    setGas({
      ...gas,
      [target.name]: target.value
    });
  };

  const handleSubmit = (event: FormEvent) =>
  {
    event.preventDefault();

    if (error)
    {
      return;
    }

    dispatch(procesandoAccionEnDialogo());
    if (accionesDialogo.proceder)
    {
      accionesDialogo.proceder(gas.gasLimit, gas.gasPrice, accionesDialogo.id);
    }
  };

  const calcularEstimadeGasFee = () =>
  {
    const estimatedGasFeeTmp = ((gas.gasPrice * Math.pow(10, 9)) * gas.gasLimit) / Math.pow(10, 18);
    setEstimatedGasFee(estimatedGasFeeTmp);
    verificarGas();
  };

  const verificarGas = () =>
  {
    setError(undefined);

    if (gas.gasLimit < gasLimitTmp)
    {
      setError(`El gas limit debe ser al menos de ${gasLimitTmp}`);
      return;
    }

    if (estimatedGasFee > dialogo.balance)
    {
      setError('No tiene fondos suficientes');
      return;
    }

    if (gas.gasPrice <= 0)
    {
      setGas({
        ...gas,
        gasPrice: 0
      });
      setError('El gas price debe ser mayor a 0 (cero)');
    }
  };

  useEffect(() =>
  {
    calcularEstimadeGasFee();
  }, [gas.gasPrice, gas.gasLimit, estimatedGasFee]);

  useEffect(() =>
  {
    setGas({
      ...gas,
      gasLimit: dialogo.gas
    });
    calcularEstimadeGasFee();
  }, [dialogo.gas]);

  useEffect(() =>
  {
    dispatch(cerrarDialogo());
  }, []);

  return (
    <Fragment>
      {
        dialogo.dialogoAbierto &&
    <div className={styles.container}>
      <div className={styles.dialogo}>
        <form onSubmit={handleSubmit}>
          <div className={styles.header}>
            <div className={styles.titulo}>
              {
                !dialogo.procesoExitoso
                  ? (<Fragment><BsQuestionCircleFill className={styles.icono} /> <h2>¿Esta seguro de continuar? </h2></Fragment>)
                  : (<Fragment><BsFillCheckCircleFill className={styles.icono} /> <h2>Petición realizada exitosamente</h2></Fragment>)
              }
            </div>

            <div className={styles.detalleCuenta}>
              <div className={styles.fila}>
                <div className={styles.label}>Cuenta actual:</div>
                <div className={styles.texto}> {generarIdTx(auth.cuenta)} </div>
              </div>
              <div className={styles.fila}>
                <div className={styles.label}>Balance actual (ETH):</div>
                <div className={styles.texto}> {dialogo.balance} </div>
              </div>

              {
                dialogo.procesoExitoso &&
              <div className={styles.fila}>
                <div className={styles.label}>Transaction Hash:</div>
                <div className={`${styles.texto} ${styles.colTx}`}>
                  {
                    tx2Array(dialogo.tx).map((txHash: string) => (
                      <span className={styles.tx} key={txHash}>
                        <a href={`${urlTransaccion}/${txHash}`} target="_blank">{generarIdTx(txHash)}</a>
                      </span>
                    ))
                  }
                </div>
              </div>
              }
            </div>
          </div>

          {
            !dialogo.procesoExitoso &&
            <div className={styles.contenido}>
              <div className={styles.divisor}></div>
              <div className={styles.fila}>
                <div className={styles.label}>Gas limit (ETH):</div>
                <div className={styles.input}>
                  <input type="number"
                    name="gasLimit"
                    onKeyPress={ soloNumeros }
                    onChange={handleChange}
                    value={gas.gasLimit} />
                  <div className={styles.gasSugerido}>Gas limit sugerido: <span>{gasLimitTmp}</span></div>
                </div>
              </div>
              <div className={styles.fila}>
                <div className={styles.label}>Gas price (GWEI):
                &nbsp;
                <a href="https://www.ethgasstation.info/" target="_blank">
                  <BsQuestionCircleFill className={styles.icono} />
                </a>
                </div>
                <div className={styles.input}>
                  <input type="number"
                    name="gasPrice"
                    onKeyPress={ soloNumeros }
                    onChange={handleChange}
                    value={gas.gasPrice} />
                </div>
              </div>
              <div className={styles.fila}>
                <div className={styles.label}>Estimated gas fee (ETH):</div>
                <div className={`${styles.texto} ${styles.textoDatos}`}> {estimatedGasFee.toFixed(8)} </div>
              </div>

              <div className={styles.divisor}></div>

              <div className={styles.total} >
                <div className={styles.fila}>
                  <div className={styles.label}>Total (ETH):</div>
                  <div className={`${styles.texto} ${styles.textoDatos} ${styles.textoTotal}`}> {estimatedGasFee.toFixed(8)} </div>
                </div>
              </div>

              <p>
              Realizar esta acción requiere el <b>CONSUMO</b> de Ethers.
              </p>
            </div>
          }

          {
            (error || dialogo.error) &&
            !dialogo.loading &&

            <div className={styles.errorDialogo}>
              {error || dialogo.error}
            </div>
          }

          {
            dialogo.loading &&
            <div className={styles.progresBar} >
              <ProgressBar />
            </div>
          }

          <div className={styles.acciones}>
            <button type="button"
              className={`${styles.btn} ${styles.btnDanger}`}
              onClick={handleClose}
              disabled={dialogo.loading}
            >Cerrar</button>

            {
              !dialogo.procesoExitoso &&
            <button type="submit"
              className={`${styles.btn} ${styles.btnSuccess}`}
              disabled={dialogo.loading}
            >Si, estoy seguro</button>
            }
          </div>
        </form>
      </div>
    </div>
      }
    </Fragment>
  );
};
