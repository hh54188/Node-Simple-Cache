var Cache = require("../../Cache");

var should = require('should');

// 应该拥有构造函数
describe('Cache ', function() {
    var cache = null;

    it (' should have constructor method', function(){
        var methods = ["createCache"];
        Cache.should.have.properties(methods);
    });
})

// 1. get 与 set方法存在
// 2. 可以取得值
// 3. 过期之后无法取得值
// 4. 超出队列长度会被抛弃
describe('Single cache', function() {

    it (' should have set and get method', function(){
        var cache = Cache.createCache("LRU", 100 * 100 * 10);
        
        var methods = ["set", "get"];

        cache.should.have.properties(methods);
    });

    it (' can get value after set without expire time', function () {
        var testcases = [
            {
                key: "key1",
                value: "value1"
            },
            {
                key: "key2",
                value: "value2"
            },
            {
                key: "key3",
                value: "value3"
            }         
        ]

        var cache = Cache.createCache("LRU", 100 * 100 * 10);

        testcases.forEach(function (ca) {
            cache.set(ca.key, ca.value);
        });

        testcases.forEach(function (ca) {
            cache.get(ca.key).should.equal(ca.value);
        });
    });

    it (" can't get value after expire", function (done) {

        var cache = Cache.createCache("LRU", 100 * 100 * 10);
        var testcases = [
            {
                key: "key1",
                value: "value1",
                expire: 1000
            }
        ];

        testcases.forEach(function (ca) {
            cache.set(ca.key, ca.value, ca.expire);
        });

        testcases.forEach(function (ca) {
            setTimeout(function () {
                done();
                (cache.get(ca.key) === null).should.be.true;
            }, 1800);
        });
    })

    it (" would be abandon after overflow", function () {
        var cache = Cache.createCache("LRU", 5);
        for (var i = 0; i < 10; i++) {
            cache.set("key_" + i, "value_" + i);
        }

        for (var i = 0; i < 5; i++) {
            (cache.get("key_" + i, "value_" + i) === null).should.be.true;   
        }
    });

})


