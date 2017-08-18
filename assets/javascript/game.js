var gameInfo ={
	targetPower:0,
	powerUp: [],
	intervalId: 0,
	currentPower: 0,
	winCount: 0,
	lossCount: 0,

	writeScores: function(){
		$("#wins_counter").text(this.winCount);
		$("#losses_counter").text(this.lossCount);
		$("#target").text(this.powerConverter(this.targetPower));
	},

	newGame: function(){
		// I wanted to go with different values.
		this.targetPower = Math.floor((Math.random()*100)+(Math.random()*100)*10);
		this.powerUp = [];
		for (var i = 0; i < 4; i++) {
			this.powerUp[i] = (Math.floor(Math.random() * 21) +13);
			console.log("button "+i+ ": " +this.powerUp[i]);
		} //Thank you Wes for this Awesome peace of code!
		console.log("end values");
		this.currentPower = 0;
		$(".power_counter").html("<h2> 00.00 </h2>");
		this.writeScores();


	},

	powerIncrement: function(pow){

		this.currentPower += this.powerUp[pow];

		if (this.currentPower > this.targetPower) {
			this.lossCount++;
			$(".power_counter").html("<h2> You Lose! </h2> <h2 id='reset_btn'> Reset? </h2>");
		}

		else if (this.currentPower === this.targetPower) {
			this.winCount++;
			$(".power_counter").html("<h2> You Win! </h2> <h2 id='reset_btn'> Reset? </h2>");
		}

		else{
			console.log(this.currentPower);
			$(".power_counter").html("<h2> "+ this.powerConverter(this.currentPower)+" </h2>");
		}

	},

	// count: function(){
	// 	console.log(gameInfo.powerInc);
	// 	gameInfo.powerInc++;
	// 	var currentPower = gameInfo.powerConverter(gameInfo.powerInc);
	// 	$("#power_counter").html("<h2> "+currentPower+" <h2>");
	// },

	powerConverter: function(t) {

    //  Look familiar? :P
    var kiloWatts = Math.floor(t / 100);
    var watts = t - (kiloWatts * 100);

    if (watts < 10) {
      watts = "0" + watts;
    }

    if (kiloWatts === 0) {
      kiloWatts = "00";
    }

    else if (kiloWatts < 10) {
      kiloWatts = "0" + kiloWatts;
    }

    return kiloWatts + "." + watts;
  }
};

$(document).ready(function(){
	gameInfo.newGame();

	$(".power_btn").on("click ", function(){
		gameInfo.powerIncrement(this.value);
	});

	$("body").on("click", "#reset_btn", function(){
		gameInfo.newGame();
	});

});