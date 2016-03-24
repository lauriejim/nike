var user= {
	params : {
		firstname : '',
		lastname : '',
		birthday : '',
		picture : '',
		country : '',
		shoesName : 'Nike Flyknit Lunar',
		shoesPic : 'Nike-Flyknit-Lunar',
		km : 0,
		cal : 0,
		speed : 12,
		time : 0,
		shoes : 0
	},
	choice : [],

	addKm : function (param){
		var x = param;
		var sign = Math.round(Math.random());
		if (sign == 0) {
			sign = -1;
		}else{
			sign = 1;
		}
		var pourcentage = (Math.random()*9)+1;
		var addKm = x*((100+(pourcentage*(sign)))/100);
		console.log('add km', addKm);
		user.params.km += Math.round(addKm);
	},

	addSpeed : function (param){
		var x = param;
		var sign = Math.round(Math.random());
		if (sign == 0) {
			sign = -1;
		}else{
			sign = 1;
		}
		var pourcentage = (Math.random()*9)+1;
		var addSpeed = x*((100+(pourcentage*(sign)))/100);
		console.log('add speed', addSpeed.toFixed(1));
		user.params.speed = (parseFloat(user.params.speed)+addSpeed).toFixed(1);
	},

	addTime : function (){
		var x = user.params.km;
		var v = user.params.speed;
		console.log('add time', (x/v)*60);
		user.params.time += Math.round((x/v)*60);

		var sign = Math.round(Math.random());
		if (sign == 0) {
			sign = -1;
		}else{
			sign = 1;
		}
		var pourcentage = (Math.random()*9)+1;
		var addCal = (926*(x/v))*((100+(pourcentage*(sign)))/100);
		user.params.cal += Math.round(addCal);
	}
}