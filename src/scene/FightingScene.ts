const fooIcon = 'https://wx.qlogo.cn/mmopen/vi_32/xicrRCPjKzWRpv3AyDmHVF8yEPS57ZxkJGFyDx3KNxPsiagFLfGr05VebiaJzkZsc9n32GvJR9JLMkBMdaT682cJw/132'

class FightingScene extends utils.Scene {

    private drawingId: number;

    // 容器
    public leftUserBar: eui.Group;
    public rightUserBar: eui.Group;
    public propsBar: eui.Group;
    public centerWindow: eui.Group;

    // 左侧玩家头像
    public userIcon_left: eui.Image;
    // 右侧玩家头像
    public userIcon_right: eui.Image;
    // 左侧玩家昵称
    public userName_left: eui.Label;
    // 右侧玩家昵称
    public userName_right: eui.Label;
    // 左侧玩家性别
    public gender_icon_left: eui.Image;
    // 右侧玩家性别
    public gender_icon_right: eui.Image;
    
    // 左侧玩家倒计时
    public countDown_left: eui.Label;
    // 右侧玩家倒计时
    public countDown_right: eui.Label;
    
    //对战界面背景图
    public fightingBg: eui.Image;

    private leftScore: ScoreIcon;
    private rightScore: ScoreIcon;

    private leftScoreColumn_mask: eui.Rect;
    private leftScoreColumn: eui.Image;

    private rightScoreColumn_mask: eui.Rect;
    private rightScoreColumn: eui.Image;

    //道具栏
    public prop1Btn: eui.Image;
    public prop2Btn: eui.Image;
    public prop3Btn: eui.Image;

    //题目内容
    public problemContent: eui.Label;
    //  选项
    private options: eui.Label[];
    public optionA: eui.Label;
    public optionB: eui.Label;
    public optionC: eui.Label;
    public optionD: eui.Label;

    private optionBackgrounds: eui.Rect[];
    public optionABackground: eui.Rect;
    public optionBBackground: eui.Rect;
    public optionCBackground: eui.Rect;
    public optionDBackground: eui.Rect;

    // 左侧玩家做题情况
    public userState_left: eui.Group;
    // 右侧玩家做题情况
    public userState_right: eui.Group;

    // 0没有道具，1减一道题，2减10秒，3墨汁
    private propsState = [0,0,0];
    private leftUserAnswerState = [0,0,0,0,0,0,0,0,0,0];
    private rightUserAnswerState = [0,0,0,0,0,0,0,0,0,0];



    private _countDownTimer: egret.Timer;
    private _leftRoundBeginTime: number;
    private _rightRoundBeginTime: number;
    private _score: number = 0; //自己的分数
    private _adversaryScore: number = 0; //对方的分数

    private _randomPropsCount: number = 3; // 剩余随机道具次数

    private _totalQuestion: number = 10;
    private _currentQuestionIndex: number = 0;
    private _questions = [
        {
	    "question" : "-6的相反数是( )。",
	    "correctIndex": 2,
	    "options": [
	        "A.1/6",
	        "B.-1/6",
	        "C.6",
	        "D.-6"
    	]
	},
	{
	    "question" : "2的绝对值是( )。",
	    "correctIndex": 1,
	    "options": [
	        "A.-2",
	        "B.2",
	        "C.-1/2",
	        "D.1/2"
    	]
	},
  {
    "question": "下列各数中比-1大的数是( )。",
    "correctIndex": 1,
    "options": [
      "A.-2",
      "B.0",
      "C.-1",
      "D.-3"
    ]
  },
  {
    "question": "互为相反数的两个数的和为( )。",
    "correctIndex": 0,
    "options": [
      "A.0",
      "B.-1",
      "C.1",
      "D.2"
    ]
  },
  {
    "question": "下列说法错误的是( )。",
    "correctIndex": 1,
    "options": [
      "A.0是正数和负数的分界",
      "B.0只表示“什么都没有”",
      "C.0可以表示特定的意义",
      "D.0是自然数"
    ]
  },
  {
    "question": "今天最高气温10度，最低气温-5度，今天的温差是( )。",
    "correctIndex": 2,
    "options": [
      "A.10度",
      "B.5度",
      "C.15度",
      "D.-5度"
    ]
  },
  {
    "question": "下列说法正确的是( )。",
    "correctIndex": 3,
    "options": [
      "A.x的次数是0",
      "B.x的系数是0",
      "C.-1是一次单项式",
      "D.-1是单项式"
    ]
  },
  {
    "question": "若3x+2a-6=0，那么6x+4a的值为( )。",
    "correctIndex": 3,
    "options": [
      "A.-6",
      "B.不可解",
      "C.-3",
      "D.12"
    ]
  },
  {
    "question": "方程2x+a=4的解是x=2，则a等于( )。",
    "correctIndex": 1,
    "options": [
      "A.-8",
      "B.0",
      "C.2",
      "D.8"
    ]
  },
  {
    "question": "计算：3a-(2a-b)=( )。",
    "correctIndex": 2,
    "options": [
      "A.5a-b",
      "B.a-b",
      "C.a+b",
      "D.2a+b"
    ]
  }
    ];


    constructor (drawingId: number) {
        super();
        this.drawingId = drawingId;
        this.skinName = "FightingSkin";
        this.optionBackgrounds = [this.optionABackground,this.optionBBackground,this.optionCBackground,this.optionDBackground];
        this.options = [this.optionA,this.optionB,this.optionC,this.optionD];
    }

    private redrawAnswerState(container: eui.Group, states: number[]) {
        container.removeChildren();
        let add = (res: string) => {
            let image = new eui.Image(RES.getRes(res))
            image.width = 12;
            image.height = 20;
            container.addChild(image);
        }
        states.forEach(x => {
            
            if (x == 0) {
                add("practise_notdown_png");
            } else if (x == 1) {
                add("practise_false_png");
            } else {
                add("practise_right_png");
            }
        })
    }

    private redrawPropsBar() {
        this.prop1Btn.texture = this.propImageByState(this.propsState[0]);
        this.prop2Btn.texture = this.propImageByState(this.propsState[1]);
        this.prop3Btn.texture = this.propImageByState(this.propsState[2]);
    }
    private propImageByState(state: number) {
        if (state > 10) {
            state = state - 10;
        }
        switch(state) {
            case 0:
                return RES.getRes("prop_unknown_png");
            case 1:
                return RES.getRes("prop_practice_png");
            case 2:
                return RES.getRes("prop_time_png");
            case 3:
                return RES.getRes("prop_ink_png");
        }
    }

    private redrawQuestion(questionIndex: number) {
        let question = this._questions[questionIndex];
        if (!question) {
            console.log("No question found by index = " + questionIndex)
            return;
        }
        this.problemContent.text = question.question;
        for (let i = 0; i<question.options.length; i++) {
            this.options[i].text = question.options[i];
            this.options[i].textColor = 0x313E6F;
        }
        this.optionBackgrounds.forEach(v => {
            v.fillColor = 0xf1f0ff;
        })
    }

    private redrawScore(side: number, score: number) {
        // side 1左边 2右边
        let stageW = this.stage.stageWidth;
        let scoreIcon = new ScoreIcon(score);
        scoreIcon.anchorOffsetX = scoreIcon.width / 2;
        scoreIcon.anchorOffsetY = scoreIcon.height / 2;
        scoreIcon.y = this.centerWindow.y + scoreIcon.anchorOffsetY;
        scoreIcon.alpha = 0;
        scoreIcon.scaleX = 2;
        scoreIcon.scaleY = 2;
        if (side == 1) {
            scoreIcon.x = 20 + scoreIcon.anchorOffsetX;
        } else if (side = 2) {
            scoreIcon.x = stageW - scoreIcon.anchorOffsetX - 20;
        }
        
        let animationTarget = side == 1 ? this.leftScore : this.rightScore;
        
        if (animationTarget) {
            egret.Tween.get(animationTarget)
                .to({scaleX: 0, scaleY: 0, alpha: 0}, 300)
                .call(() => this.removeChild(animationTarget));
        }

        egret.Tween.get(scoreIcon).to({scaleX: 1, scaleY: 1, alpha: 1}, 300);

        this.addChild(scoreIcon);
        if (side == 1) {
            this.leftScore = scoreIcon;
        } else if (side == 2) {
            this.rightScore = scoreIcon;
        }
    }

    private redrawCountdownNumber(label: eui.Label, num: number) {
        if (num <= 0) num = 0;
        label.text = `${parseInt(num.toString())}″`;
    }

    private useProp(index) {
        
        let state = this.propsState[index];
        if (state == 0) {
            return;
        }
        // 0没有道具，1减一道题，2减10秒，3墨汁
        if (state > 10) {
            this.clothingAnimation(this.drawingId);
        }
        this.propAnimation(state, true);
        
        //TODO 使用道具 动画， socket消息
        this.propsState[index] = 0;
        this.redrawPropsBar()

    }

    private startNextRound() {
        if (this._currentQuestionIndex >= (this._totalQuestion-1)) {
            this.gameFinished();
        } else {
            this._rightRoundBeginTime = new Date().getTime();
            this._currentQuestionIndex ++;
            this.redrawQuestion(this._currentQuestionIndex);
            this.randomProp();
        }
    }

    private gameStart() {
        this._currentQuestionIndex = -1;
        this._leftRoundBeginTime = new Date().getTime();
        this.startNextRound();
        this.startTimer();
    }

    private gameFinished() {
        this.stopTimer();
        //TODO 游戏结束
        this.popup("fighting_finish_png").call(() => {
            //到下一页面
            let settlement = new SettlementScene(this._score > this._adversaryScore, this.drawingId);
            utils.App.pushScene(settlement);
        })
    }

    private startTimer() {
        this.stopTimer();
        this._countDownTimer = new egret.Timer(250,0);
        this._countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.countdownLoop, this);
        this._countDownTimer.start();
    }

    private stopTimer() {
        if (this._countDownTimer) {
            this._countDownTimer.stop();
            this._countDownTimer = null;
        }
    }

    private getCountdownNum(beginTime: number) {
        let total = 20;
        let time = new Date().getTime() - beginTime;
        let num = total - (time / 1000);
        return num;
    }

    private countdownLoop() {
        let leftNum = this.getCountdownNum(this._leftRoundBeginTime);
        let rightNum = this.getCountdownNum(this._rightRoundBeginTime);
        this.redrawCountdownNumber(this.countDown_left, leftNum);
        this.redrawCountdownNumber(this.countDown_right, rightNum);

        if (rightNum < 0) {
            this.handleAnswerState(this._currentQuestionIndex, false);
            this.startNextRound();
        }
    }

    private randomProp() {

        if (this._randomPropsCount > 0) {
            let state = parseInt((((Math.random() * 100) % 3) + 1).toString());
            let index = -1;
            if (this.propsState[0] == 0) {
                this.propsState[0] = state;
                index = 0;
            } else if (this.propsState[1] == 0) {
                this.propsState[1] = state;
                index = 1;
            } else if (this.propsState[2] == 0) {
                this.propsState[2] = state;
                index = 2;
            }
            if (index != -1) {
                this.redrawPropsBar();
                this._randomPropsCount --;
                let animateProp = [this.prop1Btn,this.prop2Btn,this.prop3Btn][index];
                animateProp.scaleX = 0;
                animateProp.scaleY = 0;
                animateProp.alpha = 0;
                egret.Tween.get(animateProp).to({alpha: 1, scaleX: 1, scaleY: 1}, 300, egret.Ease.backOut);
            }
        }

        
    }

    private backToMain() {
        console.log("返回")
        utils.App.popScene();
    }

    onAddStage() :void {

        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;

        let navigationBar = new NavigationBar();
        navigationBar.onBackDidClick = () => {
            this.backToMain();
        }
        this.addChild(navigationBar);

        this.userName_left.text = '左左';
        this.userIcon_left.source = fooIcon        
        
        // this.userIcon_left.texture = RES.getRes("132_jpeg");
        // this.userIcon_right.texture = RES.getRes("132_jpeg");
        
        this.userName_right.text = GameHolder.controller.nickname;
        this.userIcon_right.source = GameHolder.controller.avatar
        this.gender_icon_right.source = GameHolder.controller.gender  == 1 ? "ic_boy_png" : "ic_girl_png";
        
    this.propsState = GameHolder.propsByDrawingId(this.drawingId).map(t => t == 0 ? 0 : t + 10).concat(0);
        this.redrawPropsBar();
        this.redrawAnswerState(this.userState_left, this.leftUserAnswerState);
        this.redrawAnswerState(this.userState_right, this.rightUserAnswerState);
        
        [this.prop1Btn, this.prop2Btn, this.prop3Btn].forEach(v => {
            v.anchorOffsetX = v.width / 2;
            v.anchorOffsetY = v.height / 2;
            v.x += v.anchorOffsetX;
            v.y += v.anchorOffsetY;
        })

        this.fightingBg.height = stageH;
        
        this.leftUserBar.y = navigationBar.height + 30;
        this.rightUserBar.y = navigationBar.height + 30;
        this.propsBar.y = stageH - this.propsBar.height - 70;
        let centerWindowY = (stageH 
                - (this.leftUserBar.y + this.leftUserBar.height) 
                - (this.propsBar.height + 70) 
                - this.centerWindow.height
            ) / 2 + (this.leftUserBar.y + this.leftUserBar.height);
            
        this.centerWindow.y = Math.max(centerWindowY, this.leftUserBar.y + this.leftUserBar.height + 60);


        this.gameStartAnimation();
        this.redrawQuestion(0);
        this.addAllListener();
    }

    private addAllListener() {
        this.prop1Btn.addEventListener('touchTap', () => {
            this.useProp(0);
        }, this)
        this.prop2Btn.addEventListener('touchTap', () => {
            this.useProp(1);
        }, this)
        this.prop3Btn.addEventListener('touchTap', () => {
            this.useProp(2);
        }, this)

        this.optionA.addEventListener("touchTap", () => {
            this.selectedAnswer(0);
        },this);
        this.optionB.addEventListener("touchTap", () => {
            this.selectedAnswer(1);
        },this);
        this.optionC.addEventListener("touchTap", () => {
            this.selectedAnswer(2);
        },this);
        this.optionD.addEventListener("touchTap", () => {
            this.selectedAnswer(3);
        },this);
    }

    private selectedAnswer(index: number) {
        // 0.a, 1.b, 2.c, 3.d
        console.log("selectedAnswer", index, this.optionBackgrounds.length, this.options.length);

        if (this.rightUserAnswerState[this._currentQuestionIndex] != 0) {
            return;
        }

        let question = this._questions[this._currentQuestionIndex];
        
        let correct = question.correctIndex == index;
        this.handleAnswerState(this._currentQuestionIndex, correct);
        this.markAnswerResult(index, correct);
        if (correct) {
            this._score += 10;
            this.redrawScoreColumn([this.rightScoreColumn, this.rightScoreColumn_mask], this._score);
            this.redrawScore(2, this._score);
            this.popup("add_ten_points_png", 1500)
        }
        egret.Tween.get(this).wait(1500).call(() => {
            this.startNextRound();
        });
    }

    private handleAnswerState(index: number, correct: boolean) {
        this.rightUserAnswerState[index] = correct ? 2:1;
        this.redrawAnswerState(this.userState_right, this.rightUserAnswerState);
    }

    private markAnswerResult(index: number, correct: boolean) {
        this.optionBackgrounds[index].fillColor = correct ? 0x2DDAA9 : 0xFF606E;
        this.options[index].textColor = 0xFFFFFF;
    }

    private redrawScoreColumn(targets:egret.DisplayObject[], score:number) {
        let fullHeight = 632;
        let progress = score / 100.0;
        let distHeight = progress * fullHeight;
        let distY = fullHeight - distHeight;
        console.log(distHeight, distY, score);
        targets.forEach(x => {
            egret.Tween.get(x).to({height: distHeight, y: distY}, 300);
        });
    }

    private gameStartAnimation() {

        let backgroundMask = new egret.Bitmap();
        backgroundMask.texture = RES.getRes("mask_png")
        backgroundMask.touchEnabled = true;
        backgroundMask.width = this.stage.stageWidth;
        backgroundMask.height = this.stage.stageHeight;
        this.addChild(backgroundMask);
        this.popup("fighting_ready_png").call(() => {
            this.popup("fighting_go_png").call(() => {
                this.removeChild(backgroundMask)
                this.gameStart();
            });
        });
    }

    private clothingAnimation(drawingId: number) {
        let drawing = new egret.Bitmap();
        drawing.texture = RES.getRes(`battle_drawing_0${drawingId}_png`);
        drawing.width /= 1.5;
        drawing.height /= 1.5;
        drawing.x = this.stage.stageWidth;
        drawing.y = this.stage.stageHeight / 2 - drawing.height / 2;
        this.addChild(drawing);
        egret.Tween.get(drawing).to({x: this.stage.stageWidth / 2 - drawing.width / 2}, 300, egret.Ease.backOut)
            .wait(1000).to({x: this.stage.stageWidth}, 300).call(() => this.removeChild(drawing));
    }

    // 自己使用了答题减1
    private propAnimation(propId: number, isSelf: boolean) {

        let box = new egret.Bitmap();
        box.texture = RES.getRes(`prop_dialog_${isSelf ? "right":"left"}_${propId}_png`);
        box.width /= 1.5;
        box.height /= 1.5;

        let startX = isSelf ? this.stage.stageWidth : -box.width;
        let distX = isSelf ? this.stage.stageWidth - box.width : 0;

        box.x = startX;
        box.y = this.stage.stageHeight / 2;
        this.addChild(box);
        
        egret.Tween.get(box).wait(100).to({x: distX}, 300)
            .wait(1000).to({x: startX}, 300).call(() => this.removeChild(box));
    }

    private popup(res: string, delay: number = 500) {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        let image = new egret.Bitmap();
        image.texture = RES.getRes(res);
        image.width /= 1.5;
        image.height /= 1.5;
        image.anchorOffsetX = image.width / 2;
        image.anchorOffsetY = image.height / 2;
        image.x = stageW / 2;
        image.y = stageH / 2;
        image.scaleX = image.scaleY = 2;
        image.alpha = 0;
        this.addChild(image);
        return egret.Tween.get(image)
            .to({scaleX: 1, scaleY: 1, alpha: 1}, 300, egret.Ease.backOut)
            
            .wait(delay)
            .call(() => this.removeChild(image));
    }

    onRemoveStage() :void {

    }
}


class ScoreIcon extends egret.DisplayObjectContainer {

    public constructor(score: number) {
        super();
        this.createItems(score);
    }

    private createItems(score: number) {
        let scoreString = score.toString(); 
        let values = scoreString.split("").concat("unit");
        
        let maxHeight = 0;
        let nextX = 0;
        values.forEach(v => {
            let res = "score_"+v+"_png";
            let image = new egret.Bitmap();
            image.texture = RES.getRes(res);
            image.width /= 1.5;
            image.height /= 1.5;
            image.x = nextX;
            image.y = 0;
            this.addChild(image);
            nextX += (image.width-10);
            maxHeight = maxHeight > image.height ? maxHeight : image.height;
        });
        this.width = nextX;
        
        this.height = maxHeight;
        // this.anchorOffsetX = this.width / 2;
        // this.anchorOffsetY = this.height / 2;
    }

}
