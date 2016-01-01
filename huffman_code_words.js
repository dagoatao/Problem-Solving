;(function () {
var huffman = require('./huffman');
huffman.HuffmanCode.prototype.frequencyWordHash = function(text) {
  var hash = {};
  for(var word in words=text.split(' ')) {
    if (hash[words[word]]) {
      hash[words[word]]++;
    } else {
      hash[words[word]] = 1;
    }
  }
  return hash;
};
module.exports.HuffmanCodeWords = huffman.HuffmanCode;
}());
