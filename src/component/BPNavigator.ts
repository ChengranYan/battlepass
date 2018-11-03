

class BPNavigator {

    private displayObjects: BPNavigatorAware[] = [];

    private stage: egret.DisplayObjectContainer;

    public constructor(stage: egret.DisplayObjectContainer, root: BPNavigatorAware) {
        this.stage = stage;
        root.setNavigator(this);
        this.present(root);
    }

    public push(next: BPNavigatorAware) {
        console.log(next);
        next.setNavigator(this);
        this.dismissLast();
        this.present(next);
    }

    private present(content: BPNavigatorAware) {
        this.stage.addChild(content)
        this.displayObjects.push(content);
    }

    private dismissLast() {
        let curr = this.displayObjects[this.displayObjects.length-1];
        curr.visible = false;
        // this.stage.removeChild(curr);
    }

    private dismissLastAndPop() {
        this.stage.removeChild(this.displayObjects.pop());
    }

    public pop(toIndex: number = this.displayObjects.length - 2) {
        console.log("pop",toIndex, this.displayObjects.length)
        if (this.displayObjects.length - 1 == toIndex || toIndex < 0) return ;
        do {
            this.dismissLastAndPop();
            console.log(toIndex, this.displayObjects.length)
        } while(toIndex < this.displayObjects.length-1)
        let curr = this.displayObjects[this.displayObjects.length-1];
        curr.visible = true;
    }

    public length() {
        return this.displayObjects.length;
    }

}

interface BPNavigatorAware extends egret.DisplayObject {

    setNavigator(navigator: BPNavigator);

}