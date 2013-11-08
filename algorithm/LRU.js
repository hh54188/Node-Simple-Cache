var Link = require("../Link");


var set = function (key, value, expire) {
    var _cache = this.cache;
    var _queue = this.queue;
    var maxsize = this.maxsize;

    // 如果已经存在该值，则重新赋值
    if (_cache[key]) {

        // 重新赋值
        _cache[key].value = value;
        _cache[key].expire = expire;

        // 移至头
        _queue.moveHead(_cache[key].node);

    // 如果为新插入
    } else {

        // 更新索引
        var node = _queue.unshift(Link.createNode(key));

        _cache[key] = {
            value: value,
            expire: expire,
            insertTime: +new Date(),
            node: node
        }        


        while (_queue.length > maxsize) {
            var delNode = _queue.pop();
            // delete _cache[delNode.key];
            _cache[delNode.key] = null;

        }

    }
}

var get = function (key) {
    var _cache = this.cache;
    var _queue = this.queue;
    var maxsize = this.maxsize;

    // 如果存在该值
    if (_cache[key]) {
        var insertTime = _cache[key].insertTime;
        var expire = _cache[key].expire;
        var node = _cache[key].node;
        var curTime = +new Date();

        // 如果不存在过期时间 或者 存在过期时间但尚未过期
        if (!expire || (expire && curTime - insertTime < expire)) {

            // 已经使用过，更新队列
            _queue.moveHead(node);
            return _cache[key].value;

        // 如果已经过期
        } else if (expire && curTime - insertTime > expire) {

            // 从队列中删除
            _queue.del(node);
            return null
        }

    } else {
        return null;
    }

}

var clear = function () {
    this.cache = {};
    this.queue = Link.createLink();
}

var print = function () {
    var cache = this.cache;
    var queue = this.queue;
    var arr = [];
    // for (var key in cache) {
    //     if (!cache[key]) continue;
    //     arr.push(cache[key].value);
    // }

    queue.print();
}

var createCache = function (maxsize) {
    var obj =  {
        cache: {},
        queue: Link.createLink(),
        maxsize: maxsize || 100 * 100 * 10,

        set: set,
        get: get,
        clear: clear,
        print: print
    }

    setInterval(function () {
        var cache = obj.cache;
        var queue = obj.queue;

        for (var key in cache) {
            if (!cache[key]) continue;
            var insertTime = cache[key].insertTime;
            var expire = cache[key].expire;
            var curTime = +new Date();
            var node = cache[key]["node"];

            // 如果过期时间存在并且已经过期
            if (expire && curTime - insertTime > expire) {
                queue.del(node);
                // delete cache[key];
                cache[key] = null;
            }            
        }
    }, 1000);

    return obj;
}

exports.createCache = createCache;