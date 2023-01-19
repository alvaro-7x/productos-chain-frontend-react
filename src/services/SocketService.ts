import { io } from 'socket.io-client';

const url = import.meta.env.VITE_URL;

interface DataSocket
{
  data: any,
  balance: number,
  tx: string | undefined
}

class SocketService
{
  socket: any = undefined;
  private static _instance: SocketService;

  public static getInstance (): SocketService
  {
    return this._instance || (this._instance = new this());
  }

  private constructor ()
  {
    this.socket = io(url, { timeout: 3000, extraHeaders: { 'x-token': localStorage.getItem('token') || '' } });
  }

  public emit (evento: string, data: DataSocket)
  {
    if (this.socket)
    {
      this.socket.emit(evento, data);
    }
  }

  public getSocket ()
  {
    return this.socket;
  }
}

export const socketService = SocketService.getInstance();
