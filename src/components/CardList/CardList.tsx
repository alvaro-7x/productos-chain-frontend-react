import styles from './CardList.module.scss';
import { formatearFecha, generarIdTx, urlImagen } from '../../utils/Utils';
import { MyCustomJazzicon } from '../MyCustomJazzicon/MyCustomJazzicon';
import { MdDateRange, MdDelete, MdEdit } from 'react-icons/md';
import { Tooltip } from '../Tooltip/Tooltip';
import { Producto } from '../../interfaces/interfaces.interface';
import { MouseEvent } from 'react';

interface PropsCardList
{
  producto: Producto;
  seleccionados: string[];
  handleEditarProducto: (id: string | undefined)=>void;
  handleEliminarProducto: (id: string | undefined)=>void;
  handleSeleccionarProducto: (id: string | undefined)=>void;
}

export const CardList = ({producto, seleccionados, handleEditarProducto, handleEliminarProducto, handleSeleccionarProducto}: PropsCardList) =>
{
  const {id, nombre, imagen, descripcion, destacado, creadoPor, creadoEn} = producto;
  const productosSeleccionados = seleccionados.length > 0;
  const productoEstaSeleccionado = seleccionados.includes(id);

  const handleEliminar = (id: string|undefined) =>
  {
    if (id)
    {
      handleEliminarProducto(id);
    }
  };

  const handleEditar = (id: string|undefined) =>
  {
    if (id)
    {
      handleEditarProducto(id);
    }
  };

  const handleSeleccionar = (id: string|undefined) =>
  {
    if (id)
    {
      handleSeleccionarProducto(id);
    }
  };

  return (
    <div className={
      `${styles.cardList} ${destacado ? styles.destacado : ''}
       ${productosSeleccionados ? (productoEstaSeleccionado ? styles.seleccionado : styles.noSeleccionado) : ''} `}
    onClick={() =>
    {
      handleSeleccionar(id);
    }}>
      <div className={styles.cardContenido}>
        <h2 className={styles.titulo}>{nombre}</h2>
        <div className={styles.divisor}></div>
        <div className={styles.acciones}>
          {
            !productoEstaSeleccionado &&
          <span className={styles.botones} onClick={ (e: MouseEvent) =>
          {
            e.stopPropagation();
          } }>
            <button type="button" className={`tooltipContainer ${styles.btn}`} onClick={ () =>
            {
              handleEditar(id);
            } }>
              <MdEdit />
              <Tooltip texto={'Editar'} />
            </button>
            <button type="button" className={`tooltipContainer ${styles.btn}`} onClick={ () =>
            {
              handleEliminar(id);
            } }>
              <MdDelete />
              <Tooltip texto={'Eliminar'} />
            </button>
          </span>
          }
        </div>
        <div className={styles.descripcion}> { descripcion } </div>
      </div>

      <div className={styles.cardImagen} >
        <img src={urlImagen(imagen)} />
        <div className={styles.detallesAutor}>
          <div>
            <span className={styles.icono}><MyCustomJazzicon autor={creadoPor} diametro={20} /></span>
            <span className={styles.dato}>{generarIdTx(creadoPor)}</span>
          </div>
          <div>
            <span className={styles.icono}><MdDateRange className={styles.icono}/></span>
            <span className={styles.dato}>{formatearFecha(creadoEn)}</span>
          </div>
        </div>
        {
          destacado &&
        <div className={styles.destacado}>
          <span> Destacado </span>
        </div>
        }
      </div>

    </div>
  );
};
