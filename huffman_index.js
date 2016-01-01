;(function () {

  var a = require('./huffman_code_words');
  var b = require('./huffman');
  var tree = require('./BinaryHeap');

  console.log('\n');
  console.log('Huffman coding for characters in text.')
  var code = a.HuffmanCodeWords(0);
  var wordhash = code.frequencyWordHash('once a pon a time in thug land.'.replace('.',' .'));
  var wordTree = code.buildTree(wordhash);
  code.encode(wordTree[1], '');
  console.log(code.encoding);

  console.log('\n');
  console.log('Huffman coding for words in text.')
  var code = b.HuffmanCode(0);
  var hash = code.frequencyCharacterHash('once a pon a time in thug land.');
  var tree = code.buildTree(hash);
  code.encode(tree[1], '');
  console.log(code.encoding);

}());
