function Node (key) {
    this.key = key;
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

    this.moveHead = function (node) {
        var prevNode = node.prev;
        var nextNode = node.next;

        // 节点在最末端
        if (prevNode && !nextNode) {

            this.tail = prevNode;
            prevNode = node.next;

            node.next = this.head;
            this.head.prev = node;

            this.head= node;

        // 节点在当中
        } else if (prevNode && nextNode) {

            prevNode.next = nextNode;
            nextNode.prev = prevNode;

            node.next = this.head;
            this.head.prev = node;

            this.head= node;

        // 节点在对首 或者 只有一个节点
        } else if (!prevNode && nextNode || !prevNode && !nextNode) {} 
    }

    this.print = function () {
        var pointer = this.head;
        while (pointer) {
            console.log(pointer.key);
            pointer = pointer.next;
        }        
    }
}

exports.createLink = function () {
    return new Link();  
}

exports.createNode = function () {
    return new Node();  
} 