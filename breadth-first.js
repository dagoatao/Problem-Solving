var depth = require('./depth-first');

// ------------------------------------------------------------------
// Breadth-first test
//
// ------------------------------------------------------------------


var breadth = depth.depth;
var waypoint = depth.waypoint;

breadth.prototype.resetSkip = function(waypoint) {
  for (var i=0;i<this.waypoints.length;i++) {
    if (waypoint.from === this.waypoints[i].from && waypoint.to === this.waypoints[i].to) {
      this.waypoints[i].skip = false;
    }
  }
};

breadth.prototype.isWaypoint = function(df, dt) {
  distance = 0;
  obj = undefined;
  resetstack = [];
  //grab a from to match
  distance = this.match({from:df, to: dt});
  // add to stack
  if (distance !== 0) {
    this.matchstack.push(waypoint({'from':df, 'to':dt, 'distance':distance}));
    return;
  }
  // find  a matching waypoint
  while( (way = this.find(df)) !== undefined ) {
    resetstack.push(way);
    if ( (d = this.match({from:way.to, to:dt})) !== 0 ){
      resetstack.push(way.to);
      this.matchstack.push(waypoint({from:df, to:way.to, distance:way.distance}));
      this.matchstack.push(waypoint({from:way.to, to:dt, distance:d}));
      return;
    }
  }
  var size = resetstack.length;
  for(;size!==0;size--) this.resetSkip(resetstack.pop());

  obj = this.find(df);
  if (obj !== undefined) {
    this.matchstack.push(waypoint({from:df, to:dt, distance:obj.distance}));
    this.isWaypoint(obj.to, dt);
  } else if (this.matchstack.length > 0) {
    f = this.matchstack.pop();
    this.isWaypoint(f.from, f.to);
  }
};

var main2 = function() {
  console.log('\n\n------------------------------')
    console.log('Breadth First Search');
    console.log('------------------------------')
    var to ='';
    var from ='';
    var ob = breadth();
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
main2();
