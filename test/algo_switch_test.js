var Cache = require("../Cache");

var cache = Cache.createCache("LRU");

for (var i = 0; i < 100 * 100 * 10; i++)  {
    cache.set("key_" + i, "value_" + i);
}

for (var i = 0; i < 100 * 100 * 5; i++) {
    var key = parseInt(Math.random() * 100 * 100 * 10);
    cache.get("key_" + key);
    // console.log(i);
}