var Cache = require("../../algorithm/LRU");

var should = require('should');

describe('Cache ', function() {

    var cache = null;

     it(' should have constructor method', function(){

        var methods = ["createCache"];
        Cache.should.have.properties(methods);
    });
})

describe('Single cache', function() {

    it(' should have set and get method', function(){

        var cache = Cache.createCache();
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

        var cache = Cache.createCache();

        testcases.forEach(function (ca) {
            cache.set(ca.key, ca.value);
        });

        testcases.forEach(function (ca) {
            cache.get(ca.key).should.equal(ca.value);
        });

    });

    it (" can't get value after expire", function () {

        var cache = Cache.createCache();

        var testcases = [
            {
                key: "key1",
                value: "value1",
                expire: 3000
            }
        ];

        testcases.forEach(function (ca) {
            cache.set(ca.key, ca.value, ca.expire);
        });

        testcases.forEach(function (ca) {

            setTimeout(function () {
                cache.get(ca.key).should.not.equal(ca.value);
            }, 3000);
            
        });
    })



})