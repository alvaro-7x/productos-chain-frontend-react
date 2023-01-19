import { TiposAcciones } from '../../types/TiposAcciones';
import { CustomError, Producto } from '../../interfaces/interfaces.interface';

// listar Productos
type listarProductos = {
  type: TiposAcciones.listarProductos
}
type listarProductosSuccess = {
  type: TiposAcciones.listarProductosSuccess,
  payload: { productos: Producto[], balance: number, tx?: string }
}
type listarProductosError = {
  type: TiposAcciones.listarProductosError,
  payload: { error: CustomError }
}

// seleccionar producto
type seleccionarProducto = {
  type: TiposAcciones.seleccionarProducto,
  payload: { id: string }
}

// deseleccionar producto
type deseleccionarProducto = {
  type: TiposAcciones.deseleccionarProducto,
  payload: { id: string }
}

// deseleccionar TODOS los producto
type deseleccionarTodosProductos = {
  type: TiposAcciones.deseleccionarTodosLosProductos
}

// eliminar producto
type eliminarProducto = {
  type: TiposAcciones.eliminarProducto,
  payload: { id: string, gasLimit: number, gasPrice: number }
}
type eliminarVariosProductos = {
  type: TiposAcciones.eliminarVariosProductos,
  payload: { id: string[], gasPrice: number }
}
type eliminarVariosProductosSuccess = {
  type: TiposAcciones.eliminarVariosProductosSuccess,
  payload: { id: string[], balance: number, tx?: string }
}
type eliminarProductoSuccess = {
  type: TiposAcciones.eliminarProductoSuccess,
  payload: { id: string, balance: number, tx?: string }
}
type eliminarProductoError = {
  type: TiposAcciones.eliminarProductoError,
  payload: { error: CustomError }
}

// crear producto
type crearProducto = {
  type: TiposAcciones.crearProducto
}

// guadar producto
type guardarProducto = {
  type: TiposAcciones.guardarProducto,
  payload: { producto: Producto, imagen: File, gasLimit: number, gasPrice: number }
}
type guardarProductoSuccess = {
  type: TiposAcciones.guardarProductoSuccess,
  payload: { producto: Producto, balance: number, tx?: string }
}
type guardarProductoError = {
  type: TiposAcciones.guardarProductoError,
  payload: { error: CustomError }
}

// editar producto
type editarProducto = {
  type: TiposAcciones.editarProducto,
  payload: { id: string }
}
type editarProductoSuccess = {
  type: TiposAcciones.editarProductoSuccess,
  payload: { producto: Producto | null }
}
type editarProductoError = {
  type: TiposAcciones.editarProductoError,
  payload: { error: CustomError }
}

// actualizar producto
type actualizarProducto = {
  type: TiposAcciones.actualizarProducto,
  payload: { producto: Producto, imagen: File, id: string | null, gasLimit: number, gasPrice: number }
}
type actualizarProductoSuccess = {
  type: TiposAcciones.actualizarProductoSuccess,
  payload: { producto: Producto, balance: number, tx?: string }
}
type actualizarProductoError = {
  type: TiposAcciones.actualizarProductoError,
  payload: { error: CustomError }
}

// Busqueda producto
type iniciarBusquedaProducto = {
  type: TiposAcciones.iniciarBusquedaProducto,
  payload: { buscar: string }
}
type terminarBusquedaProducto = {
  type: TiposAcciones.terminarBusquedaProducto
}

// Limpiar error
type limpiarErrorProducto = {
  type: TiposAcciones.limpiarError
}

type asignarErrorProducto = {
  type: TiposAcciones.asignarError,
  payload: { error: CustomError }
}

export type ProductosActionsTypes =
  listarProductos |
  listarProductosSuccess |
  listarProductosError |
  seleccionarProducto |
  deseleccionarProducto |
  deseleccionarTodosProductos |
  eliminarProducto |
  eliminarVariosProductos |
  eliminarVariosProductosSuccess |
  eliminarProductoSuccess |
  eliminarProductoError |
  crearProducto |
  guardarProducto |
  guardarProductoSuccess |
  guardarProductoError |
  editarProducto |
  editarProductoSuccess |
  editarProductoError |
  actualizarProducto |
  actualizarProductoSuccess |
  actualizarProductoError |
  iniciarBusquedaProducto |
  terminarBusquedaProducto |
  limpiarErrorProducto |
  asignarErrorProducto;
