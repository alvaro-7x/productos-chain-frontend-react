import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, Fragment, useContext, useRef, useState } from 'react';

import styles from './ProductoPage.module.scss';
import { ImUser } from 'react-icons/im';
import { MdDateRange, MdImageSearch, MdOutlineCancel, MdOutlineSave } from 'react-icons/md';
import { AppDispatch, RootState, useAppSelector } from '../../store/store';
import { formatearFecha, generarIdTx, urlImagen } from '../../utils/Utils';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { actualizarProducto, asignarErrorProducto, crearProducto, guardarProducto, limpiarErrorProducto } from '../../store/productos/ProductosActions';
import { abrirDialogo } from '../../store/dialogo/DialogoActions';
import { TipoDialogo } from '../../types/TiposAcciones';
import { ThunkDispatch } from 'redux-thunk';
import { CustomError, Producto } from '../../interfaces/interfaces.interface';
import { DialogoPreguntaContext } from '../../components/DialogoPregunta/context/DialogoPreguntaContext';
import { asignar, remover } from '../../components/DialogoPregunta/context/actions/DialogoPreguntaActions';

const ProductoInit =
{
  id: '',
  nombre: '',
  imagen: '',
  descripcion: '',
  destacado: false,
  creadoPor: '',
  creadoEn: 0
};

const ImgDetallesInit =
{
  file: undefined,
  extFile: 'jpg',
  maxSizeFile: 600,
  sizeFile: 0
};

export const ProductoPage = () =>
{
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch<AppDispatch>();
  const productos = useAppSelector((state: RootState) => state.productos);
  const auth = useAppSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const maxSizeFile = 600; // Máximo tamaño de la imagen en Kb
  const extPermitidos = ['jpg', 'jpeg', 'png', 'gif'];
  const [producto, setProducto] = useState<Producto>(productos.productoSeleccionado || ProductoInit);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [imgDetalles, setImgDetalles] = useState<{ file: undefined | File, extFile: string, maxSizeFile: number, sizeFile: number }>(ImgDetallesInit);

  const maxLenNombre = 100;
  const maxLenDescripcion = 200;

  const { dispatchAccionesDialogo } = useContext(DialogoPreguntaContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    const target = event.currentTarget;
    const name = target.name;
    const checked = (event.target as HTMLInputElement).checked;
    const value = target.type === 'checkbox' ? checked : target.value;

    setProducto({
      ...producto,
      [name]: value
    });
  };

  const handleVolver = () =>
  {
    dispatch(crearProducto());
    navigate('/wallet/productos');
  };

  const handleSubmit = (event: FormEvent) =>
  {
    event.preventDefault();

    const error = formularioIncorrecto();

    if (!error)
    {
      const id = producto.id === '' ? null : producto.id;
      const tipo = producto.id === '' ? TipoDialogo.CREAR : TipoDialogo.ACTUALIZAR;

      dispatchAccionesDialogo(asignar(accionProcederDialogo, accionCerrarDialogo));
      dispatch(abrirDialogo(tipo, producto, id));
    }
  };

  const cambiarImagen = (event: ChangeEvent<HTMLInputElement>) =>
  {
    dispatch(limpiarErrorProducto());
    if (event.target.files && event.target.files.length > 0)
    {
      const tmpFile = event.target.files[0];

      if (!tmpFile)
      {
        return;
      }

      const [, ext] = tmpFile.type.split('/');
      const size = Math.round(tmpFile.size / 1024);

      const error = formularioIncorrecto(ext, size);
      if (error)
      {
        return;
      }

      setImgDetalles({
        ...imgDetalles,
        extFile: ext,
        sizeFile: size,
        file: tmpFile
      });

      const fileReader: FileReader = new FileReader();

      fileReader.onloadend = (/* e: ProgressEvent */) =>
      {
        if (imgRef.current && fileReader.result)
        {
          imgRef.current.src = fileReader.result as string;
        }
      };

      fileReader.readAsDataURL(tmpFile);
    }
  };

  const formularioIncorrecto = (ext: string = imgDetalles.extFile, size: number = imgDetalles.sizeFile) =>
  {
    dispatch(limpiarErrorProducto());
    let error: string | null = null;

    if (!extPermitidos.includes(ext))
    {
      error = `Tipo de archivo no permitido, solo se permite: ${extPermitidos.join(', ')}.`;
    }
    else if ((size) > imgDetalles.maxSizeFile)
    {
      error = `El tamaño máximo permitido para la imagen es de ${imgDetalles.maxSizeFile} Kb.`;
    }
    else if (producto.nombre.length <= 0 || producto.nombre.length > maxLenNombre)
    {
      error = `El nombre es requerido y debe tener máximo ${maxLenNombre} caracteres.`;
    }
    else if (producto.descripcion.length <= 0 || producto.descripcion.length > maxLenDescripcion)
    {
      error = `La descripción es requerida y debe tener máximo ${maxLenDescripcion} caracteres.`;
    }

    if (error)
    {
      dispatch(asignarErrorProducto(error as CustomError));
    }

    return (error !== null);
  };

  const accionProcederDialogo = (gasLimit: number, gasPrice: number) =>
  {
    const id = producto.id === '' ? null : producto.id;

    if (id !== null)
    {
      dispatch(actualizarProducto(
        producto,
        imgDetalles.file,
        id,
        gasLimit,
        gasPrice,
      ));
    }
    else
    {
      dispatch(guardarProducto(
        producto,
        imgDetalles.file,
        gasLimit,
        gasPrice,
      ));
    }
  };

  const accionCerrarDialogo = () =>
  {
    dispatch(limpiarErrorProducto());
    dispatchAccionesDialogo(remover());
    navigate('/wallet/productos');
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.contenido}>

          <div className={styles.imgContainer}>
            <img src={urlImagen(producto.imagen)} ref={imgRef} alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.info}>
              * La información del producto (texto e imagen) podria ser borrada. Esta aplicación es solo de prueba.
            </div>
            <div className={styles.productoNombre}>
              <input type="text"
                name="nombre"
                placeholder="Nombre del producto"
                className={`${producto.nombre.length > maxLenNombre ? styles.errorTexto : ''}`}
                value={producto.nombre}
                onChange={handleChange}
              />
            </div>

            <div className={styles.datosUsuario}>
              <div className={styles.campo}>
                <span className={styles.etiqueta}><ImUser className={styles.icono} /> Autor: </span>
                <span className={styles.texto}>{generarIdTx(auth.cuenta)}</span>
              </div>
              <div className={styles.campo}>
                <span className={styles.etiqueta}><MdDateRange className={styles.icono} /> Creado el: </span>
                <span className={styles.texto}>{producto.creadoEn !== 0 ? formatearFecha(producto.creadoEn) : 'En este momento'}</span>
              </div>
            </div>

            <div className={styles.separador}></div>

            <div className={styles.productoDescripcion}>
              <label>Descripción: <span className={`${producto.descripcion.length > maxLenDescripcion ? styles.error : ''}`}>({producto.descripcion.length}/{maxLenDescripcion})</span></label>
              <textarea name="descripcion"
                placeholder="Descripción del producto"
                rows={7}
                className={`${producto.descripcion.length > maxLenDescripcion ? styles.errorTexto : ''}`}
                value={producto.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className={styles.productoDestacado}>
              <label htmlFor="destacado">
                <span>Destacado</span>
                <input type="checkbox"
                  name="destacado"
                  id="destacado"
                  onChange={handleChange}
                  checked={producto.destacado}
                />
                <i></i>
              </label>
            </div>

            <div className={styles.productoImagen}>
              <input type="file"
                name="imagen"
                id="imagen"
                onChange={cambiarImagen}
              />
              <label className={styles.file} htmlFor="imagen">
                <MdImageSearch className={styles.icono} />  Cargar imagen (Max. {maxSizeFile} Kb.)
              </label>
              <div className={styles.imgPermitidas}>
                Extensiones: <span>{extPermitidos.join(', ')}</span>
              </div>
            </div>
            <div className={styles.acciones}>
              <button type="button" className={`${styles.btn} ${styles.btnDanger}`} onClick={handleVolver}><MdOutlineCancel className={styles.icono} /> Cancelar</button>
              <button type="submit" className={`${styles.btn} ${styles.btnSuccess}`}><MdOutlineSave className={styles.icono} /> Guardar</button>
            </div>
          </form>

        </div>
      </div>
    </Fragment>
  );
};
