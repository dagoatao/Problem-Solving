function Queue() {
  var obj = Object.create(Queue.prototype);
  obj.oldestIndex = 1;
  obj.newestIndex = 1;
  obj.storage = {};
  return obj;
}


Queue.prototype.size = function() {
  return this.newestIndex - this.oldestIndex;
};

Queue.prototype.enqueue = function(data) {
  this.storage[this.newestIndex] = data;
  this.newestIndex++;
}

Queue.prototype.dequeue = function() {
  var oldestIndex = this.oldestIndex,
      newestIndex = this.newestIndex,
      deletedData;
  if (this.oldestIndex !== this.newestIndex) {
    deletedData = this.storage[this.oldestIndex];
    delete this.storage[oldestIndex];
    this.oldestIndex++;
  }
  return deletedData;
}

module.exports.Queue = Queue;
