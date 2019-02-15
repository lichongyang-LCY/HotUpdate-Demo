/**
 *  Created by lcy on 2019/2/13.
 */
'use strict';
let http = require('http');
let util = require('util');
let path = process.cwd();
let fs = require('fs');
let Base = require('./base');
let port = 50111;
global.Path = path;
let requireFiles = {
    a: {path: path + "/testFiles/a.js", file: require(path + '/testFiles/a.js').create(), name: "a.js"},
    b: {path: path + "/testFiles/b.js", file: require(path + '/testFiles/b.js').create(), name: "b.js"},
    aa: {path: path + "/testFiles/aa.json", file: require(path + '/testFiles/aa.json'), name: "aa.json"},
    playerManager: {path: path + "/manager/playerManager.js", file: require(path + '/manager/playerManager.js'), name: "playerManager.js"}
};

let Main = function () {
    this.map = {};
    Base.call(this, requireFiles);
}
util.inherits(Main, Base);
module.exports = Main;

let pro = Main.prototype;

pro.start = function () {
    let self = this;
    let a = requireFiles.a.file;
    let b = requireFiles.b.file;
    let aa = requireFiles.aa.file;
    // console.log("aa: ", aa);
    // a.logger();
    // b.logger();
    this.load();
    http.createServer(function (request, response) {
        if ("/" == request.url) {
            fs.readFile(path + '/view/index.html', "utf8", function (err, data) {
                // 对文件操作的回调函数中,首先需要处理可能发生的异常,才能进行后续的操作
                if (err) {
                    console.log("read error");
                    response.end();
                    return;
                }

                let id = Date.now();
                let playerID = self.createOne(id);
                let body1 = data.split("<body>")[0];
                let body2 = data.split("<body>")[1];
                let html = body1 + "<body><span>" + JSON.stringify(self.map) + " playerID =" + playerID + "</span>" + body2;

                response.end(html);
            });
        }
    }).listen(port);

    console.log("http Server 启动完成 visit http://127.0.0.1:%s  ... ...", port);
}

pro.reload = function (fileName, filePath, type) {
    let x;
    switch (type) {
        case "js" :
            x = requireFiles[fileName].file = require(filePath).create();
            x.logger();
            break;
        case "json":
            x = requireFiles[fileName].file = require(filePath)
            console.log("x:[%j]", x);
            this.load();
            break;
    }
}

pro.load = function () {
    console.log("load");
    var self = this;
    let aa = requireFiles.aa.file;
    for (var i in aa) {
        self.map[i] = aa[i];
    }
    console.log("self.map[%j]", self.map);
}

pro.createOne = function (id) {
    let PlayerManager = requireFiles.playerManager.file;
    let playerManager = new PlayerManager();
    return playerManager.createPlayer(id);
}
