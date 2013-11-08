


var set = function (key, value, expire) {
    var _cache = this.cache;
    var _queue = this.queue;
    var maxsize = this.maxsize;

    // 如果已经存在该值，则重新赋值
    if (_cache[key]) {
        _cache[key] = {
            value: value,
            expire: expire
        }

        _queue = update(_queue, key);

    // 如果为新插入
    } else {
        _cache[key] = {
            value: value,
            expire: expire,
            insertTime: +new Date()
        }

        // 更新索引
        _queue.unshift(key);

        // 如果超出最大值，截断
        while (_queue.length > maxsize) {
            var item = _queue.pop();   
            // delete _cache[item];
            _cache[item] = null;
        }
    }
}

var update = function (queue, key) {
    for (var i = 0; i < queue.length; i++) {
        if (queue[i] == key) {
            queue.splice(i, 1);
            break;
        }
    }

    queue.unshift(key);
    return queue;
}

var get = function (key) {
    var _cache = this.cache;
    var _queue = this.queue;
    var maxsize = this.maxsize;

    // 如果存在该值
    if (_cache[key]) {
        var insertTime = _cache[key].insertTime;
        var expire = _cache[key].expire;
        var curTime = +new Date();

        // 如果不存在过期时间 或者 存在过期时间但尚未过期
        if (!expire || (expire && curTime - insertTime < expire)) {
            // 已经使用过，更新队列
            _queue = update(_queue, key);

            return _cache[key].value

        // 如果已经过期
        } else if (expire && curTime - insertTime > expire) {
            // 从队列中删除
            for (var i = 0; i < _queue.length; i++) {
                if (_queue[i] == key) {
                    _queue.slice(i, 1);
                    _cache[key] = null;
                    break;
                }
            }

            return null
        }

    } else {
        return null;
    }

}

var clear = function () {
    this.cache = {};
    this.queue = [];
}

var print = function () {
    console.log(this.queue.join(", "));
}


var createCache = function (maxsize) {
    var obj =  {
        cache: {},
        queue: [],
        maxsize: maxsize || 100 * 100 * 10,

        set: set,
        get: get,
        clear: clear,
        print: print
    }

    setInterval(function () {

        for (var i = 0; i < obj.queue.length; i++) {
            var key = obj.queue[i];

            var insertTime = obj.cache[key].insertTime;
            var expire = obj.cache[key].expire;
            var curTime = +new Date();

            // 如果过期时间存在并且已经过期
            if (expire && curTime - insertTime > expire) {
                obj.queue.splice(i--, 1);
                delete obj.cache[key];
            }
        }
    }, 1000);

    return obj;
}

exports.createCache = createCache;
