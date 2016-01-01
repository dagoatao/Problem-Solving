;(function () {

var BinaryHeap = function(scoreFunction) {
  var obj = Object.create(BinaryHeap.prototype);
  obj.content = [];
  obj.scoreFunction = scoreFunction;
  obj.push = function(element){
    this.content.push(element);
    this.bubbleUp(this.content.length - 1);
  };
  obj.pop = function() {
    var result = this.content[0];
    var end = this.content.pop();
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  };
  obj.remove = function(node) {
    var length = this.content.length;
    for(var i=0; i<length;i++) {
      if (this.content[i] !== node) continue;
      var end = this.content.pop();
      if (i===length - 1) break;
      this.content[i] = end;
      this.bubbleUp(i);
      this.sinkDown(i);
      break;
    }
  };
  obj.size = function() {
    return this.content.length;
  };
  obj.bubbleUp = function(n) {
    var element = this.content[n], score=this.scoreFunction(element);
    while (n > 0) {
      var parentN = Math.floor((n+1)/2) -1;
      var parent = this.content[parentN];
      if (score >= this.scoreFunction(parent)) break;
      this.content[parentN] = element;
      this.content[n] = parent;
      n = parentN;
    }
  };
  obj.sinkDown = function(n) {
    var child1Score, child2Score;
    var length = this.content.length;
    var element = this.content[n];
    var elemScore = this.scoreFunction(element);
    while(true) {
      var child2N = (n+1) *2;
      var child1N = child2N-1;
      var swap = undefined;
      if ( child1N < length) {
        var child1 = this.content[child1N];
        child1Score = this.scoreFunction(child1);
        if ( child1Score < elemScore) {
          swap = child1N;
        }
      }
      if (child2N<length) {
        var child2 = this.content[child2N];
        child2Score = this.scoreFunction(child2);
        if (child2Score < (swap === undefined ? elemScore : child1Score)) {
          swap = child2N;
        }
      }
      if (swap === undefined) break;
      this.content[n] = this.content[swap];
      this.content[swap] = element;
      n = swap;
    }
  };

  return obj;
};

module.exports.BinaryHeap = BinaryHeap;

// var heap = BinaryHeap(function(x){return x;});
// [10,3,4,6,8,9,7,1,2,5].forEach(function(item) {
//   heap.push(item);
// });
// console.log(heap);
// heap.remove(2);
// console.log(heap);
// heap.sinkDown(5);
// console.log(heap.content);
// heap.bubbleUp(4);
// console.log(heap.content);
// while(heap.size() > 0) console.log(heap.pop());
//


}());
