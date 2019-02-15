/**
 *  Created by lcy on 2019/2/13.
 */
'use strict';

var B = function () {
    this.bb = 89;
}
var pro = B.prototype;

pro.logger = function () {
    var self = this;
    console.log("B - log :",self.bb);
}

exports.create = function () {
    return new B();
}

// module.exports = function () {
//     return new B();
// };
