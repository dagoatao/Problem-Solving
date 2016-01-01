;(function () {
var depth = require('./depth-first');
var leastcost = depth.depth;
var waypoint = depth.waypoint;

leastcost.prototype.find = function(from) {

  var pos=-1, dist=1000;
  for (var i = 0;i < this.waypoints.length; i++) {
    var point = this.waypoints[i];
    if (point.from === from && point.skip === false) {
      if (point.distance < dist) {
        pos = i;
        dist = point.distance;
      }
    }
  }
  if (pos !== -1) {
    this.waypoints[pos].skip = true;
    w = this.waypoints[pos];
    return waypoint({from:w.from, to:w.to, distance:w.distance});
  }
  return undefined;

}

var least_cost = function() {
  console.log('\n\n------------------------------')
  console.log('Least Cost Search');
  console.log('------------------------------')
  var ob = leastcost();
  ob.setup();
  from = 'New York';
  to = 'Los Angeles';
  ob.isWaypoint(from, to);
  if (ob.matchstack.length !== 0) ob.route(from, to);
};

least_cost();

}());
