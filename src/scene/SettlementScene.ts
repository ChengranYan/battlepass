

class SettlementScene extends utils.Scene {

    private _girl:egret.Bitmap;
    private _gameResult:egret.Bitmap;
    private _isWin:boolean;
    private _drawingId: number;


    public constructor(isWin:boolean, drawingId:number) {
        super();
        this._drawingId = drawingId;
        this._isWin = isWin;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
    }

    public onAddStage() {
        this.createItems();
    }

    onRemoveStage () {

    }

    private createItems() {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        let navigationBar = new NavigationBar();
        navigationBar.onBackDidClick = () => {
            this.backToMain();
        }
        this.addChild(navigationBar);
        let girl = new egret.Bitmap();
        girl.texture = RES.getRes("drawing_0"+this._drawingId+"_png");
        girl.width /= 1.5;
        girl.height /= 1.5;
        girl.x = -girl.width;
        girl.y = 200;
        girl.alpha = 0;
        

        let gameResult = new GameResult(this._isWin);
        gameResult.x = stageW - gameResult.width;
        gameResult.y = 270;
        this.addChild(gameResult);

        let moreReward = new MoreReward();
        moreReward.y = gameResult.y + gameResult.height + 40;
        moreReward.x = stageW;
        moreReward.alpha = 0;
        this.addChild(moreReward);


        let backBtn = new egret.Bitmap();
        backBtn.touchEnabled = true;
        backBtn.texture = RES.getRes("back_to_main_png");
        backBtn.width /= 1.5;
        backBtn.height /= 1.5;
        backBtn.alpha = 0;
        backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToMain, this);
        
        let playAgainBtn = new egret.Bitmap();
        playAgainBtn.touchEnabled = true;
        playAgainBtn.texture = RES.getRes("play_again_png");
        playAgainBtn.width /= 1.5;
        playAgainBtn.height /= 1.5;
        playAgainBtn.alpha = 0;
        playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playAgain, this);

        let space = (stageW - backBtn.width - playAgainBtn.width) / 3;
        let btnY = stageH - 40;
        backBtn.x = stageW + space;
        backBtn.y = btnY - backBtn.height;

        playAgainBtn.x = stageW + backBtn.x + backBtn.width + space;
        playAgainBtn.y = btnY - playAgainBtn.height;

        this.addChild(backBtn);
        this.addChild(playAgainBtn);

        let timer = new egret.Timer(400, 1);
        timer.addEventListener(
                egret.TimerEvent.TIMER_COMPLETE,
                () => {
                    egret.Tween.get(girl).to({x: 0, alpha: 1}, 500, egret.Ease.backOut);
                    gameResult.startAnimate();
                    egret.Tween.get(moreReward).wait(700).to({x: stageW - moreReward.width, alpha: 1}, 300);
                    egret.Tween.get(backBtn).wait(600).to({x: space, alpha: 1}, 300);
                    egret.Tween.get(playAgainBtn).wait(650).to({x: space + space + backBtn.width, alpha: 1}, 300);
                }
                ,this);
        timer.start();
        this.addChild(girl);
    }

    private backToMain() {
        //TODO 返回主页
        console.log("backToMain")
        utils.App.pushSceneToRoot(new StartupScene(false));
    }

    private playAgain() {
        //TODO 重玩一次
        console.log("playAgain");
        utils.App.pushSceneToRoot(new StartupScene(false));
        utils.App.pushScene(new SelecteroleScene());
    }

}


class GameResult extends egret.DisplayObjectContainer {

    private _result:egret.Bitmap;
    private _level:egret.TextField;
    private _levelStar:LevelStar;
    private _exp:RewardItem;
    private _coins:RewardItem;

    public startAnimate() {
        egret.Tween.get(this._result).wait(100).to({alpha: 1, x: this.getCenterX(this._result.width)}, 300, egret.Ease.backOut)
        egret.Tween.get(this._level).wait(200).to({alpha: 1,x: this.getCenterX(this._level.width)}, 300)
        egret.Tween.get(this._levelStar).wait(200).to({alpha: 1,x: this.getCenterX(this._levelStar.width)}, 300)
        this._levelStar.startAnimate()
        egret.Tween.get(this._exp).wait(500).to({alpha: 1,x: this.getCenterX(this._exp.width)}, 300)
        egret.Tween.get(this._coins).wait(600).to({alpha: 1,x: this.getCenterX(this._coins.width)}, 300)
    }

    public constructor(isWin:boolean) {
        super();
        this.width = 500;
        this.height = 500;
        this.createItems(isWin);
    }

    private getCenterX = (width:number) => {
        return (this.width / 2) - (width / 2);
    };

    private createItems(isWin:boolean) {
        
        let result = new egret.Bitmap();
        if (isWin) {
            result.texture = RES.getRes("result_win_png");
        } else {
            result.texture = RES.getRes("result_lose_png");
        }
        result.width /= 1.5;
        result.height /= 1.5;
        result.alpha = 0.5;
        result.x = this.width + this.getCenterX(result.width);
        this.addChild(result);
        this._result = result;

        let level = new egret.TextField();
        level.text = "白银二段";
        level.size = 43;
        level.bold = true;
        level.x = this.width + this.getCenterX(level.textWidth);
        level.y = result.height + 40;
        level.alpha = 0.5;
        this.addChild(level);
        this._level = level;

        let levelStar = new LevelStar(true);
        levelStar.x = this.width + this.getCenterX(levelStar.width);
        levelStar.y = level.y + level.height + 30;
        this.addChild(levelStar);
        this._levelStar = levelStar;

        let exp = new RewardItem("经验值+"+(isWin ? "30":"10"), "ic_exp_png");
        exp.x = this.width + this.getCenterX(exp.width)-30;
        exp.y = levelStar.y + levelStar.height + 30;
        this.addChild(exp);
        this._exp = exp;

        let coins = new RewardItem("洋葱币+100", "ic_coins_png");
        coins.x = exp.x;
        coins.y = exp.y + exp.height + 30;
        this.addChild(coins);
        this._coins = coins;

        if (!isWin) {
            coins.visible = false;
        }
    }

    

}

class MoreReward extends egret.DisplayObjectContainer {

    private _moreRewardWindow:egret.Bitmap;
    
    public constructor() {
        super();
        this.createItems();
    }

    private createItems() {

        let moreRewardWindow = new egret.Bitmap();
        moreRewardWindow.texture = RES.getRes("more_reward_window_png");
        moreRewardWindow.height /= 1.5;
        moreRewardWindow.width /= 1.5;
        this.addChild(moreRewardWindow);

        let moreRewardIcons = ["reward_item_1_png","reward_item_2_png","reward_item_3_png"];
        let moreRewardTitles = ["洋葱币+200", "段位保护卡+1", "服装碎片+30"];

        let startX = 100;
        let incr = 0;
        for (let i=0; i<moreRewardIcons.length; i++) {
            let item = new MoreRewardItem(moreRewardTitles[i], moreRewardIcons[i]);
            item.x = startX + incr;
            item.y = 80;
            this.addChild(item);
            incr += (item.width + 80);
        }

        this.height = moreRewardWindow.height;
        this.width = moreRewardWindow.width;
    }

}


class RewardItem extends egret.DisplayObjectContainer {

    private _icon:egret.Bitmap;
    private _text:egret.TextField;

    public constructor(textString: string, iconString: string) {
        super();
        this.createItems(textString, iconString);
    }

    private createItems(textString: string,iconString: string) {
        this.height = 40;
        
        let icon = new egret.Bitmap();
        icon.texture = RES.getRes(iconString);
        icon.width /= 1.5;
        icon.height /= 1.5;
        icon.y = (this.height/2) - (icon.width / 2);
        icon.x = 0;
        this.addChild(icon);
        this._icon = icon;

        let text = new egret.TextField();
        text.text = textString;
        text.size = 24;
        text.y = (this.height/2) - (text.textHeight / 2);
        text.x = icon.width + 8;
        this.addChild(text);
        this._text = text;

        this.width = text.y + text.textWidth;
    }

}

class MoreRewardItem extends egret.DisplayObjectContainer {

    public constructor(textString: string, iconString: string) {
        super();
        this.createItems(textString, iconString);
    }

    private createItems(textString: string, iconString: string) {

        let icon = new egret.Bitmap();
        icon.texture = RES.getRes(iconString);
        icon.width /= 1.5;
        icon.height /= 1.5;
        this.addChild(icon);

        let text = new egret.TextField();
        text.text = textString;
        text.size = 20;
        text.y = icon.height + 15;
        text.x = icon.width / 2 - text.textWidth / 2;
        this.addChild(text);

        this.width = icon.width;
        this.height = text.y + text.height;
        
    }

}

