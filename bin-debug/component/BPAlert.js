var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BPAlert = (function () {
    function BPAlert(content, container) {
        this.content = content;
        this.container = container;
    }
    BPAlert.prototype.present = function (autoDismiss) {
        var _this = this;
        if (autoDismiss === void 0) { autoDismiss = false; }
        this.container.addChild(this.content);
        var stageW = this.container.width;
        var stageH = this.container.height;
        this.content.anchorOffsetX = this.content.width / 2;
        this.content.anchorOffsetY = this.content.height / 2;
        this.content.scaleX = 0;
        this.content.scaleY = 0;
        this.content.x = stageW / 2;
        this.content.y = stageH / 2;
        console.log(stageH, stageW, this.content.width, this.content.height, this.content.x, this.content.y);
        var tw = egret.Tween.get(this.content);
        tw.to({
            scaleX: 1,
            scaleY: 1
        }, 500, egret.Ease.bounceOut);
        if (autoDismiss) {
            var timer = new egret.Timer(3000, 1);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () { _this.dismiss(); }, this);
            timer.start();
        }
    };
    BPAlert.prototype.dismiss = function () {
        var _this = this;
        var tw = egret.Tween.get(this.content);
        tw.to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.bounceIn).call(function () {
            if (_this.container.contains(_this.content)) {
                _this.container.removeChild(_this.content);
            }
        });
    };
    return BPAlert;
}());
__reflect(BPAlert.prototype, "BPAlert");
