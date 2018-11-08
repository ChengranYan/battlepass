class BattleMatchScene extends egret.DisplayObjectContainer implements BPNavigatorAware {

    private waitingTimer: egret.Timer;

    private navigator: BPNavigator;

    public setNavigator(navigator: BPNavigator) {
        this.navigator = navigator;
    }

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {this.waitingTimer.stop();this.waitingTimer = null;}, this);
    }

    private onAddToStage(event: egret.Event) {
        this.createItems();
    }

    public createItems() {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        let navigationBar = new NavigationBar("正在匹配");
        navigationBar.onBackDidClick = () => {
            this.navigator.pop();
        }
        this.addChild(navigationBar);

        let windowHeight = stageH - 160 - 210;

        let leftWindow = new egret.Bitmap();
        leftWindow.texture = RES.getRes("match_drawing_box_left_png")
        let leftScaleModulus = windowHeight / leftWindow.height;
        leftWindow.width = leftWindow.width / leftWindow.height * windowHeight;
        leftWindow.height = windowHeight;
        leftWindow.y = 160;
        leftWindow.x = -leftWindow.width; // 0
        this.addChild(leftWindow);

        let rightWindow = new egret.Bitmap();
        rightWindow.texture = RES.getRes("match_drawing_box_right_png")
        rightWindow.width = rightWindow.width / rightWindow.height * windowHeight;
        rightWindow.height = windowHeight;
        rightWindow.y = 160;
        rightWindow.x = stageW; // stageW - rightWindow.width;
        this.addChild(rightWindow);


        let leftUnknown = new egret.Bitmap();
        leftUnknown.texture = RES.getRes("match_drawing_unknown_png");
        leftUnknown.width = leftUnknown.width * leftScaleModulus;
        leftUnknown.height = leftUnknown.height * leftScaleModulus;
        leftUnknown.anchorOffsetX = leftUnknown.width / 2;
        leftUnknown.anchorOffsetY = leftUnknown.height / 2;
        leftUnknown.x = -(leftUnknown.width / 2);// leftUnknown.width / 2;
        leftUnknown.y = leftWindow.y + leftWindow.height / 2;
        this.addChild(leftUnknown);

        let leftGirl = new egret.Bitmap();
        leftGirl.texture = RES.getRes("match_erect_drawing_03_png");
        leftGirl.width = leftGirl.width * leftScaleModulus;
        leftGirl.height = leftGirl.height * leftScaleModulus;
        leftGirl.anchorOffsetX = leftGirl.width / 2;
        leftGirl.anchorOffsetY = leftGirl.height / 2;
        leftGirl.x = -(leftGirl.width / 2); // leftGirl.width / 2;
        leftGirl.y = leftWindow.y + leftWindow.height / 2;
        this.addChild(leftGirl);

        let rightGirl = new egret.Bitmap();
        rightGirl.texture = RES.getRes("match_erect_drawing_01_png");
        rightGirl.width = rightGirl.width * leftScaleModulus;
        rightGirl.height = rightGirl.height * leftScaleModulus;
        rightGirl.anchorOffsetX = rightGirl.width / 2;
        rightGirl.anchorOffsetY = rightGirl.height / 2;
        rightGirl.x = stageW + rightGirl.width / 2;// stageW + 50 - rightGirl.width / 2;
        rightGirl.y = rightWindow.y + rightGirl.height / 2;
        this.addChild(rightGirl);

        let matchingText = new egret.TextField();
        matchingText.text = "正在寻找对战人...";
        matchingText.size = 36;
        let matchingTextX = -matchingText.textWidth;
        matchingText.x = matchingTextX; // 40;
        matchingText.y = leftWindow.y + leftWindow.height / 2 - matchingText.height / 2;
        this.addChild(matchingText);
        this.waitingTimer = new egret.Timer(500, 0);
        let flag = 0;
        this.waitingTimer.addEventListener(
                egret.TimerEvent.TIMER,
                () => {
                    console.log('a');
                        if (flag == 0) {
                            matchingText.text = "正在寻找对战人...";
                            flag = 1;
                        } else {
                            matchingText.text = "正在寻找对战人..";
                            flag = 0;
                        }
                    }
                ,this);
        this.waitingTimer.start();
        
        let leftItem1 = new egret.Bitmap();
        leftItem1.texture = RES.getRes("prop_ink_png")
        leftItem1.width /= 1.5;
        leftItem1.height /= 1.5;
        leftItem1.x = -leftItem1.width// 32;
        leftItem1.y = leftWindow.y + leftWindow.height - 50 - leftItem1.height;
        this.addChild(leftItem1);

        let leftItem2 = new egret.Bitmap();
        leftItem2.texture = RES.getRes("prop_practice_png")
        leftItem2.width /= 1.5;
        leftItem2.height /= 1.5;
        leftItem2.x = -leftItem2.width;// 32;
        leftItem2.y = leftItem1.y - 40 - leftItem2.height;
        this.addChild(leftItem2);


        let rightItem1 = new egret.Bitmap();
        rightItem1.texture = RES.getRes("prop_time_png")
        rightItem1.width /= 1.5;
        rightItem1.height /= 1.5;
        rightItem1.x = stageW; // stageW - rightItem1.width - 32;
        rightItem1.y = leftWindow.y + leftWindow.height - 50 - rightItem1.height;
        this.addChild(rightItem1);

        let rightItem2 = new egret.Bitmap();
        rightItem2.texture = RES.getRes("prop_ink_png")
        rightItem2.width /= 1.5;
        rightItem2.height /= 1.5;
        rightItem2.x = stageW; // stageW - rightItem2.width - 32;
        rightItem2.y = rightItem1.y - 40 - rightItem2.height;
        this.addChild(rightItem2);



        let leftPlayer = new LeftPlayer((stageW - 40) / 2);
        leftPlayer.y = stageH - leftPlayer.height - 100;
        leftPlayer.x = -leftPlayer.width; //0
        this.addChild(leftPlayer);
        
        let rightPlayer = new RightPlayer((stageW - 40) / 2);
        rightPlayer.y = stageH - rightPlayer.height - 100;
        rightPlayer.x = stageW; // stageW - rightPlayer.width;
        this.addChild(rightPlayer);

        let vs = new egret.Bitmap();
        vs.texture = RES.getRes("match_success_vs_png")
        vs.width /= 1.5;
        vs.height /= 1.5;
        vs.anchorOffsetX = vs.width / 2;
        vs.anchorOffsetY = vs.height / 2;
        vs.x = stageW / 2;
        vs.y = stageH / 2 - 100;
        vs.scaleX = 5;
        vs.scaleY = 5;
        vs.alpha = 0;
        this.addChild(vs);

        egret.Tween.get(rightPlayer).wait(1000).call(() => {
            egret.Tween.get(rightPlayer).to({x: stageW - rightPlayer.width}, 300, egret.Ease.backOut);
            egret.Tween.get(rightWindow).wait(300).to({x: stageW - rightWindow.width}, 300, egret.Ease.backOut);
            egret.Tween.get(rightGirl).wait(400).to({x: stageW + 50 - rightGirl.width / 2}, 300, egret.Ease.backOut);
            egret.Tween.get(rightItem1).wait(400).to({x: stageW - rightItem1.width - 32}, 300, egret.Ease.backOut);
            egret.Tween.get(rightItem2).wait(400).to({x: stageW - rightItem2.width - 32}, 300, egret.Ease.backOut);

            egret.Tween.get(leftWindow).wait(400).to({x: 0}, 300, egret.Ease.backOut);
            egret.Tween.get(leftUnknown).wait(400).to({x: leftUnknown.width / 2}, 300, egret.Ease.backOut);
            egret.Tween.get(matchingText).wait(400).to({x: 40}, 300, egret.Ease.backOut);
        }).wait(3000).call(() => {
            egret.Tween.get(leftUnknown).wait(400).to({x: -(leftUnknown.width / 2)}, 300, egret.Ease.backOut);
            egret.Tween.get(matchingText).wait(400).to({x: matchingTextX}, 300, egret.Ease.backOut);
        }).wait(4000).call(() => {
            egret.Tween.get(leftPlayer).wait(400).to({x: 0}, 300, egret.Ease.backOut);
            egret.Tween.get(leftGirl).wait(400).to({x: leftGirl.width / 2}, 300, egret.Ease.backOut);
            egret.Tween.get(leftItem1).wait(400).to({x: 32}, 300, egret.Ease.backOut);
            egret.Tween.get(leftItem2).wait(400).to({x: 32}, 300, egret.Ease.backOut);
            egret.Tween.get(vs).wait(400).to({alpha: 1, scaleX: 1, scaleY: 1}, 300, egret.Ease.backOut);
        });

        

        
    }


}



class LeftPlayer extends egret.DisplayObjectContainer {

    public constructor(width: number) {
        super();
        this.createItems(width, 1);
    }

    private createItems(width: number, gender: number) {
        this.width = width;
        this.height = 140

        let backgroundShape = new egret.Shape();
        
        backgroundShape.graphics.lineStyle(10, 0x7D5BD3)
        backgroundShape.graphics.beginFill(0x7D5BD3);
        backgroundShape.graphics.drawArc(width - 70, 70, 70,Math.PI/2, Math.PI * 1.5, true);
        backgroundShape.graphics.endFill();

        backgroundShape.graphics.beginFill(0x6552E6);
        backgroundShape.graphics.drawRect(0, 0, width - 70, this.height);
        backgroundShape.graphics.endFill();
        this.addChild(backgroundShape);

        let avatarSpace = 10;
        let avatar = new egret.Bitmap();
        avatar.texture = RES.getRes("avatar_drawing_03_png");
        avatar.height = avatar.width = this.height - (avatarSpace * 2);
        avatar.x = width - avatar.width - avatarSpace * 2;
        avatar.y = avatarSpace;
        this.addChild(avatar);

        let avatarMask = new egret.Shape();
        avatarMask.x = avatar.x;
        avatarMask.y = avatar.y;
        avatarMask.width = avatarMask.height = avatar.width;
        avatarMask.graphics.beginFill(0xffffff, 1);
        avatarMask.graphics.drawCircle(avatar.width / 2,avatar.width / 2,avatar.width / 2);
        avatarMask.graphics.endFill();
        avatar.mask = avatarMask;
        this.addChild(avatarMask);

        let avatarBorder = new egret.Shape();
        avatarBorder.x = avatar.x;
        avatarBorder.y = avatar.y;
        avatarBorder.width = avatarMask.height = avatar.width;
        avatarBorder.graphics.lineStyle(5,0xffffff);
        avatarBorder.graphics.beginFill(0xffffff, 0);
        avatarBorder.graphics.drawCircle(avatar.width / 2,avatar.width / 2,avatar.width / 2);
        avatarBorder.graphics.endFill();
        this.addChild(avatarBorder);

        let username = new egret.TextField();
        username.text = "小萌宠";
        username.textColor = 0xffffff;
        username.alpha = 0.6;
        username.size = 28;
        username.x = avatar.x - username.textWidth - 22;
        username.y = 22;
        this.addChild(username);

        let genderImage = new egret.Bitmap();
        if (gender == 1) {
            genderImage.texture = RES.getRes("ic_boy_png");
        } else {
            genderImage.texture = RES.getRes("ic_girl_png");
        }
        genderImage.width /= 1.5;
        genderImage.height /= 1.5;
        genderImage.x = username.x - genderImage.width - 22;
        genderImage.y = 22;
        this.addChild(genderImage);

        let level = new egret.TextField();
        level.text = "白银三段";
        level.textColor = 0xffffff;
        level.bold = true;
        level.size = 40;
        level.x = avatar.x - level.textWidth - 22;
        level.y = this.height - level.textHeight - 22;
        this.addChild(level);
    }
}




class RightPlayer extends egret.DisplayObjectContainer {

    public constructor(width: number) {
        super();
        this.createItems(width, 0);
    }

    private createItems(width: number, gender: number) {
        this.width = width;
        this.height = 140

        let backgroundShape = new egret.Shape();
        
        backgroundShape.graphics.lineStyle(10, 0x7D5BD3)
        backgroundShape.graphics.beginFill(0x7D5BD3);
        backgroundShape.graphics.drawArc(70, 70, 70,Math.PI/2, Math.PI * 1.5, false);
        backgroundShape.graphics.endFill();

        backgroundShape.graphics.beginFill(0x6552E6);
        backgroundShape.graphics.drawRect(70, 0, width - 70, this.height);
        backgroundShape.graphics.endFill();
        this.addChild(backgroundShape);

        let avatarSpace = 10;
        let avatar = new egret.Bitmap();
        avatar.texture = RES.getRes("avatar_drawing_01_png");
        avatar.height = avatar.width = this.height - (avatarSpace * 2);
        avatar.x = avatarSpace;
        avatar.y = avatarSpace;
        this.addChild(avatar);

        let avatarMask = new egret.Shape();
        avatarMask.x = avatar.x;
        avatarMask.y = avatar.y;
        avatarMask.width = avatarMask.height = avatar.width;
        avatarMask.graphics.beginFill(0xffffff, 1);
        avatarMask.graphics.drawCircle(avatar.width / 2,avatar.width / 2,avatar.width / 2);
        avatarMask.graphics.endFill();
        avatar.mask = avatarMask;
        this.addChild(avatarMask);

        let avatarBorder = new egret.Shape();
        avatarBorder.x = avatar.x;
        avatarBorder.y = avatar.y;
        avatarBorder.width = avatarMask.height = avatar.width;
        avatarBorder.graphics.lineStyle(5,0xffffff);
        avatarBorder.graphics.beginFill(0xffffff, 0);
        avatarBorder.graphics.drawCircle(avatar.width / 2,avatar.width / 2,avatar.width / 2);
        avatarBorder.graphics.endFill();
        this.addChild(avatarBorder);

        let username = new egret.TextField();
        username.text = "小可爱";
        username.textColor = 0xffffff;
        username.alpha = 0.6;
        username.size = 28;
        username.x = avatar.x + avatar.width + 22;
        username.y = 22;
        this.addChild(username);

        let genderImage = new egret.Bitmap();
        if (gender == 1) {
            genderImage.texture = RES.getRes("ic_boy_png");
        } else {
            genderImage.texture = RES.getRes("ic_girl_png");
        }
        genderImage.width /= 1.5;
        genderImage.height /= 1.5;
        genderImage.x = username.x + username.width + 22;
        genderImage.y = 22;
        this.addChild(genderImage);

        let level = new egret.TextField();
        level.text = "白银二段";
        level.textColor = 0xffffff;
        level.bold = true;
        level.size = 40;
        level.x = avatar.x + avatar.width + 22;
        level.y = this.height - level.textHeight - 22;
        this.addChild(level);
    }
}