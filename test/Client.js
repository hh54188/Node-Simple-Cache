var CacheManage = require("../Manage");

for (var i = 0; i < 100 * 100 * 10; i++) {
    CacheManage.set("key_" + i, "value_" + i);
}

for (var i = 0; i < 100 * 100 * 100; i++) {
    var val = CacheManage.get("key_" + parseInt(Math.random() * 100 * 100 * 10));
    // console.log("GET------>", i, val);
}