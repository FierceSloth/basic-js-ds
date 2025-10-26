const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = addWithin(this._root, data);

    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node
      }

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  find(data) {
    return searchWithin(this._root, data);

    function searchWithin(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return node.data > data ?
        searchWithin(node.left, data) :
        searchWithin(node.right, data);
    }
  }

  has(data) {
    return searchWithin(this._root, data);

    function searchWithin(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return node.data > data ?
        searchWithin(node.left, data) :
        searchWithin(node.right, data);
    }
  }

  remove(data) {
    this._root = removeNode(this._root, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.right && !node.left) {
          return null;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        let minOfRight = node.right
        while (minOfRight.left) {
          minOfRight = minOfRight.left;
        }
        node.data = minOfRight.data;

        node.right = removeNode(node.right, minOfRight.data)

        return node;
      }
    }
  }

  min() {
    return getMin(this._root);

    function getMin(node) {
      if (!node) {
        return null;
      }

      let min = node;
      while (min.left) {
        min = min.left;
      }
      return min.data;
    }
  }

  max() {
    return getMax(this._root);

    function getMax(node) {
      if (!node) {
        return null;
      }

      let max = node;
      while (max.right) {
        max = max.right;
      }
      return max.data;
    }
  }
}

module.exports = {
  BinarySearchTree
};