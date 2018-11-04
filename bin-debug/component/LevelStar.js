var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LevelStar = (function (_super) {
    __extends(LevelStar, _super);
    function LevelStar() {
        var _this = _super.call(this) || this;
        _this.createItems();
        return _this;
    }
    LevelStar.prototype.createItems = function () {
        var starList = [
            "star_light_png",
            "star_light_png",
            "star_light_png",
            "star_dark_png",
            "star_dark_png"
        ];
        var allStar = [];
        for (var i = 0; i < 5; i++) {
            var star = new egret.Bitmap();
            var v = starList[i];
            star.texture = RES.getRes(v);
            star.width /= 1.5;
            star.height /= 1.5;
            allStar.push(star);
        }
        var space = 8;
        var incr = 0;
        var starHeight = 0;
        for (var i = 0; i < allStar.length; i++) {
            var star = allStar[i];
            star.x = incr;
            this.addChild(star);
            incr += star.width + space;
            starHeight = star.height;
        }
        this.height = starHeight;
        this.width = incr - 8;
    };
    return LevelStar;
}(egret.DisplayObjectContainer));
__reflect(LevelStar.prototype, "LevelStar");
