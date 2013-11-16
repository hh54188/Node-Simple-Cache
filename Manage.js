var Cache = require("./Cache");

var Cache_LRU = null, Cache_LFU = null, Cache_FIN;

var round = 100 * 100 * 3;

var Manage = {
    "lru": {
        cache: Cache.createCache("LRU", 100 * 100 * 5),
        suc: 0,
        total: 0
    },
    "lfu": {
        cache: Cache.createCache("LFU", 100 * 100 * 5),
        suc: 0,
        total: 0
    }
}

exports.get = function (key) {
    if (!round) {
        return Cache_FIN.get(key);
    }

    var value = null;

    for (var name in Manage) {
        Manage[name].total++;
        value = Manage[name].cache.get(key);
        if (value) {
            Manage[name].suc++;
        }
    }

    // 如果测试完毕，算出命中率
    round--;
    console.log("Round------>", round);
    if (!round) {
        var hitRate = {};
        var max = {
            key: "",
            rate: 0
        };

        for (var key in Manage) {
            hitRate[key] = Manage[key].suc / parseFloat(Manage[key].total);

            // 找到最高命中率
            if (hitRate[key] > max["rate"]) {
                max.key = key;
                max.rate = hitRate[key];
            }

            console.log("HIT RATE------>", key, hitRate[key]);
        }

        console.log("Final Cache------>", max.key);
        Cache_FIN = Manage[max.key].cache;
    }

    return value;
}

exports.set = function (key, value, expire) {
    if (!round) {
        return Cache_FIN.set(key, value, expire);
    }

    for (var name in Manage) {
        Manage[name].cache.set(key, value, expire);
    }
}

exports.create = function () {

}

