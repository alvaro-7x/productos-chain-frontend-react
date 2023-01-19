import styles from './ContainerCardList.module.scss';
import { CardList } from '../CardList/CardList';
import { Producto } from '../../interfaces/interfaces.interface';

interface PropsContainerCardList
{
  productos: Producto[];
  seleccionados: string[];
  handleEditarProducto: (id: string | undefined)=>void;
  handleEliminarProducto: (id: string | undefined)=>void;
  handleSeleccionarProducto: (id: string | undefined)=>void;
}

export const ContainerCardList = ({productos, seleccionados, handleEditarProducto, handleEliminarProducto, handleSeleccionarProducto}: PropsContainerCardList) =>
{
  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        {
          (productos).map((p: Producto) =>
            (
              <CardList key={p.id}
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
