/**
 *  Created by lcy on 2019/2/15.
 */
'use strict';
let Base = require(global.Path + '/base');
let util = require('util');
let requireFiles = {
    player: {path: global.Path + "/entity/player.js", file: require(global.Path +'/entity/player.js').create(), name: "player.js"},
}

let PlayerManager = function () {
    this.playerMap = {};
    Base.call(this, requireFiles);
}
util.inherits(PlayerManager, Base);
module.exports = PlayerManager;

let pro = PlayerManager.prototype;

pro.reload = function (fileName, filePath, type) {
    let x;
    switch (type) {
        case "js" :
            x = requireFiles[fileName].file = require(filePath).create();
            break;
        case "json":
            x = requireFiles[fileName].file = require(filePath);
            console.log("x:[%j]", x);
            this.load();
            break;
    }
}

pro.createPlayer = function (id) {
    let self = this;
    let Player = requireFiles.player.file;
    let player = new Player(id);
    self.playerMap[id] = player;
    console.log("create new player[%s]", player.getID());
    return player.getID();
}