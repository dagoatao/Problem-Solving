var depth = require('./depth-first');

// ------------------------------------------------------------------
// optimal test
//
// ------------------------------------------------------------------


var optimal = depth.depth;
var waypoint = depth.waypoint;

optimal.prototype.optimal=[];
optimal.prototype.minDist=10000;
optimal.prototype.route = function(from, to) {
  // console.log(this.matchstack);
  var distance = 0;
  var temp = [];

  for (var i = 0;i<this.matchstack.length;i++) {
    var waypoint = this.matchstack.pop();
      temp.push(waypoint);
      distance +=  waypoint.distance;
  }
  // save current route distance as minDist and save route as optimal.
  if (this.minDist > distance) {
    this.optimal = temp;
    this.minDist = distance;
  }
};

var main = function() {

  console.log('\n\n------------------------------')
  console.log('Optimal Search');
  console.log('------------------------------')
  var ob = optimal();
  ob.setup();
  from = 'New York';
  to = 'Los Angeles';

  var done= false;
  do {
    ob.isWaypoint(from, to);
    if (ob.matchstack.length === 0) done = true;
    else {
      ob.route(from, to);
      ob.matchstack=[];
    }
  } while(!done);


  output = 'from '+from+' to ';
  if (ob.optimal !== null) {
    length = ob.optimal.length;
    for(var i=0;i<length;i++) {
      var op = ob.optimal.pop();
      output+= op.from+' to ';
    }
    console.log('Optimal solutions is:');
    console.log(output+to+' with distance '+ ob.minDist);
  }
};

main();
