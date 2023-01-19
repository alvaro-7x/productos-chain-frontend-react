import styles from './ContainerCardGrid.module.scss';
import { Producto } from '../../interfaces/interfaces.interface';
import { CardGrid } from '../CardGrid/CardGrid';

interface PropsContainerCardGrid
{
  productos: Producto[];
  seleccionados: string[];
  handleEditarProducto: (id: string|undefined)=>void;
  handleEliminarProducto: (id: string|undefined)=>void;
  handleSeleccionarProducto: (id: string|undefined)=>void;
}

export const ContainerCardGrid = ({productos, seleccionados, handleEditarProducto, handleEliminarProducto, handleSeleccionarProducto}: PropsContainerCardGrid) =>
{
  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        {
          (productos).map((p: Producto) =>
            (
              <CardGrid key={p.id}
                producto={p}
                seleccionados={seleccionados}
                handleEditarProducto={handleEditarProducto}
                handleEliminarProducto={handleEliminarProducto}
                handleSeleccionarProducto={handleSeleccionarProducto}
              />
            ))
        }
      </div>
    </div>
  );
};
