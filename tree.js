
var Queue = require('./Queue');

var Node = function (data) {
  var obj = Object.create(Node.prototype);
  obj.data = data;
  obj.parent = undefined;
  obj.children = [];
  return obj;
}


var Tree = function (data) {
  var node = Node(data);
  var obj = Object.create(Tree.prototype);
  obj.root = node;
  return obj;
}

Tree.prototype.traverseDF = function(callback) {

  (function recurse(currentNode){
    for (var i =0; i < currentNode.children.length; i++) {
      recurse(currentNode.children[i]);
    }
    callback(currentNode);
  })(this.root);
}

Tree.prototype.traverseBF = function(callback) {
  var q = Queue.Queue();
  q.enqueue(this.root);
  currentTree = q.dequeue();
  while(currentTree) {
    for (var i=0;i<currentTree.children.length;i++) {
      q.enqueue(currentTree.children[i]);
    }
    callback(currentTree);
    currentTree = q.dequeue();
  }
}

Tree.prototype.contains = function(callback, traversal) {
  traversal.call(this, callback);
};

Tree.prototype.add = function(data, toData, traversal) {
  var child = Node(data),
      parent = undefined,
      callback = function(node) {
        if (node.data === toData) {
          parent = node;
        }
      };
  this.contains(callback, traversal);
  if (parent) {
    parent.children.push(child);
    child.parent = parent;
  } else {
    throw new Error('cannot add node to non  existing parent');
  }
};

Tree.prototype.remove = function(data, fromData, traversal) {
  var tree = this,
  parent = undefined,
  childToRemove = undefined,
  index;

  var callback = function(node) {
    if (node.data === fromData) {
      parent = node;
    }
  };

  this.contains(callback, traversal);

  if (parent) {
    index = this.findIndex(parent.children, data);
    if (index === undefined) {
      throw new Error('node to remove does not exist');
    } else {
      childToRemove = parent.children.splice(index, 1);
    }
  } else {
    throw new Error('parent does not exist');
  }
  return childToRemove;
};

Tree.prototype.findIndex = function(arr, data) {
  var index;
  for (var i=0;i<arr.length;i++) {
    if (arr[i].data === data) {
      index = i;
    }
  }
  return index;
};

module.exports.Tree = Tree;


//  var me = Tree('me');
// me.add('sadie', 'me', me.traverseDF);
// me.add('lily', 'me', me.traverseDF);
// me.add('another', 'me', me.traverseDF);
// me.add('someone', 'another', me.traverseDF);
//
// // me.traverseDF(function(node) {
// //   console.log(node.data);
// // });
// me.traverseBF(function(node) {
//   console.log(node.data);
// });
//
// me.remove('someone', 'another', me.traverseDF);
// me.traverseBF(function(node) {
//   console.log(node.data);
// });
