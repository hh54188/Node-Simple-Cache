var Link = require("../../Link");

var max = 100 * 100 * 100;

var obj = {};
var link = Link.createLink();
var arr = [];
for (var i = 0;i < max; i++) {
    // Array
    arr[i] = i;
    // Link
    var node = Link.createNode(i);
    link.unshift(node);
    // Object
    obj["key_" + i] = "value_" + i;
}

var Run = function (task) {
    for (var i = 0; i < 20; i++) {
        task();
    }
}

var batchSet_Link = function () {
    var link = Link.createLink();
    var start = +new Date();
    for (var i = 0;i < max; i++) {
        var node = Link.createNode(i);
        link.unshift(node);
    }    
    total = +new Date() - start;
    console.log("Link | Set |Total cost------>", total + "ms");        
}

var batchSet_Arr = function () {
    var arr = [];
    var start = +new Date();
    for (var i = 0;i < max; i++) {
        arr[i] = i;
    }    
    total = +new Date() - start;
    console.log("Array | Set |Total cost------>", total + "ms");        
}


var batchGet_Link = function () {
    var value;
    var start = +new Date();
    var pointer = link.head;
    while (pointer) {
        value = pointer;
        pointer = pointer.next;
    }
    total = +new Date() - start;
    console.log("Link | Total cost------>", total + "ms");    
}

var batchGet_Arr = function () {
    var value;
    var start = +new Date();
    for (var i = 0, len = arr.length; i < len; i++) {
        value = arr[i];
    }
    total = +new Date() - start;
    console.log("Array | Total cost------>", total + "ms");
}

var batchGet_Obj = function () {
    var value;
    var start = +new Date();
    for (var key in obj) {
        value = obj[key];
    }
    total = +new Date() - start;
    console.log("Object | Total cost------>", total + "ms");
}

// Run(batchSet_Link);
// Run(batchSet_Arr);
Run(batchGet_Link);
Run(batchGet_Arr);
Run(batchGet_Obj);
