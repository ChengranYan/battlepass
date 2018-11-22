


namespace GameHolder {
    export const controller = new GameController();

    export const propsList = [
            [1,2],
            [3,3],
            [3, 1],
            [2, 3],
        ];
    export const propImageByDrawingIdAndIndex = function(drawingId: number, index: number) {
        console.log(drawingId, index);
        return propImageById(propsByDrawingId(drawingId)[index]);
    }
    export const propsByDrawingId = function(drawingId: number) {
        return propsList[drawingId-1];
    }
    export const propImageById = function(propId: number) {
        console.log(propId);
        switch(propId) {
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


    export const randomQuestion = function() {
        let arr = 

[
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
  },
  {
    "question": "若x-5=2x-1,那么x=( )。",
    "correctIndex": 2,
    "options": [
      "A.6",
      "B.4",
      "C.-4",
      "D.3"
    ]
  },
  {
    "question": "若a的平方是64，则a=( )。",
    "correctIndex": 3,
    "options": [
      "A.8",
      "B.±4",
      "C.-8",
      "D.±8"
    ]
  },
  {
    "question": "下列具有相反意义的量是( )。",
    "correctIndex": 1,
    "options": [
      "A.前进与后退",
      "B.胜两局与负2局",
      "C.气温升高3°C与气温为-3°C",
      "D.盈利3万元与支出2万元"
    ]
  },
  {
    "question": "若x的相反数是3，y的绝对值是5，则x+y的值为( )。",
    "correctIndex": 3,
    "options": [
      "A.-8",
      "B.2",
      "C.8或-2",
      "D.-8或2"
    ]
  },
{
  "question": "绝对值不大于4的整数的积是( )。",
  "correctIndex": 1,
  "options": [
    "A.16",
    "B.0",
    "C.576",
    "D.-1"
  ]
},
{
  "question": "五个有理数的积为负数，则五个数中负数的个数是( )。",
  "correctIndex": 3,
  "options": [
    "A.3",
    "B.1或3",
    "C.3或5",
    "D.1或3或5"
  ]
},
{
  "question": "甲2/3小时做16个零件，乙3/4小时做18个零件，那么( )。",
  "correctIndex": 2,
  "options": [
    "A.甲的工作效率高",
    "B.乙的工作效率高",
    "C.两人的工作效率一样高",
    "D.无法比较"
  ]
},
{
  "question": "若a的立方是它本身，则有理数a有( )。",
  "correctIndex": 3,
  "options": [
    "A.0",
    "B.1",
    "C.2",
    "D.3"
  ]
},
{
  "question": "最大的负整数的2005次方与绝对值最小的数的2006次方的和是( )。",
  "correctIndex": 0,
  "options": [
    "A.-1",
    "B.0",
    "C.1",
    "D.2"
  ]
},
{
  "question": "关于四舍五入得到的近似数2.003万下列说法正确的是( )。",
  "correctIndex": 2,
  "options": [
    "A.它精确到万分位",
    "B.它精确到0.001",
    "C.它精确到十位",
    "D.它精确到万位"
  ]
},
{
  "question": "下列判断中，错误的是( )。",
  "correctIndex": 0,
  "options": [
    "A.-1的平方根是±1",
    "B.-1的倒数是-1",
    "C.-1的绝对值是1",
    "D.-1的平方的相反数是-1"
  ]
},
{
  "question": "如果一个数的平方根等于这个数本身，那么这个数是( )。",
  "correctIndex": 2,
  "options": [
    "A.1",
    "B.-1",
    "C.0",
    "D.±1"
  ]
},
{
  "question": "若一个数的平方根是±8，则这个数的立方根是( )。",
  "correctIndex": 3,
  "options": [
    "A.±2",
    "B.±4",
    "C.2",
    "D.4"
  ]
},
{
  "question": "在数轴上，与表示数-1的点的距离是2的点表示的数是( )。",
  "correctIndex": 3,
  "options": [
    "A.1",
    "B.3",
    "C.±2",
    "D.1或-3"
  ]
},
{
  "question": "若A和B都是4次多项式，则A+B一定是( )。",
  "correctIndex": 2,
  "options": [
    "A.8次多项式",
    "B.4次多项式",
    "C.次数不高于4次的整式",
    "D.次数不低于4次的整式"
  ]
},
{
  "question": "如果一个有理数的平方根等于-x，那么x是( )。",
  "correctIndex": 3,
  "options": [
    "A.负数",
    "B.正数",
    "C.非负数",
    "D.不是正数"
  ]
},
{
  "question": "如果一个有理数的平方根和立方根相同，那么这个数是( )。",
  "correctIndex": 1,
  "options": [
    "A.±1",
    "B.0",
    "C.1",
    "D.0和1"
  ]
},
{
  "question": "在数轴上A点表示-2，A沿数轴移动4个单位长度到达B，则B是( )。",
  "correctIndex": 3,
  "options": [
    "A.2",
    "B.-6",
    "C.0或-6",
    "D.2或-6"
  ]
},
{
  "question": "把1999.728四舍五入精确到十位，那么所得近似数的有效数字为( )。",
  "correctIndex": 2,
  "options": [
    "A.1，9，9",
    "B.1，9，9，9",
    "C.2，0，0",
    "D.2，0"
  ]
},
{
  "question": "下列说法正确的是( )。",
  "correctIndex": 3,
  "options": [
    "A.0.720有两个有效数字",
    "B.3.6万精确到十分位",
    "C.3000有一个有效数字",
    "D.小明身高1.6米是近似数"
  ]
}
];
        let result = [];
        for (let i=0; i<10; i++) {
            let index = parseInt((Math.random() * 1000).toString()) % arr.length;
            result.push(arr[index]);
        }
        console.log(result);
        return result;

    }

}