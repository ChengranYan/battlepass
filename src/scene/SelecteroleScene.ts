
class SelecteroleScene extends egret.DisplayObjectContainer implements BPNavigatorAware {

    private battleTipAlert: BPAlert;
    
    private navigator: BPNavigator;

    private roles: egret.DisplayObjectContainer[] = [];

    private selectedRoleIndex = 0;

    private selectContent;
    
    private selectDecorators;

    private role:egret.Bitmap;

    public setNavigator(navigator: BPNavigator) {
        this.navigator = navigator;
    }

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
       console.log('enter SelecteroleScene')
       this.showBattleTips()
       this.createRoleShow()
       this.createDecorators()
       this.createRoleContainer()
    }

    private showBattleTips () {
        let content = new egret.Bitmap();
        content.texture = RES.getRes("popup_view_tip_png");
        content.width /= 1.5;
        content.height /= 1.5;
        content.touchEnabled = true;
        content.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissBattleTipsAlert, this);
        this.battleTipAlert = new BPAlert(content, this.stage);

        var timer:egret.Timer = new egret.Timer(500,1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,() => {this.battleTipAlert.present()},this);
        timer.start();
    }

    private dismissBattleTipsAlert() {
        this.battleTipAlert.dismiss();
    }

    private createRoleContainer() {
        if (this.contains(this.selectContent)) {
            this.removeChild(this.selectContent)
            console.log(this.contains(this.selectContent))
        }
        this.selectContent = new egret.DisplayObjectContainer();
        this.selectContent.width = this.stage.stageWidth;
        this.selectContent.height = 450;
        this.selectContent.y = 884;
        this.selectContent.x = 0;
        
        let bg = new egret.Bitmap();
        bg.texture = RES.getRes("select_background_png");
        bg.width = this.selectContent.width;
        bg.height = this.selectContent.height;
        this.selectContent.addChild(bg);

        let startX = 42
        for(let i = 0; i < 4; i++) {

            let shp:egret.Sprite = new egret.Sprite();
            shp.graphics.lineStyle(8, 0xffffff, 1);
            if (i === this.selectedRoleIndex) {
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
        startBtn.width = 280;
        startBtn.height = 80;
        startBtn.x = 235;
        startBtn.y = 298;
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onstartBtnClick, this);
        this.selectContent.addChild(startBtn);

        this.addChild(this.selectContent);
    }

    private createRoleShow () {
        this.role = new egret.Bitmap();
        this.role.texture = RES.getRes(`erect_drawing_0${this.selectedRoleIndex + 1}_png`);
        console.log(this.selectedRoleIndex + 1)

        this.role.x = -400;
        let tw = egret.Tween.get(this.role);
        tw.to({x: 0}, 500, egret.Ease.backOut).call(() => {
            console.log('done')
        });

        // this.role.x = 0;
        // this.role.y = 128;
        this.role.scaleX = this.role.scaleY = 0.6138;
        this.addChild(this.role)
    }

    private createDecorators (){
        this.selectDecorators = new egret.DisplayObjectContainer;
        let decorators = ['prop_practice_png', 'prop_time_png'];
        let deco1 = new egret.Bitmap();
        deco1.texture = RES.getRes(decorators[0]);
        deco1.x = 539;
        deco1.y = 356;
        deco1.scaleX = deco1.scaleY = 0.5735
        this.selectDecorators.addChild(deco1)
        let deco2 = new egret.Bitmap();
        deco2.texture = RES.getRes(decorators[1]);
        deco2.x = 539;
        deco2.y = 534;

        deco2.scaleX = deco2.scaleY = 0.5735
        this.selectDecorators.addChild(deco2)
        let tw = egret.Tween.get(this.selectDecorators);
        this.addChild(this.selectDecorators)
    }

    private changeRole () {
        console.log('changerole', this.selectedRoleIndex + 1);
        this.role.x = -400
        this.role.texture = RES.getRes(`erect_drawing_0${this.selectedRoleIndex + 1}_png`);
        let tw = egret.Tween.get(this.role);
        tw.to({x: 0}, 500, egret.Ease.backOut).call(() => {
            console.log('done')
        });
    }

    private onstartBtnClick() {
        console.log('start')
    }

    private handleSelectRole (index: number) {
        console.log('select', index);
        this.selectedRoleIndex = index;
        this.changeRole();
        this.createRoleContainer();
    }
    
}

