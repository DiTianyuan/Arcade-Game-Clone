// 这是我们的玩家要躲避的敌人
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = parseInt(Math.random() * 3) * 83 + 58;
    this.speed = Math.random() * 200 + 100;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if (this.x > 505) {
        this.x = -101;
        this.y = parseInt(Math.random() * 3) * 83 + 58;
        this.speed = Math.random() * 200 + 100;
    }
    this.x += this.speed * dt;

    // 对每一个敌人检查是否与玩家发生碰撞
    for (bug of allEnemies) {
        bug.checkCollisions(player);
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 检测碰撞的函数
Enemy.prototype.checkCollisions = function(player) {
    若发生碰撞，player回到初始位置
    if (this.y - 10 === player.y) {
        if (Math.abs(this.x - player.x) <= 72) {
            player.x = 202;
            player.y = 380;
            player.render();
        }
    }
};

// 现在实现你自己的玩家类
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 380;
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
        // this.update();
        this.render();
    }

    // 游戏胜利，弹出提示，player回到初始位置
    if (y < 48) {
        alert("YOU WON!");
        this.x = 202;
        this.y = 380;
        this.render();
    }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var bug4 = new Enemy();
allEnemies.push(bug1, bug2, bug3, bug4);

var player = new Player();

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

