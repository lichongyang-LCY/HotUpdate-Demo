'use strict';
let Base = require('./base');
/**
 * @brief:
 *
 * @author:   lcy
 * @date:     2019/9/18 16:40
 */

/** 转接继承*/
global.Public = function (file, filePath, opts) {
    console.log("Public");
    Base.call(file, filePath, opts);
}