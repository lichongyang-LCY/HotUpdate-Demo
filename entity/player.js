/**
 *  Created by lcy on 2019/2/15.
 */
'use strict';
let Player = function (id) {
    this.id = id + "-test";
}

let pro = Player.prototype;
pro.getID = function () {
    let self = this;
    return self.id;
}

exports.create = function () {
    return Player;
}