
class SelecteroleScene extends utils.Scene {

    private battleTipAlert: BPAlert;

    private roleDetail: RuleDetailView;

    private selectContent;

    private firstDisplay: boolean;

    public constructor(firstDisplay: boolean = true) {
        super();
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.firstDisplay = firstDisplay;
    }

    onAddStage () {
        if (this.firstDisplay) {
            this.showBattleTips()
        } else {
            this.createItems();
        }
    }

    onRemoveStage () {

    }

    // private onAddToStage(event: egret.Event) {
    //    console.log('enter SelecteroleScene')
       
    //     this.showBattleTips()
        
    // }

    private showBattleTips () {
        let content = new RuleDescriptionView();
        content.touchEnabled = false;
        content.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissBattleTipsAlert, this);
        this.battleTipAlert = new BPAlert(content, this.stage);

        var timer:egret.Timer = new egret.Timer(50,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,() => {this.battleTipAlert.present()},this);
        timer.start();
    }

    private dismissBattleTipsAlert() {
        this.battleTipAlert.dismiss(false);
        this.createItems();
    }

    private createItems() {

        let navigationBar = new NavigationBar();
        navigationBar.onBackDidClick = () => {
            this.backToMain();
        }
        this.addChild(navigationBar);

        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        this.roleDetail = new RuleDetailView(stageW);
        this.roleDetail.x = 0;
        this.roleDetail.y = Math.max((stageH - this.roleDetail.height - 413 - 110 ) /2, 0) + 120;
        this.addChild(this.roleDetail);
        this.roleDetail.setSelectedRoleIndex(0);

        this.createRoleContainer()
    }

    private createRoleContainer() {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;

        if (this.contains(this.selectContent)) {
            this.removeChild(this.selectContent)
            console.log(this.contains(this.selectContent))
        }
        let bg = new egret.Bitmap();
        bg.texture = RES.getRes("select_background_png");
        bg.width /= 1.5;
        bg.height /= 1.5;
        console.log(bg.height);
        this.selectContent = new egret.DisplayObjectContainer();
        this.selectContent.width = stageW;
        this.selectContent.height = bg.height;
        this.selectContent.y = stageH - this.selectContent.height;
        this.selectContent.x = 0;
        
        
        this.selectContent.addChild(bg);

        let startX = 42
        for(let i = 0; i < 4; i++) {

            let shp:egret.Sprite = new egret.Sprite();
            shp.graphics.lineStyle(8, 0xffffff, 1);
            if (i === this.roleDetail.getSelectedRoleIndex()) {
                shp.graphics.lineStyle(20, 0xF5BE35, 1);
            }
            shp.graphics.drawRoundRect(42 + (i) * (30 + 144), 96, 144, 144, 20, 20);

            let avatar = new egret.Bitmap();
            avatar.texture = RES.getRes(`avatar_drawing_0${i+1}_png`);
            avatar.width = 144;
            avatar.height = 144;
            avatar.x = 42 + (i) * (30 + 144);
            avatar.y = 96;

            shp.addChild(avatar);
            shp.touchEnabled = true;
            shp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleSelectRole.bind(this, i), this);

            this.selectContent.addChild(shp);
        }

        let startBtn = new egret.Bitmap();
        startBtn.texture = RES.getRes('button_png');
        startBtn.width /= 1.5;
        startBtn.height /= 1.5;
        startBtn.x = stageW / 2 - startBtn.width / 2;;
        startBtn.y = 290;
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onstartBtnClick, this);
        this.selectContent.addChild(startBtn);

        this.addChild(this.selectContent);

    }


    private changeRole () {
        
    }

    private onstartBtnClick() {
        console.log('start')
        utils.App.pushScene(new BattleMatchScene(this.roleDetail.getDrawingId()))
    }

    private handleSelectRole (index: number) {
        console.log('select', index);
        
        this.roleDetail.setSelectedRoleIndex(index);
        this.createRoleContainer();
    }
    private backToMain() {
        //TODO 退出游戏
        console.log("backToMain")
        utils.App.popScene();
    }
}


class RuleDetailView extends egret.DisplayObjectContainer {

    private role: egret.Bitmap;
    private decorator: egret.Bitmap;
    private prop1: egret.Bitmap;
    private prop2: egret.Bitmap;

    private selectedRoleIndex = -1;

    
    public constructor(width: number) {
        super();
        this.createItems(width);
    }

    private createItems(width: number) {
        this.role = new egret.Bitmap();
        this.addChild(this.role)

        this.decorator = new egret.Bitmap();
        this.decorator.texture = RES.getRes("selecterole_prop_clothing_text_png");
        this.decorator.width /= 1.5;
        this.decorator.height /= 1.5;
        this.decorator.x = width;
        this.decorator.y = 112;
        this.addChild(this.decorator);

        this.prop1 = new egret.Bitmap();
        this.addChild(this.prop1);
        this.prop2 = new egret.Bitmap();
        this.addChild(this.prop2);

        this.height = 1440/1.5;
        this.width = width;

        egret.Tween.get(this.decorator).to({x: width - this.decorator.width}, 500, egret.Ease.backOut);
    }

    public setSelectedRoleIndex(index: number) {
        if (index == this.selectedRoleIndex) return ;
        
        this.selectedRoleIndex = index;
        let drawingId = this.selectedRoleIndex + 1;
        this.role.texture = RES.getRes(`erect_drawing_0${drawingId}_png`);
        this.role.width = this.role.texture.textureWidth / 1.5;
        this.role.height = this.role.texture.textureHeight / 1.5;
        this.role.x = -this.role.width;
        egret.Tween.get(this.role).to({x: 0}, 500, egret.Ease.backOut);
        
        this.prop1.texture = GameHolder.propImageByDrawingIdAndIndex(drawingId,0);
        this.prop1.width = this.prop1.texture.textureWidth / 1.5;
        this.prop1.height = this.prop1.texture.textureHeight / 1.5;
        this.prop1.x = this.width;
        this.prop1.y = this.decorator.y + this.decorator.height + 40;
        egret.Tween.get(this.prop1).wait(300).to({x: this.width - this.prop1.width - 94}, 500, egret.Ease.backOut);

        this.prop2.texture = GameHolder.propImageByDrawingIdAndIndex(drawingId,1);
        this.prop2.width = this.prop2.texture.textureWidth / 1.5;
        this.prop2.height = this.prop2.texture.textureHeight / 1.5;
        this.prop2.x = this.width;
        this.prop2.y = this.prop1.y + this.prop1.height + 40;
        egret.Tween.get(this.prop2).wait(400).to({x: this.width - this.prop2.width - 94}, 500, egret.Ease.backOut);
    }

    public getSelectedRoleIndex() {
        return this.selectedRoleIndex;
    }

    public getDrawingId() {
        return this.selectedRoleIndex + 1;
    }

}


class RuleDescriptionView extends egret.DisplayObjectContainer {

    

    public constructor() {
        super();
        this.createItems();
    }

    public createItems() {
        let content = new egret.Bitmap();
        content.texture = RES.getRes("popup_view_tip_png");
        content.width /= 1.5;
        content.height /= 1.5;
        this.addChild(content);

        let confirm = new egret.Bitmap();
        confirm.texture = RES.getRes("selecterole_rule_confirm_png");
        confirm.width /= 1.5;
        confirm.height /= 1.5;
        confirm.anchorOffsetX = confirm.width / 2;
        confirm.anchorOffsetY = confirm.height / 2;
        confirm.x = content.width / 2;
        confirm.y = content.height;
        this.addChild(confirm);
        confirm.touchEnabled = true;

    }


}