var Link = require("../Link");


function Queue(maxsize) {
    this.maxsize = maxsize || 100 * 100 *10;
    this.length = 0;
    this.queue = Link.createLink();
}

Queue.prototype.insert = function (key) {
    var node = Link.createNode(key);

    var delArr = [];
    while (this.queue.length >= this.maxsize) {
        delArr.push(this.queue.pop().key);
    }

    this.queue.push(node);

    return {
        node: node,
        delArr: delArr
    }
}

Queue.prototype.update = function (node) {
    node.count++;

    var prevNode = node.prev;
    var nextNode = node.next;
    var queue = this.queue;

    if (prevNode && prevNode.count < node.count) {

        while (prevNode && prevNode.count < node.count) {
            queue.forward(node);
            prevNode = node.prev;
        }
    } else if (nextNode && nextNode > node.count) {

        while (nextNode && nextNode > node.count) {
            queue.backward(node);
            nextNode = node.next;
        }
    }
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
