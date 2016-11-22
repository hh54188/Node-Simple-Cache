# Why I wrote this cache module and its advantages

http://qingbob.com/built-cache-management-module-in-nodejs/ (In Simplified Chinese) 

# How to use

## Init

**Cache.createCache([cache algorithm], [cache size])**

- About cache algorithm: you have two choice "LRU" or "LFU", of course you can add your own algorithm. If you not sure which algorithm, you can choose the following manage mode.

```
var cache = require("node-smple-cache").Cache;
Cache.createCache("LRU", 100 * 100 * 10);
```

## Set

**cache.set(key, value[, expire(millisecond)])**

```
cache.set("key", "value", 1000 * 60);
```

## Get

**cache.get(key)**

```
cache.get("key") // value or null
```

## Clear

**cache.clear()**

## Manage Mode

If you are not sure which cache replacement algorithm is you need, you can try this model, it will caculate the recently 100 * 100 * 3 `get` hit rate in different algorithm.And according the hit rate choose the higher algorithm one:

```
var CacheManage = require("node-smple-cache").Manage;
CacheManage.set("key", "value", 1000 * 60);
```
