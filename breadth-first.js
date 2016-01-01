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
  // console.log('Is there a waypoint from %s to %s?', df, dt);
  // console.log(this.matchstack);
  distance = 0;
  obj = undefined;
  resetstack = [];
  //grab a from to match
  distance = this.match({from:df, to: dt});
  // add to stack
  if (distance !== 0) {
    // console.log('Yes, Found waypoint from %s to %s with distance %s', df, dt, distance);
    this.matchstack.push(waypoint({'from':df, 'to':dt, 'distance':distance}));
    return;
  }
  // find  a matching waypoint
  while( (way = this.find(df)) !== undefined ) {
    // console.log('searching flights leaving %s to %s', way.from, way.to);
    resetstack.push(way);
    if ( (d = this.match({from:way.to, to:dt})) !== 0 ){
      // console.log('got a hit '+way.to+' '+dt);
      resetstack.push(way.to);
      this.matchstack.push(waypoint({from:df, to:way.to, distance:way.distance}));
      this.matchstack.push(waypoint({from:way.to, to:dt, distance:d}));
      return;
    }
  }
  var size = resetstack.length;
  for(;size!==0;size--) this.resetSkip(resetstack.pop());
  obj = this.find(df);
  // if not present add it and find next node. Or pop next waypoint and search next node.
  if (obj !== undefined) {
    this.matchstack.push(waypoint({from:df, to:dt, distance:obj.distance}));
    // this.matchstack.push(waypoint({from:obj.from, to:obj.to, distance:obj.distance}));
    // console.log('Found this %s, %s, %s', df, obj.to, obj.distance);
    // console.log('Try connecting waypoint from %s to %s', obj.to, dt);
    this.isWaypoint(obj.to, dt);
  } else if (this.matchstack.length > 0) {
    f = this.matchstack.pop();
    // console.log('Try connecting waypoint from %s to %s', f.from, f.to);
    this.isWaypoint(f.from, f.to);
  }
};

var main2 = function() {

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
