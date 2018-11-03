
class NavigationBar extends egret.DisplayObjectContainer {

    private backBtn:egret.Bitmap;
    private title:egret.TextField;

    public onBackDidClick:Function;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.createItems();
    }

    private createItems() {
        
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        this.width = stageW;
        this.height = 68;

        this.title = new egret.TextField();
        this.title.textColor = 0xffffff;
        this.title.textAlign = "center";
        this.title.text = "洋葱试炼场";
        this.title.size = 32;
        this.title.x = (stageW/2) - 100;
        this.title.y = 68;
        this.title.width = 200;
        this.title.height = 44;
        this.addChild(this.title);

        this.backBtn = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes("app_bar_ic_back_png");
        this.backBtn.texture = texture;
        this.backBtn.touchEnabled = true;
        this.backBtn.width /= 2;
        this.backBtn.height /= 2;
        this.backBtn.x = 20;
        this.backBtn.y = 20 + texture.textureHeight / 2;
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.addChild(this.backBtn);

    }

    private onBtnClick() {
        console.log('btnDidClick');
        if (this.onBackDidClick) {
            this.onBackDidClick();
        }
    }

}
