
class LevelStar extends egret.DisplayObjectContainer {

    public constructor() {
        super();
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
            allStar.push(star)
        }
        let space = 8;
        let incr = 0;
        let starHeight = 0;
        for (let i=0; i<allStar.length; i++) {
            let star =  allStar[i];
            star.x = incr;
            this.addChild(star);
            incr += star.width + space;
            starHeight = star.height;
        }
        this.height = starHeight;
        this.width = incr - 8;
    }


}