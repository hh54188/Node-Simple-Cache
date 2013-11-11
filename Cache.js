var LRU = require("./algorithm/LRU");
var LFU = require("./algorithm/LFU");

var lastAlgo = null, lastMaxsize = null, globalCache = null;;

var usedAlgo = [];
var usedRate = {};
var stopSwitch = false;

var algorithm = {
    "LRU": LRU,
    "LFU": LFU
}

var hitRate = {
    total: 0,
    suc: 0
}

var algoSwitchTo = function (name) {
    console.log("Final algorithm------>", name);
    globalCache.queue = generateQueue(name, lastMaxsize);

    for (var key in globalCache.cache) {
        if (globalCache.cache[key]) {
            var returnNode = globalCache.queue.insert(key);
            globalCache.cache[key].node = returnNode.node;
        }
    }
}

var algoSwitch = function () {
    if (stopSwitch) return;

    if (hitRate.total > 100 * 100 ) {
        console.log("------>algoSwitch<------");
        console.log("Last algorithm:", lastAlgo);
        console.log("Hit Rate:", hitRate.suc / parseFloat(hitRate.total));

        usedRate[lastAlgo] = hitRate.suc / parseFloat(hitRate.total);

        for (var name in algorithm) {
            if (!usedRate[name]) {
                console.log("switch to------->", name);

                lastAlgo = name;
                globalCache.queue = generateQueue(name, lastMaxsize);

                for (var key in globalCache.cache) {
                    if (globalCache.cache[key]) {
                        var returnNode = globalCache.queue.insert(key);
                        globalCache.cache[key].node = returnNode.node;
                    }
                }

                hitRate = {
                    total: 0,
                    suc: 0
                }
                console.log("hitRate reset------>");
                console.log("Give value complete");

                return;
            }
        }

        stopSwitch = true;

        // 如果算法都用过了，找出命中率最高的算法

        var maxRate = 0;
        var maxName = null
        for (var key in usedRate) {
            if (usedRate[key] > maxRate) {
                maxRate = usedRate[key];
                maxName = key;
            }
                
        }

        
        console.log("The highest algorithm:", maxName, maxRate);
        algoSwitchTo(maxName);
    }
}

var generateQueue = function (name, maxsize) {

    lastAlgo = name || "LRU";
    usedAlgo.push(lastAlgo);
    lastMaxsize = maxsize;

    var Queue = (name && algorithm[name])? algorithm[name]: LRU;

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
    hitRate.total++;
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

            hitRate.suc++;
            algoSwitch();

            return _cache[key].value;

        // 如果已经过期
        } else if (expire && curTime - insertTime > expire) {

            // 从队列中删除
            _queue.del(node);
            algoSwitch();
            return null
        }

    } else {
        algoSwitch();
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
    if (alg_name) stopSwitch = true;

    var obj =  {
        cache: {},
        queue: generateQueue(alg_name, maxsize),

        set: set,
        get: get,
        clear: clear,
        print: print
    }

    globalCache = obj;

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