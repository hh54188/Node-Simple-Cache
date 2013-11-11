var LRU = require("./algorithm/LRU");
var LFU = require("./algorithm/LFU");

var lastAlgo = null, lastMaxsize = null;

var generateQueue = function (name, maxsize) {
    var algorithm = {
        "LRU": LRU,
        "LFU": LFU
    }

    lastAlgo = name || "LRU";
    lastMaxsize = maxsize;

    var Queue = algorithm[name];

    return Queue.createQueue(maxsize);
}


var set = function (key, value, expire) {
    var _cache = this.cache;
    var _queue = this.queue;

    // 如果已经存在该值，则重新赋值
    if (_cache[key]) {

        // 重新赋值
        _cache[key].value = value;
        _cache[key].expire = expire;

        _queue.update(_cache[key].node);

    // 如果为新插入
    } else {

        // 更新索引
        var returnNode = _queue.insert(key);

        _cache[key] = {
            value: value,
            expire: expire,
            insertTime: +new Date(),
            node: returnNode.node
        }        


        returnNode.delArr.forEach(function (key) {
            _cache[key] = null;
        });
    }
}

var get = function (key) {
    var _cache = this.cache;
    var _queue = this.queue;

    // 如果存在该值
    if (_cache[key]) {
        var insertTime = _cache[key].insertTime;
        var expire = _cache[key].expire;
        var node = _cache[key].node;
        var curTime = +new Date();

        // 如果不存在过期时间 或者 存在过期时间但尚未过期
        if (!expire || (expire && curTime - insertTime < expire)) {

            // 已经使用过，更新队列
            _queue.update(node);

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
    this.queue = generateQueue(lastMaxsize, lastAlgo);
}

var print = function () {
    var queue = this.queue;
    return queue.print();
}

var createCache = function (alg_name, maxsize) {

    if (!alg_name) alg_name = "LRU";
    if (!maxsize) maxsize = 100 * 100 * 10;

    var obj =  {
        cache: {},
        queue: generateQueue(alg_name, maxsize),

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
                cache[key] = null;
            }            
        }
    }, 1000);

    return obj;
}

exports.createCache = createCache;

// var cache = createCache("LRU", 100 * 100 * 10);