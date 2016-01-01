// Depth-first Search
// Reusable depth-fist search matching waypoint objects. Includes distance
// value for calculating distance between nodes.
// ------------------------------------
// by Michael Colon
//
//

(function () {
var _ = require('underscore');

var waypoint = function( data ) {
  var obj = Object.create(waypoint.prototype);

  obj.from = (data.from !== undefined)
  ? data.from
  : '';

  obj.to = (data.to !== undefined)
  ? data.to
  : '';

  obj.distance = (data.distance !== undefined)
  ? data.distance
  : 0;

  obj.skip = (data.skip !== undefined)
  ? data.skip
  : false;
  return obj;
};

module.exports.waypoint = waypoint;

var depth = function() {
  var obj = Object.create(depth.prototype);
  obj.max = 100;
  obj.waypoints = [];
  obj.numberOfWaypoints = 0;
  obj.matchstack = [];
  return obj;
};

depth.prototype.isWaypointMax = function() {
  return (this.waypoints.length > this.max);
};

depth.prototype.match = function(properties) {
  distance = 0;
  for (i=0;i<this.waypoints.length;i++) {
    if (this.waypoints[i].skip === false && this.waypoints[i].from === properties.from && this.waypoints[i].to === properties.to) {
      this.waypoints[i].skip = true;      // prevent reuse
      distance = this.waypoints[i].distance;  // return waypoint distance
      return distance;
    }
  }
  return 0;
};

depth.prototype.find = function(from) {
  f = undefined;
  for (i = 0; i<this.waypoints.length;i++) {
    if (this.waypoints[i].skip === false && this.waypoints[i].from === from) {
      this.waypoints[i].skip = true;
      f = waypoint({from:this.waypoints[i].from, to:this.waypoints[i].to, distance:this.waypoints[i].distance});
      return f;
    }
  }
  return f;
};

depth.prototype.isWaypoint = function(df, dt) {
  // console.log('Is there a waypoint from %s to %s?', df, dt);
  distance = 0;
  obj = undefined;
  //grab a from to match
  distance = this.match({from:df, to: dt});
  // add to stack
  if (distance !== 0) {
    // console.log('Found waypoint from %s to %s with distance %s', df, dt, distance);
    this.matchstack.push(waypoint({'from':df, 'to':dt, 'distance':distance}));
    return;
  }
  // find  a matching waypoint
  obj = this.find(df);
  // if not present add it and find next node. Or pop next waypoint and search next node.
  if (obj !== undefined) {
    this.matchstack.push(waypoint({from:df, to:dt, distance:obj.distance}));
    // this.matchstack.push(waypoint({from:obj.from, to:obj.to, distance:obj.distance}));
    // console.log('Found this %s, %s, %s', obj.from, obj.to, obj.distance);
    this.isWaypoint(obj.to, dt);
  } else if (this.matchstack.length > 0) {
    f = this.matchstack.pop();
    // console.log('Try connecting waypoint from %s to %s', f.from, f.to);
    this.isWaypoint(f.from, f.to);
  }
};

depth.prototype.route = function(df, dt) {
  reversed = [];
  _.each(this.matchstack, function(item) {
    reversed.push(item);
  });
  var shortestpath = 0;
  var output = 'From: ';
  console.log('\n\nYour waypoint & connections to: %s', dt);
  console.log('----------------------------------------');
  _.each(reversed, function(item) {
    shortestpath += item.distance;
    output += item.from+' to ';
  });
  output+=''+dt;
  console.log(output+' with distance '+shortestpath);
};







var NY = 'New York';
var CH = 'Chicago';
var TO = 'Toronto';
var CA = 'Calgary';
var LA = 'Los Angeles';
var UR = 'Urbana';
var HO = 'Houston';
var DE = 'Denver';



depth.prototype.setup = function() {
  this.waypoints.push(waypoint({from:NY,   to:CH, distance:900}));
  this.waypoints.push(waypoint({from:CH,   to:DE, distance:1000}));
  this.waypoints.push(waypoint({from:NY,   to:TO, distance:500}));
  this.waypoints.push(waypoint({from:NY,   to:DE, distance:1800}));
  this.waypoints.push(waypoint({from:TO,   to:CA, distance:1700}));
  this.waypoints.push(waypoint({from:TO,   to:LA, distance:2500}));
  this.waypoints.push(waypoint({from:TO,   to:CH, distance:500}));
  this.waypoints.push(waypoint({from:DE,   to:UR, distance:1000}));
  this.waypoints.push(waypoint({from:DE,   to:HO, distance:1000}));
  this.waypoints.push(waypoint({from:HO,   to:LA, distance:1500}));
  this.waypoints.push(waypoint({from:DE,   to:LA, distance:1000}));
};


module.exports.depth = depth;
// ------------------------------------------------------------------
// Depth-first test
//
// ------------------------------------------------------------------
var main = function() {
  var to ='';
  var from ='';
  var ob = depth();
  ob.setup();
  from = 'New York';
  to = 'Los Angeles';
  //to = 'Urbana';
  // console.log('bstack = '+ob.matchstack.length);
  ob.isWaypoint(from, to);
  if (ob.matchstack.length !== 0) ob.route(from, to);
  // else console.log('Nothing in matchstack');
};

}());
