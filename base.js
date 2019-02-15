/**
 *  Created by lcy on 2019/2/14.
 */
'use strict';
let fs = require('fs');
let Base = function (files) {
    var self = this;
    if (!!files) {
        self.watchFile(files);
    }
}

module.exports = Base;

let pro = Base.prototype;

pro.watchFile = function (Files) {
    var self = this;
    for (let fileName in Files) {
        let file = Files[fileName];
        fs.watchFile(file.path, function () {
            console.log("reload file[%s] start", file.name);
            // delete require.cache[require.resolve(file.path)];
            self.cleanCache(require.resolve(file.path));
            Files[fileName].file = require[file.path];
            console.log("reload file[%s] end", file.name);
            let type = file.name.split('.')[1];
            self.reload(fileName, file.path, type);
        });
    }
}

pro.cleanCache = function (modulePath) {
    console.log("cleanCache");
    var module = require.cache[modulePath];
    // remove reference in module.parent
    if (module.parent) {
        module.parent.children.splice(module.parent.children.indexOf(module), 1);
    }
    require.cache[modulePath] = null;
}

pro.reload = function (fileName, filePath) {

}