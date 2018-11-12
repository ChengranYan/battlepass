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
var utils;
(function (utils) {
    /*
    * View基础类
    */
    var View = (function (_super) {
        __extends(View, _super);
        function View() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this._onAdd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this._onRemove, _this);
            _this._evtPoll = {};
            return _this;
        }
        /**
         * 监听数据改变
         */
        View.prototype.on = function (type, callback) {
            utils.MessageCenter.on(type, callback, this);
            this._evtPoll[type] = callback;
        };
        /**
         * 移除数据改变监听
         */
        View.prototype.cancel = function (type, callback) {
            utils.MessageCenter.remove(type, callback, this);
        };
        /**
         * 移除全部数据监听
         */
        View.prototype.cancelAll = function () {
            for (var key in this._evtPoll) {
                this.cancel(key, this._evtPoll[key]);
            }
        };
        //---------------------------
        View.prototype._onAdd = function (e) {
            this.onAddStage();
        };
        View.prototype._onRemove = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._onAdd, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this._onRemove, this);
            this.cancelAll();
            this.onRemoveStage();
        };
        return View;
    }(eui.Component));
    utils.View = View;
    __reflect(View.prototype, "utils.View");
})(utils || (utils = {}));
