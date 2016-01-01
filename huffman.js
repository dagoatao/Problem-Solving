
var queue = require('./Queue');
// var tree = require('./Tree');
var tree = require('./BinaryHeap');


// var node = function() {
//     var obj = Object.create(node.prototype);
//     obj.sym = undefined;
//     obj.code = undefined;
//     obj.freq = 0;
//     obj.show = function() {
//       console.log('Symbol: %s, code: %s, freq: %s', this.sym, this.code, this.freq);
//     }
// }
//
// var queue = function() {
//   var obj = Object.create(queue.prototype);
//   obj.buffer = [];
//   obj.n = 0;
//   obj.siftdown = function(a) {
//     var a, parent, child;
//
//   }
// }


var HuffmanTree = function(freq) {
  var obj = Object.create(HuffmanTree.prototype);
  obj.freq = freq;
  return obj;
};

const kEqualTo=0, kGreaterThen=1, kLessThen=2;

function HuffmanCompare(n1,n2,un) {
  var f1 = n1.freq, f2=n2.freq;
  if (f1 === f2) return kEqualTo;
  else if (f1 > f2) return kGreaterThen;
  else return kLessThen;
}

var leaf = function(freq, character) {
  var obj = Object.create(HuffmanTree.prototype);
  obj.freq = freq;
  obj.value = character;
  return obj;
};

var node = function(left, right) {
  var obj = Object.create(HuffmanTree.prototype);
  obj.freq = left.freq+right.freq;
  obj.left = left;
  obj.right = right;
  return obj;
};

var HuffmanCode = function(value) {
  var obj =  Object.create(HuffmanCode.prototype);
  obj.characterSplitter = '';
  obj.encoding = {};
  obj.sortText = function(text) {
    var frequencies = {};
    var table = [];
    for(var ch in text.split(this.characterSplitter)) {
      if (frequencies[text[ch]]) {
        frequencies[text[ch]]++;
      } else {
        frequencies[text[ch]] = 1;
      }
    }
    Object.keys(frequencies).forEach(function(key) {
      table.push([frequencies[key], key]);
    });
    return table;
  };
  obj.buildTree = function(frequencies) {
    // var trees = queue.Queue();
    trees = tree.BinaryHeap(function(x){return x[0];});
    for (var i = 0; i < frequencies.length;i++) {
      if (frequencies[i][0] > 0)
        trees.push([frequencies[i][0], frequencies[i][1]]);
    }
    if ( trees.size() <= 0) return;
    // console.log(trees);
    while(trees.size()>1) {
      a = trees.pop();
      b = trees.pop();
      trees.push([a[0]+b[0], [a[1],b[1]]]);
    }
    return trees.pop();
    // console.log(trees.content);
  };
  return obj;
};

// function sorter(a,b) {
//   return a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : 0);
// }

HuffmanCode.prototype.encode=function(tree, prefix) {
  if(tree instanceof Array) {
    this.encode(tree[0], prefix+"0");
    this.encode(tree[1], prefix+"1");
  } else {
    this.encoding[tree] = prefix;
  }
}



var code = HuffmanCode(0);
sort = code.sortText('once a pon a time in thug land.');
// console.log(sort);
var tree = code.buildTree(sort);
// console.log(tree);
code.encode(tree[1], "");
console.log(code.encoding);
