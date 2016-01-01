;(function () {

  var heap = require('./BinaryHeap');

  var HuffmanCode = function(value) {
    var obj =  Object.create(HuffmanCode.prototype);
    obj.characterSplitter = '';
    obj.encoding = {};
    // create frequency hash from text.
    obj.frequencyCharacterHash = function(text) {
      var hash = {};
      // var table = [];
      for(var ch in text.split(this.characterSplitter)) {
        if (hash[text[ch]]) {
          hash[text[ch]]++;
        } else {
          hash[text[ch]] = 1;
        }
      }
      return hash;
    };
    // create table from frequency hash
    obj.frequencyTable = function(hash) {
      var table = [];
      Object.keys(hash).forEach(function(key) {
        table.push([hash[key], key]);
      });
      return table;
    };
    // build tree from frequency hash.
    obj.buildTree = function(frequencies) {
      var table = this.frequencyTable(frequencies);
      tree = heap.BinaryHeap(function(x){return x[0];});
      for (var i = 0; i < table.length;i++) {
        if (table[i][0] > 0)
          tree.push([table[i][0], table[i][1]]);
      }
      if ( tree.size() <= 0) return;
      var compressed = this.compress(tree);
      return tree.pop();;
    };
    //recursive compression
    obj.compress = function(tree){
      if (tree.size()<=1) return;
      a = tree.pop();
      b = tree.pop();
      tree.push([a[0]+b[0], [a[1],b[1]]]);
      this.compress(tree);
    };
    // recursive encode
    obj.encode=function(tree, prefix) {
      if(tree instanceof Array) {
        this.encode(tree[0], prefix+'0');
        this.encode(tree[1], prefix+'1');
      } else {
        this.encoding[tree] = prefix;
      }
    };
    return obj;
  };
  // HuffmanCode.prototype.frequencyWordHash = function(text) {
  //   var hash = {};
  //   // var table = [];
  //   for(var word in words=text.split(' ')) {
  //     if (hash[words[word]]) {
  //       hash[words[word]]++;
  //     } else {
  //       hash[words[word]] = 1;
  //     }
  //   }
  //   return hash;
  // };

module.exports.HuffmanCode=HuffmanCode;
}());

// var code = HuffmanCode(0);
// var hash = code.frequencyCharacterHash('once a pon a time in thug land.');
// var tree = code.buildTree(hash);
// code.encode(tree[1], '');
// console.log(code.encoding);
