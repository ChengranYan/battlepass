namespace utils {
    class SoundManageClass {
        
        public sound :egret.Sound
        public _playSound: egret.SoundChannel;

        public smSound: egret.Sound;
        
        public playBGM (url: string) {
            
            if (!this.sound) {
                this.sound = new egret.Sound();
            }
            this.sound.addEventListener(egret.Event.COMPLETE, function (event: egret.Event) {
                if (this._playSound) {
                    this._playSound.stop()
                }
                this._playSound = this.sound.play()
            }, this);
            this.sound.load(url)
        }

        public playSmSound (url: string) {
            this.smSound = new egret.Sound()
            this.smSound.addEventListener(egret.Event.COMPLETE, function (event: egret.Event){
                this.smSound.play(0, 1)
            }, this)
            this.smSound.load(url)
        }
    }

    export const SoundManage = new SoundManageClass();
}