var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BPNavigator = (function () {
    function BPNavigator(stage, root) {
        this.displayObjects = [];
        this.stage = stage;
        root.setNavigator(this);
        this.present(root);
    }
    BPNavigator.prototype.push = function (next) {
        console.log(next);
        next.setNavigator(this);
        this.dismissLast();
        this.present(next);
    };
    BPNavigator.prototype.present = function (content) {
        this.stage.addChild(content);
        this.displayObjects.push(content);
    };
    BPNavigator.prototype.dismissLast = function () {
        var curr = this.displayObjects[this.displayObjects.length - 1];
        curr.visible = false;
        // this.stage.removeChild(curr);
    };
    BPNavigator.prototype.dismissLastAndPop = function () {
        this.stage.removeChild(this.displayObjects.pop());
    };
    BPNavigator.prototype.pop = function (toIndex) {
        if (toIndex === void 0) { toIndex = this.displayObjects.length - 2; }
        console.log("pop", toIndex, this.displayObjects.length);
        if (this.displayObjects.length - 1 == toIndex || toIndex < 0)
            return;
        do {
            this.dismissLastAndPop();
            console.log(toIndex, this.displayObjects.length);
        } while (toIndex < this.displayObjects.length - 1);
        var curr = this.displayObjects[this.displayObjects.length - 1];
        curr.visible = true;
    };
    BPNavigator.prototype.length = function () {
        return this.displayObjects.length;
    };
    return BPNavigator;
}());
__reflect(BPNavigator.prototype, "BPNavigator");
