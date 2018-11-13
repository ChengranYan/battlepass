
class Startup extends utils.Scene implements BPNavigatorAware {

    private comingSoonAlert: BPAlert;
    private newSeasonAlert: BPAlert;

    private navigator: BPNavigator;

    private offlineMode: egret.Bitmap;
    private onlineMode: egret.Bitmap;

    public setNavigator(navigator: BPNavigator) {
        this.navigator = navigator;
    }

    public constructor() {
        super();
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    onAddStage() {
        this.createItems();

        var timer:egret.Timer = new egret.Timer(100,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,() => {this.newSeasonAlert.present(false, false)},this);
        timer.start();
    }

    onRemoveStage() {
        
    }



    private getCenterX(width:number) {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        return (stageW / 2) - (width / 2);
    }

    private createItems() {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;

        let navigationBar = new NavigationBar();
        navigationBar.onBackDidClick = () => {
            this.backToMain();
        }
        this.addChild(navigationBar);

        let avatar = new egret.Bitmap();
        avatar.texture = RES.getRes("new_popup_view_png");
        avatar.width = 160;
        avatar.height = 160;
        avatar.y = 200;
        avatar.x = this.getCenterX(avatar.width);
        
        this.addChild(avatar);
        
        let nicknameGender = new NicknameGender("小可爱", 1);
        nicknameGender.x = this.getCenterX(nicknameGender.width);
        nicknameGender.y = avatar.y + avatar.height + 30;
        this.addChild(nicknameGender);
        
        let level = new egret.TextField();
        level.text = "白银二段";
        level.size = 45;
        level.bold = true;
        level.x = this.getCenterX(level.textWidth);
        level.y = nicknameGender.y + nicknameGender.height + 30;
        this.addChild(level);


        let levelStar = new LevelStar();
        levelStar.x = this.getCenterX(levelStar.width);
        levelStar.y = level.y + level.height + 30;
        this.addChild(levelStar);

        let offlineMode = new egret.Bitmap();
        offlineMode.texture = RES.getRes("entrance_solo_png");
        offlineMode.width /= 1.5;
        offlineMode.height /= 1.5;
        offlineMode.x = stageW;
        offlineMode.y = levelStar.y + levelStar.height + 100;
        offlineMode.touchEnabled = true;
        offlineMode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterOfflineMode, this);
        this.addChild(offlineMode);
        this.offlineMode = offlineMode;
    
        let onlineMode = new egret.Bitmap();
        onlineMode.texture = RES.getRes("entrance_1v1_png");
        onlineMode.width /= 1.5;
        onlineMode.height /= 1.5;
        onlineMode.x = stageW;
        onlineMode.y = offlineMode.y + offlineMode.height + 50;
        onlineMode.touchEnabled = true;
        onlineMode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterOnlineMode, this);
        this.addChild(onlineMode);
        this.onlineMode = onlineMode;


        let content = new egret.Bitmap();
        content.texture = RES.getRes("coming_soon_png");
        content.width /= 1.5;
        content.height /= 1.5;
        content.touchEnabled = true;
        content.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissComingSoonAlert, this);
        this.comingSoonAlert = new BPAlert(content, this.stage);

        let newSeasonView = new NewSeasonView();
        newSeasonView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissNewSeasonAlert, this);
        this.newSeasonAlert = new BPAlert(newSeasonView, this.stage);
        this.newSeasonAlert.addEventListener(BPAlert.ON_ALERT_DISMISS, this.startAnimation, this)
    }

    private enterOnlineMode() {
        console.log("跳转准备阶段", this.navigator);
        // let settlementScene = new SettlementScene(true, 1);
        let selecteroleScene = new SelecteroleScene();
        utils.App.pushScene(selecteroleScene);
        // this.navigator.push(selecteroleScene);
    }

    private enterOfflineMode() {
        console.log('enterOfflineMode')
        this.comingSoonAlert.present(true);
    }
    private dismissComingSoonAlert() {
        this.comingSoonAlert.dismiss();
    }

    private dismissNewSeasonAlert() {
        this.newSeasonAlert.dismiss();
    }

    private backToMain() {
        //TODO 退出游戏
        console.log("backToMain")
        this.navigator.pop();
    }

    private startAnimation() {
        let offlineTw = egret.Tween.get(this.offlineMode, {loop: false});
        offlineTw.wait(100).to({x: this.getCenterX(this.offlineMode.width)}, 300);

        let onlineTw = egret.Tween.get(this.onlineMode, {loop: false});
        onlineTw.wait(300).to({x: this.getCenterX(this.onlineMode.width)}, 300);
    }

}

class NicknameGender extends egret.DisplayObjectContainer {

    public constructor(nickname: string, gender: number) {
        super();
        this.createItems(nickname, gender);
    }

    private createItems(nickname: string, gender: number) {
        let nicknameTextField = new egret.TextField();
        nicknameTextField.text = nickname;
        nicknameTextField.size = 28;
        nicknameTextField.alpha = 0.6;

        this.addChild(nicknameTextField);

        let genderImage = new egret.Bitmap();
        if (gender == 1) {
            genderImage.texture = RES.getRes("ic_boy_png");
        } else {
            genderImage.texture = RES.getRes("ic_girl_png");
        }
        genderImage.width /= 1.5;
        genderImage.height /= 1.5;
        genderImage.x = nicknameTextField.textWidth + 10;
        genderImage.y = 0;
        this.addChild(genderImage);
        
        this.width = genderImage.x + genderImage.width;
        this.height = genderImage.height;

    }

}

class NewSeasonView extends egret.DisplayObjectContainer {

    

    public constructor() {
        super();
        this.createItems();
    }

    public createItems() {
        let content = new egret.Bitmap();
        content.texture = RES.getRes("new_popup_view_png");
        content.width /= 1.5;
        content.height /= 1.5;
        this.addChild(content);

        let confirm = new egret.Bitmap();
        confirm.texture = RES.getRes("new_season_confirm_png");
        confirm.width /= 1.5;
        confirm.height /= 1.5;
        confirm.anchorOffsetX = confirm.width / 2;
        confirm.anchorOffsetY = confirm.height / 2;
        confirm.x = content.width / 2;
        confirm.y = content.height;
        this.addChild(confirm);
        confirm.touchEnabled = true;
        // confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {this.dispatchEvent(event)}, this);

        let tips = new egret.Bitmap();
        tips.texture = RES.getRes("new_season_tips_png");
        tips.width /= 1.5;
        tips.height /= 1.5;
        tips.anchorOffsetX = tips.width / 2;
        tips.anchorOffsetY = tips.height / 2;
        tips.x = content.width / 2;
        tips.y = confirm.y - tips.height - 30;
        this.addChild(tips);

        let tw = egret.Tween.get(tips, {loop: true});
        tw.to({y: tips.y - 50}, 1000).to({y: tips.y}, 1000);


    }


}