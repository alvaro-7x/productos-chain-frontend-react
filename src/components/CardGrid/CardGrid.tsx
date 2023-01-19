import styles from './CardGrid.module.scss';
import { MdDateRange, MdDelete, MdEdit } from 'react-icons/md';
import { MyCustomJazzicon } from '../MyCustomJazzicon/MyCustomJazzicon';
import { generarIdTx, formatearFecha } from '../../utils/Utils';
import { MouseEvent } from 'react';
import { Producto } from '../../interfaces/interfaces.interface';

interface PropsCardGrid
{
  producto: Producto;
  seleccionados: string[];
  handleEditarProducto: (id: string | undefined)=>void;
  handleEliminarProducto: (id: string | undefined)=>void;
  handleSeleccionarProducto: (id: string | undefined)=>void;
}

export const CardGrid = ({producto, seleccionados, handleEditarProducto, handleEliminarProducto, handleSeleccionarProducto}: PropsCardGrid) =>
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
    <div className={`${styles.card} ${productosSeleccionados ? (productoEstaSeleccionado ? styles.seleccionado : styles.noSeleccionado) : ''} `} onClick={() =>
    {
      handleSeleccionar(id);
    }}>
      <div className={styles.imagen} style={{'backgroundImage': `url(${imagen || '../img/default.png'})`}} ></div>
      <div className={styles.parteSuperior}>
        <div className={styles.detalles}>
          <h2 className={styles.titulo}>{nombre}</h2>
          <div className={styles.linea}></div>
          <div className={styles.destacado}>
            {
              destacado &&
              <span>Destacado</span>
            }
          </div>
        </div>
        <div className={styles.descripcion}>
          {
            !productoEstaSeleccionado &&
          <div className={styles.acciones} onClick={ (e: MouseEvent) =>
          {
            e.stopPropagation();
          } }>
            <div className={`${styles.button} ${styles.borrar}`} onClick={ () =>
            {
              handleEliminar(id);
            } }>
              <div className={styles.tooltip}>
                <span className={styles.texto}>Borrar</span>
              </div>
              <MdDelete />
            </div>
            <div className={`${styles.button} ${styles.editar}`} onClick={ () =>
            {
              handleEditar(id);
            } }>
              <div className={styles.tooltip}>
                <span className={styles.texto}>Editar</span>
              </div>
              <MdEdit />
            </div>
          </div>
          }

          {descripcion}
        </div>
      </div>

      <div className={styles.parteInferior}>
        <div className={styles.usuario}>
          <MyCustomJazzicon autor={creadoPor} diametro={26} />
          {generarIdTx(creadoPor)}
        </div>
        <div className={styles.fecha}>
          <span ><MdDateRange className={styles.icono}/></span>
          {formatearFecha(creadoEn)}
        </div>
      </div>

    </div>
  );
};
