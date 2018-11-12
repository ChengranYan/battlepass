var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    /**
     * Pub/Sub
     */
    var Emitter = (function () {
        function Emitter() {
            this._ed = new egret.EventDispatcher();
        }
        Object.defineProperty(Emitter, "ins", {
            get: function () {
                if (!this._ins) {
                    this._ins = new Emitter();
                }
                return this._ins;
            },
            enumerable: true,
            configurable: true
        });
        Emitter.prototype.on = function (type, listener, thisObect, useCapture, priority) {
            this._ed.addEventListener(type, listener, thisObect, useCapture, priority);
        };
        Emitter.prototype.once = function (type, listener, thisObject, useCapture, priority) {
            this._ed.once(type, listener, thisObject, useCapture, priority);
        };
        Emitter.prototype.remove = function (type, listener, thisObject, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this._ed.removeEventListener(type, listener, thisObject, useCapture);
        };
        Emitter.prototype.has = function (type) {
            return this._ed.hasEventListener(type);
        };
        Emitter.prototype.willTrigger = function (type) {
            return this._ed.willTrigger(type);
        };
        Emitter.prototype.emit = function (event) {
            return this._ed.dispatchEvent(event);
        };
        Emitter.prototype.toString = function () {
            return this._ed.toString();
        };
        return Emitter;
    }());
    utils.Emitter = Emitter;
    __reflect(Emitter.prototype, "utils.Emitter");
})(utils || (utils = {}));
