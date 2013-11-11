var Cache_LRU = require("../../Cache");
var Cache_LRU_ARR = require("../../algorithm/LRU_array");


var testcases = [];
var maxOp = 100 * 100 * 10;

for (var i = 0; i < maxOp; i++) {
    testcases.push({
        key: "key_" + i,
        value: "value_" + i
    })
}

var Run = function (cache, algo, task, num) {

    for (var i = 0; i < num; i++) {
        task(cache, algo);
    }

    console.log("------------------");
}

var batchSet = function (Cache, algo) {
    var cache = Cache.createCache();

    var startTime = +new Date(), total, endTime;

    testcases.forEach(function (ca) {
        cache.set(ca.key, ca.value);
    });

    endTime = +new Date();
    total = (endTime - startTime) / 1000;

    console.log(algo, "| *set* | total cost: " + total + "s", (maxOp / total).toFixed(0) + " o/s");
}

var batchGet = function (Cache, algo) {
    var cache = Cache.createCache();

    testcases.forEach(function (ca) {
        cache.set(ca.key, ca.value);
    });

    var startTime = +new Date(), total, endTime;

    testcases.forEach(function (ca) {
        cache.get(ca.key);
    });

    endTime = +new Date();
    total = (endTime - startTime) / 1000;

    console.log(algo, "| *get* | total cost: " + total + "s", (maxOp / total).toFixed(0) + " o/s");   
}

Run(Cache_LRU, "LRU", batchSet, 10);
Run(Cache_LRU, "LRU", batchGet, 10);

// Loser:
Run(Cache_LRU_ARR, "LRU_ARR", batchSet, 10);
Run(Cache_LRU_ARR, "LRU_ARR", batchGet, 10);

process.exit();

