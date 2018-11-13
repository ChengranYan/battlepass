class Problem {
    body: string;
    choices: Array<Choice>
}
class Choice {
    body: string;
    correct: boolean;
}
class Problems {
    /**
     * 随机试题
     */
    public static randomProblems (count: number) {
        let res = [];
        const problems = this.list.slice();
        let tempCount = this.list.length;
        for (let i = 0; i < count; i++) {
            const index = ~~(Math.random() * tempCount + i);
            res[i] = problems[index];
            problems[index] = problems[i];
            tempCount--;
        }
        return res
    }
    public static list: Array<Problem> = [
        {
            body: '-6的相反数是( )。',
            choices: [
                { body: '1/6', correct: false },
                { body: '-1/6', correct: false },
                { body: '6', correct: true },
                { body: '-6', correct: false }
            ]
        },
        {
            body: '2的绝对值是( )。',
            choices: [
                { body: '-2', correct: false },
                { body: '2', correct: true },
                { body: '-1/2', correct: false },
                { body: '1/2', correct: false }
            ]
        },
        {
            body: '下列各数中比-1大的数是( )。',
            choices: [
                { body: '-2', correct: false },
                { body: '0', correct: true },
                { body: '-1', correct: false },
                { body: '-3', correct: false }
            ]
        },
        {
            body: '互为相反数的两个数的和为( )。',
            choices: [
                { body: '0', correct: true },
                { body: '-1', correct: false },
                { body: '1', correct: false },
                { body: '2', correct: false }
            ]
        },
        {
            body: '下列说法错误的是( )。',
            choices: [
                { body: '0是正数和负数的分界', correct: false },
                { body: '0只表示“什么都没有”', correct: true },
                { body: '0可以表示特定的意义', correct: false },
                { body: '0是自然数', correct: false }
            ]
        },
        {
            body: '今天最高气温10度，最低气温-5度，今天的温差是( )',
            choices: [
                { body: '10度', correct: false },
                { body: '5度', correct: false },
                { body: '15度', correct: true },
                { body: '-5度', correct: false }
            ]
        },
        {
            body: '下列说法正确的是( )。',
            choices: [
                { body: 'x的次数是0', correct: false },
                { body: 'x的系数是0', correct: false },
                { body: '-1是一次单项式', correct: false },
                { body: '-1是单项式', correct: true }
            ]
        },
        {
            body: '若3x+2a-6=0，那么6x+4a的值为( )。',
            choices: [
                { body: '-6', correct: false },
                { body: '不可解', correct: false },
                { body: '-3', correct: false },
                { body: '12', correct: true }
            ]
        },
        {
            body: '方程2x+a=4的解是x=2，则a等于( )',
            choices: [
                { body: '-8', correct: false },
                { body: '0', correct: true },
                { body: '2', correct: false },
                { body: '8', correct: false }
            ]
        },
        {
            body: '计算：3a-(2a-b)=( )。',
            choices: [
                { body: '5a-b', correct: false },
                { body: 'a-b', correct: false },
                { body: 'a+b', correct: true },
                { body: '2a+b', correct: false }
            ]
        },
        {
            body: '若x-5=2x-1,那么x=( )。',
            choices: [
                { body: '6', correct: false },
                { body: '4', correct: false },
                { body: '-4', correct: true },
                { body: '3', correct: false }
            ]
        },
        {
            body: '若a的平方是64，则a=( )。',
            choices: [
                { body: '8', correct: false },
                { body: '±4', correct: false },
                { body: '-8', correct: false },
                { body: '±8', correct: true }
            ]
        },
        {
            body: '下列具有相反意义的量是( )',
            choices: [
                { body: '前进与后退', correct: false },
                { body: '胜两局与负2局', correct: true },
                { body: '气温升高3°C与气温为-3°C', correct: false },
                { body: '盈利3万元与支出2万元', correct: false }
            ]
        },
        {
            body: '若x的相反数是3，y的绝对值是5，则x+y的值为( )。',
            choices: [
                { body: '-8', correct: false },
                { body: '2', correct: false },
                { body: '8或-2', correct: false },
                { body: '-8或2', correct: true }
            ]
        },
        {
            body: '绝对值不大于4的整数的积是( )。',
            choices: [
                { body: '16', correct: false },
                { body: '0', correct: true },
                { body: '576', correct: false },
                { body: '-1', correct: false }
            ]
        },
        {
            body: '五个有理数的积为负数，则五个数中负数的个数是( )。',
            choices: [
                { body: '3', correct: false },
                { body: '1或3', correct: false },
                { body: '3或5', correct: false },
                { body: '1或3或5', correct: true }
            ]
        },
        {
            body: '甲2/3小时做16个零件，乙3/4小时做18个零件，那么( )。',
            choices: [
                { body: '甲的工作效率高', correct: false },
                { body: '乙的工作效率高', correct: false },
                { body: '两人的工作效率一样高', correct: true },
                { body: '无法比较', correct: false }
            ]
        },
        {
            body: '若a的立方是它本身，则有理数a有( )个。',
            choices: [
                { body: '0', correct: false },
                { body: '1', correct: false },
                { body: '2', correct: false },
                { body: '3', correct: true }
            ]
        },
        {
            body: '最大的负整数的2005次方与绝对值最小的数的2006次方的和是 ( )。',
            choices: [
                { body: '-1', correct: true },
                { body: '0', correct: false },
                { body: '1', correct: false },
                { body: '2', correct: false }
            ]
        },
        {
            body: '关于四舍五入得到的近似数2.003万下列说法正确的是( )。',
            choices: [
                { body: '它精确到万分位', correct: false },
                { body: '它精确到0.001', correct: false },
                { body: '它精确到十位', correct: true },
                { body: '它精确到万位', correct: false }
            ]
        },
        {
            body: '下列判断中，错误的是( )。',
            choices: [
                { body: '-1的平方根是±1', correct: true },
                { body: '-1的倒数是-1', correct: false },
                { body: '-1的绝对值是1', correct: false },
                { body: '-1的平方的相反数是-1', correct: false }
            ]
        },
        {
            body: '如果一个数的平方根等于这个数本身，那么这个数是( )。',
            choices: [
                { body: '1', correct: false },
                { body: '-1', correct: false },
                { body: '0', correct: true },
                { body: '±1', correct: false }
            ]
        },
        {
            body: '若一个数的平方根是±8，则这个数的立方根是( )。',
            choices: [
                { body: '±2', correct: false },
                { body: '±4', correct: false },
                { body: '2', correct: false },
                { body: '4', correct: true }
            ]
        },
        {
            body: '在数轴上，与表示数-1的点的距离是2的点表示的数是( )。',
            choices: [
                { body: '1', correct: false },
                { body: '3', correct: false },
                { body: '±2', correct: false },
                { body: '1或-3', correct: true }
            ]
        },
        {
            body: '若A和B都是4次多项式，则A+B一定是( )。',
            choices: [
                { body: '8次多项式', correct: false },
                { body: '4次多项式', correct: false },
                { body: '次数不高于4次的整式', correct: true },
                { body: '次数不低于4次的整式', correct: false }
            ]
        },
        {
            body: '如果一个有理数的平方根等于-x，那么x是( )。',
            choices: [
                { body: '负数', correct: false },
                { body: '正数', correct: false },
                { body: '非负数', correct: false },
                { body: '不是正数', correct: true }
            ]
        },
        {
            body: '如果一个有理数的平方根和立方根相同，那么这个数是( )。',
            choices: [
                { body: '±1', correct: false },
                { body: '0', correct: true },
                { body: '1', correct: false },
                { body: '0和1', correct: false }
            ]
        },
        {
            body: '在数轴上A点表示-2，A沿数轴移动4个单位长度到达B，则B是( )。',
            choices: [
                { body: '2', correct: false },
                { body: '-6', correct: false },
                { body: '0或-6', correct: false },
                { body: '2或-6', correct: true }
            ]
        },
        {
            body: '把1999.728四舍五入精确到十位，那么所得近似数的有效数字为 ( )。',
            choices: [
                { body: '1, 9, 9', correct: false },
                { body: '1, 9, 9, 9', correct: false },
                { body: '2, 0, 0', correct: true },
                { body: '2, 0', correct: false }
            ]
        },
        {
            body: '下列说法正确的是( )。',
            choices: [
                { body: '0.720有两个有效数字', correct: false },
                { body: '3.6万精确到十分位', correct: false },
                { body: '3000有一个有效数字', correct: false },
                { body: '小明身高1.6米是近似数', correct: true }
            ]
        }
    ]
}
