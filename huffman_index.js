;(function () {

  var a = require('./huffman_code_words');
  var b = require('./huffman');
  var tree = require('./BinaryHeap');

  var replacer = function(text) {
    var obj = Object.create(replacer.prototype);
    obj.text = text;
    // recursive replace all in string.
    obj.replaceAll = function(replace, replacement) {
      if ( this.text.indexOf(replace) >= 0) {
        this.text = this.text.replace(replace,replacement);
        this.replaceAll(replace, replacement);
      }
    };
    // recursive replace all hash keys with values.
    obj.recursiveReplace = function(hash, keys) {
      if (keys.length > 0) {
        key = keys.pop();
        this.replaceAll(key, hash[key]);
        this.recursiveReplace(hash,keys);
      }
    };
    return obj;
  };

  var text = 'once a pon a time in thug land.';
  console.log('\n');
  console.log('Huffman coding for words in text.');
  var code = a.HuffmanCodeWords(0);
  var wordhash = code.frequencyWordHash(text.replace('.',' .'));
  var wordTree = code.buildTree(wordhash);
  code.encode(wordTree[1], '');
  encoding = code.encoding;
  keys = Object.keys(encoding);
  var replacer = replacer(text);
  replacer.recursiveReplace(encoding, keys);
  console.log(replacer.text);

  console.log('\n');
  console.log('Huffman coding for characters in text.');
  var code = b.HuffmanCode(0);
  var hash = code.frequencyCharacterHash(text);
  var tree = code.buildTree(hash);
  code.encode(tree[1], '');
  encoding = code.encoding;
  keys = Object.keys(encoding);
  replacer.text = text;
  replacer.recursiveReplace(encoding, keys);
  console.log(replacer.text);

}());
