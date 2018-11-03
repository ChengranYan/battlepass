
class BPAlert {

    private content: egret.DisplayObject;

    private container: egret.DisplayObjectContainer;

    public constructor(content: egret.DisplayObject, container: egret.DisplayObjectContainer) {
        this.content = content;
        this.container = container;
    }

    public present(autoDismiss: boolean = false) {
        this.container.addChild(this.content);

        let stageW = this.container.width;
        let stageH = this.container.height;
        
        this.content.anchorOffsetX = this.content.width / 2;
        this.content.anchorOffsetY = this.content.height / 2;
        this.content.scaleX = 0;
        this.content.scaleY = 0;
        this.content.x = stageW / 2;
        this.content.y = stageH / 2;
        console.log(stageH, stageW, this.content.width, this.content.height, this.content.x, this.content.y);
        let tw = egret.Tween.get(this.content);
        tw.to({
            scaleX: 1,
            scaleY: 1
        }, 500, egret.Ease.bounceOut)
        
        if (autoDismiss) {
            var timer:egret.Timer = new egret.Timer(3000,1);
            timer.addEventListener(
                egret.TimerEvent.TIMER_COMPLETE,
                () => {this.dismiss()}
                ,this);
            timer.start();
        }
        
    }

    public dismiss() {
        let tw = egret.Tween.get(this.content);
        tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.bounceIn).call(() => {
            if (this.container.contains(this.content)) {
                this.container.removeChild(this.content)
            }
        });
    }

}