import { Producto } from '../../interfaces/interfaces.interface';
import { TiposAcciones } from '../../types/TiposAcciones';
import { ProductosActionsTypes } from './ProductosActionsTypes';

export interface ProductosState {

  productos: Producto[];
  productosSeleccionados: string[];
  productoSeleccionado: Producto | null;

  productosBusqueda: Producto[];
  buscando: boolean;

  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ProductosState =
{
  productos: [],
  productosSeleccionados: [],
  productoSeleccionado: null,
  productosBusqueda: [],
  buscando: false,
  loading: false,
  loaded: false,
  error: null
};

let myLocalStorage = JSON.parse(localStorage.getItem('productos_r') || '{}');

if (Object.keys(myLocalStorage).length === 0)
{
  myLocalStorage = null;
}

export const productosReducer = (state: ProductosState = (myLocalStorage || initialState), action: ProductosActionsTypes) =>
{
  let id: string;
  switch (action.type)
  {
    case TiposAcciones.listarProductos:
      return {
        ...initialState,
        loading: true,
        error: null
      };

    case TiposAcciones.listarProductosSuccess:
      return {
        ...state,
        productos: action.payload.productos,
        loading: false,
        loaded: true
      };

    case TiposAcciones.listarProductosError:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error
      };

    case TiposAcciones.seleccionarProducto:
      id = action.payload.id;
      return {
        ...state,
        productoSeleccionado: null,
        productosSeleccionados: state.productosSeleccionados.includes(id)
          ? state.productosSeleccionados.filter((productoId: string) => (productoId !== id)) // ya existe
          : [...state.productosSeleccionados, id] // no existe,
      };

    case TiposAcciones.deseleccionarProducto:
      id = action.payload.id;
      return {
        ...state,
        productoSeleccionado: null,
        productosSeleccionados: state.productosSeleccionados.filter((productoId: string) => (productoId !== id))
      };

    case TiposAcciones.deseleccionarTodosLosProductos:
      return {
        ...state,
        productosSeleccionados: []
      };

    case TiposAcciones.eliminarProducto:
      return {
        ...state,
        loading: true,
        error: null
      };

    case TiposAcciones.eliminarProductoSuccess:
      return {
        ...state,
        buscando: false,
        productosBusqueda: [],
        productos: state.productos.filter((producto: Producto) => producto.id !== action.payload.id),
        productosSeleccionados: [],
        loading: false,
        error: null
      };

    case TiposAcciones.eliminarVariosProductosSuccess:
      return {
        ...state,
        buscando: false,
        productosBusqueda: [],
        productos: state.productos.filter((producto: Producto) => (!action.payload.id.includes(producto.id))),
        productosSeleccionados: [],
        loading: false,
        error: null
      };

    case TiposAcciones.eliminarProductoError:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case TiposAcciones.crearProducto:
      return {
        ...state,
        buscando: false,
        productosBusqueda: [],
        productoSeleccionado: null,
        error: null
      };

    case TiposAcciones.guardarProducto:
      return {
        ...state,
        loading: true
      };

    case TiposAcciones.guardarProductoSuccess:
      return {
        ...state,
        buscando: false,
        productosBusqueda: [],
        loading: false,
        productos: [action.payload.producto, ...state.productos]
      };

    case TiposAcciones.guardarProductoError:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case TiposAcciones.editarProducto:
      return {
        ...state,
        loading: true,
        productoSeleccionado: null,
        productosSeleccionados: [],
        error: null
      };

    case TiposAcciones.editarProductoSuccess:
      return {
        ...state,
        buscando: false,
        productosBusqueda: [],
        loading: false,
        productoSeleccionado: action.payload.producto,
        productosSeleccionados: [],
        error: null
      };

    case TiposAcciones.editarProductoError:
      return {
        ...state,
        loading: false,
        productoSeleccionado: null,
        productosSeleccionados: [],
        error: action.payload.error
      };

    case TiposAcciones.actualizarProducto:
      return {
        ...state,
        loading: true,
        error: null
      };

    case TiposAcciones.actualizarProductoSuccess:
      return {
        ...state,
        loading: false,
        productos: state.productos.map((producto: Producto) =>
        {
          if (producto.id === action.payload.producto.id)
          {
            return action.payload.producto;
          }
          else
          {
            return producto;
          }
        }),
        productoSeleccionado: null
      };

    case TiposAcciones.actualizarProductoError:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case TiposAcciones.iniciarBusquedaProducto:
      return {
        ...state,
        buscando: true,
        productosBusqueda: state.productos.filter((producto: Producto) =>
        {
          if (producto.nombre.toLowerCase().includes(action.payload.buscar.toLowerCase()))
          {
            return producto;
          }
          return false;
        })
      };

    case TiposAcciones.terminarBusquedaProducto:
      return {
        ...state,
        buscando: false,
        productosBusqueda: []
      };

    case TiposAcciones.limpiarError:
      return {
        ...state,
        error: null
      };

    case TiposAcciones.asignarError:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
