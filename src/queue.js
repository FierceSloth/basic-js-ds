const { NotImplementedError } = require('../lib/errors');
const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor () {
    this.root = null;
  }

  getUnderlyingList() {
    const toPlain = (node) => node ? { value: node.value, next: toPlain(node.next) } : null;
    return toPlain(this.root);
  }

  enqueue(value) {
    if (!this.root) {
      this.root = new ListNode(value);
      return this;
    }

    let lastNode = this.root;
    while (lastNode.next) {
      lastNode = lastNode.next;
    }
    lastNode.next = new ListNode(value);
    return this;
  }

  dequeue() {
    if (!this.root) return undefined;

    const value = this.root.value;
    this.root = this.root.next;
    return value;
  }
}  

module.exports = {
  Queue
};
