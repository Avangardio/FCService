
import io, {Socket} from 'socket.io-client';


export class SocketIO {
    public socket:Socket;
    public static instance: SocketIO = new SocketIO();

    private constructor() {
        this.socket = io("https://avangardio-1.ru/");
        }


    public sda():void {
        //...
    }
}
