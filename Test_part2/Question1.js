function doThing(){
	console.log('doing the thing');
	//throw new Error('something bad happened');
}

function foo (callback){
doThing( function (err,res){
  if   (err) callback(err);
callback(   null   ,res);
});
}
foo(   function   (err,res){
  console   .log   (   'Done!.err=',err,' :res= ',res   );
  });
