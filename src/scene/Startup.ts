
class Startup extends egret.DisplayObjectContainer implements BPNavigatorAware {

    private comingSoonAlert: BPAlert;
    private newSeasonAlert: BPAlert;

    private navigator: BPNavigator;

    public setNavigator(navigator: BPNavigator) {
        this.navigator = navigator;
    }

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.createItems();

        var timer:egret.Timer = new egret.Timer(500,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,() => {this.newSeasonAlert.present()},this);
        timer.start();
    }

    private createItems() {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;

        let getCenterX = (width:number) => {
            return (stageW / 2) - (width / 2);
        };

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
        avatar.x = getCenterX(avatar.width);
        
        this.addChild(avatar);
        
        let nicknameGender = new NicknameGender("小可爱", 1);
        nicknameGender.x = getCenterX(nicknameGender.width);
        nicknameGender.y = avatar.y + avatar.height + 30;
        this.addChild(nicknameGender);
        
        let level = new egret.TextField();
        level.text = "白银二段";
        level.size = 45;
        level.bold = true;
        level.x = getCenterX(level.textWidth);
        level.y = nicknameGender.y + nicknameGender.height + 30;
        this.addChild(level);


        let levelStar = new LevelStar();
        levelStar.x = getCenterX(levelStar.width);
        levelStar.y = level.y + level.height + 30;
        this.addChild(levelStar);

        let offlineMode = new egret.Bitmap();
        offlineMode.texture = RES.getRes("entrance_solo_png");
        offlineMode.width /= 1.5;
        offlineMode.height /= 1.5;
        offlineMode.x = getCenterX(offlineMode.width);
        offlineMode.y = levelStar.y + levelStar.height + 100;
        offlineMode.touchEnabled = true;
        offlineMode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterOfflineMode, this);
        this.addChild(offlineMode);
    
        let onlineMode = new egret.Bitmap();
        onlineMode.texture = RES.getRes("entrance_1v1_png");
        onlineMode.width /= 1.5;
        onlineMode.height /= 1.5;
        onlineMode.x = getCenterX(onlineMode.width);
        onlineMode.y = offlineMode.y + offlineMode.height + 50;
        onlineMode.touchEnabled = true;
        onlineMode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterOnlineMode, this);
        this.addChild(onlineMode);


        let content = new egret.Bitmap();
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
    }

    private enterOnlineMode() {
        // TODO 跳转准备阶段
        console.log("跳转准备阶段", this.navigator);
        let settlementScene = new SettlementScene(true, 1);
        this.navigator.push(settlementScene);
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

