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
var fooIcon = 'https://wx.qlogo.cn/mmopen/vi_32/xicrRCPjKzWRpv3AyDmHVF8yEPS57ZxkJGFyDx3KNxPsiagFLfGr05VebiaJzkZsc9n32GvJR9JLMkBMdaT682cJw/132';
var FightingScene = (function (_super) {
    __extends(FightingScene, _super);
    function FightingScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "Fighting";
        _this.userIcon_left.source = fooIcon;
        _this.userIcon_right.source = fooIcon;
        _this.userName_left.text = '左左';
        _this.userName_right.text = '右右';
        _this.countDown_left.text = '12"';
        _this.countDown_right.text = '2"';
        return _this;
        // this.userIcon_left.source = fooIcon
        // this.userICon_right.source = fooIcon
    }
    FightingScene.prototype.onAddStage = function () {
        // const userIconMask : egret.Shape = new egret.Shape();
        // userIconMask.graphics.beginFill(0x0000ff);
        // userIconMask.graphics.drawCircle(239 + 78,236 + 78,78);
        // userIconMask.graphics.endFill();
        // this.addChild(userIconMask);
    };
    FightingScene.prototype.onRemoveStage = function () {
    };
    return FightingScene;
}(utils.Scene));
__reflect(FightingScene.prototype, "FightingScene");
