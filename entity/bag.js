'use strict';


/**
 * @brief:     测试深层引用能否实现热更新
 *
 * @author:   lcy
 * @date:     2019/9/3 15:01
 */
let Bag = function (player) {
    this.player = player;
}

let pro = Bag.prototype;
pro.getPlayerID = function () {
    return this.player.getID();
}

module.exports = Bag;