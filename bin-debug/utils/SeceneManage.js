/*
* @file 场景管理器
* @author zhangpeng53
*/
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
var ex;
(function (ex) {
    var SceneManageClass = (function (_super) {
        __extends(SceneManageClass, _super);
        function SceneManageClass() {
            var _this = _super.call(this) || this;
            _this._viewStack = new eui.ViewStack();
            _this._views = [];
            return _this;
        }
        SceneManageClass.prototype.getContainer = function () {
            return this._viewStack;
        };
        SceneManageClass.prototype.push = function (view) {
            if (view) {
                this._viewStack.addChild(view);
                this._views.push(view);
                this._viewStack.selectedIndex = this._viewStack.length - 1;
            }
        };
        SceneManageClass.prototype.pop = function () {
            if (this._views.length > 0) {
                var view = this._views.pop();
                this._viewStack.removeChild(view);
                this._viewStack.selectedIndex = this._viewStack.length - 1;
                view = null;
            }
        };
        SceneManageClass.prototype.pushRoot = function (view) {
            this.clearAll();
            this.push(view);
            this._viewStack.selectedIndex = 0;
        };
        SceneManageClass.prototype.addPopup = function (view) {
            this.getCurrentScene().addChild(view);
        };
        SceneManageClass.prototype.removePopup = function (view) {
            if (view && this.getCurrentScene().contains(view)) {
                this.getCurrentScene().removeChild(view);
            }
        };
        SceneManageClass.prototype.getCurrentScene = function () {
            return this._viewStack.selectedChild;
        };
        SceneManageClass.prototype.clearAll = function () {
            this._viewStack.removeChildren();
            this._views = [];
        };
        return SceneManageClass;
    }(egret.DisplayObjectContainer));
    __reflect(SceneManageClass.prototype, "SceneManageClass");
    ex.SceneManage = new SceneManageClass();
})(ex || (ex = {}));
