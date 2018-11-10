
class BPAlert extends egret.EventDispatcher {

    public static ON_ALERT_DISMISS = "ON_ALERT_DISMISS";

    private content: egret.DisplayObject;

    private container: egret.Stage;

    private backgroundMask: egret.Bitmap;

    private timer: egret.Timer;

    public constructor(content: egret.DisplayObject, container: egret.Stage) {
        super();
        this.content = content;
        this.container = container;
        this.backgroundMask = new egret.Bitmap();
        this.backgroundMask.texture = RES.getRes("mask_png")
        this.backgroundMask.touchEnabled = true;
    }

    public present(autoDismiss: boolean = false, animate: boolean = true) {
        

        let stageW = this.container.stageWidth;
        let stageH = this.container.stageHeight;
        
        this.backgroundMask.width = stageW;
        this.backgroundMask.height = stageH;
        this.backgroundMask.alpha = 0;
        this.container.addChild(this.backgroundMask);


        this.content.anchorOffsetX = this.content.width / 2;
        this.content.anchorOffsetY = this.content.height / 2;
        if (animate) {
            this.content.scaleX = 0;
            this.content.scaleY = 0;
        } else {
            this.content.scaleX = 1;
            this.content.scaleY = 1;
        }
        this.content.x = stageW / 2;
        this.content.y = stageH / 2;
        this.container.addChild(this.content);

        let backgroundTw = egret.Tween.get(this.backgroundMask);
        backgroundTw.to({alpha: 1}, 500)

        if (animate) {
            let contentTw = egret.Tween.get(this.content);
            contentTw.to({
                scaleX: 1,
                scaleY: 1
            }, 500, egret.Ease.backOut)
        }
        
        if (autoDismiss) {
            this.timer = new egret.Timer(3000,1);
            this.timer.addEventListener(
                egret.TimerEvent.TIMER_COMPLETE,
                () => {this.dismiss()}
                ,this);
            this.timer.start();
        }
        
    }

    public dismiss(animate: boolean = true) {

        let remove = () => {
            if (this.container.contains(this.content)) {
                this.container.removeChild(this.content);
            }
            if (this.container.contains(this.backgroundMask)) {
                this.container.removeChild(this.backgroundMask);
            }
            this.dispatchEvent(new AlertEvent());
        };

        if (animate) {
            let tw = egret.Tween.get(this.content);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(remove);
        } else {
            remove();
        }
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }
    }

}

class AlertEvent extends egret.Event {

    public constructor() {
        super(BPAlert.ON_ALERT_DISMISS);
    }

}