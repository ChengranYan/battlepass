class GameController extends egret.EventDispatcher {

    private _socket: egret.WebSocket;

    public nickname: string;
    public gender: number;
    public avatar: string;

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

    // 发送
    // 匹配命令 nickname, gender, avatarUrl
    // 退出匹配命令
    // 游戏开始
    // 答题命令 index, correct,
    // 道具命令 propId,
    // 游戏结束

    // 接收
    // 匹配成功
    // 对方游戏开始
    // 对方答题
    // 对方道具
    

    public setUserInfo(nickname: string, gender: number, avatar: string) {
        this.nickname = nickname;
        this.gender = gender;
        this.avatar = avatar;
    }


}