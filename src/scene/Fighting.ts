const fooIcon = 'https://wx.qlogo.cn/mmopen/vi_32/xicrRCPjKzWRpv3AyDmHVF8yEPS57ZxkJGFyDx3KNxPsiagFLfGr05VebiaJzkZsc9n32GvJR9JLMkBMdaT682cJw/132'
const leftUserAnswerState = [0,0,0,0,0,0,0,0,0,0]
const rightUserAnswerState = [0,0,0,0,0,0,0,0,0,0].map((x, idx) => idx % 2 === 0? 1 : 0)
class FightingScene extends utils.Scene {
    // 左侧玩家头像
    public userIcon_left: eui.Image;
    // 右侧玩家头像
    public userIcon_right: eui.Image;
    // 左侧玩家昵称
    public userName_left: eui.Label;
    // 右侧玩家昵称
    public userName_right: eui.Label;
    // 左侧玩家倒计时
    public countDown_left: eui.Label;
    // 右侧玩家倒计时
    public countDown_right: eui.Label;
    // 道具--减一道题
    public propPracticeBtn: eui.Image;
    // 道具--减10s
    public propTimeBtn: eui.Image;
    // 道具--墨汁
    public propInkBtn: eui.Image;
    // 左侧玩家做题情况
    public userState_left: eui.Group;
    // 右侧玩家做题情况
    public userState_right: eui.Group;

    constructor () {
        super();
        this.skinName = "Fighting";
        this.userIcon_left.source = fooIcon        
        this.userIcon_right.source = fooIcon
        this.userName_left.text = '左左';
        this.userName_right.text = '右右';
        this.countDown_left.text = '12"'
        this.countDown_right.text = '2"'
        this.propPracticeBtn.addEventListener('touchTap', () => {
            console.log('减一道题！');
        }, this)
        this.propTimeBtn.addEventListener('touchTap', () => {
            console.log('减10s！');
        }, this)
        this.propInkBtn.addEventListener('touchTap', () => {
            console.log('墨汁！');
        }, this)

        console.log(leftUserAnswerState, rightUserAnswerState)
        leftUserAnswerState.forEach(x => {
            const item: eui.Rect = x
                ? new eui.Rect(12, 20, 0x02EBA9)
                : new eui.Rect(12, 20, 0xFF60fE)
            this.userState_left.addChild(item)
        })

        rightUserAnswerState.forEach(x => {
            const item: eui.Rect = x
                ? new eui.Rect(12, 20, 0x02EBA9)
                : new eui.Rect(12, 20, 0xFF60fE)
            this.userState_right.addChild(item)
        })
    }
    onAddStage() :void {
        // const userIconMask : egret.Shape = new egret.Shape();
        // userIconMask.graphics.beginFill(0x0000ff);
        // userIconMask.graphics.drawCircle(239 + 78,236 + 78,78);
        // userIconMask.graphics.endFill();
        // this.addChild(userIconMask);

        
    }

    onRemoveStage() :void {

    }
}