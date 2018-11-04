namespace utils {
    /**
     * Pub/Sub
     */
    export class Emitter {
        private static _ins: Emitter;

        private _ed: egret.EventDispatcher;

        constructor () {
            this._ed = new egret.EventDispatcher();
        }

        public static get ins () {
            if (!this._ins) {
                this._ins = new Emitter();
            }
            return this._ins;
        }

        
        public on (type: string, listener: Function, thisObect: any, useCapture?: boolean, priority? :number ): void {
            this._ed.addEventListener(type, listener, thisObect, useCapture, priority);
        }

        public once (type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {
            this._ed.once(type, listener, thisObject, useCapture, priority);
        }

        public remove(type: string, listener: Function, thisObject: any, useCapture: boolean = false): void {
            this._ed.removeEventListener(type, listener, thisObject, useCapture);
        }

        public has(type: string): boolean {
            return this._ed.hasEventListener(type);
        }

        public willTrigger(type: string): boolean {
            return this._ed.willTrigger(type);
        }

        public emit(event: egret.Event): boolean {
            return this._ed.dispatchEvent(event);
        }

        public toString(): string {
            return this._ed.toString();
        }
    }
}