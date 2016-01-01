var depth = require('./depth-first');

var hillclimber = depth.depth;
var waypoint = depth.waypoint;

hillclimber.prototype.find = function(from) {
  console.log('hill finding');
  var pos=-1, dist=0;
  for (var i = 0; i< this.waypoints.length; i++) {
    if (this.waypoints[i].from === from && this.waypoints[i].skip === false) {
      if(this.waypoints[i].distance > dist) {
        pos = i;
        dist = this.waypoints[i].distance;
      }
    }
  }
  if (pos !== -1) {
    console.log('positional');
    this.waypoints[pos].skip=true;
    w = this.waypoints[pos];
    return waypoint({from:w.from, to:w.to, distance:w.distance});
  }
  return undefined;
};


var main3 = function() {

    var to ='';
    var from ='';
    var ob = hillclimber();
    ob.setup();
    from = 'New York';
    to = 'Los Angeles';
    // to = 'Urbana';
    // console.log('bstack = '+ob.matchstack.length);
    ob.isWaypoint(from, to);
    // console.log(ob.matchstack);
    if (ob.matchstack.length !== 0) ob.route(from, to);
    // else console.log('Nothing in matchstack');
};

main3();
