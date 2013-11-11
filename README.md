#How to use

##Init

**Cache.createCache([cache algorithm], [cache size])**

- About cache algorithm: you have two choice "LRU" or "LFU", of course you can add your own algorithm. If you not sure which algorithm, you can choose the following manage mode.

```
var cache = require("Cache");
Cache.createCache("LRU", 100 * 100 * 10);
```

##Set

**cache.set(key, value[, expire(millisecond)])**

```
cache.set("key", "value", 1000 * 60);
```

##Get

**cache.get(key)**

```
cache.get("key") // value or null
```

##Clear

**cache.clear()**

------




前提有两个，首先你的缓存管理程序是用javascript书写的node.js程序

为什么需要自己写缓存管理，

自己写缓存管理的优势在于更快[测试]，

但劣势也很明显，就是无法做到多进程之间的通信

你可能说可以使用socket，不错，因为Redis走的就是socket通信

但这样的代价是会使效率变低

所以说如果你的缓存管理是独享，只存在于一个node.js进程中，那么可以考虑自己构造一个

自己写一个缓存管理工具，有一个问题是 如何控制 缓存使用内存空间的大小

如果在Redis中，你只要进行Config中的maxmemory即可，但是在node.js中，我们没法设定它的运行使用内存大小

我们可以转向另一个东西，数据条数，通过控制数据条数，来间接控制数据大小，虽然不够准确

##大纲


1. Redis与我写的缓存管理 set操作效率，比较，比较平均每条操作要多少时间/每秒能进行多少操作 （即使是在使用pipline的情况下）

2. 我自己的缓存算法需要注意的地方

   - 摒弃数组，使用链表
   - 分离出缓存的索引
   - n与logn 与 delete 操作
   - 
3. 实现最基本的LRU算法

4. LRU算法的局限性(LFU算法的优势)

5. 机器学习算法