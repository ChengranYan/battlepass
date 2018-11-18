
class GameController extends egret.EventDispatcher {

    private _socket: egret.WebSocket;

    public constructor() {
        super();
        this._socket = new egret.WebSocket();       
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);                            
        this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);    
        this._socket.connect("echo.websocket.org", 80);
    }

    private onSocketOpen():void {    
        var cmd = "Hello Egret WebSocket";    
        console.log("连接成功，发送数据：" + cmd);    
        this._socket.writeUTF(cmd);
    }
    private onReceiveMessage(e:egret.Event):void {    
        var msg = this._socket.readUTF();    
        console.log("收到数据：" + msg);
    }

}