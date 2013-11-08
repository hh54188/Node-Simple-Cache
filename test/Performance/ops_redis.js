var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

var testcases = [];
var maxOp = 100 * 100 * 10;


for (var i = 0; i < maxOp; i++) {
    testcases.push({
        key: "key_" + i,
        value: "value_" + i
    })
}

var completeFlag = maxOp;
var startTime = +new Date(), total, endTime;

testcases.forEach(function (ca) {
    client.set(ca.key, ca.value, function (err, replay) {
        completeFlag--;
        if (!completeFlag) {
            endTime = +new Date();
            total = (endTime - startTime) / 1000;

            console.log("Redis total cost: " + total + "s", maxOp / total + " o/s");
            process.exit(code = 0);
        }

    });
});