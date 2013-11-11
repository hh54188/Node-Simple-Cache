var Link = require("../../Link");
var should = require('should');

var link = null;
var index = [];

var reset = function (link) {
    var arr = [];
    for (var i = 0; i < 5; i++) {
        var node = Link.createNode("key_" + i);
        arr.push(node);
        link.unshift(node);            
    }  

    return arr;
}

describe('Node', function() {
    it ("init success", function () {
        var node = Link.createNode("key");

        node.key.should.equal("key");
        (node.next === null).should.be.true;
        (node.prev === null).should.be.true;

    });
});

describe('Link', function() {
    it ("init success", function () {
        var link = Link.createLink();

        link.length.should.equal(0);
        (link.head === null).should.be.true;
        (link.tail === null).should.be.true;
    });

    it ("unshift method should return which insert", function () {
        var link = Link.createLink();
        var node = Link.createNode("key");

        var returnNode = link.unshift(node);

        returnNode.key.should.equal("key");
        (returnNode.next === null).should.be.true;
        (returnNode.prev === null).should.be.true;
    });

    it ("pop method should return the last one", function () {
        var link = Link.createLink();

        for (var i = 0; i < 10; i++) {
            var node = Link.createNode("key_" + i);
            link.unshift(node);            
        }

        link.pop().key.should.equal("key_0");
    });

    it ("print method should return the key order array", function () {
        var link = Link.createLink();

        reset(link);

        link.print().join(", ").should.equal("key_4, key_3, key_2, key_1, key_0");
    });

    it ("forward", function () {
        var link = Link.createLink();
        var arr = [];

        link.clear();
        arr = reset(link);
        link.forward(arr[0]);
        link.print().join(", ").should.equal("key_4, key_3, key_2, key_0, key_1");


        link.clear();
        arr = reset(link);
        link.forward(arr[1]);
        link.print().join(", ").should.equal("key_4, key_3, key_1, key_2, key_0");

        link.clear();
        arr = reset(link);
        link.forward(arr[2]);
        link.print().join(", ").should.equal("key_4, key_2, key_3, key_1, key_0");
    });

    it ("backward", function () {
        var link = Link.createLink();
        var arr = [];

        link.clear();
        arr = reset(link);
        link.backward(arr[4]);
        link.print().join(", ").should.equal("key_3, key_4, key_2, key_1, key_0");


        link.clear();
        arr = reset(link);
        link.backward(arr[3]);
        link.print().join(", ").should.equal("key_4, key_2, key_3, key_1, key_0");        

        link.clear();
        arr = reset(link);
        link.backward(arr[1]);
        link.print().join(", ").should.equal("key_4, key_3, key_2, key_0, key_1");                
    });    
});