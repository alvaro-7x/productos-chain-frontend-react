
export interface RespuestaDialogoProceder {
  proceder: boolean;
  gasLimit: number;
  gasPrice: number;
}

export interface RespuestaGasServicio {
  success: boolean;
  msj: string;
  balance: number;
  gas: number;
}

export interface Producto {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  destacado: boolean;
  creadoPor: string;
  creadoEn: number;
  seleccionado?: boolean;
}

export interface RespuestaServicio {
  success: boolean;
  msj: string;
  balance: number;
  productos?: Producto[];
  producto?: Producto;
  ids?: string[];
  tx?: string;
}

export interface RespuestaAuth {
  success: boolean;
  msj: string;
  data: string | null;
  cuenta?: string;
}

export interface RespuestaSocket {
  data: any;
  balance: number;
  tx: string;
}

export interface NotificacionTipo
{
  tx: string;
  tipoAccion: string;
  visible: boolean;
}

export interface CustomError {
  msj?: any;
}
