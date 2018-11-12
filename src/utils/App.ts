namespace utils {

    /**
     * 全局事件广播
     */
    export const MessageCenter = new Emitter();
    

    /*
    * 应用类
    */
    class Application {
        private _root:egret.DisplayObjectContainer;

        /**
         * 初始化场景
         */
        public init(root:egret.DisplayObjectContainer){
            this._root = root;
            this._root.addChild(SceneManage.getContainer());
        }
        
        /**
         * 显示场景
         */
        public pushScene(sceneClass:utils.Scene) {
            SceneManage.push(sceneClass);
        }

        /**
         * 将场景在最外层展示
         */
        public pushSceneToRoot(sceneClass:utils.Scene) {
            SceneManage.pushRoot(sceneClass);
        }

        /**
         * 移除顶部场景
         */
        public popScene() {
            SceneManage.pop();
        }
    }

    export const App = new Application();
}