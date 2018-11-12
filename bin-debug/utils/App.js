var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    /**
     * 全局事件广播
     */
    utils.MessageCenter = new utils.Emitter();
    /*
    * 应用类
    */
    var Application = (function () {
        function Application() {
        }
        /**
         * 初始化场景
         */
        Application.prototype.init = function (root) {
            this._root = root;
            this._root.addChild(utils.SceneManage.getContainer());
        };
        /**
         * 显示场景
         */
        Application.prototype.pushScene = function (sceneClass) {
            utils.SceneManage.push(sceneClass);
        };
        /**
         * 将场景在最外层展示
         */
        Application.prototype.pushSceneToRoot = function (sceneClass) {
            utils.SceneManage.pushRoot(sceneClass);
        };
        /**
         * 移除顶部场景
         */
        Application.prototype.popScene = function () {
            utils.SceneManage.pop();
        };
        return Application;
    }());
    __reflect(Application.prototype, "Application");
    utils.App = new Application();
})(utils || (utils = {}));
