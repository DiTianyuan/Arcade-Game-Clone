// 这是我们的玩家要躲避的敌人
var Enemy = function(player) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;//刚好在屏幕左边界外
    this.y = parseInt(Math.random() * 3) * 83 + 58;//随机出现在三条石子路的其中一条上
    this.speed = Math.random() * 200 + 100;//速度为100至300之间的随机数
    this.player = player;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if (this.x > 505) {//每个敌人移动至屏幕右边界外后再从屏幕左边界重新进入，并赋予新的随机道路与随机速度
        this.x = -101;
        this.y = parseInt(Math.random() * 3) * 83 + 58;
        this.speed = Math.random() * 200 + 100;
    }
    this.x += this.speed * dt;

    // 对每一个敌人检查是否与玩家发生碰撞
    this.checkCollisions(this.player);
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 检测碰撞的函数
Enemy.prototype.checkCollisions = function(player) {
    // 若发生碰撞，player回到初始位置
    if (this.y - 10 === player.y) {//在同一道路上时，enemy的y坐标比player的大10
        if (Math.abs(this.x - player.x) <= 72) {//player与enemy首尾皆不撞需两者x坐标大于72
            setTimeout(player.initialize, 200);//显示碰撞效果0.2秒后player回归原位
        }
    }
};

// 现在实现你自己的玩家类
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;//玩家初始位置横坐标
    this.y = 380;//玩家初始位置纵坐标
}

// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

// 不知道做什么用的update() 函数
Player.prototype.update = function() {

};

// 在屏幕上画出玩家
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 实现player由电脑上方向键控制移动
Player.prototype.handleInput = function(key) {
    var x = this.x, y = this.y;

    if(key === "left") {
        x -= 101;
    }
    else if(key === "up") {
        y -= 83;
    }
    else if(key === "right") {
        x += 101;
    }
    else if(key === "down") {
        y += 83;
    }

    // 限制移动范围
    if (x >= 0 && x <= 404 && y >= 48 && y <= 380) {
        this.x = x;
        this.y = y;
    }

    // 移动至河流时游戏胜利，弹出提示，player回到初始位置
    if (y < 48) {
        alert("YOU WON!");
        player.initialize();
    }
};

// 初始化玩家的函数
Player.prototype.initialize = function() {
    player.x = 202;
    player.y = 380;
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var player = new Player();
var allEnemies = [];
var bug1 = new Enemy(player);
    bug2 = new Enemy(player);
    bug3 = new Enemy(player);
    bug4 = new Enemy(player);
allEnemies.push(bug1, bug2, bug3, bug4);


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

