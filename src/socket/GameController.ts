

class GameController extends egret.EventDispatcher {

    private _socket: egret.WebSocket;

    public nickname: string;
    public gender: number;
    public avatar: string;

    public onMate: Function;
    public onAnswer: Function;
    public onUseProp: Function;

    public constructor() {
        super();
        
    }

    public connect() {
        this.close();
        this._socket = new egret.WebSocket();       
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);                            
        this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);    
        this._socket.connectByUrl("ws://api-test.vlightv.com/battle/pass");
    }

    public close() {
        if (this._socket) {
            this._socket.close();
            this._socket = null;
        }
    }

    public clear() {
        this.close();
        this.onMate = this.onUseProp = this.onAnswer = null;
    }

    public mate(drawingId: number) {
        this.sendMessage({
            cmd: "mate",
            nickname: GameHolder.controller.nickname,
            avatar: GameHolder.controller.avatar,
            gender: GameHolder.controller.gender,
            drawingId: drawingId
        });
    }

    public answer(questionIndex: number, correct: boolean) {
        this.sendMessage({
            cmd: "answer",
            questionIndex: questionIndex,
            correct: correct
        })
    }

    public useProp(propId: number) {
        this.sendMessage({
            cmd: "useProp",
            propId: propId,
        })
    }

    private onSocketOpen():void {    
        console.log("连接成功");    
    }
    private onReceiveMessage(e:egret.Event):void {    
        var msg = this._socket.readUTF();    
        console.log("收到数据：" + msg);
        let data = JSON.parse(msg);
        switch(data.cmd) {
            case "mate":
                if (this.onMate) this.onMate(data);
                break;
            case "useProp":
                if (this.onUseProp) this.onUseProp(data);
                break;
            case "answer":
                if (this.onAnswer) this.onAnswer(data);
                break;
            
        }
        

    }

    private sendMessage(data: any) {
        if (this._socket) {
            this._socket.writeUTF(JSON.stringify(data));
        }
    }

    public setUserInfo(nickname: string, gender: number, avatar: string) {
        this.nickname = nickname;
        this.gender = gender;
        this.avatar = avatar;
    }


}