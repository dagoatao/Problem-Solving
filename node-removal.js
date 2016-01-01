var depth = require('./depth-first');


var node_r = depth.depth;
var waypoint = depth.waypoint;

node_r.prototype.resetAllSkip = function() {
  for( var i = 0; i<this.waypoints.length;i++) {
    this.waypoints[i].skip = false;
  }
};

node_r.prototype.remove = function(waypoint) {
  for (var i=0;i<this.waypoints.length;i++) {
    if (this.waypoints[i].from === waypoint.from && this.waypoints[i].to === waypoint.to) {
      this.waypoints[i].from = '';
    }
  }
};


var main = function() {
  var to ='';
  var from ='';
  var ob = node_r();
  ob.setup();
  from = 'New York';
  to = 'Los Angeles';
  //to = 'Urbana';
  // console.log('bstack = '+ob.matchstack.length);
  var done= false;
  do {
    ob.isWaypoint(from, to);
    if (ob.matchstack.length === 0) done = true;
    else {
      var waypoint = ob.matchstack[ob.matchstack.length-1];
      // console.log(waypoint);
      ob.route(from, to);
      ob.resetAllSkip();
      ob.remove(waypoint);
      ob.matchstack=[];
    }
  } while(!done);
  // if (ob.matchstack.length !== 0) ob.route(from, to);
  // else console.log('Nothing in matchstack');
};

main();
