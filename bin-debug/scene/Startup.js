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
var Startup = (function (_super) {
    __extends(Startup, _super);
    function Startup() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Startup.prototype.setNavigator = function (navigator) {
        this.navigator = navigator;
    };
    Startup.prototype.onAddToStage = function (event) {
        var _this = this;
        this.createItems();
        var timer = new egret.Timer(500, 1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () { _this.newSeasonAlert.present(); }, this);
        timer.start();
    };
    Startup.prototype.createItems = function () {
        var _this = this;
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var getCenterX = function (width) {
            return (stageW / 2) - (width / 2);
        };
        var navigationBar = new NavigationBar();
        navigationBar.onBackDidClick = function () {
            _this.backToMain();
        };
        this.addChild(navigationBar);
        var avatar = new egret.Bitmap();
        avatar.texture = RES.getRes("new_popup_view_png");
        avatar.width = 160;
        avatar.height = 160;
        avatar.y = 200;
        avatar.x = getCenterX(avatar.width);
        this.addChild(avatar);
        var nicknameGender = new NicknameGender("小可爱", 1);
        nicknameGender.x = getCenterX(nicknameGender.width);
        nicknameGender.y = avatar.y + avatar.height + 30;
        this.addChild(nicknameGender);
        var level = new egret.TextField();
        level.text = "白银二段";
        level.size = 45;
        level.bold = true;
        level.x = getCenterX(level.textWidth);
        level.y = nicknameGender.y + nicknameGender.height + 30;
        this.addChild(level);
        var levelStar = new LevelStar();
        levelStar.x = getCenterX(levelStar.width);
        levelStar.y = level.y + level.height + 30;
        this.addChild(levelStar);
        var offlineMode = new egret.Bitmap();
        offlineMode.texture = RES.getRes("entrance_solo_png");
        offlineMode.width /= 1.5;
        offlineMode.height /= 1.5;
        offlineMode.x = getCenterX(offlineMode.width);
        offlineMode.y = levelStar.y + levelStar.height + 100;
        offlineMode.touchEnabled = true;
        offlineMode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterOfflineMode, this);
        this.addChild(offlineMode);
        var onlineMode = new egret.Bitmap();
        onlineMode.texture = RES.getRes("entrance_1v1_png");
        onlineMode.width /= 1.5;
        onlineMode.height /= 1.5;
        onlineMode.x = getCenterX(onlineMode.width);
        onlineMode.y = offlineMode.y + offlineMode.height + 50;
        onlineMode.touchEnabled = true;
        onlineMode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterOnlineMode, this);
        this.addChild(onlineMode);
        var content = new egret.Bitmap();
        content.texture = RES.getRes("coming_soon_png");
        content.width /= 1.5;
        content.height /= 1.5;
        content.touchEnabled = true;
        content.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissComingSoonAlert, this);
        this.comingSoonAlert = new BPAlert(content, this.stage);
        content = new egret.Bitmap();
        content.texture = RES.getRes("new_popup_view_png");
        content.width /= 1.5;
        content.height /= 1.5;
        content.touchEnabled = true;
        content.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissNewSeasonAlert, this);
        this.newSeasonAlert = new BPAlert(content, this.stage);
    };
    Startup.prototype.enterOnlineMode = function () {
        // TODO 跳转准备阶段
        console.log("跳转准备阶段", this.navigator);
        var settlementScene = new SettlementScene(true, 1);
        this.navigator.push(settlementScene);
    };
    Startup.prototype.enterOfflineMode = function () {
        console.log('enterOfflineMode');
        this.comingSoonAlert.present(true);
    };
    Startup.prototype.dismissComingSoonAlert = function () {
        this.comingSoonAlert.dismiss();
    };
    Startup.prototype.dismissNewSeasonAlert = function () {
        this.newSeasonAlert.dismiss();
    };
    Startup.prototype.backToMain = function () {
        //TODO 退出游戏
        console.log("backToMain");
        this.navigator.pop();
    };
    return Startup;
}(egret.DisplayObjectContainer));
__reflect(Startup.prototype, "Startup", ["BPNavigatorAware", "egret.DisplayObject"]);
var NicknameGender = (function (_super) {
    __extends(NicknameGender, _super);
    function NicknameGender(nickname, gender) {
        var _this = _super.call(this) || this;
        _this.createItems(nickname, gender);
        return _this;
    }
    NicknameGender.prototype.createItems = function (nickname, gender) {
        var nicknameTextField = new egret.TextField();
        nicknameTextField.text = nickname;
        nicknameTextField.size = 28;
        nicknameTextField.alpha = 0.6;
        this.addChild(nicknameTextField);
        var genderImage = new egret.Bitmap();
        if (gender == 1) {
            genderImage.texture = RES.getRes("ic_boy_png");
        }
        else {
            genderImage.texture = RES.getRes("ic_girl_png");
        }
        genderImage.width /= 1.5;
        genderImage.height /= 1.5;
        genderImage.x = nicknameTextField.textWidth + 10;
        genderImage.y = 0;
        this.addChild(genderImage);
        this.width = genderImage.x + genderImage.width;
        this.height = genderImage.height;
    };
    return NicknameGender;
}(egret.DisplayObjectContainer));
__reflect(NicknameGender.prototype, "NicknameGender");
