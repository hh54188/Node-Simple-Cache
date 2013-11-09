var Run = function (task, time) {
    for (var i = 0; i < time; i++) {
        task();
    }
}

var maxRound = 100 * 100 * 20;

var Del = function () {
    var obj = {};

    for (var i = 0; i < maxRound; i++) {
        obj["key_" + i] = "value_"+ i;
    }
        
    var start = +new Date();
                          
    var count = 0;

    for (var key in obj) {
        delete obj[key];
    }

    var end = +new Date();

    console.log("Delete | Total cost:", end - start, "ms");
}

var Nul = function () {
    var obj = {};

    for (var i = 0; i < maxRound; i++) {
        obj["key_" + i] = "value_"+ i;
    }
        
    var start = +new Date();
                          
    var count = 0;

    for (var key in obj) {
        obj[key] = null;
    }

    var end = +new Date();

    console.log("Null | Total cost:", end - start, "ms");
}

Run(Del, 10);
Run(Nul, 10);