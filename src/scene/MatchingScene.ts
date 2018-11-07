class MatchingScene extends egret.DisplayObjectContainer implements BPNavigatorAware {

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
    }

    public createItems() {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        let navigationBar = new NavigationBar("正在匹配");
        navigationBar.onBackDidClick = () => {
            this.navigator.pop();
        }
        this.addChild(navigationBar);

        
    }

}