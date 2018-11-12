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
var SettlementScene = (function (_super) {
    __extends(SettlementScene, _super);
    function SettlementScene(isWin, girlNo) {
        var _this = _super.call(this) || this;
        _this._isWin = isWin;
        _this._girlNo = girlNo;
        return _this;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
    }
    SettlementScene.prototype.setNavigator = function (navigator) {
        this.navigator = navigator;
    };
    SettlementScene.prototype.onAddStage = function () {
        this.createItems();
    };
    SettlementScene.prototype.onRemoveStage = function () {
    };
    SettlementScene.prototype.createItems = function () {
        var _this = this;
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var navigationBar = new NavigationBar();
        navigationBar.onBackDidClick = function () {
            _this.backToMain();
        };
        this.addChild(navigationBar);
        var girl = new egret.Bitmap();
        girl.texture = RES.getRes("drawing_0" + this._girlNo + "_png");
        girl.y = 200;
        girl.width /= 1.5;
        girl.height /= 1.5;
        var gameResult = new GameResult(this._isWin);
        gameResult.x = stageW - gameResult.width;
        gameResult.y = 270;
        this.addChild(gameResult);
        var moreReward = new MoreReward();
        moreReward.y = gameResult.y + gameResult.height + 40;
        moreReward.x = stageW - moreReward.width;
        this.addChild(moreReward);
        var backBtn = new egret.Bitmap();
        backBtn.touchEnabled = true;
        backBtn.texture = RES.getRes("back_to_main_png");
        backBtn.width /= 1.5;
        backBtn.height /= 1.5;
        backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToMain, this);
        var playAgainBtn = new egret.Bitmap();
        playAgainBtn.touchEnabled = true;
        playAgainBtn.texture = RES.getRes("play_again_png");
        playAgainBtn.width /= 1.5;
        playAgainBtn.height /= 1.5;
        playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playAgain, this);
        var space = (stageW - backBtn.width - playAgainBtn.width) / 3;
        var btnY = stageH - 40;
        backBtn.x = space;
        backBtn.y = btnY - backBtn.height;
        playAgainBtn.x = backBtn.x + backBtn.width + space;
        playAgainBtn.y = btnY - playAgainBtn.height;
        this.addChild(backBtn);
        this.addChild(playAgainBtn);
        this.addChild(girl);
    };
    SettlementScene.prototype.backToMain = function () {
        //TODO 返回主页
        console.log("backToMain");
        this.navigator.pop(0);
    };
    SettlementScene.prototype.playAgain = function () {
        //TODO 重玩一次
        console.log("playAgain");
        var startup = new Startup();
        this.navigator.push(startup);
    };
    return SettlementScene;
}(utils.Scene));
__reflect(SettlementScene.prototype, "SettlementScene", ["BPNavigatorAware", "egret.DisplayObject"]);
var GameResult = (function (_super) {
    __extends(GameResult, _super);
    function GameResult(isWin) {
        var _this = _super.call(this) || this;
        _this.width = 500;
        _this.height = 500;
        _this.createItems(isWin);
        return _this;
    }
    GameResult.prototype.createItems = function (isWin) {
        var _this = this;
        var getCenterX = function (width) {
            return (_this.width / 2) - (width / 2);
        };
        var result = new egret.Bitmap();
        if (isWin) {
            result.texture = RES.getRes("result_win_png");
        }
        else {
            result.texture = RES.getRes("result_lose_png");
        }
        result.width /= 1.5;
        result.height /= 1.5;
        result.x = getCenterX(result.width);
        this.addChild(result);
        var level = new egret.TextField();
        level.text = "白银二段";
        level.size = 43;
        level.bold = true;
        level.x = getCenterX(level.textWidth);
        level.y = result.height + 40;
        this.addChild(level);
        var levelStar = new LevelStar();
        levelStar.x = getCenterX(levelStar.width);
        levelStar.y = level.y + level.height + 30;
        this.addChild(levelStar);
        var exp = new RewardItem("经验值+" + (isWin ? "30" : "10"), "ic_exp_png");
        exp.x = getCenterX(exp.width) - 30;
        exp.y = levelStar.y + levelStar.height + 30;
        this.addChild(exp);
        var coins = new RewardItem("洋葱币+100", "ic_coins_png");
        coins.x = exp.x;
        coins.y = exp.y + exp.height + 30;
        this.addChild(coins);
        if (!isWin) {
            coins.visible = false;
        }
    };
    return GameResult;
}(egret.DisplayObjectContainer));
__reflect(GameResult.prototype, "GameResult");
var MoreReward = (function (_super) {
    __extends(MoreReward, _super);
    function MoreReward() {
        var _this = _super.call(this) || this;
        _this.createItems();
        return _this;
    }
    MoreReward.prototype.createItems = function () {
        var moreRewardWindow = new egret.Bitmap();
        moreRewardWindow.texture = RES.getRes("more_reward_window_png");
        moreRewardWindow.height /= 1.5;
        moreRewardWindow.width /= 1.5;
        this.addChild(moreRewardWindow);
        var moreRewardIcons = ["reward_item_1_png", "reward_item_2_png", "reward_item_3_png"];
        var moreRewardTitles = ["洋葱币+200", "段位保护卡+1", "服装碎片+30"];
        var startX = 100;
        var incr = 0;
        for (var i = 0; i < moreRewardIcons.length; i++) {
            var item = new MoreRewardItem(moreRewardTitles[i], moreRewardIcons[i]);
            item.x = startX + incr;
            item.y = 80;
            this.addChild(item);
            incr += (item.width + 80);
        }
        this.height = moreRewardWindow.height;
        this.width = moreRewardWindow.width;
    };
    return MoreReward;
}(egret.DisplayObjectContainer));
__reflect(MoreReward.prototype, "MoreReward");
var RewardItem = (function (_super) {
    __extends(RewardItem, _super);
    function RewardItem(textString, iconString) {
        var _this = _super.call(this) || this;
        _this.createItems(textString, iconString);
        return _this;
    }
    RewardItem.prototype.createItems = function (textString, iconString) {
        this.height = 40;
        var icon = new egret.Bitmap();
        icon.texture = RES.getRes(iconString);
        icon.width /= 1.5;
        icon.height /= 1.5;
        icon.y = (this.height / 2) - (icon.width / 2);
        icon.x = 0;
        this.addChild(icon);
        this._icon = icon;
        var text = new egret.TextField();
        text.text = textString;
        text.size = 24;
        text.y = (this.height / 2) - (text.textHeight / 2);
        text.x = icon.width + 8;
        this.addChild(text);
        this._text = text;
        this.width = text.y + text.textWidth;
    };
    return RewardItem;
}(egret.DisplayObjectContainer));
__reflect(RewardItem.prototype, "RewardItem");
var MoreRewardItem = (function (_super) {
    __extends(MoreRewardItem, _super);
    function MoreRewardItem(textString, iconString) {
        var _this = _super.call(this) || this;
        _this.createItems(textString, iconString);
        return _this;
    }
    MoreRewardItem.prototype.createItems = function (textString, iconString) {
        var icon = new egret.Bitmap();
        icon.texture = RES.getRes(iconString);
        icon.width /= 1.5;
        icon.height /= 1.5;
        this.addChild(icon);
        var text = new egret.TextField();
        text.text = textString;
        text.size = 20;
        text.y = icon.height + 15;
        text.x = icon.width / 2 - text.textWidth / 2;
        this.addChild(text);
        this.width = icon.width;
        this.height = text.y + text.height;
    };
    return MoreRewardItem;
}(egret.DisplayObjectContainer));
__reflect(MoreRewardItem.prototype, "MoreRewardItem");
