var Link = require("../../Link");
var should = require('should');

var link = null;
var index = [];

var reset = function () {
    link = Link.createLink();
    index = [];
    for (var i = 0; i < 10; i++) {
        var node = Link.createNode(i);
        index.push(node);
        link.unshift(node);
    }
    console.log("------------");
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

        for (var i = 0; i < 10; i++) {
            var node = Link.createNode("key_" + i);
            link.unshift(node);            
        }        

        link.print().join(", ").should.equal("key_9, key_8, key_7, key_6, key_5, key_4, key_3, key_2, key_1, key_0");
    });

    it ("movehead method should work fine", function () {
        var link = null;

        var reset = function () {
            link = Link.createLink();
            for (var i = 0; i < 4; i++) {
                var node = Link.createNode("key_" + i);
                link.unshift(node);
            }               
        }

        reset();
        // TODO
    })
});