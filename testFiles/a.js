/**
 *  Created by lcy on 2019/2/13.
 */
'use strict';
let A = function () {
    this.aa = 99999;
}

// module.exports = A;
let pro = A.prototype;
pro.logger = function () {
    let self = this;
    console.log("A - log :", self.aa);
}

exports.create = function () {
    return new A();
}

