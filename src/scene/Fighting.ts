const fooIcon = 'https://wx.qlogo.cn/mmopen/vi_32/xicrRCPjKzWRpv3AyDmHVF8yEPS57ZxkJGFyDx3KNxPsiagFLfGr05VebiaJzkZsc9n32GvJR9JLMkBMdaT682cJw/132'
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
    // 左侧用户答案
    public userAnswer_left: Array<number>;
    // 右侧用户做题答案
    public userAnswer_right: Array<number>;
    // 左侧进度组
    public userProgressGroup_left: eui.Group;
    // 右侧进度组
    public userProgressGroup_right: eui.Group;
    // 左侧玩家的进度条
    public userProgressBar_left: eui.Image;
    // 右侧玩家的进度条
    public userProgressBar_rigth: eui.Image;

    constructor () {
        super();
        // 设置 theme
        this.skinName = "Fighting";
    }
    onAddStage() :void {
        this.userAnswer_left = [0, 0, 0, 0, 0, 1, 1, 1, 1, 0];
        this.userAnswer_right = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1];
        this.registerEventListener();
        this.renderUserProgress();
        this.renderUserState(this.userState_left, this.userAnswer_left);
        this.renderUserState(this.userState_right, this.userAnswer_right);
        this.userIcon_left.source = fooIcon        
        this.userIcon_right.source = fooIcon
        this.userName_left.text = '左左';
        this.userName_right.text = '右右';
        this.countDown_left.text = '12"'
        this.countDown_right.text = '2"'
    }

    onRemoveStage() :void {}

    private registerEventListener () {
        this.propPracticeBtn.addEventListener('touchTap', () => {
            console.log('减一道题！');
        }, this);
        this.propTimeBtn.addEventListener('touchTap', () => {
            console.log('减10s！');
        }, this);
        this.propInkBtn.addEventListener('touchTap', () => {
            console.log('墨汁！');
        }, this);
    }

    /**
     * 渲染用户答案
     */
    private renderUserState (stateComponent: eui.Group, stateArray: Array<number>) {
        stateArray.forEach(x => {
            const item: eui.Rect = x
                ? new eui.Rect(12, 20, 0x02EBA9)
                : new eui.Rect(12, 20, 0xFF606E);
            item.ellipseWidth = 8;
            stateComponent.addChild(item);
        })
    }

    /**
     * 渲染用户做题进度
     */
    private renderUserProgress () {
        this.setUserProgress(this.userAnswer_left, this.userProgressBar_left, this.userProgressGroup_left);
        this.setUserProgress(this.userAnswer_right, this.userProgressBar_rigth, this.userProgressGroup_right);
    }

    /**
     * 更新用户的答案
     */
    private setUserAnswerState (userAnswerArray: Array<number>, index: number, correct: boolean) {
        userAnswerArray.splice(index, 1, correct ? 1 : 0)
    }

    /**
     * 设置用户进度条
     */
    private setUserProgress (userAnswerArray: Array<number>, progressBar: eui.Image, progressGroup: eui.Group) {
        const errorCount = userAnswerArray.filter(x => !x).length;
        const totalCount = userAnswerArray.length
        const top = errorCount / totalCount * progressGroup.height
        progressBar.y = top
    }
}