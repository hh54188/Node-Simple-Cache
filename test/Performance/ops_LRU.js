var Cache = require("../../algorithm/LRU");


var testcases = [];
var maxOp = 100 * 100 * 10;

for (var i = 0; i < maxOp; i++) {
    testcases.push({
        key: "key_" + i,
        value: "value_" + i
    })
}


var batchSet = function () {
    var completeFlag = maxOp;
    var startTime = +new Date(), total, endTime;
    var cache = Cache.createCache();

    testcases.forEach(function (ca) {
        cache.set(ca.key, ca.value);
    });

    endTime = +new Date();
    total = (endTime - startTime) / 1000;

    console.log("LRU total cost: " + total + "s", maxOp / total + " o/s");
}

batchSet();

