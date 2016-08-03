// This is a mock database implementation with just a connect function
// db.connect will need to be called a total of 10 times before it successfully connects
var counter = 0;
var db = {
	connect: function(cb) {
		console.log('connection attempt', counter + 1)
		if (counter < 9) {
			counter++;
			return cb('db not ready yet');
		}
	return cb();
	}
}
// Try to connect, log a successful connection & exit
// If we fail to connect, log an error and return


function calldbBackoff(err,delay){
	console.log('delay=',delay);
	setTimeout(function(){
		db.connect(function(err) {
		if (err) {
			console.error('error here', err);
			calldbBackoff(null,delay*2);
			}
		else{
			console.log('successfully connected!');
			}
		});
	}, delay);
};


calldbBackoff(null,5);
