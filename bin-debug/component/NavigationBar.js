var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var NavigationBar = (function (_super) {
    __extends(NavigationBar, _super);
    function NavigationBar() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    NavigationBar.prototype.onAddToStage = function (event) {
        this.createItems();
    };
    NavigationBar.prototype.createItems = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.width = stageW;
        this.height = 68;
        this.title = new egret.TextField();
        this.title.textColor = 0xffffff;
        this.title.textAlign = "center";
        this.title.text = "洋葱试炼场";
        this.title.size = 32;
        this.title.x = (stageW / 2) - 100;
        this.title.y = 68;
        this.title.width = 200;
        this.title.height = 44;
        this.addChild(this.title);
        this.backBtn = new egret.Bitmap();
        var texture = RES.getRes("app_bar_ic_back_png");
        this.backBtn.texture = texture;
        this.backBtn.touchEnabled = true;
        this.backBtn.width /= 2;
        this.backBtn.height /= 2;
        this.backBtn.x = 20;
        this.backBtn.y = 20 + texture.textureHeight / 2;
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.addChild(this.backBtn);
    };
    NavigationBar.prototype.onBtnClick = function () {
        console.log('btnDidClick');
        if (this.onBackDidClick) {
            this.onBackDidClick();
        }
    };
    return NavigationBar;
}(egret.DisplayObjectContainer));
__reflect(NavigationBar.prototype, "NavigationBar");
