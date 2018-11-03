
class LevelStar extends egret.DisplayObjectContainer {

    private animate: boolean;
    private animateStar: egret.DisplayObject;

    public constructor(animate: boolean = false) {
        super();
        this.animate = animate;
        this.createItems();
    }

    private createItems() {
        let starList = [
            "star_light_png",
            "star_light_png",
            "star_light_png",
            "star_dark_png",
            "star_dark_png"];
        
        let allStar:egret.Bitmap[] = [];
        for (let i=0; i<5; i++) {
            let star = new egret.Bitmap();
            let v = starList[i];
            star.texture = RES.getRes(v);
            star.width /= 1.5;
            star.height /= 1.5;
            star.anchorOffsetX = star.width / 2;
            star.anchorOffsetY = star.height / 2;
            allStar.push(star)
            if (i == 2 && this.animate) {
                star.scaleX = 1.75;
                star.scaleY = 1.75;
                this.animateStar = star;
            }
        }
        let space = 8;
        let incr = 0;
        let starHeight = 0;
        for (let i=0; i<allStar.length; i++) {
            let star =  allStar[i];
            star.x = (i * star.width) + (star.width / 2) + (i * 8);
            this.addChild(star);
            incr += star.width + space;
            starHeight = star.height;
        }
        this.height = starHeight;
        this.width = incr - 8;
    }


    public startAnimate() {
        egret.Tween.get(this.animateStar).to({scaleX: 1, scaleY: 1}, 300, egret.Ease.backIn);
    }

}