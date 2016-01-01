var depth = require('./depth-first');

var main = function() {
  console.log('\n\n------------------------------')
  console.log('Path Removal Search');
  console.log('------------------------------')
  var to ='';
  var from ='';
  var ob = depth.depth();
  ob.setup();
  from = 'New York';
  to = 'Los Angeles';
  done = false;
  //to = 'Urbana';
  // console.log('bstack = '+ob.matchstack.length);
  do {
    ob.isWaypoint(from, to);
    // console.log('matchstack\n');

    if (ob.matchstack.length === 0) done = true;
    else {
      ob.route(from, to);
      ob.matchstack = [];
    }
    // console.log(ob.matchstack);
    // console.log(ob.waypoints);
  } while(!done);
};

main();
