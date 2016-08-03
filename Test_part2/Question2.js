var one;
var two;
function remoteMathService(cb){
	
	callOneService(function(err,num){
		one=num;
		console.log("one=num",num);
//		cb(undefined,one +two);
	});
	callTwoService(function(err,num){
		two=num;
		console.log("two=num",num);
		cb(undefined,one +two);
	});

	//return cb(undefined,one + two);
}

function callOneService(cb){
	setTimeout(function(){
		return cb(undefined,1);
	},1000);
}
function callTwoService(cb){
	setTimeout(function(){
		return cb(undefined,2);
	},1500);
}

remoteMathService(function(err,answer){
	console.log("answer= ", one+two );
	
	if(err)console.log("error",err);
	if(answer!==3){
		console.log("wronganswer",answer);
	}else{
	console.log("correct");
	}
	
});
