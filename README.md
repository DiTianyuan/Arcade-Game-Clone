
前端纳米学位街机游戏克隆项目
===============================

学生应该用这个[评审标准](https://review.udacity.com/#!/rubrics/499/view))来自我检查自己提交的代码。 确认自己写的函数要是**面向对象的** -  要么是类函数（就像函数 Player 和 Enemy）要么是类的原型链上的函数比如 Enemy.prototype.checkCollisions ， 在类函数里面或者类的原型链函数里面适当的使用关键词 'this' 来引用调用该函数的对象实例。最后保证你的**readme.md**文件要写明关于如何运行和如何玩你的街机游戏的指引。

关于如何开始这个项目的更详细的指导，可以查阅这份[指南](https://gdgdocs.org/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true)。

如何玩此游戏
-----------

此游戏界面为6行×5列的单元格，由下至上为一片草地、三条石子路和一条河。草地为2行×5列，石子路为3行×5列，每行为一条路，小河为1行×5列。

三条石子路上共有四只甲壳虫从屏幕左边界进入屏幕并以随机速度向右连续移动，当从右边界移动至屏幕外后，再次从屏幕左边界进入随机一条道路并以随机速度移动，以此循环。

小人儿初始位置在游戏界面最下面一行的中间列上，即草地上，其任务是穿过石子路到达小河。

玩家用键盘上下左右四个方向键控制小人儿上下左右移动，一次移动一个单元格，移动范围不超出屏幕边界。若小人儿在石子路上与甲壳虫相撞，则小人回到初始位置。若小人儿成功穿过石子路到达小河，则游戏胜利，弹出提示框，关闭弹框后小人儿回到初始位置，可再次开始游戏。

此游戏如何运行
-------------

定义一个用于构建敌人的类，敌人属性包括显示其位置的x、y坐标和移动速度speed，方法包括用于更新坐标的update函数、将敌人在屏幕上绘制出来的render函数和检测是否与玩家发生碰撞并响应碰撞的checkCollisions函数。

定义一个构建玩家的类，玩家属性包括显示其位置的x、y坐标，方法包括用于更新坐标的update函数、将敌人在屏幕上绘制出来的render函数、根据键盘方向键响应移动的handleInput函数和初始化玩家位置的initialize函数。

构建一个玩家实例（小人儿），设置其初始位置，通过对键盘上下左右四个方向键设置事件监听，通过特定方向键更新小人相应坐标，实现控制小人移动，并通过设定坐标变化范围来限制小人儿移动范围。监测小人儿y坐标，当小人儿移动至河流位置时，弹出一个提示框提示游戏胜利，并调用initialize函数使小人儿能够回到初始位置。

构建四个敌人实例（甲壳虫），位置和速度均随机，通过不停地重绘屏幕实现甲壳虫连续移动的效果。监测每只甲壳虫的x坐标，当甲壳虫移动出屏幕右边界后，重新为x、y和speed随机赋值，实现甲壳虫循环出现且位置和速度与之前不同的效果。实时监测甲壳虫坐标与小人儿坐标的差值，当小人儿与甲壳虫首或尾相碰时对小人儿调用initialize函数使小人儿回到初始位置。