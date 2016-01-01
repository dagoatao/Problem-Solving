// Depth-first Search
// Reusable depth-fist search matching waypoint objects. Includes distance
// value for calculating distance between nodes.
// ------------------------------------
// by Michael Colon
//
//
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
}

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
}

depth.prototype.match = function(properties) {
  distance = 0;
  _.each(this.waypoints, function(obj) {
    if(obj.skip === false && _.isMatch(obj,properties) === true) {
      obj.skip = true;      // prevent reuse
      distance = obj.distance;  // return waypoint distance
      return distance;
    }
  });
  return distance;
};

depth.prototype.find = function(from) {
  f = undefined;
  _.each(this.waypoints, function(item) {
    if (item.skip === false && item.from === from) {
      item.skip = true;
      f = waypoint({from:item.from, to:item.to, distance:item.distance});
      return f;
    }
  });
  return f;
}

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
    this.matchstack.push(waypoint({from:obj.from, to:obj.to, distance:obj.distance}));
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
  console.log('\n\nYour waypoint & connections to: %s', dt);
  console.log('----------------------------------------');
  _.each(reversed, function(item) {
    shortestpath += item.distance;
    console.log('From: %s, To: %s, distance: %s', item.from, item.to, item.distance);
  });
  console.log('The path chosen from %s to %s was calculated at %s miles.', df, dt, shortestpath);
};











depth.prototype.setup = function() {
  this.waypoints.push(waypoint({from:'New York',to:'Chicago', distance:900}));
  this.waypoints.push(waypoint({from:'New York',to:'Toronto', distance:500}));
  this.waypoints.push(waypoint({from:'New York',to:'Denver', distance:1800}));
  this.waypoints.push(waypoint({from:'Chicago',to:'Denver', distance:1000}));
  this.waypoints.push(waypoint({from:'Toronto',to:'Calgary', distance:1700}));
  this.waypoints.push(waypoint({from:'Toronto',to:'Los Angeles', distance:2500}));
  this.waypoints.push(waypoint({from:'Toronto',to:'Chicago', distance:500}));
  this.waypoints.push(waypoint({from:'Denver',to:'Urbana', distance:1000}));
  this.waypoints.push(waypoint({from:'Denver',to:'Los Angeles', distance:100}));
  this.waypoints.push(waypoint({from:'Denver',to:'Toronto', distance:1000}));
};



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

main();
