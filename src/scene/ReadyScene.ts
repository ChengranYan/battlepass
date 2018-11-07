class ReadyScene extends egret.DisplayObjectContainer implements BPNavigatorAware {

    private navigator: BPNavigator;

    public setNavigator(navigator: BPNavigator) {
        this.navigator = navigator;
    }

    private grils = [
        {
            body: "ready_drawing_01_png",
            items: ["ready_prop_ink_png","ready_prop_practice_png"],
            avatar: "ready_avatar_drawing_01_png",
        },{
            body: "ready_drawing_02_png",
            items: ["ready_prop_time_png","ready_prop_practice_png"],
            avatar: "ready_avatar_drawing_02_png",
        },{
            body: "ready_drawing_03_png",
            items: ["ready_prop_time_png","ready_prop_ink_png"],
            avatar: "ready_avatar_drawing_03_png",
        },{
            body: "ready_drawing_04_png",
            items: ["ready_prop_practice_png","ready_prop_ink_png"],
            avatar: "ready_avatar_drawing_04_png",
        },
    ];

    private current: number = 2;
    private body: egret.Bitmap;
    private alert: BPAlert;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        let ruleDescription = new RuleDescription();
        ruleDescription.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissAlert, this);
        this.alert = new BPAlert(ruleDescription, this.stage);
        this.alert.addEventListener(BPAlert.ON_ALERT_DISMISS, this.createItems, this)
        this.alert.present();
    }

    private dismissAlert() {
        this.alert.dismiss();
    }

    public createItems() {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        let navigationBar = new NavigationBar("选择对战套装");
        navigationBar.onBackDidClick = () => {
            this.navigator.pop();
        }
        this.addChild(navigationBar);

        let current = this.grils[this.current];

        let body = new egret.Bitmap();
        body.texture = RES.getRes(current.body);
        body.width /= 1.5;
        body.height /= 1.5;
        body.x = 0;
        body.y = navigationBar.height + 20;
        this.addChild(body);

        let tips = new egret.Bitmap();
        tips.texture = RES.getRes("ready_prop_clothing_text_png");
        tips.width /= 1.5;
        tips.height /= 1.5;
        tips.x = stageW - tips.width;
        tips.y = body.y + 100;
        this.addChild(tips);

        let items = [];
        
        for (let i=0; i<current.items.length; i++) {
            let res = current.items[i];
            let item = new egret.Bitmap();
            item.texture = RES.getRes(res);
            item.width /= 1.5;
            item.height /= 1.5;
            item.x = stageW - item.width - 90;
            item.y = tips.y + tips.height + 44 + (i * (item.width + 40));
            this.addChild(item);
        }

        let selectionWindow = new egret.Bitmap();
        selectionWindow.texture = RES.getRes("ready_select_background_png");
        selectionWindow.width /= 1.5;
        selectionWindow.height /= 1.5;
        selectionWindow.y = stageH - selectionWindow.height;
        this.addChild(selectionWindow);

        for (let i=0; i<this.grils.length; i++) {
            let res = this.grils[i].avatar;
            let avatar = new egret.Bitmap();
            avatar.texture = RES.getRes(res);
            avatar.width /= 1.5;
            avatar.height /= 1.5;
            avatar.y = stageH - avatar.height - 168;
            avatar.x = 10 + ((i+1) * ((stageW - 20 - this.grils.length * avatar.width)/(this.grils.length+1))) + (i * avatar.width);
            if (i == this.current) {
                //TODO 设置遮罩？
            }
            this.addChild(avatar);
        }

        let startMatching = new egret.Bitmap();
        startMatching.texture = RES.getRes("ready_start_matching_png")
        startMatching.width /= 1.5;
        startMatching.height /= 1.5;
        startMatching.x = stageW / 2 - startMatching.width / 2;
        startMatching.y = stageH - 40 - startMatching.height;
        this.addChild(startMatching);
        startMatching.touchEnabled = true;
        startMatching.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
            let matchingScene = new MatchingScene();
            this.navigator.push(matchingScene);
        }, this);

    }



}


class RuleDescription extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.createItems();
    }

    private createItems() {
        let descriptions = new egret.Bitmap();
        descriptions.texture = RES.getRes("ready_rule_description_png")
        descriptions.width /= 1.5;
        descriptions.height /= 1.5;
        this.addChild(descriptions);

        let confirm = new egret.Bitmap();
        confirm.texture = RES.getRes("ready_rule_confirm_png");
        confirm.width /= 1.5;
        confirm.height /= 1.5;
        confirm.x = descriptions.width / 2 - confirm.width / 2;
        confirm.y = descriptions.height - confirm.height / 2;
        this.addChild(confirm);
        confirm.touchEnabled = true;
        confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {this.dispatchEvent(event)}, this);

        this.width = descriptions.width;
        this.height = descriptions.height + confirm.height / 2;
    }

}