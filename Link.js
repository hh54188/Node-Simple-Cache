function Node (key) {
    this.key = key;
    this.count = 1; // LFU
    this.next = null;
    this.prev = null;   
}


function Link() {
    this.length = 0;
    this.head = this.tail = null;

    this.unshift = function (node) {

        if (!this.length) {
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }

        this.length++;

        return node;
    }

    this.push = function (node) {
        this.length++;

        // 链表为空
        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;

            node.prev = this.tail;

            this.tail = node;
        }
    }

    this.pop = function () {

        this.length--;
        var curNote = this.tail;

        if (curNote.prev) {
            curNote.prev.next = null;    
            this.tail = curNote.prev;
        } else {
            this.head = this.tail;
        }
        
        return curNote;
    }

    this.del = function (node) {
        var prevNode = node.prev;
        var nextNode = node.next;
        this.length--;

        // 节点在最末端
        if (prevNode && !nextNode) {

            this.tail = prevNode;
            prevNode = node.next;

        // 节点在当中
        } else if (prevNode && nextNode) {

            prevNode.next = nextNode;
            nextNode.prev = prevNode;

        // 节点在对首 
        } else if (!prevNode && nextNode ) {

            this.head = nextNode;
            nextNode.prev = null;

        // 只有一个节点
        } else if (!prevNode && !nextNode) {
            this.head = this.tail = null;
        }
    }

    this.forward = function (node) {

        var prevNode = node.prev;
        var nextNode = node.next;

        if (!prevNode)  return;

        // prevNode是头节点
        if (!prevNode.prev) {

            // 只有两个节点
            if (!nextNode) {

                node.prev = null;
                node.next = prevNode;

                prevNode.prev = node;
                prevNode.next = null;

                this.tail = prevNode;
                this.head = node;

            } else {

                nextNode.prev = prevNode;

                prevNode.next = nextNode;               
                prevNode.prev = node;

                node.next = prevNode;
                node.prev = null;

                this.head = node;
            }
        } else {
            var prepreNode = prevNode.prev;

            if (!nextNode) {
                prepreNode.next = node;

                node.next = prevNode;
                node.prev = prepreNode;

                prevNode.prev = node;
                prevNode.next = null;

                this.tail = prevNode;
            } else {
                prepreNode.next = node;

                node.next = prevNode;
                node.prev = prepreNode;                

                prevNode.prev = node;
                prevNode.next = nextNode;

                nextNode.prev = prevNode;                
            }
        }
    }

    this.backward = function (node) {
        var prevNode = node.prev;
        var nextNode = node.next;

        if (!nextNode) return;

        if (!nextNode.next) {

            // 只有两个节点
            if (!prevNode) {
                nextNode.next = node;
                nextNode.prev = null;

                node.prev = nextNode;
                node.next = null;

                this.head = nextNode;
                this.tail = node;
            } else {
                prevNode.next = nextNode;

                nextNode.next = node;
                nextNode.prev = prevNode;

                node.next = null;
                node.prev = nextNode;

                this.tail = node;
            }
        } else {
            var nexnexNode = nextNode.next;

            if (!prevNode) {
                nextNode.next = node;
                nextNode.prev = null;

                node.next = nexnexNode;
                node.prev = nextNode;

                nexnexNode.prev = node;

                this.head = nextNode;
            } else {
                prevNode.next = nextNode;

                nextNode.next = node;
                nextNode.prev = prevNode;

                node.next = nexnexNode;
                node.prev = nextNode;

                nexnexNode.prev = node;                
            }

        }


    }

    this.clear = function () {
        this.length = 0;
        this.head = this.tail = null;
    }

    this.moveHead = function (node) {

        var prevNode = node.prev;
        var nextNode = node.next;

        // 节点在最末端
        if (prevNode && !nextNode) {

            this.tail = prevNode;
            prevNode.next = node.next;

            node.next = this.head;
            this.head.prev = node;

            this.head= node;
            node.prev = null;

            // console.log(prevNode);

        // 节点在当中
        } else if (prevNode && nextNode) {

            prevNode.next = nextNode;
            nextNode.prev = prevNode;

            node.next = this.head;
            node.prev = null;
            this.head.prev = node;

            this.head= node;

        // 节点在对首 或者 只有一个节点
        } else if (!prevNode && nextNode || !prevNode && !nextNode) {} 
    }

    this.print = function () {
        var pointer = this.head;
        var arr = [];
        while (pointer) {
            // console.log(pointer.key);
            arr.push(pointer.key);
            pointer = pointer.next;
        }
        console.log(arr.join(", "));
        return arr;
    }
}

exports.createLink = function () {
    return new Link();  
}

exports.createNode = function (key) {
    return new Node(key);
} 


// var link = new Link();
// var node = new Node("key");

// var returnNode = link.unshift(node);