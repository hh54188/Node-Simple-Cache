var Link = require("../Link");


function Queue(maxsize) {
    this.maxsize = maxsize || 100 * 100 *10;
    this.length = 0;
    this.queue = Link.createLink();
}

Queue.prototype.insert = function (key) {
    var node = Link.createNode(key);
    this.queue.unshift(node);

    var delArr = [];
    while (this.queue.length > this.maxsize) {
        delArr.push(this.queue.pop().key);
    }

    return {
        node: node,
        delArr: delArr
    }
}

Queue.prototype.update = function (node) {
    this.queue.moveHead(node);
}

Queue.prototype.del = function (node) {
    this.queue.del(node);
}

Queue.prototype.print = function (node) {
    return this.queue.print();
}

exports.createQueue = function (maxsize) {
    return new Queue(maxsize);
}